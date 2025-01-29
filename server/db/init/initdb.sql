-- Create Database
CREATE DATABASE delivery_manager_db;
\c delivery_manager_db;

-- Users Table (for authentication)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,  -- Store hashed passwords
    role VARCHAR(20) CHECK (role IN ('client', 'driver', 'manager')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modify Clients Table
CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    user_id INT UNIQUE REFERENCES users(user_id) ON DELETE CASCADE -- Link to users table
);

-- Modify Managers Table
CREATE TABLE managers (
    manager_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    user_id INT UNIQUE REFERENCES users(user_id) ON DELETE CASCADE -- Link to users table
);

-- Modify Drivers Table
CREATE TABLE drivers (
    driver_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    manager_id INT REFERENCES managers(manager_id) ON DELETE SET NULL,
    user_id INT UNIQUE REFERENCES users(user_id) ON DELETE CASCADE -- Link to users table
);

-- Packages Table
CREATE TABLE packages (
    package_id SERIAL PRIMARY KEY,
    delivery_address TEXT NOT NULL,
    delivery_zone VARCHAR(3) DEFAULT NULL,
    delivery_status VARCHAR(20) DEFAULT 'pending', -- e.g., pending, in_transit, delivered
    service_type VARCHAR(50),
    client_id INT REFERENCES clients(client_id) ON DELETE SET NULL,
    driver_id INT REFERENCES drivers(driver_id) ON DELETE SET NULL,
    pickup_time TIMESTAMP,
    delivery_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    order_instructions TEXT DEFAULT NULL, -- Special instructions for the order
    order_comment TEXT DEFAULT NULL, -- Additional comments on the order
);

-- Optional Indexes for faster queries
CREATE INDEX idx_packages_zone ON packages(delivery_zone);
CREATE INDEX idx_packages_status ON packages(delivery_status);
CREATE INDEX idx_packages_client_id ON packages(client_id);
CREATE INDEX idx_packages_driver_id ON packages(driver_id);