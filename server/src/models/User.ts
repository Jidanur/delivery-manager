import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from './Client';
import { Driver } from './Driver';
import { Manager } from './Manager';

@Entity("users")
export class User {


    @PrimaryGeneratedColumn()
    user_id! : number;

    @Column({ unique: true, length: 50 })
    username!: string;

    @Column("text")
    password_hash!: string;

    @Column({ type: "varchar", length: 20 })
    role!: "client" | "driver" | "manager";

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;


    @OneToOne(() => Client, (client) => client.user, { cascade: true })
    client!: Client;

    @OneToOne(() => Driver, (driver) => driver.user, { cascade: true })
    driver!: Driver;

    @OneToOne(() => Manager, (manager) => manager.user, { cascade: true })
    manager!: Manager;

}
