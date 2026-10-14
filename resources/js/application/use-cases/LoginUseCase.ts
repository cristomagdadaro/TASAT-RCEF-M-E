import { IAuthRepository } from '../../domain/contracts/IAuthRepository';
import { User } from '../../domain/entities/User';

export class LoginUseCase {
    constructor(private authRepo: IAuthRepository) {}

    public async execute(identifier: string, password: string): Promise<User> {
        if (!identifier || !identifier.trim()) {
            throw new Error('Please enter your username or email address.');
        }

        if (!password || !password.trim()) {
            throw new Error('Please enter your password.');
        }

        return await this.authRepo.login(identifier.trim(), password);
    }
}
