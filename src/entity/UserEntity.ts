import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    username!: string

    @Column()
    password!: string

    @Column()
    name!: string

    @Column()
    lastname!: string

    @Column()
    phone!: string

    @Column()
    email!: string

    @Column()
    token!: string

    @Column()
    role!: string

}
