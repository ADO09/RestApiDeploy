

import dotenv from 'dotenv';
dotenv.config();
//const dotenv = require('dotenv').config();
const { createPool } = require('mysql2/promise');



//console.log(process.env.PORT);

export async function connect() {
    const connection = await createPool ({

        port: process.env.PORT || "",
        host: process.env.HOST || "",
        database : process.env.DATABASE || "",
        user: process.env.USER || "",
        password: process.env.PASSWORD  || ""
    });


    return connection;
}

try {
    connect();
    console.log("CONNECTED TO DB")
} catch (error) {
    console.log(error);
}




