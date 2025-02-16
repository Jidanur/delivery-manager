import { Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig";
import { Client } from "../models/Client";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { validateFields } from "../utils/validationUtils";
import { checkIfExists } from "../utils/repositoryUtils";

export const createClient = async (req: Request, res: Response) => {};
export const getClient = async (req: Request, res: Response) => {};
export const getAllClient = async (req: Request, res: Response) => {};
export const updateClient = async (req: Request, res: Response) => {};
export const deleteClient = async (req: Request, res: Response) => {};
