CREATE DATABASE database_links;
USE database_links;

-- USERS TABLE
CREATE TABLE users (
    id INT(11) NOT NULL AUTO_INCREMENT,  
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)  
);

-- LINKS TABLE
CREATE TABLE links (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

DESCRIBE links;