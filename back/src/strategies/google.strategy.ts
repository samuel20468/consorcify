import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { User } from 'src/modules/users/entities/user.entity';
import { API_URL } from 'src/utils/constants';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${API_URL}/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accesstoken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    if (!emails || !emails.length) {
      return done(new UnauthorizedException('Email no encontrado'), null);
    }
    const user = {
      email: emails[0].value,
      first_name: name.givenName,
      last_name: name.familyName,
      picture: photos[0].value,
    };
    const foundUser = await this.usersRepository.findOne({
      where: { email: user.email },
    });
    if (!foundUser) {
      const newUser = new User();
      newUser.first_name = user.first_name;
      newUser.last_name = user.last_name;
      newUser.email = user.email;
      newUser.picture = user.picture;
      newUser.password = 'Auth0';
      newUser.auth0 = true;
      const createdUser = await this.usersRepository.save(newUser);

      const tokenPayload = {
        id: createdUser.id,
        email: createdUser.email,
        roles: ['user'],
      };

      const newAccessToken = this.jwtService.sign(tokenPayload);

      done(null, { ...createdUser, accesstoken: newAccessToken });
    } else {
      const tokenPayload = {
        id: foundUser.id,
        email: foundUser.email,
        roles: ['user'],
      };
      const newAccessToken = this.jwtService.sign(tokenPayload);

      done(null, { ...foundUser, accesstoken: newAccessToken });
    }
  }
}
