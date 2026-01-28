import DB from './clients/db.mysql.js';

(async () => {
  // Users TABLE
  await DB.query(`
    CREATE TABLE IF NOT EXISTS users
    (
      id         INT          NOT NULL AUTO_INCREMENT,
      first_name VARCHAR(255) NOT NULL,
      last_name  VARCHAR(255) NOT NULL,
      email      VARCHAR(255) NOT NULL,
      dob        DATE         NOT NULL,
      password   VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
      );
  `);

  // Posts TABLE
  await DB.query(`
      CREATE TABLE IF NOT EXISTS posts
      (
          id        INT          NOT NULL AUTO_INCREMENT,
          title     VARCHAR(255) NOT NULL,
          content   TEXT         NOT NULL,
          author_id INT          NOT NULL,
          created_at DATETIME    NOT NULL,
          PRIMARY KEY (id),
          FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
      );
  `);
})();
