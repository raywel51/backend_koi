import * as fs from 'fs';
import {VisitorInterface} from "../interface/VisitorInterface";
import {Database} from "../interface/Database";

export class DatabaseManager {
    private static instance: DatabaseManager;
    private readonly databasePath = 'data.json';
    private database: Database | undefined;

    private constructor() {
        this.loadDatabase();
    }

    public static getInstance(): DatabaseManager {
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager();
        }
        return DatabaseManager.instance;
    }

    private loadDatabase(): void {
        try {
            const data = fs.readFileSync(this.databasePath, 'utf-8');
            this.database = JSON.parse(data);
        } catch (error) {
            console.error('Error loading database:', error);
            this.database = {visitors: []}; // Initialize empty database if file doesn't exist or error occurs
        }
    }

    public saveVisitor(visitor: VisitorInterface): void {
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
}