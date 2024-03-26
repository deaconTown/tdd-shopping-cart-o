import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: Function) {
        console.log('SessionSerializer || entered serializeUser method');

        done(null, user);

        console.log('SessionSerializer || exiting serializeUser method');
    }

    deserializeUser(payload: any, done: Function) {
        console.log('SessionSerializer || entered deserializeUser method');

        done(null, payload);

        console.log('SessionSerializer || exiting deserializeUser method');
    }

}