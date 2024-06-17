import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { SUBJECT_MESSAGE } from 'src/utils/constants';
import subjectSetter from 'src/helpers/subject-setter.helper';
import { FunctionalUnit } from '../functional-units/entities/functional-unit.entity';
import { IMessage } from 'src/utils/types';

@Injectable()
export class MessagesRepository {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  async createMessage(
    sender: User,
    receiver: CAdmin,
    functionalUnit: FunctionalUnit,
    consortium: Consortium,
    subject: SUBJECT_MESSAGE,
    content: string,
  ): Promise<IMessage> {
    const newMessage = new Message();
    const subjectMessage: SUBJECT_MESSAGE = subjectSetter(subject);
    newMessage.sender = sender;
    newMessage.receiver = receiver;
    newMessage.functional_unit = functionalUnit;
    newMessage.consortium = consortium;
    newMessage.subject = subjectMessage;
    newMessage.content = content;

    await this.messagesRepository.save(newMessage);
    const createdMessage = {
      id: newMessage.id,
      sender: newMessage.sender.first_name,
      receiver: newMessage.receiver.name,
      functional_unit: newMessage.functional_unit.number,
      consortium: newMessage.consortium.name,
      subject: newMessage.subject,
      content: newMessage.content,
      timestamp: newMessage.timestamp.toLocaleString(),
    };

    return createdMessage;
  }

  async getMessagesForUser(senderUser: User): Promise<IMessage[]> {
    const messagesForUser = await this.messagesRepository.find({
      where: { sender: senderUser, is_active_user: true },
      relations: ['sender', 'receiver', 'functional_unit', 'consortium'],
      order: { timestamp: 'DESC' },
    });
    const formattedMessages = messagesForUser.map(
      ({
        id,
        sender,
        receiver,
        functional_unit,
        consortium,
        subject,
        content,
        timestamp,
      }) => ({
        id,
        sender: sender.first_name,
        receiver: receiver.name,
        functional_unit: functional_unit.number,
        consortium: consortium.name,
        subject,
        content,
        timestamp: timestamp.toLocaleString(),
      }),
    );

    return formattedMessages;
  }

  async getMessagesForCAdminInConsortium(
    receiverCAdmin: CAdmin,
    consortium: Consortium,
  ): Promise<IMessage[]> {
    const messagesForCAdminInConsortium = await this.messagesRepository.find({
      where: {
        receiver: receiverCAdmin,
        consortium: consortium,
        is_active_c_admin: true,
      },
      relations: ['sender', 'receiver', 'functional_unit', 'consortium'],
      order: { timestamp: 'DESC' },
    });

    const formattedMessages = messagesForCAdminInConsortium.map(
      ({
        id,
        sender,
        receiver,
        functional_unit,
        consortium,
        subject,
        content,
        timestamp,
      }) => ({
        id,
        sender: sender.first_name,
        receiver: receiver.name,
        functional_unit: functional_unit.number,
        consortium: consortium.name,
        subject,
        content,
        timestamp: timestamp.toLocaleString(),
      }),
    );
    return formattedMessages;
  }

  async findOne(messageId: string): Promise<IMessage> {
    const foundMessage = await this.messagesRepository.findOne({
      where: { id: messageId },
      relations: ['sender', 'receiver', 'functional_unit', 'consortium'],
    });
    const formattedMessage = {
      id: foundMessage.id,
      sender: foundMessage.sender.first_name,
      receiver: foundMessage.receiver.name,
      functional_unit: foundMessage.functional_unit.number,
      consortium: foundMessage.consortium.name,
      subject: foundMessage.subject,
      content: foundMessage.content,
      timestamp: foundMessage.timestamp.toLocaleString(),
    };

    return formattedMessage;
  }

  async findOneById(menssageId: string): Promise<Message> {
    const foundMessage = await this.messagesRepository.findOne({
      where: { id: menssageId },
    });
    return foundMessage;
  }

  async findOneAndUpdate(messageId: string): Promise<void> {
    const foundMessage = await this.messagesRepository.findOne({
      where: { id: messageId },
      relations: ['sender', 'receiver', 'functional_unit', 'consortium'],
    });
    if (!foundMessage) {
      throw new BadRequestException('Mensaje no encontrado');
    }
    foundMessage.is_read = true;
    await this.messagesRepository.save(foundMessage);
  }

  async findOneAndInactive(
    message: Message,
    keyEntity: 'user' | 'cadmin',
  ): Promise<void> {
    if (keyEntity === 'user') {
      message.is_active_user = false;
      await this.messagesRepository.save(message);
    } else if (keyEntity === 'cadmin') {
      message.is_active_c_admin = false;
      await this.messagesRepository.save(message);
    }
  }
}
