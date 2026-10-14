import initSqlJs, { Database } from 'sql.js';
import { Preferences } from '@capacitor/preferences';

const STORAGE_KEY = 'tasat_rcef_sqlite_db';
const AUTH_SESSION_KEY = 'tasat_rcef_active_session';

export class SQLiteStorageService {
    private static instance: SQLiteStorageService | null = null;
    private db: Database | null = null;
    private isInitialized = false;
    private initPromise: Promise<void> | null = null;

    private constructor() {}

    public static getInstance(): SQLiteStorageService {
        if (!SQLiteStorageService.instance) {
            SQLiteStorageService.instance = new SQLiteStorageService();
        }
        return SQLiteStorageService.instance;
    }

    public async initialize(): Promise<void> {
        if (this.isInitialized && this.db) {
            return;
        }

        if (this.initPromise) {
            return this.initPromise;
        }

        this.initPromise = (async () => {
            try {
                const SQL = await initSqlJs({
                    locateFile: (file) => `/${file}`,
                });

                // Check if existing SQLite binary database is persisted
                const stored = await Preferences.get({ key: STORAGE_KEY });
                if (stored && stored.value) {
                    try {
                        const binaryStr = atob(stored.value);
                        const bytes = new Uint8Array(binaryStr.length);
                        for (let i = 0; i < binaryStr.length; i++) {
                            bytes[i] = binaryStr.charCodeAt(i);
                        }
                        this.db = new SQL.Database(bytes);
                    } catch (e) {
                        console.warn('Could not parse persisted SQLite database, creating new', e);
                        this.db = new SQL.Database();
                    }
                } else {
                    this.db = new SQL.Database();
                }

                this.migrateSchema();
                this.seedInitialData();
                await this.persist();
                this.isInitialized = true;
            } catch (error) {
                console.error('Failed to initialize SQLite database:', error);
                throw error;
            } finally {
                this.initPromise = null;
            }
        })();

        return this.initPromise;
    }

    private migrateSchema(): void {
        if (!this.db) return;

        this.db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'enumerator'
            );
        `);

        this.db.run(`
            CREATE TABLE IF NOT EXISTS farmer_surveys (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                reference_id TEXT UNIQUE NOT NULL,
                enumerator_id INTEGER,
                enumerator_name TEXT,
                interview_date TEXT NOT NULL,
                b1q1_farmer_name TEXT NOT NULL,
                b1q2_sex TEXT NOT NULL,
                b1q3_age INTEGER NOT NULL,
                b1q4_province TEXT NOT NULL,
                b1q5_municipality_city TEXT NOT NULL,
                b1q6_engaged_in_rice_farming TEXT NOT NULL,
                b2q1_total_farm_area REAL,
                b2q2_primary_ecosystem TEXT,
                b2q3_establishment_method TEXT,
                b2q4_uses_certified_seeds TEXT,
                b2q5_seed_variety TEXT,
                b2q6_production_challenges TEXT,
                b2q7_other_challenge_details TEXT,
                sync_status TEXT NOT NULL DEFAULT 'local_only',
                created_at TEXT NOT NULL
            );
        `);
    }

    private seedInitialData(): void {
        if (!this.db) return;

        // Check if users already exist
        const result = this.db.exec("SELECT COUNT(*) AS count FROM users");
        const count = result.length > 0 && result[0].values.length > 0 ? Number(result[0].values[0][0]) : 0;

        if (count === 0) {
            // Seed 2 distinct enumerator accounts per requirements
            const stmt = this.db.prepare(`
                INSERT INTO users (name, username, email, password, role)
                VALUES (?, ?, ?, ?, ?)
            `);

            // Account 1: Juan Dela Cruz
            stmt.run([
                'Juan Dela Cruz',
                'enumerator1',
                'enumerator1@rcef.gov.ph',
                'Password123!',
                'enumerator',
            ]);

            // Account 2: Maria Santos
            stmt.run([
                'Maria Santos',
                'enumerator2',
                'enumerator2@rcef.gov.ph',
                'Password123!',
                'enumerator',
            ]);

            stmt.free();
        }
    }

    public async persist(): Promise<void> {
        if (!this.db) return;

        try {
            const data = this.db.export();
            let binary = '';
            const len = data.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(data[i]);
            }
            const base64 = btoa(binary);
            await Preferences.set({
                key: STORAGE_KEY,
                value: base64,
            });
        } catch (error) {
            console.error('Error persisting SQLite database:', error);
        }
    }

    public async executeRun(sql: string, params: any[] = []): Promise<void> {
        await this.initialize();
        if (!this.db) throw new Error('Database not initialized');

        const stmt = this.db.prepare(sql);
        stmt.run(params);
        stmt.free();
        await this.persist();
    }

    public async executeQuery<T = any>(sql: string, params: any[] = []): Promise<T[]> {
        await this.initialize();
        if (!this.db) throw new Error('Database not initialized');

        const stmt = this.db.prepare(sql);
        stmt.bind(params);

        const rows: T[] = [];
        while (stmt.step()) {
            rows.push(stmt.getAsObject() as T);
        }
        stmt.free();

        return rows;
    }

    public async getActiveSession(): Promise<any | null> {
        const res = await Preferences.get({ key: AUTH_SESSION_KEY });
        if (res && res.value) {
            try {
                return JSON.parse(res.value);
            } catch {
                return null;
            }
        }
        return null;
    }

    public async setActiveSession(sessionData: any | null): Promise<void> {
        if (sessionData === null) {
            await Preferences.remove({ key: AUTH_SESSION_KEY });
        } else {
            await Preferences.set({
                key: AUTH_SESSION_KEY,
                value: JSON.stringify(sessionData),
            });
        }
    }
}
