-- created the database 
DROP DATABASE yogaDatabase;
CREATE DATABASE yogaDatabase;

-- use the database 
USE yogaDatabase;

-- create tables for storing users information 

CREATE TABLE users (
    id BINARY(16),
    id_text varchar(36) generated always as
        (insert(
            insert(
            insert(
                insert(hex(id),9,0,'-'),
                14,0,'-'),
            19,0,'-'),
            24,0,'-')
        ) virtual,
    email varchar(50) NOT NULL,
    password varchar(100) NOT NULL,
    admin BOOLEAN DEFAULT false,        -- TODO remove
    primary key(id) 
);

CREATE TABLE profile (
    userId varchar(50),
    firstName varchar(64) NOT NULL,
    lastName varchar(64),
    age varchar(10) NOT NULL,
    gender SET('male', 'female', 'others') NOT NULL,
    address varchar(128) NOT NULL,
    state  varchar(64) NOT NULL,
    city varchar(64) NOT NULL,
    phone varchar(15) NOT NULL,
    email varchar(50) NOT NULL,
    batch varchar(50) NOT NULL,
    last_updated varchar(50) NOT NULL,
    PRIMARY KEY(userId)
);

CREATE TABLE payments (
    userId varchar(50),
    transactionId varchar(50) NOT NULL,
    amount varchar(50) NOT NULL,
    paymentDate varchar(50) NOT NULL,
    status varchar(50) NOT NULL,
    PRIMARY KEY(userId)
);
