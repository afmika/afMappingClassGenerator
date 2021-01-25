const SQLParser = require(__dirname.replace(/\\/gi, '/') + '/scripts/SQLParser');
let out = SQLParser.parse(`
	CREATE           TABLE           Client               (
		id      INT       PRIMARY KEY AUTO_INCREMENT,
		ref         DOUBLE,
		name VARCHAR(20),
		birth           DATE,
		randdate             DATE
	) engine  = innodb;`
);

console.log(out);
