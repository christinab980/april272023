const express = require("express");
const pgp = require('pg-promise')();

const server = express();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'sept2022',
    user: "christinabarron",
    password: ' ',
    allowExitOnIdle: true
};

const db = pgp(cn);

server.get('/students', async (req, res) => {
    try {
        const students = await getStudents();
        res.json({
            students
        })
    }
    catch(error) {
        res.json({
            error
        })
    }
});

async function getStudents() {
    const students = await db.any('select * from students', [true]);
    return students
}

server.get('/heartbeat',(req, res) => {
    res.json({
        "is":"working",
    });
});

server.listen(8080, () => {
    console.log("This server is running at PORT 8080")
});