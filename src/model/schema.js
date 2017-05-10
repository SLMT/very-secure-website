require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);

const schemaSql = `
    -- Drop (droppable only when no dependency)
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS posts;

    -- Create
    CREATE TABLE users (
        id              serial PRIMARY KEY NOT NULL,
        username        VARCHAR(50) NOT NULL,
        password        VARCHAR(50) NOT NULL,
        name            VARCHAR(50) NOT NULL
    );
    CREATE TABLE posts (
        id              serial PRIMARY KEY NOT NULL,
        title           text NOT NULL,
        message         text NOT NULL
    );
`;

const dataSql = `
    -- Populate dummy users
    INSERT INTO users (username, password, name) VALUES
        ('admin', '1234', 'adminstrator');
    INSERT INTO users (username, password, name) VALUES
        ('cat', 'meow', 'Cute Cat');
    INSERT INTO users (username, password, name) VALUES
        ('dog', 'bow', 'Crazy Dog');
    INSERT INTO users (username, password, name) VALUES
        ('bird', 'chou', 'Flying Bird');

    -- Populate dummy posts
    INSERT INTO posts (title, message)
        VALUES ('A Cat', 'I am a cat.');
    INSERT INTO posts (title, message)
        VALUES ('A Sheep', 'Beep beep I am a sheep. I say beep beep I am a sheep.');
    INSERT INTO posts (title, message)
        VALUES ('A Cow', 'Meow meow I am a cow. I say meow meow I am... <br>Sheep: NO!!!!');
    INSERT INTO posts (title, message)
        VALUES ('Shakespeare', 'To be, or not to be.');
    INSERT INTO posts (title, message)
        VALUES ('Motorcycle', '81000 is fair price.');
`;

db.none(schemaSql).then(() => {
    console.log('Schema created');
    db.none(dataSql).then(() => {
        console.log('Data populated');
        pgp.end();
    });
}).catch(err => {
    console.log('Error creating schema', err);
});
