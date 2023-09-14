CREATE SCHEMA IF NOT EXISTS dev;
CREATE TABLE dev.registration (
    reg_number VARCHAR(11) NOT NULL PRIMARY KEY,
    townCode VARCHAR(2)
);