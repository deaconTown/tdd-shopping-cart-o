import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';
import { EmailBackgroundService } from './email.background';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'email'
    })
  ],
  providers: [EmailService, EmailBackgroundService],
  exports: [EmailService, EmailBackgroundService]
})
export class EmailModule { }
