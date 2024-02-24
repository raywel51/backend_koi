import {AppDataSource} from "../config/config";
import {VisitorLogEntity} from "../entity/VisitorLogEntity";
import {Repository} from "typeorm";
import {UserEntity} from "../entity/UserEntity";
import {ContactEntity} from "../entity/ContactEntity";
import {Locationtype} from "../entity/Locationtype";

export class LocationRepository {
    private static instance: LocationRepository;
    private repo: Repository<Locationtype> = AppDataSource.getRepository(Locationtype);

    private constructor() {}

    static getInstance(): LocationRepository {
        if (!LocationRepository.instance) {
            LocationRepository.instance = new LocationRepository();
        }
        return LocationRepository.instance;
    }

    async create(locationtype: Locationtype) {
        await this.repo.save(locationtype);
    }

    async get() {
        return await this.repo.find();
    }
}