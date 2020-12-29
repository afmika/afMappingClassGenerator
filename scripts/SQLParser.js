/**
 * @author afmika
 */
const SQLVar = require('./SQLVar');
function removeSpace(str) {
	return str.replace(/[ \t\n]+/, '');
}
function removeComments(sql_table) {
	return sql_table.replace(/--[a-zA-Z0-9?@#, \t]+\n/g, '\n');
}

module.exports = class SQLParser {
	static fetchTables(sql_script) {
		let reg = /create[ ]+table[ ]+([a-zA-Z0-9)()]+)?/gi;
		return sql_script.match(reg);
	}

	static parse(sql_table) {
		sql_table = removeComments(sql_table);
		// console.log(sql_table)
		let first = sql_table.split(/\(/)[0];
		let var_part = sql_table.split(first + '(')[1];
		
		/create table[ ]+(.+)?\(/gi.test(sql_table);
		let table_name = RegExp.$1;
		let var_sections = var_part.split(/,[ \n]*/);
		let attributes = [];

		var_sections.forEach(sec => {
			let [name, type] = sec.split(/[ ]+/gi).map(removeSpace);
			let test = name.toLowerCase();
			if (!type || !test || test == 'foreign' || test == 'primary')
				return;
			if (type.includes(')')) 
				type = type.split(')')[0];
			attributes.push(new SQLVar(name, type));
		});
		
		return {
			table_name : removeSpace(table_name),
			attributes : attributes
		}
	}	
}
