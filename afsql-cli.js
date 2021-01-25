#!/usr/bin/env node

const mapJavaFrom = require(__dirname.replace(/\\/gi, '/') + '/JavaMapper');
const SQLParser = require(__dirname.replace(/\\/gi, '/') + '/scripts/SQLParser');

const [ , , ...args] = process.argv;
function sqlFromFile (sqlfile) {
	let content = require('fs').readFileSync(sqlfile);
	let tab_queries = SQLParser.fetchTables(content.toString());
	let non_public = true;
	tab_queries.forEach (query => {
		const temp = SQLParser.parse(query);
		const output = mapJavaFrom(query, non_public);
		const filename = temp.table_name + '.java';
		require('fs').writeFileSync(filename, output);
		console.log(filename + '\t\tcreated !');
	});
}

function sqlToJson (sqlfile) {
	let content = require('fs').readFileSync(sqlfile);
	let tab_queries = SQLParser.fetchTables(content.toString());
	let non_public = true;
	let out = [];
	tab_queries.forEach (query => {
		const temp = SQLParser.parse(query);
		console.log(temp);
		out.push(temp);
	});
	let filename = 'afsql_out.json';
	require('fs').writeFileSync(filename, JSON.stringify(out));
	console.log('afsql_out.json tcreated !');
}

function badOption () {
	console.log('afsql compiler');
	console.log('Bad option !');
	console.log('$ afsql file.sql # exports to json');
	console.log('$ afsql sql file.sql # outputs corresponding java files');
}
// afsql sql file.sql
const [op, file] = args;
if (args.length == 2) {
	if (op == 'sql') {
		sqlFromFile(file);
	} else {
		badOption();
	}
} else if (args.length == 1) {
	sqlToJson(op);
} else {
	badOption();
}