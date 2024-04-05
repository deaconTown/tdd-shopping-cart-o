import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards, Res, Req, Response, Request, Delete, Next, HttpCode } from '@nestjs/common';
import AuthenticationService from '../Services/authentication.service';
import { authLoginDTO } from '../DTO/authLogin.dto';
import IUserService from '../Interfaces/IUserService.interface';
import IAuthenticationService from '../Interfaces/IAuthenticationService.interface';
import UserService from '../Services/user.service';
// import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard } from '../authentication/guards/authentication.guard';
import { LocalAuthGuard } from '../authentication/guards/local.auth.guard';

@Controller('authentication')
export class AuthenticationController {
  // private userService: IUserService;
  // private authService: IUserService;
  constructor(
    private authService: AuthenticationService
    // , private readonly userService: UserService
  ) {
    // this.userService = new UserService();
    // authService = new AuthenticationService();
  }

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @HttpCode(400)
  login(@Req() req, @Res() res, @Body() authLogin: authLoginDTO) {
    console.log('AuthenticationController || entered the login endpoint')

    // console.log('ressing', res.req.res.req['user'])
    // console.log('ressing', req)
    console.log('ressing', req.user)
    try {

      const user = req.user;

      res.json({ success: true, data: { user: user } });

    }
    catch (error) {

      console.log('AuthenticationController || exiting the login endpoint')
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);

    }
  }

  // protected endpoint example with session cookie
  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Req() req): string {
    return req.user;
  }

  @Post('/logout')
  @HttpCode(204)
  logout(@Req() req, @Res() res, @Next() next) {
    console.log('AuthenticationController || entered the logout endpoint')
    req.logout((err) => {
      if (err) {
        console.log('AuthenticationController || exiting the logout endpoint');

        return next(err);
      }
      console.log('AuthenticationController || exiting the logout endpoint');
      res.json({ success: true, message: "logout successful" });
    });
  }


}
