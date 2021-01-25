const SQLParser = require('./scripts/SQLParser');
const mapJavaFrom = require('./JavaMapper');

let content = require('fs').readFileSync('db_test/port.sql');
let tab_queries = SQLParser.fetchTables(content.toString());

let non_public = true;
tab_queries.forEach (query => {
	const temp = SQLParser.parse(query);
	const output = mapJavaFrom(query, non_public);
	const filename = 'output/' + temp.table_name + '.java';
	require('fs').writeFileSync(filename, output);
	console.log(filename + '\t\tcreated !');
});