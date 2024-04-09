import { Logger } from "@nestjs/common";
import { EmailService } from "./email.service";
import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Job, Queue } from "bull";

@Processor('email')
export class EmailBackgroundService {
    constructor(private readonly emailService: EmailService,
        @InjectQueue('email') private readonly emailQueue: Queue) { }

    private readonly logger = new Logger(EmailBackgroundService.name);


    // async onModuleInit(): Promise<void> {
    //     await this.pollDatabaseForPendingEmails();
    //     await this.test();
    // }

    async test() {
        this.logger.log('testing concurrency');
    }

    async pollDatabaseForPendingEmails() {
        this.logger.log('entered pollDatabaseForPendingEmails method'); 
        try {
            this.logger.log('fetchin emails from the database');

            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch("http://localhost:4000/emails", {
                method: "GET",
                redirect: "follow"
            })
                .then((response) => response.text())
                .then((result) => {
                    console.log('result', result);

                    // const pendingEmails = JSON.stringify(result);
                    // this.logger.debug('pendingEmails', pendingEmails)
                    const parsedPendingEmails = JSON.parse(result);
                    this.logger.debug('parsedPendingEmails', parsedPendingEmails)

                    console.log('attempting to send emails')
                    // for (const i = 0 ; i < 1000000000000000; i+1)
                    // {
                    //     for (const email of parsedPendingEmails) {
                    //             this.logger.debug('queuing email to send', email)
                    //             // this.sendWelcomeEmail(email);
                    //             const queueThisEmail = async () => {
                    //                 await this.queueEmailAsync(email);
                    //             }
        
                    //             queueThisEmail();
                    //         }
                    // }

                    // console.log('attempting to send emails')
                    for (const email of parsedPendingEmails) {
                        this.logger.debug('queuing email to send', email)
                        // this.sendWelcomeEmail(email);
                        const queueThisEmail = async () => {
                            await this.queueEmailAsync(email);
                        }

                        queueThisEmail();
                    }

                })
                .catch((error) => console.error('error', error));

            // this.logger.log('data', JSON.stringify(response));


            // if (response.status === 200 || response.status === 201) {
            //     //    return JSON.parse(data.json())
            //     this.logger.log('emails', response.json());
            // }
        } catch (error) {
            this.logger.error('failed to retrieve emails. ', error.stack);
        }
        this.logger.log('exiting pollDatabaseForPendingEmails method');
    }

    async queueEmailAsync(email: string): Promise<void> {
        try {
            await this.emailQueue.add('sendEmail', email);
        } catch (error) {
            this.logger.error(`Failed to queue email with id ${JSON.parse(JSON.stringify(email))['id']}`, error.stack);
            throw error;
        }
    }


    @Process('sendWelcomeEmail')
    async sendWelcomeEmailAsync(job: Job<{ test: string }>): Promise<void> {
        this.logger.log('entered sendWelcomeEmail method in background service ');
        this.logger.log('job ddsfs', job);
        const email = job['emailString'];


        try {
            await this.emailService.sendWelcomeEmail(email);
        } catch (error) {
            this.logger.error(`failed to retrieve emails with id ${email.id}. `, error.stack);
            throw error;
        }
    }


}