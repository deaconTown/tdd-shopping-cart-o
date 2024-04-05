import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from "passport"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'keyboard-ninja-tdd',
      resave: false,
      saveUninitialized: false
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(3001);

  const app2 = await NestFactory.create(AppModule);

  app2.use(
    session({
      secret: 'keyboard-ninja-tdd',
      resave: false,
      saveUninitialized: false
    })
  )

  app2.use(passport.initialize())
  app2.use(passport.session())


  await app2.listen(3002);
}
bootstrap();
