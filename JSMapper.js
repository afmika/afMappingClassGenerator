/**
 * @author afmika
 */

const Type = require(__dirname.replace(/\\/gi, '/') + '/scripts/Type');
const TemplateLoader = require(__dirname.replace(/\\/gi, '/') + '/scripts/TemplateLoader');
const MappingGenerator = require(__dirname.replace(/\\/gi, '/') + '/scripts/MappingGenerator');
const SQLVar = require(__dirname.replace(/\\/gi, '/') + '/scripts/SQLVar');
const SQLParser = require(__dirname.replace(/\\/gi, '/') + '/scripts/SQLParser');
/**
 * @params {string} table_name
 * @params {SQLVar} sql_vars
 * @params {boolean} non_public
 */
function mapJSUsing(table_name, sql_vars, non_public = false) {
	console.log('name' , table_name)
	const template  = TemplateLoader.loadFromFile(__dirname.replace(/\\/gi, '/') + '/template/js.template');
	const generator = new MappingGenerator();

	// type map
	generator.setTypeMap({
		'int' : new Type('', 0),
		'double' : new Type('', 0),
		'float' : new Type('', 0),
		'varchar|varchar([0-9]+)' : new Type('', null),

		// default
		'(.)+' : new Type('', null)
	});

	generator.setTableName(table_name);
	generator.setAttributes(sql_vars);

	// converts the meta input into meta java according
	// to typeMap/attributes/tableName 
	const meta_js = generator.extract();

	const indent = (n, str) => new Array(n).fill('\t').join('') + str;
	const majFirst = str => {
		return str[0].toUpperCase() + str.substr(1, str.length - 1);
	}
	// prefixes
	let attr_pref = '';
	let pref = '';
	
	// building the class
	let attrs = '', constr_def = '', 
		set_def = '', get_def = '', to_string_def = '';
	let enum_var = [];
	meta_js['attributes'].forEach(attr => {
		const name = attr.var_name;
		attrs += indent(1, attr.asAttr(attr_pref) + '\n');
		to_string_def += " " + attr.var_name + ' = " + this.' + attr.var_name +  ' + "'; // to_string
		
		// setter
		set_def += indent(1, 'set' + majFirst(attr.var_name) + ' (' + attr.var_name + ') {\n');
		set_def += indent(2, `this.${name} = ${name};\n`);
		set_def += indent(1, '}\n');

		// getter
		get_def += indent(1, 'get' + majFirst(attr.var_name) + ' () {\n');
		get_def += indent(2, `return this.${name};\n`);
		get_def += indent(1, '}\n');

		// constructor
		constr_def += indent(2, attr.asConstr() + '\n');
		enum_var.push(`${attr.type_obj.getName()} ${name}`);
	});

	let constr_1 = indent(1, `constructor (${ enum_var.join(', ') }) {\n`);
	let constr_2 = indent(1, '}');
	constr_def = constr_1 + constr_def + constr_2;

	// feeding the template
	return template.feed({
		'CLASS_NAME' : meta_js['table_name'],
		'ATTRIBUTES' : attrs,
		'CONSTR_DEF' : constr_def,
		'SET_DEF' : set_def,
		'GET_DEF' : get_def,
		'TO_STRING_DEF' : '"[' + to_string_def + ' ]"'
	});	
}

function mapJSFrom( sql_table, non_public = false ) {
	let input = SQLParser.parse(sql_table);
	return mapJSUsing(
		input.table_name,
		input.attributes,
		non_public
	);
}

module.exports = mapJSFrom;