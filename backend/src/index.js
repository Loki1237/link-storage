const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const typeorm = require('typeorm');
const EntitySchema = typeorm.EntitySchema;

const dotenv = require('dotenv');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const linkRouter = require('./routes/links');

dotenv.config();

typeorm.createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [
        new EntitySchema(require("./entity/user.json")),
        new EntitySchema(require("./entity/link.json"))
    ]
}).then(() => {
    const app = express();
    const port = 3001;

    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use('/api/auth', authRouter());
    app.use('/api/users', userRouter());
    app.use('/api/links', linkRouter());

    app.listen(port, () => console.log(`Server is running on port ${port}`));
}).catch(error => {
    console.log("Error: ", error);
});
