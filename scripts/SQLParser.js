/**
 * @author afmika
 */
const SQLVar = require(__dirname.replace(/\\/gi, '/') + '/SQLVar');
function removeSpace(str) {
	return str.replace(/[ \r\t\n]+/, '');
}
function removeComments(sql_table) {
	return sql_table.replace(/--(([ \t]+)(.+))?(\r?\n)/g, '\n');
}

module.exports = class SQLParser {
	static fetchTables(sql_script) {
		sql_script = removeComments(sql_script);
		const reg = /create([\t\n ]+)table([\t\n ]+)(.+)/gi;
		const heads = sql_script.match(reg);
		let tab_query = [];
		let i = 0;
		heads.forEach (tab_head => {
			const [chunk1, chunk2] = sql_script.split(tab_head);
			let temp = tab_head;
			let found_closed_parenthesis = false;
			let found_semi_column = false
			for (let i = 0; i < chunk2.length; i++) {
				if (chunk2[i] == ')')
					found_closed_parenthesis = true;
				if (chunk2[i] == ';')
					found_semi_column = true;
				temp += chunk2[i];
				if (found_closed_parenthesis && found_semi_column) {
					break;
				}
			}
			tab_query.push(temp);
		});
		// console.log(tab_query[0]);
		return tab_query;
	}

	static parse(sql_table) {
		sql_table = removeComments(sql_table);
		// console.log(sql_table)
		let first = sql_table.split(/\(/)[0];
		let var_part = sql_table.split(first + '(')[1];
		
		/create([\t\n ]+)table([\t\n ]+)(.+)?\(/gi.test(sql_table);
		let table_name = RegExp.$3;
		let var_sections = var_part.split(/,[ \r\t\n]*/);
		let attributes = [];
		var_sections.forEach(sec => {
			// tokenizes as something like ['idstudent', ' VARCHAR', 'NOT NULL', ...];
			let temp = sec.match(/[ \t]*([\w\d]+)[ \t]/gi);
			if (temp == null)
				return;
			temp = temp.map(removeSpace);
			const [name, type] = temp; // first and second items
			attributes.push(new SQLVar(name, type));
		});
		
		return {
			table_name : removeSpace(table_name),
			attributes : attributes
		}
	}	
}
