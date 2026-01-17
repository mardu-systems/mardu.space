import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Subscriber {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ unique: true })
    email!: string

    @Column()
    role!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}
