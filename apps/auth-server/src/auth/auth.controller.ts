import {
  Controller,
  Get,
  Post,
  Body,
  UnauthorizedException,
  Request,
  UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { USER_MESSAGES } from '@common/messages/user-messages';
import { AUTH_MESSAGES } from '@common/messages/auth-messages';
import { Role } from '@common/enums/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const existing = await this.usersService.findByEmail(registerDto.email);
    if (existing) {
      throw new UnauthorizedException(USER_MESSAGES.USEREMAIL_EXISTS);
    }
    const user = await this.usersService.create({
      email: registerDto.email,
      password: registerDto.password,
      role: registerDto.role ?? Role.USER,
    });
    return { id: user._id, email: user.email };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException(AUTH_MESSAGES.FORBIDDEN);
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // validate()에서 리턴한 객체
  }

  @Get()
  getHello(): string {
    return 'auth controller running';
  }
}
