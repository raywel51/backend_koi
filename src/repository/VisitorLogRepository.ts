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

    async updateApprove(qrKey: string) {
        await this.repo
            .createQueryBuilder()
            .update(VisitorLogEntity)
            .set({ approve: true })
            .where("qrKey = :qrKey", { qrKey })
            .execute();
    }
}
