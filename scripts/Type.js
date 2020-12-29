/**
 * @author afmika
 */
module.exports = class Type {
	constructor (type_name, default_value) {
		this.name = type_name;
		this.default_value = default_value;
	}

	getName() {
		return this.name;
	}

	getDefault() {
		return this.default_value;
	}
}