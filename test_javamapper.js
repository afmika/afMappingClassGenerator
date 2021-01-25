const mapJavaFrom = require(__dirname.replace(/\\/gi, '/') + '/JavaMapper');

let sql = `
	CREATE TABLE Client (
		-- some comments
		id INT PRIMARY KEY,-- somme comments
		ref INT,
		name VARCHAR(20), -- somme comments
		birth DATE,-- somme comments
		hello TIMESTAMP,
		FOREIGN KEY (ref) REFERENCES Something(ref),
		-- somme comments
	)`;

let output = mapJavaFrom(sql);

require('fs').writeFileSync('output/out.java', output);
console.log(output);
