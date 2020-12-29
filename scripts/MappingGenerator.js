/**
 * @author afmika
 */
const TransType = require('./TransType');
module.exports = class MappingGenerator {
	constructor (map) {
		this.setTypeMap(map || {});
	}

	setTypeMap (map) {
		this.map = map;
		this.table_name = '';
		this.attributes = [];
	}

	setTableName (name) {
		this.table_name = name;
	}

	setAttributes (attrs) {
		this.attributes = attrs;
	}

	/**
	 * Fetches the correct type for the given sql type
	 */
	get (sql_type) {
		for (let k in this.map) {
			let reg = new RegExp(k, 'gi');
			if (reg.test(sql_type))
				return this.map[k];
		}
		return null;
	}

	extract() {
		let converted_attr = [];
		this.attributes.forEach(sql_var => {
			const translated = new TransType(
				sql_var.getName(),
				this.get(sql_var.getType()) // sql -> meta lang
			);

			converted_attr.push(translated);
		});
		return {
			'table_name' : this.table_name,
			'attributes' : converted_attr
		}
	}
}