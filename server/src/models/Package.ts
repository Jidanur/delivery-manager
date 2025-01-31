import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./Client";
import { Driver } from "./Driver";

export enum DeliveryStatus {
  Pending = "pending",
  InTransit = "in_transit",
  Delivered = "delivered",
}

export enum ServiceType {
  regular = "regular",
  SameDay = "same-day",
  NextDay = "next-day",
  Urgent = "urgent",
}

@Entity("packages")
@Index("idx_packages_zone", ["delivery_zone"]) // Index for delivery zone
@Index("idx_packages_status", ["delivery_status"]) // Index for delivery status
@Index("idx_packages_client_id", ["client"]) // Index for client_id
@Index("idx_packages_driver_id", ["driver"]) // Index for driver_id
export class Package {
  @PrimaryGeneratedColumn()
  package_id!: number;

  @Column("text")
  delivery_address!: string;

  @Column({ type: "varchar", length: 3, default: null })
  delivery_zone!: string ;

  @Column({ type: "varchar", length: 20, default: DeliveryStatus.Pending })
  delivery_status!: DeliveryStatus;

  @Column({ type: "varchar", length: 50})
  service_type! : ServiceType;

  @Column()
  client_id!:number;

  @ManyToOne(() => Client, (client) => client.packages, { onDelete: "SET NULL" })
  @JoinColumn({ name: "client_id" })
  client!: Client;

  @ManyToOne(() => Driver, (driver) => driver.packages, { onDelete: "SET NULL" })
  @JoinColumn({ name: "driver_id" })
  driver?: Driver;

  @CreateDateColumn({type: "timestamp"})
  created_at!: Date;

  @UpdateDateColumn({type: "timestamp"})
  updated_at!: Date;

  @Column({ type: "timestamp", nullable: true })
  pickup_time?: Date;

  @Column({ type: "timestamp", nullable: true })
  delivery_time?: Date;

  @Column({ type: "text", nullable: true })
  order_instructions?: string;

  @Column({ type: "text", nullable: true })
  order_comment?: string;
}



