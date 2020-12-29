const mapJavaFrom = require('./JavaMapper');

let sql = `
	CREATE TABLE Client (
		-- some comments
		id INT PRIMARY KEY,-- somme comments
		ref INT,
		name VARCHAR(20), -- somme comments
		birth DATE,-- somme comments
		FOREIGN KEY (ref) REFERENCES Something(ref),
		-- somme comments
	)`;

let output = mapJavaFrom(sql);

require('fs').writeFileSync('out.java', output);
console.log(output);