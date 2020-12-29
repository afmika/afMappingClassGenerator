/**
 * @author afmika
 */
module.exports = class TemplateLoader {
	constructor (template) {
		this.template = template || '';
		this.var_def = /\${\w+}/gi;
	}

	static loadFromFile(filepath) {
		const content = require('fs').readFileSync(filepath);
		let temp = new TemplateLoader(content.toString());
		return temp;
	}

	setTemplate(template) {
		this.template = template;
	}

	feed (map) {
		
		for(let key in map) {
			let value = map[key];
			if (!this.var_def.test(key)) {
				delete(map[key]);
				map['${' + key + '}'] = value;
			}
		}
		return this.template.replace(this.var_def, it => {
			if (map[it])
				return map[it];
			return it;
		});
	}
}