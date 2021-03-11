import { LogsProps } from '../models/models';

interface StatsProps {
  warning: number;
  info: number;
  error: number;
}

export const calculateStatistics = (
  data: LogsProps[],
): StatsProps => {
  return data.reduce((prev, next) => {
    prev[next.severity] = ++prev[next.severity] || 1;
    return prev;
  }, {} as StatsProps);
};
