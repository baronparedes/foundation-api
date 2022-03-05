// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApprovedAny = any;
export type ProfileType = 'stakeholder' | 'admin' | 'unit owner';
export type PaymentType = 'cash' | 'check';
export type RecordStatus = 'active' | 'inactive';
export type RequestStatus = 'approved' | 'rejected' | 'pending' | 'cancelled';
export type Month =
  | 'JAN'
  | 'FEB'
  | 'MAR'
  | 'APR'
  | 'MAY'
  | 'JUN'
  | 'JUL'
  | 'AUG'
  | 'SEP'
  | 'OCT'
  | 'NOV'
  | 'DEC';

export type Period = {
  year: number;
  month: Month;
};
