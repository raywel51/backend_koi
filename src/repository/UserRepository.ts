import {AppDataSource} from "../config/config";
import {VisitorLogEntity} from "../entity/VisitorLogEntity";
import {Repository} from "typeorm";
import {UserEntity} from "../entity/UserEntity";

export class UserRepository {
    private static instance: UserRepository;
    private repo: Repository<UserEntity> = AppDataSource.getRepository(UserEntity);

    private constructor() {}

    static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    async create(userEntity: UserEntity) {
        await this.repo.save(userEntity);
    }

    async get() {
        return await this.repo.find();
    }

    async getByUsername(username: string): Promise<UserEntity | null> {
        return await this.repo.findOne({ where: { username: username } });
    }
}
