import faker from 'faker';

import {RecordStatus} from '../../@types';
import {UpdateProfile} from '../../@types/models';
import {
  generateAuthProfile,
  generateRegisterProfile,
} from '../../@utils/fake-data';
import NotificationService from '../../services/notification-service';
import ProfileService from '../../services/profile-service';
import {ProfileController} from '../profile-controller';

describe('ProfileController', () => {
  afterEach(() => jest.clearAllMocks());

  it('should get all profiles', async () => {
    const searchCriteria = faker.internet.userName();
    const authProfiles = [generateAuthProfile(), generateAuthProfile()];
    const mock = jest
      .spyOn(ProfileService.prototype, 'getAll')
      .mockReturnValueOnce(new Promise(resolve => resolve(authProfiles)));
    const target = new ProfileController();
    const actual = await target.getAll(searchCriteria);
    expect(actual).toStrictEqual(authProfiles);
    expect(mock).toBeCalledWith(searchCriteria);
    expect(mock).toBeCalledTimes(1);
  });

  it('should get my profile', async () => {
    const authProfile = generateAuthProfile();
    const request = {
      user: authProfile,
    };
    const target = new ProfileController();
    const actual = await target.me(request);
    expect(actual).toStrictEqual(authProfile);
  });

  it('should register my profile', async () => {
    const registerProfile = generateRegisterProfile();
    const authProfile = generateAuthProfile();

    const mock = jest
      .spyOn(ProfileService.prototype, 'register')
      .mockReturnValueOnce(new Promise(resolve => resolve(authProfile)));

    const target = new ProfileController();
    const actual = await target.register(registerProfile);

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(registerProfile);
    expect(actual.profile).toStrictEqual(authProfile);
  });

  it('should update my profile details', async () => {
    const authProfile = generateAuthProfile();
    const updateProfile: UpdateProfile = {
      email: authProfile.email,
      name: authProfile.name,
      status: authProfile.status,
      type: authProfile.type,
      scopes: authProfile.scopes,
    };
    const mock = jest
      .spyOn(ProfileService.prototype, 'update')
      .mockReturnValueOnce(new Promise(resolve => resolve(authProfile)));
    const target = new ProfileController();
    const actual = await target.updateProfile(authProfile.id, updateProfile);

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(authProfile.id, updateProfile);
    expect(actual).toBe(authProfile);
  });

  it('should update my profile status', async () => {
    const mock = jest
      .spyOn(ProfileService.prototype, 'updateStatus')
      .mockReturnValueOnce(new Promise(resolve => resolve()));
    const target = new ProfileController();
    const targetId = faker.datatype.number();
    const status = faker.random.arrayElement<RecordStatus>([
      'active',
      'inactive',
    ]);
    await target.updateProfileStatus(targetId, status);

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(targetId, status);
  });

  it('should change my profile password', async () => {
    const mock = jest
      .spyOn(ProfileService.prototype, 'changePassword')
      .mockReturnValueOnce(new Promise(resolve => resolve()));
    const target = new ProfileController();
    const targetId = faker.datatype.number();
    const currentPassword = faker.internet.password();
    const newPassword = faker.internet.password();
    await target.changePassword(targetId, {currentPassword, newPassword});

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(targetId, currentPassword, newPassword);
  });

  it('should reset password', async () => {
    const newPassword = faker.internet.password();
    const username = faker.internet.userName();
    const email = faker.internet.email();

    const mock = jest
      .spyOn(ProfileService.prototype, 'resetPassword')
      .mockReturnValueOnce(new Promise(resolve => resolve(newPassword)));

    const mockNotificationService = jest
      .spyOn(NotificationService.prototype, 'notifyResetPassword')
      .mockReturnValueOnce(new Promise(resolve => resolve()));

    const target = new ProfileController();
    await target.resetPassword({username, email});

    expect(mock).toBeCalled();
    expect(mock).toBeCalledWith(username, email);

    expect(mockNotificationService).toBeCalled();
    expect(mockNotificationService).toBeCalledWith(email, newPassword);
  });
});
