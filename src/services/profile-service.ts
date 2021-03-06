import {FindOptions, Op} from 'sequelize';

import {RecordStatus} from '../@types';
import {ProfileAttr} from '../@types/entities';
import {AuthProfile, RegisterProfile, UpdateProfile} from '../@types/models';
import {generatePassword} from '../@utils/helpers';
import {iLike} from '../@utils/helpers-sequelize';
import {VERBIAGE} from '../constants';
import {ApiError} from '../errors';
import {useHash} from '../hooks/use-hash';
import Profile from '../models/profile-model';

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

export default class ProfileService {
  private validateProfile(password: string, profile: ProfileAttr | null) {
    if (!profile) {
      throw new Error(VERBIAGE.NOT_FOUND);
    }
    const {compare} = useHash();
    const match = compare(password, profile.password);
    if (!match) {
      throw new Error(VERBIAGE.NOT_FOUND);
    }
  }

  public async register(profile: RegisterProfile): Promise<AuthProfile> {
    const {hash} = useHash();
    const newProfile = new Profile({
      name: profile.name,
      username: profile.username,
      password: hash(profile.password),
      email: profile.email,
      mobileNumber: profile.mobileNumber,
    });
    const result = await newProfile.save();
    return mapAuthProfile(result);
  }

  public async getProfileByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<AuthProfile> {
    const result = await Profile.findOne({
      where: {username, status: 'active'},
    });
    this.validateProfile(password, result);
    return mapAuthProfile(result as Profile);
  }

  public async getAll(search?: string): Promise<AuthProfile[]> {
    const criteria = (column: string) => {
      return iLike(column, search);
    };
    const opts: FindOptions<Profile> = {
      where: {
        [Op.or]: [criteria('name'), criteria('email'), criteria('username')],
      },
    };
    const result = await Profile.findAll(search ? opts : {});
    return result.map(p => {
      return mapAuthProfile(p);
    });
  }

  public async update(
    id: number,
    profile: UpdateProfile
  ): Promise<AuthProfile> {
    const result = await Profile.findByPk(id);
    if (!result) {
      throw new Error(VERBIAGE.NOT_FOUND);
    }
    result.name = profile.name;
    result.email = profile.email;
    result.type = profile.type;
    result.status = profile.status;
    result.scopes = profile.scopes;
    result.mobileNumber = profile.mobileNumber;
    result.remarks = profile.remarks ?? undefined;
    await result.save();
    return mapAuthProfile(result);
  }

  public async updateStatus(id: number, status: RecordStatus) {
    const result = await Profile.findByPk(id);
    if (result) {
      result.status = status;
      await result?.save();
    }
  }

  public async changePassword(
    id: number,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const result = await Profile.findByPk(id);
    this.validateProfile(currentPassword, result);
    if (result) {
      const {hash} = useHash();
      result.password = hash(newPassword);
      await result.save();
    }
  }

  public async resetPassword(username: string, email: string) {
    const profile = await Profile.findOne({
      where: {
        username,
      },
    });

    if (!profile) throw new ApiError(404, VERBIAGE.NOT_FOUND);
    if (profile && profile.email.toLowerCase() !== email.toLowerCase())
      throw new ApiError(404, VERBIAGE.NOT_FOUND);

    const newPassword = generatePassword();
    const {hash} = useHash();
    profile.password = hash(newPassword);
    await profile.save();
    return newPassword;
  }
}
