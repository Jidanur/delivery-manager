import bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/ormconfig";
import { Client } from "../models/Client";
import { Driver } from "../models/Driver";
import { Manager } from "../models/Manager";
import { User } from '../models/User';


export const createUser = async (req: any, res: any) => {
  const { username, password, role ,info} = req.body;

  try {
    // Check if the username already exists
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const validInfo = validateFields(info, ['name', 'email', 'phone']);
    
    if (!validInfo) {
        return res.status(400).json({ message: "Need more info's['name', 'email', 'phone'] to register"});
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = userRepository.create({
      username,
      password_hash: passwordHash,
      role,
    });

    await userRepository.save(newUser);

    if(role == "driver"){
        createDriver(info, newUser);
    }
    else if(role == "client"){
        createClient(info, newUser);
    }
    else if(role == "manager" ){ /// need to add some restriction who can create manager
        createManager(info, newUser);
    }
    else {
        return res.status(400).json({ message: 'Invalid role specified' });
      }

    
    
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteUser = async(req:any, res:any) =>{

    const{ id } = req.params;

    try{
        const userRepository = AppDataSource.getRepository(User);
        const userPayload = req.user;

        // Find the current user by ID
        const currUser = await userRepository.findOneBy({ user_id: userPayload?.user_id });
        

        if(currUser?.role == 'manager'){
            const UserTodelete = await userRepository.findOneBy({ user_id: id });
            await userRepository.delete({user_id: UserTodelete?.user_id});
        }
        else if( id != currUser?.user_id){
            return res.status(400).json({ message:"Not authorized to delete this user"});
        }

        return res.status(200).json({ message: 'User deleted successfully' });

    }
    catch(error:any){
        return res.status(400).json({ message: error.message });
    }

}


export const getUser = async (req: any, res: any) => {

    const {id} = req.params;

    try{
        const userPayload = req.user;

        if(userPayload.role !== 'manager') {
            return res.status(403).json({ message: 'Access denied' });
        }
    
        const userRepository = AppDataSource.getRepository(User);
        
        let findUser = await userRepository.findOneBy({user_id:id});
        // Fetch all users with their associated client or driver details
        
        if(findUser){
            findUser = await userRepository.findOne({ where:{user_id:id}, 
                relations: ['client', 'driver', 'manager'],
            });
        }
        else{
            return res.status(500).json({ message: "User not found"});
        }
        
  
      return res.status(200).json(findUser);
    } 

    catch(error:any){
        return res.status(500).json({ message: "Internal server error" , error:error.message});
    }


}

export const getAllUsers = async (req: any, res: any) => {

    try{
        const userPayload = req.user;

        if(userPayload.role !== 'manager') {
            return res.status(403).json({ message: 'Access denied' });
        }
    
        const userRepository = AppDataSource.getRepository(User);

        // Fetch all users with their associated client or driver details
        const users = await userRepository.find({
            relations: ['client', 'driver', 'manager'],
        });
  
      return res.status(200).json(users);
    } 

    catch(error:any){
        return res.status(500).json({ message: "Internal server error" , error:error.message});
    }


}


export const getUserInfo = async (req: any, res: any) => {
    
  try {
    const userRepository = AppDataSource.getRepository(User);
    const userPayload = req.user;

    // Find the current user by ID
    const currUser = await userRepository.findOneBy({ user_id: userPayload?.user_id });

    if (!currUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let record: Client | Driver | Manager| null = null;

    // Role-based logic to find the associated record
    if (currUser.role === "client") {
      const clientRepository = AppDataSource.getRepository(Client);
      record = await clientRepository.findOne({
        where: { user_id: currUser.user_id },
      });
    } else if (currUser.role === "driver") {
      const driverRepository = AppDataSource.getRepository(Driver);
      record = await driverRepository.findOne({
        where: { user_id: currUser.user_id },
      });
    }
    else if(currUser.role === "manager"){
        const managerRepository = AppDataSource.getRepository(Manager);
        record = await managerRepository.findOne({
            where: { user_id: currUser.user_id },
        });
    }

    if (record) {
      const info = record.getInfo();
      return res.status(200).json({ message: "Request successful", info });
    } else {
      return res.status(404).json({ message: "Record not found for the user" });
    }
  } catch (err) {
    console.error("Error finding user info:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const createClient = async(info:any, user:User) =>{
    const clientRepository = AppDataSource.getRepository(Client);
    //validateFields(info, ['name', 'email', 'phone'])

    // Check if client already exists
    await checkIfExists(clientRepository, { name:info.name, email: info.email, phone: info.phone }, 'Client');

    const newClient = clientRepository.create({
        name: info.name,
        email: info.email,
        phone: info.phone,
        address: info.address || '',
        user:user,
      });
    
    
      await clientRepository.save(newClient);


}

const createDriver = async (info:any, user:User) => {
    const driverRepository = AppDataSource.getRepository(Driver);
  
    // Validate required fields
    //validateFields(info, ['name', 'email', 'phone']);
  
    // Check if driver already exists
    await checkIfExists(driverRepository, { name:info.name, email: info.email, phone: info.phone }, 'Driver');
  
    const newDriver = driverRepository.create({
      name: info.name,
      email: info.email,
      phone: info.phone,
      user:user,
    });
  
    await driverRepository.save(newDriver);
  };


  const createManager = async (info:any, user:User) => {
    const managerRepository = AppDataSource.getRepository(Manager);
  
    // Validate required fields
    //validateFields(info, ['name', 'email', 'phone']);
  
    // Check if manager already exists
    await checkIfExists(managerRepository, { name:info.name, email: info.email, phone: info.phone }, 'Manager');
  
    const newManager = managerRepository.create({
      name: info.name,
      email: info.email,
      phone: info.phone,
      user:user,
    });
  
    await managerRepository.save(newManager);
  };


const validateFields = (fields:any, requiredFields:any) => {
    let valid = true;
    for (const field of requiredFields) {
      if (!fields[field]) {
        valid = false;
      }
    }
    return valid;
  };

const checkIfExists = async (repository:Repository<any>, conditions:any, entityName:string) => {
    const existingRecord = await repository.findOneBy(conditions);
    if (existingRecord) {
      console.error("${entityName} with the specified values already exists");
    }
  };