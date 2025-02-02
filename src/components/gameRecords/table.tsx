import React from "react";
import { useCallback, useEffect } from "react";
import { TableCellProps, Index } from "react-virtualized";
import { Table, Column } from "react-virtualized/dist/es/Table";
import { AutoSizer } from "react-virtualized/dist/es/AutoSizer";
import dayjs from "dayjs";
import clsx from "clsx";

import { GameRecord, GameMode } from "../../utils/dataSource";
import { Player } from "./player";
import { useScrollerProps } from "../misc/scroller";
import { useDataAdapter } from "./dataAdapterProvider";
import { triggerRelayout } from "../../utils/index";
import { useModel } from "./model";
import Loadable from "react-loadable";
import Loading from "../misc/loading";

const formatTime = (x: number) => (x ? dayjs.unix(x).format("HH:mm") : null);

const Players = React.memo(({ game, activePlayerId }: { game: GameRecord; activePlayerId?: string }) => (
  <div className="row no-gutters">
    {game.players.map(x => (
      <div key={x.accountId} className="col-12 col-md-6 pr-1">
        <Player game={game} player={x} isActive={x.accountId.toString() === activePlayerId} />
      </div>
    ))}
  </div>
));

const cellFormatTime = ({ cellData }: TableCellProps) => formatTime(cellData);
const cellFormatFullTime = ({ rowData }: TableCellProps) =>
  rowData.loading ? "" : GameRecord.formatFullStartTime(rowData);
const cellFormatRank = ({ rowData, columnData }: TableCellProps) =>
  !rowData || rowData.loading || !columnData.activePlayerId ? (
    ""
  ) : (
    <span
      className="font-weight-bold"
      style={{ color: GameRecord.getPlayerRankColor(rowData, columnData.activePlayerId) }}
    >
      {GameRecord.getPlayerRankLabel(rowData, columnData.activePlayerId).slice(0, 1)}
    </span>
  );
const cellFormatGameMode = ({ cellData }: TableCellProps) => GameMode[cellData];

export default function GameRecordTable({ showStartEnd = true, showFullTime = false } = {}) {
  const data = useDataAdapter();
  const [model] = useModel();
  const scrollerProps = useScrollerProps();
  const { isScrolling, onChildScroll, scrollTop, height, registerChild } = scrollerProps;
  const rowGetter = useCallback(({ index }: Index) => data.getItem(index), [data]);
  const getRowClassName = useCallback(
    ({ index }: Index) => (index >= 0 ? clsx({ loading: !data.isItemLoaded(index), even: (index & 1) === 0 }) : ""),
    [data]
  );
  const noRowsRenderer = useCallback(() => (data.getUnfilteredCount() ? null : <Loading />), [data]);
  const activePlayerId = model.type === "player" ? model.playerId : undefined;
  const cellRenderPlayer = useCallback(
    ({ rowData }: TableCellProps) =>
      rowData && rowData.players ? <Players game={rowData} activePlayerId={activePlayerId} /> : null,
    [activePlayerId]
  );
  const unfilteredCount = data.getUnfilteredCount();
  const shouldTriggerLayout = !!unfilteredCount;
  const shouldPreload = !!unfilteredCount && !("loading" in (data.getItem(0) || {loading: true}));
  useEffect(() => {
    triggerRelayout();
  }, [shouldTriggerLayout]);
  useEffect(() => {
    if (shouldPreload) {
      Loadable.preloadAll();
    }
  }, [shouldPreload]);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <div ref={registerChild as any}>
      <AutoSizer disableHeight>
        {({ width }) => (
          <Table
            autoHeight
            className={activePlayerId ? "with-active-player" : ""}
            rowCount={data.getCount()}
            rowGetter={rowGetter}
            rowHeight={window.matchMedia("(min-width: 768px)").matches ? 70 : 140}
            headerHeight={50}
            width={width}
            height={height}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            scrollTop={scrollTop}
            rowClassName={getRowClassName}
            noRowsRenderer={noRowsRenderer}
          >
            <Column dataKey="modeId" label="等级" cellRenderer={cellFormatGameMode} width={40} />
            {activePlayerId ? (
              <Column
                dataKey="modeId"
                label="顺位"
                columnData={{ activePlayerId }}
                cellRenderer={cellFormatRank}
                width={40}
              />
            ) : null}
            <Column dataKey="players" label="玩家" cellRenderer={cellRenderPlayer} width={120} flexGrow={1} />
            {showStartEnd
              ? [
                  <Column
                    key="startTime"
                    dataKey="startTime"
                    label="开始"
                    cellRenderer={cellFormatTime}
                    width={50}
                    className="text-right"
                    headerClassName="text-right"
                  />,
                  <Column
                    key="endTime"
                    dataKey="endTime"
                    label="结束"
                    cellRenderer={cellFormatTime}
                    width={50}
                    headerClassName="text-right"
                    className="text-right"
                  />
                ]
              : null}
            {showFullTime ? (
              <Column
                dataKey="startTime"
                label="时间"
                cellRenderer={cellFormatFullTime}
                width={140}
                className="text-right"
                headerClassName="text-right"
              />
            ) : null}
          </Table>
        )}
      </AutoSizer>
    </div>
  );
}
