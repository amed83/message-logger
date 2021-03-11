export interface LogsProps {
  date: string;
  severity: 'info' | 'warning' | 'error';
  message: string;
  id: number;
}
