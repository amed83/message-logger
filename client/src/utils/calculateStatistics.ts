import { LogsProps } from "../models/models";

interface StatsProps {
  warning: number;
  info: number;
  error: number;
}

export const caluclateStatistics = (data: LogsProps[]): StatsProps => {
  console.log(" CALLING FUNCTION");
  return data.reduce((prev, next) => {
    prev[next.severity] = ++prev[next.severity] || 1;
    return prev;
  }, {} as StatsProps);
};
