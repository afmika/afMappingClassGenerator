const Type = require(__dirname.replace(/\\/gi, '/') + '/scripts/Type');
const TemplateLoader = require('./scripts/TemplateLoader');
const MappingGenerator = require('./scripts/MappingGenerator');
const SQLVar = require('./scripts/SQLVar');

const template  = new TemplateLoader();
template.loadFromFile('template/java.template');

let result = template.feed({
	'ATTRIBUTES' : 'some_shits',
	'CLASS_NAME' : 'Personne'
});

console.log(result);

const generator = new MappingGenerator();

generator.setTypeMap({
	'int' : new Type('int', 0),
	'double' : new Type('float', 0),
	'float' : new Type('float', 0),
	'varchar|varchar([0-9]+)' : new Type('String', null),
	'Timestamp|Date' : new Type('Timestamp', null)
});

generator.setTableName('Personne');
generator.setAttributes([
	new SQLVar('nom', 'varchar(20)'),
	new SQLVar('prenom', 'varchar(20)'),
	new SQLVar('mensuration', 'float'),
	new SQLVar('date_naissance', 'Date'),
]);


console.log(generator.get('Date'));