import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { Manager } from "./Manager";
import { Package } from "./Package";

@Entity("drivers")
export class Driver {
  @PrimaryGeneratedColumn()
  driver_id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Column({ length: 15, nullable: true })
  phone?: string;

  @ManyToOne(() => Manager, (manager) => manager.drivers, { onDelete: "SET NULL" })
  manager?: Manager;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => Package, (Package) => Package.driver)
  pack!: Package[];
}
