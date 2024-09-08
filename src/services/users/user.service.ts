import { IDBRepository } from '../../types/db.type.js';
import { ERROR_NOTFOUND, NOTFOUND } from '../../types/error.type.js';
import { ServiceError } from '../../types/service.type.js';
import { User } from './user.type.js';

const NEGATIVE_AMOUNT = 'Negative amount passed';
const ERROR_NEGATIVE_AMOUNT = 'ENEGAMOUNT';

// TODO: improve this message
const NOT_ENOUGH_FUNDS = 'not enough funds';
const ERROR_ENOUGH_FUNDS = 'ENOTENOUGHFUNDS';
export class UserService {
    constructor(private dbRepo: IDBRepository) { }
    async updateBalance(id: number, amount: number): Promise<void> {
        if (amount < 0) {
            throw new ServiceError(NEGATIVE_AMOUNT, ERROR_NEGATIVE_AMOUNT, 400);
        }
        const user = await this.getOne(id);
        if (user === null) {
            throw new ServiceError(NOTFOUND, ERROR_NOTFOUND, 404);
        }
        this.checkBalance(user, amount);
        user.balance -= amount;
        return this.save(user);
    }
    private async getOne(id: number): Promise<User | null> {
        return this.dbRepo.request.one<User>({ name: 'user.one', params: { id } });
    }
    private async save(user: User): Promise<void> {
        await this.dbRepo.request.post({
            name: 'user.update',
            params: {
                id: user.id,
                balance: user.balance,
            },
        });
    }
    private checkBalance(user: User, amount: number) {
        if (user.balance < amount) {
            throw new ServiceError(NOT_ENOUGH_FUNDS, ERROR_ENOUGH_FUNDS, 400);
        }
    }
}
