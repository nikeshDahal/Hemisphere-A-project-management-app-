import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// const sgMail = require('@sendgrid/mail');
import * as sgMail from '@sendgrid/mail';



@Injectable()
export class sendMail {
  constructor(private config: ConfigService) {}

  async sendForgetPasswordTokenMail(
    email: string,
    name: string,
    forgetPasswordTokens: any,
  ) {
    const sendgridAPIKey = this.config.get<string>('MAIL_API_KEY');
    sgMail.setApiKey(sendgridAPIKey);
    try {
      await sgMail.send({
        to: email,
        from: 'nikeshdahal297@gmail.com',
        subject: 'Thanks for your request to reset password',
        html: `<h3>............RESET YOUR PASSWORD..................</h3>
        <div>
        <b>Thank you ${name} for your request to reset your password in Hemisphere-App</b>
        </div>
        <div>
        <p>you can use below link to reset </p>
        <button style="background:yellow"}><a href='http://localhost:3000/pages/reset-password/reset-password3/${forgetPasswordTokens}'>click here to reset password</button>
        </div>
        <hr/>
        <p><b>  </b></p>
        </hr>
        `,
        // template_id:"d-7e6bdf9c6b61486abf9c20302fc611f6"
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}

// export const sendForgetPasswordTokenMail = async (
//   email: string,
//   name: string,
//   forgetPasswordTokens: any,
// ) => {};
