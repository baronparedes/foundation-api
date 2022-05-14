import {ProfileType, RecordStatus, TransactionType} from './';

export type AuthProfile = {
  id: number;
  name: string;
  username: string;
  email: string;
  mobileNumber?: string;
  type: ProfileType;
  status: RecordStatus;
  scopes?: string;
  remarks?: string;
};

export type RegisterProfile = {
  name: string;
  username: string;
  password: string;
  email: string;
  mobileNumber?: string;
};

export type UpdateProfile = {
  name: string;
  email: string;
  mobileNumber?: string;
  type: ProfileType;
  status: RecordStatus;
  scopes?: string;
  remarks?: string | null;
};

export type AuthResult = {
  profile: AuthProfile;
  token: string;
};

export type DisburseProjectFund = {
  accountId: number;
  processedBy: number;
  description: string;
  series: string;
  transactionType: TransactionType;
  checkNumber?: string;
  checkPostingDate?: Date;
  checkIssuingBank?: string;
  amount: number;
  remarks?: string;
};
