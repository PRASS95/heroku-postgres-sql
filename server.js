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
	  console.log('connected')
	}
  });

client.query('SELECT * FROM leaderboard', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
