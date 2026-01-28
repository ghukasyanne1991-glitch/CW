import _ from "lodash";

import DB from '../clients/db.mysql.js';

export async function findByPk(id) {
    const result = await DB.query(`
      SELECT *
      FROM posts
      WHERE id = ?
  `, [id]);

    return _.get(result, '0.0', null);
}

export async function findAll() {
    const result = await DB.query(`
      SELECT *
      FROM posts
      ORDER BY created_at DESC
  `);

    return _.get(result, '0', []);
}

export async function create({ title, content, author_id }) {
    const query = `
      INSERT INTO posts (title, content, author_id, created_at)
      VALUES (?, ?, ?, NOW())
  `;

    await DB.query(query, [title, content, author_id]);

    const [inserted] = await DB.query(`
      SELECT *
      FROM posts
      WHERE id = LAST_INSERT_ID()
  `);

    return _.get(inserted, '0', null);
}

export async function update(id, { title, content }) {
    await DB.query(`
      UPDATE posts
      SET title = ?, content = ?
      WHERE id = ?
  `, [title, content, id]);

    return findByPk(id);
}

export async function remove(id) {
    await DB.query(`
      DELETE FROM posts
      WHERE id = ?
  `, [id]);

    return true;
}

export default {
    findByPk,
    findAll,
    create,
    update,
    remove,
};
