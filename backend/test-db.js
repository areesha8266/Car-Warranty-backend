const { Client } = require('pg');
const connectionString = 'postgresql://postgres.fjcgzicfycsenozikfsx:MySecurePass123!@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => {
    console.log('Successfully connected to PostgreSQL (Pooled)');
    return client.query('SELECT NOW()');
  })
  .then(res => {
    console.log('Current time:', res.rows[0]);
    return client.end();
  })
  .catch(err => {
    console.error('Connection error', err.stack);
    process.exit(1);
  });
