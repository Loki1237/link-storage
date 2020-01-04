const typeorm = require('typeorm');
const EntitySchema = typeorm.EntitySchema;

module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "joni",
    password: "12345678",
    database: "links_storage",
    entities: [
        new EntitySchema( require("./src/entity/user.json") ),
        new EntitySchema( require("./src/entity/link.json") )
    ]
};