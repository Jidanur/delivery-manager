import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Driver } from './Driver';
import { User } from "./User";

@Entity("managers")
export class Manager {
  @PrimaryGeneratedColumn()
  manager_id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Column({ length: 15, nullable: true })
  phone?: string;

  @Column()
  user_id!:number;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => Driver, (driver) => driver.manager)
  drivers!: Driver[];


  getInfo() {
    return {
      manager_id: this.manager_id,
      name: this.name,
      email: this.email,
      phone: this.phone || null,
      //user: this.user, // Returns the related User entity
      //packages: this.pack, // Returns the related Package entities
    };}
}
