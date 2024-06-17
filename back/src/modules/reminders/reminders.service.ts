import { Injectable } from '@nestjs/common';
import { MailsService } from '../mails/mails.service';
import { ExpensesRepository } from '../expenses/expenses.repository';
import { UsersRepository } from '../users/users.repository';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class RemindersService {
  constructor(
    private readonly mailsService: MailsService,
    private readonly expensesRepository: ExpensesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  private calculateDaysLeft(expirationDate: Date): number {
    const currentDate = new Date();
    const timeDiff = expirationDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  @Cron('1 0 * * *')
  async sendPaymentReminders() {
    const users = await this.usersRepository.getAllUsers();
    const upcomingExpenses =
      await this.expensesRepository.getUpcomingExpenses();

    for (const user of users) {
      const userExpenses = upcomingExpenses.filter((expense) =>
        expense.functional_units_expenses.some(
          (fue) => fue.functional_unit.user.id === user.id,
        ),
      );
      for (const expense of userExpenses) {
        const daysLeft = this.calculateDaysLeft(expense.expiration_date);
        if (daysLeft === 1) {
          for (const fue of expense.functional_units_expenses) {
            if (
              fue.functional_unit.user &&
              fue.functional_unit.user.id === user.id
            ) {
              await this.mailsService.sendPaymentReminder(
                user.first_name,
                user.email,
                fue.total_amount,
                expense.expiration_date,
              );
            } else {
              await this.mailsService.sendPaymentReminder(
                fue.functional_unit.owner,
                fue.functional_unit.owner_email,
                fue.total_amount,
                expense.expiration_date,
              );
            }
          }
        }
      }
    }
  }
}
