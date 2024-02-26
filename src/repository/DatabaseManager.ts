import * as fs from 'fs';
import {VisitorInterface} from "../interface/VisitorInterface";
import {Database} from "../interface/Database";
import {convertNormalTime} from "../helper/TimeFormator";

export class DatabaseManager {
    private static instance: DatabaseManager;
    private readonly databasePath = 'data.json';
    private database: Database | undefined;

    private constructor() {
        this.loadDatabase().then(r => "");
    }

    public static getInstance(): DatabaseManager {
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager();
        }
        return DatabaseManager.instance;
    }

    public async loadDatabase(): Promise<void> {
        try {
            const data = fs.readFileSync(this.databasePath, 'utf-8');
            this.database = JSON.parse(data);
        } catch (error) {
            await this.createEmptyDatabase();
        }
    }

    private async createEmptyDatabase(): Promise<void> {
        const date = new Date();
        const emptyDatabase: Database = {
            update_time: convertNormalTime(date),
            visitors: []
        };
        try {
            await fs.promises.writeFile(this.databasePath, JSON.stringify(emptyDatabase, null, 2), 'utf-8');
            console.log('Database file created successfully.');
            this.database = emptyDatabase;
        } catch (error) {
            console.error('Error creating database file:', error);
        }
    }

    public async removeDatabaseFile(): Promise<void> {
        try {
            fs.unlinkSync(this.databasePath);
            console.log('Database file removed successfully.');
        } catch (error) {
            console.error('Error removing database file:', error);
        }
    }

    public async saveVisitor(visitor: VisitorInterface): Promise<void> {
        if (this.database?.visitors) {
            this.database.visitors.push(visitor);
            this.saveDatabase();
        } else {
            console.error('Database is not properly initialized.');
        }
    }

    private saveDatabase(): void {
        try {
            fs.writeFileSync(this.databasePath, JSON.stringify(this.database, null, 2), 'utf-8');
        } catch (error) {
            console.error('Error saving database:', error);
        }
    }

    public readData(pinCode: string): VisitorInterface[] | null {
        try {
            const data = fs.readFileSync(this.databasePath, 'utf-8');
            const jsonData: Database = JSON.parse(data);

            return jsonData.visitors.filter(visitor => visitor.pin_code === pinCode);
        } catch (error) {
            console.error('Error reading database:', error);
            return null;
        }
    }
}