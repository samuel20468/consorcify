import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { generateToken } from 'src/helpers/sign-in.helper';
import { MailsService } from 'src/modules/mails/mails.service';
import { User } from 'src/modules/users/entities/user.entity';
import {
  API_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from 'src/utils/constants';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailsService: MailsService,
  ) {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
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

      const tokenUser = generateToken(createdUser, this.jwtService);
      const { token } = tokenUser;
      await this.mailsService.sendNewAccount(
        createdUser.first_name,
        createdUser.email,
      );

      done(null, { ...createdUser, accesstoken: token });
    } else {
      const tokenUser = generateToken(foundUser, this.jwtService);
      const { token } = tokenUser;

      done(null, { ...foundUser, accesstoken: token });
    }
  }
}
