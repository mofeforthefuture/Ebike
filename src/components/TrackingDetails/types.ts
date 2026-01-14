export interface TrackingHistoryItem {
  id: string;
  status: string;
  location: string;
  time: string;
  type: 'truck' | 'mailbox' | 'package';
  iconColor: string;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface SummaryItem {
  label: string;
  value: string;
  subtext?: string;
}
