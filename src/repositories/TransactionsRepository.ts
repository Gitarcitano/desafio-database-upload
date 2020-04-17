import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const income = 0;
    const outcome = 0;

    const findIncome = await this.find({
      where: { type: 'income' },
    });

    const findOutcome = await this.find({
      where: { type: 'outcome' },
    });

    const sumIncome = findIncome.reduce(
      (total, transaction) => total + transaction.value,
      0,
    );

    const sumOutcome = findOutcome.reduce(
      (total, transaction) => total + transaction.value,
      0,
    );

    const balance = {
      income,
      outcome,
      total: sumIncome - sumOutcome,
    };

    return balance;
  }
}

export default TransactionsRepository;
