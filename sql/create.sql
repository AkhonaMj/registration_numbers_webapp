-- CREATE SCHEMA IF NOT EXISTS dev;
-- CREATE TABLE dev.registration (
--     reg_number VARCHAR(11) NOT NULL PRIMARY KEY,
--     townCode VARCHAR(2)
-- );
DROP TABLE IF EXISTS towns_table CASCADE;
DROP TABLE IF EXISTS registration CASCADE;


-- Create the town_code table with a foreign key reference to registration
CREATE TABLE towns_table (
    id serial PRIMARY KEY,
    town_code text NOT NULL,
    town_name text NOT NULL
);

CREATE TABLE registration (
    id serial PRIMARY KEY,
    reg_number VARCHAR(11) NOT NULL,
    town_id int REFERENCES towns_table(id) ON DELETE CASCADE
);
