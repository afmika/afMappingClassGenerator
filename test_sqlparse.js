const SQLParser = require('./scripts/SQLParser');
let out = SQLParser.parse(`
CREATE TABLE Client (
	id INT PRIMARY KEY,
	ref INT,
	name VARCHAR(20),
	birth DATE
)`
)
console.log(out);
