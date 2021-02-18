import config from '../config';
import * as mailgunLoader from 'mailgun-js';

const mailgun = mailgunLoader({apiKey: config.keys.mailgun, domain: config.keys.mailgunDomain}); //service connected object that has fetch reqs written as functions. connect to service using our keys

const sendEmail = (to: string, from: string, subject: string, content: string) => { //give utility function to streamline process in our route
    const data = {
        to,
        from,
        subject,
        text: content //can change text out for html if content contains html 
    }
    return new Promise ((resolve, reject) => {
        mailgun.messages().send(data, (err, body) => {
            if (err) {
                reject(err)
            } else {
                resolve(body)
            }
        });
    }) //connect to messages feature then send data
}

export default sendEmail; //give us ability to use function in our route if required
