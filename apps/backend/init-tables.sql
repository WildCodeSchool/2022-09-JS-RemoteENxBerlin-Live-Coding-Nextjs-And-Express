CREATE TABLE
    users (
        id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        hashedPassword VARCHAR(255),
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        birthdate DATE,
        isAdmin BOOLEAN NOT NULL DEFAULT false,
    );