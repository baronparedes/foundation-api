import {resetPasswordTemplate} from '../@utils/email-templates';
import useSendMail from '../hooks/use-send-mail';

export default class NotificationService {
  constructor() {}

  public async notifyResetPassword(email: string, password: string) {
    const {send} = useSendMail();
    const subject = '[foundation] Password Reset';
    const content = resetPasswordTemplate(password);
    await send(email, subject, content);
  }
}
