import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { compareSync } from 'bcrypt';
import { PractitionersService } from 'src/practitioners/practitioners.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private practionersService: PractitionersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOne(signInDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!compareSync(signInDto.password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      access_token: access_token,
    };
  }

  async signInPractioner(signInDto: SignInDto) {
    const user = await this.practionersService.findByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!compareSync(signInDto.password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      access_token: access_token,
    };
  }
}
