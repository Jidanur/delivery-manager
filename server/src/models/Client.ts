import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { Package } from "./Package";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn()
  client_id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Column({ length: 15, nullable: true })
  phone?: string;

  @Column("text", { nullable: true })
  address?: string;

  @Column()
  user_id!: number;

  @OneToOne(() => User, (user) => user.client)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => Package, (Package) => Package.client)
  packages!: Package[];


  getInfo() {
    return {
      role: this.user.role,
      client_id: this.client_id,
      name: this.name,
      email: this.email,
      phone: this.phone || null,
      address: this.address || null,
      //user: this.user, // Returns the related User entity
      packages: this.packages, // Returns the related Package entities
    };}

}
