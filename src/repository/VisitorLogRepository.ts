import {AppDataSource} from "../config/config";
import {VisitorLogEntity} from "../entity/VisitorLogEntity";
import {Repository} from "typeorm";

export class VisitorLogRepository {
    private static instance: VisitorLogRepository;
    private repo: Repository<VisitorLogEntity> = AppDataSource.getRepository(VisitorLogEntity);

    private constructor() {}

    static getInstance(): VisitorLogRepository {
        if (!VisitorLogRepository.instance) {
            VisitorLogRepository.instance = new VisitorLogRepository();
        }
        return VisitorLogRepository.instance;
    }

    async create(visitorLogEntity: VisitorLogEntity) {
        await this.repo.save(visitorLogEntity);
    }

    async update(visitorLogEntity: VisitorLogEntity) {
        const existingEntity = await this.repo.findOne({ where: { pinCode: visitorLogEntity.pinCode } });

        if (existingEntity) {
            // Update the existing entity with the new data
            existingEntity.visitor_name = visitorLogEntity.visitor_name;
            existingEntity.contact_about = visitorLogEntity.contact_about;
            existingEntity.location = visitorLogEntity.location;
            existingEntity.mobile_phone = visitorLogEntity.mobile_phone;
            existingEntity.email = visitorLogEntity.email;
            existingEntity.car_registration = visitorLogEntity.car_registration;
            existingEntity.entry_time = visitorLogEntity.entry_time;
            existingEntity.exit_time = visitorLogEntity.exit_time;

            await this.repo.save(existingEntity);
            return existingEntity; // Return the updated entity
        } else {
            throw new Error('Entity not found'); // Handle if entity not found
        }
    }

    async remove(id: number) {
        await this.repo.delete(id);
    }

    async get() {
        return await this.repo.find();
    }

    async getByQrKey(qrKey: string): Promise<VisitorLogEntity | null> {
        return await this.repo.findOne({ where: { qrKey: qrKey } });
    }

    async getByPinCode(pinCode: string): Promise<VisitorLogEntity | null> {
        return await this.repo.findOne({ where: { pinCode: pinCode } });
    }

    async existsByPinCode(pinCode: string, qrKey: string): Promise<boolean> {
        const count = await this.repo.count({ where: { pinCode, qrKey } });
        return count > 0;
    }

    async existsByApprove(): Promise<VisitorLogEntity[]> {
        return await this.repo.find({ where: { approve : true } });
    }

    async updateApprove(qrKey: string) {
        await this.repo
            .createQueryBuilder()
            .update(VisitorLogEntity)
            .set({ approve: true })
            .where("qrKey = :qrKey", { qrKey })
            .execute();
    }
}
