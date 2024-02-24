import {Column, Entity, PrimaryColumn} from "typeorm"

@Entity()
export class ContactEntity {

    @PrimaryColumn()
    contactID!: string

    @Column()
    contact_about!: string
}
