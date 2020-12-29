/**
 * @author afmika
 */
module.exports = class SQLVar {
	constructor (name, type) {
		this.name = name;
		this.type = type;
	}

	getName() {
		return this.name;
	}

	getType() {
		return this.type;
	}
}