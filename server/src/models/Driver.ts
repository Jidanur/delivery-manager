import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Manager } from "./Manager";
import { Package } from "./Package";
import { User } from "./User";

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
  @JoinColumn({ name: "manager_id" })
  manager?: Manager;

  @Column()
  user_id!:number;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => Package, (Package) => Package.driver)
  pack!: Package[];


  getInfo() {
    return {
      driver_id: this.driver_id,
      name: this.name,
      email: this.email,
      phone: this.phone || null,
      manager: this.manager?.name || null,
      //user: this.user, // Returns the related User entity
      //packages: this.pack, // Returns the related Package entities
    };}
}
