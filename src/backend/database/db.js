const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const queryConvert = (parameterizedSql, params = {}) => {
  const [text, values] = Object.entries(params).reduce(
    ([sql, array, index], [key, value]) => {
      const regex = new RegExp(`:${key}(?!\\w)`, 'g');
      const replacedSql = sql.replace(regex, `$${index}`);
      return [replacedSql, [...array, value], index + 1];
    },
    [parameterizedSql, [], 1]
  );
  return { text, values };
}

exports.queryDB = async (sql, values={}) => {
  try{
    await pool.query('BEGIN');
    const response = await pool.query(queryConvert(sql, values));
    await pool.query('COMMIT');
    return response
  } catch(e) {
    await pool.query('ROLLBACK');
    throw new Error('Error on database connection')
  }
  
}
