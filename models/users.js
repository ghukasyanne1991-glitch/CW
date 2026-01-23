import _ from "lodash";
import md5 from "md5";
import HttpErrors from "http-errors";

const { USER_SECRET } = process.env;

import DB from '../clients/db.mysql.js';

export async function findByPk(id) {
  const result = await DB.query(`
      SELECT *
      FROM users
      WHERE id = ?
  `, [id]);

  return _.get(result, '0.0', null);
}

export async function findOne(where) {
  if (_.isEmpty(where)) {
    return null;
  }

  const fields = Object.keys(where);
  const values = Object.values(where);

  const whereFields = (fields.map((field) => `${field} = ?`)).join(' AND ');

  const query = `
      SELECT *
      FROM users
      WHERE ${whereFields}
  `;

  const result = await DB.query(query, values);

  return _.get(result, '0.0', null);
}

export async function create({ username, email, password}) {
  if (await findOne({ email })) {
    throw HttpErrors(422, "User already exists!");
  }

  const passwordMD5 = md5(md5(password) + USER_SECRET);

  const query = `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?, ?, ?);
  `;

  await DB.query(query, [username, email, passwordMD5]);

  return await findOne({ email });
}

export function checkPassword(password, password2) {
  return password === md5(md5(password2) + USER_SECRET)
}


export default {
  findByPk,
  findOne,
  create,
  checkPassword,
};
