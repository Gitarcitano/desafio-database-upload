import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getRepository(Transaction);

    const transactionExists = await transactionRepository.findOne(id);

    if (!transactionExists)
      throw new AppError('This transactions does not exists', 401);

    transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
