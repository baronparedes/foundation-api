import {ProfileAttr, ProjectAttr} from '../@types/entities';
import {AuthProfile} from '../@types/models';
import Profile from '../models/profile-model';
import Project from '../models/project-model';

export function mapProfile(data: Profile): ProfileAttr {
  return {
    id: Number(data.id),
    name: data.name,
    username: data.username,
    scopes: data.scopes,
    type: data.type,
    email: data.email,
    mobileNumber: data.mobileNumber,
    status: data.status,
    remarks: data.remarks,
    password: '', //intentionally excluding passwords here
  };
}

export function mapAuthProfile(data: Profile): AuthProfile {
  return {
    id: Number(data.id),
    name: data.name,
    username: data.username,
    scopes: data.scopes,
    type: data.type,
    email: data.email,
    mobileNumber: data.mobileNumber,
    status: data.status,
    remarks: data.remarks,
  };
}

export function mapProject(data: Project): ProjectAttr {
  return {
    id: Number(data.id),
    name: data.name,
    code: data.code,
    location: data.location,
    estimatedCost: data.estimatedCost,
    status: data.status,
    remarks: data.remarks,
  };
}
