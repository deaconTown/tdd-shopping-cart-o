import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { NotificationModule } from './notification/notification.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [EmailModule, NotificationModule, AuthenticationModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
