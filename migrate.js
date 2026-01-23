import DB from './clients/db.mysql.js';

// 1. https://dashboard.render.com/
// 2. https://console.aiven.io/account/a57ec6ef976b/project/argishti-e01/services/mysql-041999/overview

(async () => {
  // Users TABLE
  await DB.query(`
      CREATE TABLE IF NOT EXISTS users
      (
          id         INT          NOT NULL AUTO_INCREMENT,
          username VARCHAR(255) NOT NULL,
          email      VARCHAR(255) NOT NULL,
          password   VARCHAR(255) NOT NULL,
          PRIMARY KEY (id)
      );
  `);
})();
