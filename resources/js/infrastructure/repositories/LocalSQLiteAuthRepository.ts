import { IAuthRepository } from '../../domain/contracts/IAuthRepository';
import { User } from '../../domain/entities/User';
import { SQLiteStorageService } from '../storage/SQLiteStorageService';

export class LocalSQLiteAuthRepository implements IAuthRepository {
    private storage: SQLiteStorageService;

    constructor() {
        this.storage = SQLiteStorageService.getInstance();
    }

    public async login(identifier: string, password: string): Promise<User> {
        await this.storage.initialize();

        const cleanIdentifier = identifier.trim().toLowerCase();
        const sql = `
            SELECT id, name, username, email, role, password
            FROM users
            WHERE LOWER(username) = ? OR LOWER(email) = ?
            LIMIT 1
        `;

        const rows = await this.storage.executeQuery<any>(sql, [cleanIdentifier, cleanIdentifier]);

        if (rows.length === 0) {
            throw new Error('Invalid credentials: user not found.');
        }

        const userRow = rows[0];

        // Validate password (plain text check for local offline evaluation, or hashed)
        if (userRow.password !== password) {
            throw new Error('Invalid credentials: password does not match.');
        }

        const user = new User({
            id: userRow.id,
            name: userRow.name,
            username: userRow.username,
            email: userRow.email,
            role: userRow.role,
        });

        // Persist session to survive restarts
        await this.storage.setActiveSession({
            user: user.toJSON(),
            loggedInAt: new Date().toISOString(),
        });

        return user;
    }

    public async getCurrentUser(): Promise<User | null> {
        await this.storage.initialize();
        const session = await this.storage.getActiveSession();
        if (session && session.user) {
            return User.fromJSON(session.user);
        }
        return null;
    }

    public async logout(): Promise<void> {
        await this.storage.initialize();
        await this.storage.setActiveSession(null);
    }
}
