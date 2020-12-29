const SQLParser = require('./scripts/SQLParser');
let content = require('fs').readFileSync('db_test/tables.sql');
let out = SQLParser.fetchTables(content.toString());
console.log(out);
