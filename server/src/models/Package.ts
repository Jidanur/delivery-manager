import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { Driver } from "./Driver";

@Entity("packages")
export class Package {
  @PrimaryGeneratedColumn()
  package_id!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  weight!: number;

  @Column({ length: 50, nullable: true })
  dimensions?: string;

  @Column("text")
  destination_address!: string;

  @Column({ type: "varchar", length: 20, default: "pending" })
  status!: "pending" | "in_transit" | "delivered";

  @ManyToOne(() => Client, (client) => client.pack, { onDelete: "CASCADE" })
  @JoinColumn({ name: "client_id" })
  client!: Client;

  @ManyToOne(() => Driver, (driver) => driver.pack, { onDelete: "SET NULL" })
  @JoinColumn({ name: "driver_id" })
  driver?: Driver;

  @Column({ type: "timestamp", nullable: true })
  pickup_time?: Date;

  @Column({ type: "timestamp", nullable: true })
  delivery_time?: Date;
}
