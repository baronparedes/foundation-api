import {ProfileAttr} from '../@types/entities';
import {AuthProfile} from '../@types/models';
import Profile from '../models/profile-model';

export function mapProfile(profile: Profile): ProfileAttr {
  return {
    id: Number(profile.id),
    name: profile.name,
    username: profile.username,
    scopes: profile.scopes,
    type: profile.type,
    email: profile.email,
    mobileNumber: profile.mobileNumber,
    status: profile.status,
    remarks: profile.remarks,
    password: '', //intentionally excluding passwords here
  };
}

export function mapAuthProfile(profile: Profile): AuthProfile {
  return {
    id: Number(profile.id),
    name: profile.name,
    username: profile.username,
    scopes: profile.scopes,
    type: profile.type,
    email: profile.email,
    mobileNumber: profile.mobileNumber,
    status: profile.status,
    remarks: profile.remarks,
  };
}
