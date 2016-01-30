const db = require('./src/server/repository/db');

db.migrate.latest().then(() => {
  console.log("Migrated");
  return process.exit(0);
});
