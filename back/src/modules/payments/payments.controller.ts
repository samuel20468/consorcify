import {
    Controller,
    Get,
    Param,
    Res,
    UseGuards,
    Query,
    ParseUUIDPipe,
    Patch,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthCustomGuard } from 'src/guards/auth.guard';
import { Payment } from './entities/payment.entity';
import { CLIENT_URL, STATUS_MESSAGE } from 'src/utils/constants';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @ApiBearerAuth()
    @UseGuards(AuthCustomGuard)
    @Get(':functionalUnitExpenseId/:paymentAmount/check-out')
    async checkOut(
        @Param('paymentAmount') paymentAmount: number,
        @Param('functionalUnitExpenseId') functionalUnitExpenseId: string,
        @Res() res: Response,
    ) {
        const sessionUrl = await this.paymentsService.checkOut(
            functionalUnitExpenseId,
            paymentAmount,
        );

        res.json({ url: sessionUrl });
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
                res.redirect(
                    `${CLIENT_URL}/payment/success?payment=${payment.id}`,
                );
            } else {
                res.redirect(
                    `${CLIENT_URL}/payment/failed?customer=${session.customer_email}`,
                );
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
                `${CLIENT_URL}/payment/failed?customer=${session.customer_email}`,
            );
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthCustomGuard)
    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5,
    ): Promise<Payment[]> {
        page = page ?? 1;
        limit = limit ?? 5;

        return await this.paymentsService.findAll({ page, limit });
    }

    @ApiBearerAuth()
    @UseGuards(AuthCustomGuard)
    @Get(':id/user')
    async findAllByUser(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5,
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<Payment[]> {
        page = page ?? 1;
        limit = limit ?? 5;

        return await this.paymentsService.findAllByUser({ page, limit }, id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthCustomGuard)
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.paymentsService.findOne(id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthCustomGuard)
    @Patch('toggle-status/:id')
    async toggleStatus(@Param('id', ParseUUIDPipe) id: string) {
        let statusMessage: string;

        const paymentToggled: Payment =
            await this.paymentsService.toggleStatus(id);

        !paymentToggled.active //Se niega porque el service devuelve el objeto antes de ser modificado - Ln 55 en el service
            ? (statusMessage = STATUS_MESSAGE.ACTIVATED)
            : (statusMessage = STATUS_MESSAGE.DISABLED);

        return {
            message: `Payment with id ${paymentToggled.id} has been ${statusMessage}`,
        };
    }
}
