import {ProfileType, RecordStatus} from './';

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
}
