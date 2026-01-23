import mysql from 'mysql2';
import fs from 'fs/promises';
import path from "path";

const caFilePath = path.resolve('./clients/certificates/ca.pem');

const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_USER, MYSQL_PORT } = process.env;

const connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: MYSQL_PORT,
  ssl: {
    ca: await fs.readFile(caFilePath),
    rejectUnauthorized: true
  }
});

export default connection.promise();
