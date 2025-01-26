import 'dotenv/config';
import { DataSource } from "typeorm";
import { Client } from "../models/Client";
import { Driver } from '../models/Driver';
import { Manager } from '../models/Manager';
import { Package } from '../models/Package';
import { User } from '../models/User';


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Client, Manager, Driver, Package],
  synchronize: true,
  logging: false,
});
