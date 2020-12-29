/**
 * @author afmika
 */

const Type = require('./scripts/Type');
const TemplateLoader = require('./scripts/TemplateLoader');
const MappingGenerator = require('./scripts/MappingGenerator');
const SQLVar = require('./scripts/SQLVar');
const SQLParser = require('./scripts/SQLParser');

/**
 * @params {string} table_name
 * @params {SQLVar} sql_vars
 * @params {boolean} non_public
 */
function mapJavaUsing(table_name, sql_vars, non_public = false) {
	const template  = TemplateLoader.loadFromFile('template/java.template');
	const generator = new MappingGenerator();

	// type map
	generator.setTypeMap({
		'int' : new Type('int', 0),
		'double' : new Type('float', 0),
		'float' : new Type('float', 0),
		'varchar|varchar([0-9]+)' : new Type('String', null),
		'Timestamp|Date' : new Type('Timestamp', null),

		// default
		'(.)+' : new Type('String', null)
	});

	generator.setTableName(table_name);
	generator.setAttributes(sql_vars);

	// converts the meta input into meta java according
	// to typeMap/attributes/tableName 
	const meta_java = generator.extract();

	const indent = (n, str) => new Array(n).fill('\t').join('') + str;
	
	// prefixes
	let attr_pref = non_public ? '' : 'public';
	let pref = 'public';
	
	// building the class
	let attrs = '', constr_def = '', 
		set_def = '', get_def = '';
	let enum_var = [];
	meta_java['attributes'].forEach(attr => {
		const name = attr.var_name;
		attrs += indent(1, attr.asAttr(attr_pref) + '\n');

		// setter
		set_def += indent(1, attr.asSetter(pref) + ' {\n');
		set_def += indent(2, `this.${name} = ${name};\n`);
		set_def += indent(1, '}\n');

		// getter
		get_def += indent(1, attr.asGetter(pref) + ' {\n');
		get_def += indent(2, `return this.${name};\n`);
		get_def += indent(1, '}\n');

		// constructor
		constr_def += indent(2, attr.asConstr() + '\n');
		enum_var.push(`${attr.type_obj.getName()} ${name}`);
	});

	let constr_1 = indent(1, `public ${meta_java['table_name']} (${ enum_var.join(', ') }) {\n`);
	let constr_2 = indent(1, '}');
	constr_def = constr_1 + constr_def + constr_2;

	// feeding the template
	return template.feed({
		'CLASS_NAME' : meta_java['table_name'],
		'ATTRIBUTES' : attrs,
		'CONSTR_DEF' : constr_def,
		'SET_DEF' : set_def,
		'GET_DEF' : get_def
	});	
}

function mapJavaFrom( sql_table ) {
	let input = SQLParser.parse(sql_table);
	return mapJavaUsing(
		input.table_name,
		input.attributes
	);
}

module.exports = mapJavaFrom;