import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthCustomGuard } from 'src/guards/auth.guard';
import { ROLE } from 'src/utils/constants';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { IMessage } from 'src/utils/types';

@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(AuthCustomGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @Roles(ROLE.USER)
  @UseGuards(RolesGuard)
  async createMessage(@Body() sendMessage: SendMessageDto): Promise<IMessage> {
    return await this.messagesService.createMessage(sendMessage);
  }

  @Get('user/:userId')
  @Roles(ROLE.USER)
  @UseGuards(RolesGuard)
  async getMessagesForUserInConsortium(
    @Param('userId') userId: string,
  ): Promise<IMessage[]> {
    return await this.messagesService.getMessagesForUser(userId);
  }

  @Get('cadmin/:cadminId/consortium/:consortiumId')
  @Roles(ROLE.CADMIN)
  @UseGuards(RolesGuard)
  async getMessagesForCAdminInConsortium(
    @Param('cadminId') cadminId: string,
    @Param('consortiumId') consortiumId: string,
  ): Promise<IMessage[]> {
    return await this.messagesService.getMessagesForCAdminInConsortium(
      cadminId,
      consortiumId,
    );
  }

  @Get(':messageId')
  @Roles(ROLE.CADMIN, ROLE.USER)
  @UseGuards(RolesGuard)
  async findOne(@Param('messageId') messageId: string): Promise<IMessage> {
    return await this.messagesService.findOne(messageId);
  }

  @Patch(':messageId/read')
  @Roles(ROLE.CADMIN)
  @UseGuards(RolesGuard)
  async markAsRead(@Param('messageId') messageId: string): Promise<void> {
    return await this.messagesService.markAsRead(messageId);
  }

  @Patch('user/:userId/toggle-status/:messageId')
  @Roles(ROLE.USER)
  @UseGuards(RolesGuard)
  async toggleStatusUser(
    @Param('userId') userId: string,
    @Param('messageId') messageId: string,
  ): Promise<void> {
    return await this.messagesService.toggleStatusUser(userId, messageId);
  }

  @Patch('cadmin/:cadminId/toggle-status/:messageId')
  @Roles(ROLE.CADMIN)
  @UseGuards(RolesGuard)
  async toggleStatusCAdmin(
    @Param('cadminId') cadminId: string,
    @Param('messageId') messageId: string,
  ): Promise<void> {
    return await this.messagesService.toggleStatusCAdmin(cadminId, messageId);
  }
}
