import {ProfileType, RecordStatus, TransactionType} from './';

export interface ProfileAttr {
  id?: number;
  name: string;
  username: string;
  password: string;
  email: string;
  mobileNumber?: string;
  type: ProfileType;
  status: RecordStatus;
  scopes?: string;
  remarks?: string;
}

export interface ProjectAttr {
  id?: number;
  name: string;
  code: string;
  location: string;
  estimatedCost: number;
  remarks?: string;
  status: RecordStatus;
}

export interface AccountAttr {
  id?: number;
  name: string;
  remarks?: string;
  status: RecordStatus;
}

export interface VoucherAttr {
  id?: number;
  series: string;
  projectId: number;
  description: string;
  totalCost: number;
  remarks?: string;
  closed?: boolean;
  processedBy: number;
  processedByProfile?: ProfileAttr;
}

export interface TransactionAttr {
  id?: number;
  accountId: number;
  projectId?: number;
  voucherId?: number;
  transactionType: TransactionType;
  details: string;
  checkNumber?: string;
  checkPostingDate?: Date;
  checkIssuingBank?: string;
  amount: number;
  processedBy: number;
  processedByProfile?: ProfileAttr;
}
