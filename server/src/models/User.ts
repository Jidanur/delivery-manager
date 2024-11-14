import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


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

}
