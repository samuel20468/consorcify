import {
  Controller,
  Get,
  Param,
  Delete,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthCustomGuard } from 'src/guards/auth.guard';
import { Payment } from './entities/payment.entity';

const CLIENT_URL: string = process.env.CLIENT_BASE_URL;
@ApiTags('Payments')
@Controller('payments')
@ApiBearerAuth()
// @UseGuards(AuthCustomGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(':id/check-out')
  async checkOut(@Param('id') id: string, @Res() res: Response) {
    const sessionUrl = await this.paymentsService.checkOut(id);

    res.redirect(sessionUrl);
  }

  @Get('success')
  async handleSuccess(
    @Query('session_id') sessionId: string,
    @Res() res: Response,
  ) {
    if (sessionId) {
      const session = await this.paymentsService.verifyPayment(sessionId);

      if (session.payment_status === 'paid') {
        const payment: Payment =
          await this.paymentsService.savePayment(session);
        res.redirect(`${CLIENT_URL}?payment=${payment.id}`);
        // res.redirect(
        //   `${CLIENT_URL}/payment-success?payment=${payment.id}`,
        // );
      } else {
        res.redirect(
          `${CLIENT_URL}/payment-failed?customer=${session.customer_email}`,
        ); // Redirigir a una página de fallo en tu aplicación
      }
    }
  }

  @Get('cancel')
  async handleCancel(
    @Query('session_id') sessionId: string,
    @Res() res: Response,
  ) {
    if (sessionId) {
      const session = await this.paymentsService.verifyPayment(sessionId);
      res.redirect(
        `${CLIENT_URL}/payment-failed?customer=${session.customer_email}`,
      );
    }
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
