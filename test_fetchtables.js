const SQLParser = require('./scripts/SQLParser');
let content = require('fs').readFileSync('db_test/tables.sql');
let tab_queries = SQLParser.fetchTables(content.toString());

tab_queries.forEach (query => {
	let out = SQLParser.parse(query);
	console.log(out);
});