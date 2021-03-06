#!/usr/bin/env node

const SQLParser = require(__dirname.replace(/\\/gi, '/') + '/scripts/SQLParser');
const mapJavaFrom = require(__dirname.replace(/\\/gi, '/') + '/JavaMapper');
const mapJavaHibernateFrom = require(__dirname.replace(/\\/gi, '/') + '/JavaHibernateMapper');
const mapJavaAfQueryFrom = require(__dirname.replace(/\\/gi, '/') + '/JavaAfQueryMapper');
const JavaHibernateAndAfQueryMapper = require(__dirname.replace(/\\/gi, '/') + '/JavaHibernateAndAfQueryMapper');
const mapJSFrom = require(__dirname.replace(/\\/gi, '/') + '/JSMapper');

const [ , , ...args] = process.argv;
function sqlFromFile (sqlfile, op, use_spaces = false) {
	let content = require('fs').readFileSync(sqlfile);
	let tab_queries = SQLParser.fetchTables(content.toString());
	let non_public = true;
	tab_queries.forEach (query => {
		const temp = SQLParser.parse(query);
		let filename = temp.table_name;
		let output = null;
		if (['java', 'hibernate', 'afquery', 'hibernate-afquery'].includes(op)) {
			filename += '.java';
			let fun_map = {
				'java' : mapJavaFrom, 
				'hibernate' : mapJavaHibernateFrom,
				'hibernate-afquery' : JavaHibernateAndAfQueryMapper, 
				'afquery' : mapJavaAfQueryFrom
			};
			output = fun_map[op] (query, non_public);			
		} else {
			filename += '.js';
			output = mapJSFrom(query, non_public);			
		}
		
		if (use_spaces)
			output = output.replace(/\t/gi, '    ');
		
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
	console.log('$ afsql java file.sql # outputs corresponding java files');
	console.log('$ afsql js file.sql # outputs corresponding JS files');
}
// afsql sql file.sql
const [op, file, use_spaces] = args;
if (args.length == 2 || args.length == 3) {
	if (['java', 'js', 'hibernate', 'afquery', 'hibernate-afquery'].includes(op)) {
		console.log(use_spaces == '--spaces' ? 'Mode : Spaces' : 'Mode : Tabs');
		sqlFromFile(file, op, use_spaces == '--spaces');
	} else {
		badOption();
	}
} else if (args.length == 1) {
	sqlToJson(op);
} else {
	badOption();
}