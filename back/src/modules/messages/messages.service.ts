import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { SendMessageDto } from './dto/send-message.dto';
import { UsersRepository } from '../users/users.repository';
import { FunctionalUnitsRepository } from '../functional-units/functional-units.repository';
import { Message } from './entities/message.entity';
import { ConsortiumsRepository } from '../consortiums/consortiums.repository';
import { CAdminsRepository } from '../c-admin/c-admin.repository';
import { IMessage } from 'src/utils/types';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly functionalUnitsRepository: FunctionalUnitsRepository,
    private readonly consortiumsRepository: ConsortiumsRepository,
    private readonly cAdminsRepository: CAdminsRepository,
  ) {}

  async createMessage(sendMessage: SendMessageDto): Promise<IMessage> {
    const { user_id, functional_unit_id, subject, content } = sendMessage;
    const sender = await this.usersRepository.findOne(user_id);
    if (!sender) {
      throw new NotFoundException('Usuario remitente no encontrado');
    }
    const functionalUnit =
      await this.functionalUnitsRepository.findOne(functional_unit_id);

    if (!functionalUnit || functionalUnit.user.id !== user_id) {
      throw new NotFoundException('Unidad Funcional del usuario no encontrada');
    }

    const consortium = functionalUnit.consortium;
    const foundConsortium = await this.consortiumsRepository.findOne(
      consortium.id,
    );
    const receiver = foundConsortium.c_admin;

    return await this.messagesRepository.createMessage(
      sender,
      receiver,
      functionalUnit,
      consortium,
      subject,
      content,
    );
  }

  async getMessagesForUser(userId: string): Promise<IMessage[]> {
    const foundUser = await this.usersRepository.findOne(userId);

    if (!foundUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const messagesForUser: IMessage[] =
      await this.messagesRepository.getMessagesForUser(foundUser);
    return messagesForUser;
  }

  async getMessagesForCAdminInConsortium(
    cAdminId: string,
    consortiumId: string,
  ): Promise<IMessage[]> {
    const foundCAdmin = await this.cAdminsRepository.findOne(cAdminId);
    const foundConsortium =
      await this.consortiumsRepository.findOne(consortiumId);

    if (!foundCAdmin || !foundConsortium) {
      throw new NotFoundException('Administrador o Consorcio no encontrado');
    }
    if (foundConsortium.c_admin.id !== foundCAdmin.id) {
      throw new BadRequestException(
        `El Consorcio ${foundConsortium.name} no pertenece a la administración de ${foundCAdmin.name}`,
      );
    }
    const MessagesForCAdminInConsortium =
      await this.messagesRepository.getMessagesForCAdminInConsortium(
        foundCAdmin,
        foundConsortium,
      );
    return MessagesForCAdminInConsortium;
  }

  async findOne(mensajeId: string): Promise<IMessage> {
    const foundMessage = await this.messagesRepository.findOne(mensajeId);
    if (!foundMessage) {
      throw new NotFoundException('Mensaje no encontrado');
    }
    return foundMessage;
  }

  async markAsRead(mensajeId: string): Promise<void> {
    return await this.messagesRepository.findOneAndUpdate(mensajeId);
  }

  async toggleStatusUser(userId: string, messageId: string): Promise<void> {
    const foundUser = await this.usersRepository.findOne(userId);
    const foundMessage = await this.messagesRepository.findOneById(messageId);

    if (!foundUser || !foundMessage) {
      throw new NotFoundException('Mensaje o Usuario no encontrado');
    }
    if (foundMessage.sender.id !== foundUser.id) {
      throw new BadRequestException(
        `El mensaje no pertenece a ${foundUser.first_name}`,
      );
    }
    await this.messagesRepository.findOneAndInactive(foundMessage, 'user');
  }

  async toggleStatusCAdmin(cadminId: string, messageId: string): Promise<void> {
    const foundCAdmin = await this.cAdminsRepository.findOne(cadminId);
    const foundMessage = await this.messagesRepository.findOneById(messageId);

    if (!foundCAdmin || !foundMessage) {
      throw new NotFoundException('Mensaje o Administrador no encontrado');
    }
    if (foundMessage.receiver.id !== foundCAdmin.id) {
      throw new BadRequestException(
        `El mensaje no pertenece a ${foundCAdmin.name}`,
      );
    }
    await this.messagesRepository.findOneAndInactive(foundMessage, 'cadmin');
  }
}
