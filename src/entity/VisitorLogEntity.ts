import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class VisitorLogEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    qrKey!: string

    @Column()
    pinCode!: string

    @Column()
    visitor_name!: string

    @Column()
    location!: string

    @Column()
    contact_about!: string

    @Column()
    mobile_phone!: string

    @Column()
    email!: string

    @Column()
    car_registration!: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_time!: Date

    @BeforeInsert()
    updateCreateTime() {
        this.create_time = new Date();
    }

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    entry_time!: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    exit_time!: Date

    @Column()
    approve!: Boolean
}