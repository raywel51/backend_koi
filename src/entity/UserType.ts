import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class UserType {

    @PrimaryGeneratedColumn()
    usertypeid!: number

    @Column()
    nametype!: string

}
