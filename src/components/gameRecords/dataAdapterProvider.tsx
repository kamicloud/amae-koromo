import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import React, { ReactChild } from "react";
import dayjs from "dayjs";

import {
  DataProvider,
  GameRecord,
  FilterPredicate,
  ListingDataProvider,
  PlayerDataProvider
} from "../../utils/dataSource";
import { useModel, Model } from "./model";
import { Metadata } from "../../utils/dataSource";
import { generatePath } from "./routes";

interface ItemLoadingPlaceholder {
  loading: boolean;
}

const loadingPlaceholder = { loading: true };

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IDataAdapter {
  getCount(): number;
  getUnfilteredCount(): number;
  getMetadata<T extends Metadata>(): T | null;
  getItem(index: number): GameRecord | ItemLoadingPlaceholder;
  isItemLoaded(index: number): boolean;
}

class DummyDataAdapter implements IDataAdapter {
  getCount(): number {
    return 0;
  }
  getUnfilteredCount(): number {
    return 0;
  }
  getMetadata<T extends Metadata>(): T | null {
    return null;
  }
  getItem(): GameRecord | ItemLoadingPlaceholder {
    return loadingPlaceholder;
  }
  isItemLoaded(): boolean {
    return false;
  }
}

export const DUMMY_DATA_ADAPTER = new DummyDataAdapter() as IDataAdapter;

const noop = () => {};

class DataAdapter implements IDataAdapter {
  _provider: DataProvider;
  _onDataUpdate: (isError: boolean) => void;
  _triggeredRequest: boolean;

  constructor(provider: DataProvider, onDataUpdate = noop) {
    this._provider = provider;
    this._onDataUpdate = onDataUpdate;
    this._triggeredRequest = false;
  }
  _installHook<T>(promise: Promise<T>) {
    if (this._triggeredRequest) {
      return;
    }
    this._triggeredRequest = true;
    promise.then(() => this._callHook(false)).catch(() => this._callHook(true));
  }
  _callHook(isError: boolean) {
    this._onDataUpdate(isError);
  }
  getCount(): number {
    const maybeCount = this._provider.getCountMaybeSync();
    if (maybeCount instanceof Promise) {
      this._installHook(maybeCount);
      return 0;
    }
    return maybeCount;
  }
  getUnfilteredCount(): number {
    return this._provider.getUnfilteredCountSync() || 0;
  }
  getMetadata<T extends Metadata>(): T | null {
    return this._provider.getMetadataSync() as T | null;
  }
  getItem(index: number): GameRecord | ItemLoadingPlaceholder {
    if (index >= this.getCount()) {
      return loadingPlaceholder;
    }
    if (this._provider.isItemLoaded(index)) {
      return this._provider.getItem(index) as GameRecord;
    }
    if (!this._triggeredRequest) {
      this._installHook(this._provider.getItem(index) as Promise<GameRecord>);
    }
    return loadingPlaceholder;
  }
  isItemLoaded(index: number): boolean {
    if (index < 0) {
      return false;
    }
    return this._provider.isItemLoaded(index);
  }
  setUpdateHook(hook: () => void) {
    this._onDataUpdate = hook;
  }
  cancelUpdateHook() {
    this._onDataUpdate = noop;
  }
}

const DataAdapterContext = React.createContext(DUMMY_DATA_ADAPTER);

export const useDataAdapter = () => useContext(DataAdapterContext);
export const DataAdapterConsumer = DataAdapterContext.Consumer;

function getProviderKey(model: Model): string {
  if (model.type === undefined) {
    return dayjs(model.date || dayjs())
      .startOf("day")
      .valueOf()
      .toString();
  } else if (model.type === "player") {
    return generatePath(model);
  }
  throw new Error("Unknown model type");
}

function createProvider(model: Model): DataProvider {
  if (model.type === undefined) {
    return ListingDataProvider.create(model.date || dayjs().startOf("day"));
  }
  if (model.type === "player") {
    return PlayerDataProvider.create(model.playerId, model.startDate, model.endDate, model.selectedMode);
  }
  throw new Error("Not implemented");
}

function usePredicate(model: Model): FilterPredicate {
  let memoFunc: () => FilterPredicate = () => null;
  let memoDeps = [null, ""];
  if (model.type === undefined) {
    const searchText = (model.searchText || "").trim() || "";
    const needPredicate = searchText || model.selectedMode;
    memoFunc = () =>
      needPredicate
        ? game => {
            if (model.selectedMode && model.selectedMode !== game.modeId.toString()) {
              return false;
            }
            if (!game.players.some(player => player.nickname.toLowerCase().indexOf(searchText) > -1)) {
              return false;
            }
            return true;
          }
        : null;
    memoDeps = [(model.type === undefined && model.selectedMode) || null, searchText];
  }
  return useMemo(memoFunc, memoDeps);
}

export function DataAdapterProvider({ children }: { children: ReactChild | ReactChild[] }) {
  const [model, updateModel] = useModel();
  const [dataProviders] = useState(() => ({} as { [key: string]: DataProvider }));
  const searchPredicate = usePredicate(model);
  const dataProvider = useMemo(() => {
    const key = getProviderKey(model);
    if (!dataProviders[key]) {
      dataProviders[key] = createProvider(model);
    }
    return dataProviders[key];
  }, [model, dataProviders]);
  const [dataAdapter, setDataAdapter] = useState(() => DUMMY_DATA_ADAPTER);
  const refreshDataAdapter = useCallback(
    (isError?: boolean) => {
      if (isError) {
        updateModel(Model.removeExtraParams(model));
        return;
      }
      dataProvider.setFilterPredicate(searchPredicate);
      const adapter = new DataAdapter(dataProvider);
      setDataAdapter(adapter);
    },
    [dataProvider, searchPredicate, model, updateModel]
  );
  useEffect(refreshDataAdapter, [refreshDataAdapter]);
  useEffect(() => {
    const adapter = dataAdapter;
    if (adapter instanceof DataAdapter) {
      return () => adapter.cancelUpdateHook();
    }
  }, [dataAdapter]);
  useEffect(() => {
    const adapter = dataAdapter;
    if (adapter instanceof DataAdapter) {
      adapter.setUpdateHook(refreshDataAdapter);
    }
  }, [dataAdapter, refreshDataAdapter]);
  useEffect(() => {
    dataProvider.getCountMaybeSync(); // Preload metadata
  }, [dataProvider]);
  return <DataAdapterContext.Provider value={dataAdapter}>{children}</DataAdapterContext.Provider>;
}
