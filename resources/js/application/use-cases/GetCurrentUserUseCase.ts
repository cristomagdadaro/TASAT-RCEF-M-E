import { IAuthRepository } from '../../domain/contracts/IAuthRepository';
import { User } from '../../domain/entities/User';

export class GetCurrentUserUseCase {
    constructor(private authRepo: IAuthRepository) {}

    public async execute(): Promise<User | null> {
        return await this.authRepo.getCurrentUser();
    }
}
