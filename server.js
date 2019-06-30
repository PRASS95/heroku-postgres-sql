const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

console.log("Running...");

client.connect((err) => {
	if (err) {
	  console.error('connection error', err.stack)
	} else {
	  console.log('Connected')
	}
  });


const add = 'INSERT INTO "public"."leaderboard"("date", "score", "nickname") VALUES("01-01-2019", "666", "ROMAIN") RETURNING "id", "date", "score", "nickname";';

client.query(add, (err, res)=>{

	if (err) throw err;

	console.log('INSERT: Success!');

	getAllRows();

});

const getAllRows = ()=>{

	console.log('getAllRows');

	client.query('SELECT * FROM leaderboard', (err, res) => {
		if (err) throw err;
		console.log('Success', res);
		for (let row of res.rows) {
		  console.log(JSON.stringify(row));
		}
		client.end();
	  });

};

