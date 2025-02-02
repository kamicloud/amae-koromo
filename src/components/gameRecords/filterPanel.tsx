import { useCallback } from "react";
import React from "react";

import { FormRow, DatePicker } from "../form";
import { useModel } from "./model";
import dayjs from "dayjs";
import { DATE_MIN } from "../../utils/constants";
import { ModeSelector } from "./modeSelector";

const DEFAULT_DATE = dayjs().startOf("day");

export function FilterPanel({ className = "" }) {
  const [model, updateModel] = useModel();
  const updateSearchTextFromEvent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => updateModel({ searchText: e.currentTarget.value }),
    [updateModel]
  );
  const setMode = useCallback((mode: string) => updateModel({ selectedMode: mode }), [updateModel]);
  const setDate = useCallback((date: dayjs.ConfigType) => updateModel({ date }), [updateModel]);
  if (model.type !== undefined) {
    return null;
  }
  return (
    <div className={className}>
      <FormRow title="日期">
        <DatePicker min={DATE_MIN} date={model.date || DEFAULT_DATE} onChange={setDate} className="form-control" />
      </FormRow>
      <FormRow title="查找玩家">
        <input type="text" className="form-control" value={model.searchText} onChange={updateSearchTextFromEvent} />
      </FormRow>
      <FormRow>
        <ModeSelector mode={model.selectedMode} onChange={setMode} />
      </FormRow>
    </div>
  );
}
