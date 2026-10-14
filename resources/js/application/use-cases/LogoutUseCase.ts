import { IAuthRepository } from '../../domain/contracts/IAuthRepository';

export class LogoutUseCase {
    constructor(private authRepo: IAuthRepository) {}

    public async execute(): Promise<void> {
        await this.authRepo.logout();
    }
}
