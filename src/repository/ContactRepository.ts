import {AppDataSource} from "../config/config";
import {VisitorLogEntity} from "../entity/VisitorLogEntity";
import {Repository} from "typeorm";
import {UserEntity} from "../entity/UserEntity";
import {ContactEntity} from "../entity/ContactEntity";

export class ContactRepository {
    private static instance: ContactRepository;
    private repo: Repository<ContactEntity> = AppDataSource.getRepository(ContactEntity);

    private constructor() {}

    static getInstance(): ContactRepository {
        if (!ContactRepository.instance) {
            ContactRepository.instance = new ContactRepository();
        }
        return ContactRepository.instance;
    }

    async create(contactEntity: ContactEntity) {
        await this.repo.save(contactEntity);
    }

    async get() {
        return await this.repo.find();
    }
}
