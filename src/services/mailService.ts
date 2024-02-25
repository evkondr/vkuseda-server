import nodemailer from 'nodemailer';

class MailService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transporter: nodemailer.Transporter;

  private sender:string[];

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_POR as number | undefined,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    this.sender = ['order@vkuseda-nn.ru', 'info@vkuseda-nn.ru'];
  }

  async sendOrder(number:number, date:string, messageBody:string) {
    const result = await this.transporter.sendMail({
      from: this.sender[0],
      to: process.env.SMTP_TO,
      subject: `Оформлен заказ №${number} от ${date} на сайте vkuseda-nn.ru`,
      html: messageBody,
    });
    return result;
  }

  async sendEmailRequest(message:string) {
    const result = await this.transporter.sendMail({
      from: this.sender[1],
      to: process.env.SMTP_TO,
      subject: 'Отправлено письмо с сайта vkuseda-nn.ru',
      html: message,
    });
    return result;
  }
}
export default new MailService();
