import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { CreateCAdminDto } from '../c-admin/dto/create-c-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { CADMIN_PASS, SAT } from 'src/utils/constants';
import { JwtService } from '@nestjs/jwt';
import { generateToken, signInHelper } from 'src/helpers/sign-in.helper';
import { TObjectToken } from 'src/utils/types';
import satSetter from 'src/helpers/sat-setter.helper';
import { checkForDuplicates } from 'src/helpers/check-for-duplicates.helper';
import { MailsService } from '../mails/mails.service';
import { EmailDto } from './dto/email.dto';
import { PassResetTokens } from './entities/reset-token.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(CAdmin)
    private readonly cAdminRepository: Repository<CAdmin>,
    @InjectRepository(PassResetTokens)
    private readonly passResetTokensRepository: Repository<PassResetTokens>,
    private readonly jwtService: JwtService,
    private readonly mailsService: MailsService,
  ) {}

  async signIn(credentials: CredentialsDto): Promise<TObjectToken> {
    const { email, password } = credentials;
    const foundCAdmin = await this.cAdminRepository.findOneBy({ email });
    const foundUser = await this.usersRepository.findOneBy({ email });
    if (!foundCAdmin && !foundUser) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    if (foundCAdmin) {
      const tokenAdmin: Promise<TObjectToken> = signInHelper(
        foundCAdmin,
        password,
        this.jwtService,
      );
      return tokenAdmin;
    } else if (foundUser) {
      const tokenUser: Promise<TObjectToken> = signInHelper(
        foundUser,
        password,
        this.jwtService,
      );
      return tokenUser;
    }
  }

  async signUp(user: CreateUserDto): Promise<TObjectToken> {
    const { first_name, last_name, email, password } = user;

    await checkForDuplicates(this.usersRepository, email, 'email', 'El Email');
    await checkForDuplicates(this.cAdminRepository, email, 'email', 'El email');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.email = email;
    newUser.password = hashedPassword;

    const createdUser = await this.usersRepository.save(newUser);
    await this.mailsService.sendNewAccount(
      createdUser.first_name,
      createdUser.email,
    );

    const tokenUser = generateToken(createdUser, this.jwtService);
    return tokenUser;
  }

  async singUpCAdmin(consAdmin: CreateCAdminDto): Promise<CAdmin> {
    const { name, address, email, phone_number, cuit, sat, rpa } = consAdmin;

    await checkForDuplicates(this.cAdminRepository, email, 'email', 'El email');
    await checkForDuplicates(this.cAdminRepository, cuit, 'cuit', 'El CUIT');
    await checkForDuplicates(
      this.cAdminRepository,
      rpa,
      'rpa',
      'El número de mátrícula RPA',
    );

    await checkForDuplicates(this.usersRepository, email, 'email', 'El Email');

    const hashedPassword = await bcrypt.hash(CADMIN_PASS, 10);
    const satCAdmin: SAT = satSetter(sat);

    const newCAdmin = new CAdmin();
    newCAdmin.name = name;
    newCAdmin.email = email;
    newCAdmin.password = hashedPassword;
    newCAdmin.address = address;
    newCAdmin.phone_number = phone_number;
    newCAdmin.cuit = cuit;
    newCAdmin.sat = satCAdmin;
    newCAdmin.rpa = rpa;

    const createdCAdmin = await this.cAdminRepository.save(newCAdmin);
    await this.mailsService.sendNewCAdmin(
      createdCAdmin.name,
      createdCAdmin.email,
    );
    return createdCAdmin;
  }

  async requestPasswordReset(emailEntity: EmailDto): Promise<void> {
    const { email } = emailEntity;
    const foundCAdmin = await this.cAdminRepository.findOneBy({ email });
    const foundUser = await this.usersRepository.findOneBy({ email });
    if (!foundCAdmin && !foundUser) {
      throw new BadRequestException(
        'Por favor revisa tu bandeja de entrada en tu correo electrónico',
      );
    }
    if (foundUser) {
      const tokenUser = generateToken(foundUser, this.jwtService);
      const { token } = tokenUser;
      const expires_at = new Date(Date.now() + 900000);
      const newPassResetToken = new PassResetTokens();
      newPassResetToken.token = token;
      newPassResetToken.expires_at = expires_at;
      newPassResetToken.user = foundUser;
      console.log(foundUser);

      await this.passResetTokensRepository.save(newPassResetToken);

      await this.mailsService.sendResetPassword(
        foundUser.first_name,
        foundUser.email,
        token,
      );
    } else if (foundCAdmin) {
      const tokenCAdmin = generateToken(foundCAdmin, this.jwtService);
      const { token } = tokenCAdmin;
      const expires_at = new Date(Date.now() + 900000);
      const newPassResetToken = new PassResetTokens();
      newPassResetToken.token = token;
      newPassResetToken.expires_at = expires_at;
      newPassResetToken.c_admin = foundCAdmin;

      await this.passResetTokensRepository.save(newPassResetToken);

      await this.mailsService.sendResetPassword(
        foundCAdmin.name,
        foundCAdmin.email,
        token,
      );
    }
  }

  async resetPassword(resetData: ResetPasswordDto): Promise<void> {
    const { token, new_password } = resetData;
    const foundToken = await this.passResetTokensRepository.findOne({
      where: { token },
      relations: { user: true, c_admin: true },
    });
    const nowDate = new Date().getTime();
    if (
      !foundToken ||
      foundToken.expires_at.getTime() < nowDate ||
      !foundToken.active
    ) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
    console.log(foundToken);

    if (foundToken.user) {
      const user = await this.usersRepository.findOne({
        where: { id: foundToken.user.id },
      });
      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }
      const newpassword = await bcrypt.hash(new_password, 10);
      console.log(newpassword);
      user.password = newpassword;
      console.log(user);
      console.log(user.password);

      await this.usersRepository.save(user);

      foundToken.active = false;
      await this.passResetTokensRepository.save(foundToken);
    } else if (foundToken.c_admin) {
      const cadmin = await this.cAdminRepository.findOne({
        where: { id: foundToken.c_admin.id },
      });
      if (!cadmin) {
        throw new BadRequestException('Usuario no encontrado');
      }
      cadmin.password = await bcrypt.hash(new_password, 10);
      await this.cAdminRepository.save(cadmin);

      foundToken.active = false;
      await this.passResetTokensRepository.save(foundToken);
    }
  }
}
