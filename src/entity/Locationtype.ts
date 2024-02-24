import {Column, Entity, PrimaryColumn} from "typeorm"

@Entity()
export class Locationtype {

    @PrimaryColumn()
    locationtypeID!: string

    @Column()
    location_en!: string

    @Column()
    location_th!: string

}
