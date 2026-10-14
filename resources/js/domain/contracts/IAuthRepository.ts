import { User } from '../entities/User';

export interface IAuthRepository {
    login(identifier: string, password: string): Promise<User>;
    getCurrentUser(): Promise<User | null>;
    logout(): Promise<void>;
}
