const Pool = require('pg').Pool
const pool = new Pool({
    user: "zasadnyj",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "todo_fullstack"
})



module.exports = pool
