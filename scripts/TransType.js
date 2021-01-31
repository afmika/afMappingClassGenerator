const majFirst = str => {
	return str[0].toUpperCase() + str.substr(1, str.length - 1);
}
/**
 * @author afmika
 */
module.exports = class TransType {

	/**
	 * @params {string} var_name
	 * @params {Type} type_obj
	 */
	constructor (var_name, type_obj) {
		this.var_name = var_name;
		this.type_obj = type_obj;
	}

	// prefix type name = default;
	asAttr(prefix) {
		let type = this.type_obj.getName();
		let def = this.type_obj.getDefault();
		let pref = prefix ? prefix + ' ' : ''; 
		return `${pref}${type} ${this.var_name} = ${def};`;
	}

	// prefix type setName(type name)
	asSetter(prefix) {
		let type = this.type_obj.getName();
		let pref = prefix ? prefix + ' ' : ''; 
		return `${pref}void set${majFirst(this.var_name)} (${type} ${this.var_name})`;	
	}

	// prefix type getName()
	asGetter(prefix) {
		let type = this.type_obj.getName();
		let pref = prefix ? prefix + ' ' : ''; 
		return `${pref}${type} get${majFirst(this.var_name)} ()`;		
	}

	// setName(name);
	asConstr() {
		return `set${majFirst(this.var_name)} (${this.var_name});`;		
	}
}