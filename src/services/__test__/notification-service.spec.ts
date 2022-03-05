import faker from 'faker';

import {resetPasswordTemplate} from '../../@utils/email-templates';
import {initInMemoryDb} from '../../@utils/seeded-test-data';
import useSendMail from '../../hooks/use-send-mail';
import NotificationService from '../notification-service';

jest.mock('../../hooks/use-send-mail');

describe('NotificationService', () => {
  const target = new NotificationService();

  const useSendMailMock = useSendMail as jest.MockedFunction<
    typeof useSendMail
  >;

  beforeAll(async () => {
    await initInMemoryDb();
  });

  it('should notify reset password', async () => {
    const mockSend = jest.fn().mockImplementation(() => Promise.resolve());
    useSendMailMock.mockReturnValue({
      send: mockSend,
    });

    const email = faker.internet.email();
    const password = faker.internet.password();

    const expectedSubject = '[foundation] Password Reset';
    const expectedContent = resetPasswordTemplate(password);

    await target.notifyResetPassword(email, password);
    expect(mockSend).toHaveBeenCalled();
    expect(mockSend).toHaveBeenCalledWith(
      email,
      expectedSubject,
      expectedContent
    );
  });
});
