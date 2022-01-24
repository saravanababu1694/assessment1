/* DataBase Connectivity */

export const dbSetting = {
  host: 'ec2-3-222-49-168.compute-1.amazonaws.com',
  port: 5432,
  database: 'd4m6e055t45i28',
  user: 'sqqhzkgvilgjrz',
  password: '457a519aa8c4067391745b42e1359c54eab26e985ea97cece655db9471b62744',
  keepAlive: false,
  connectionString: 'postgres://sqqhzkgvilgjrz:457a519aa8c4067391745b42e1359c54eab26e985ea97cece655db9471b62744@ec2-3-222-49-168.compute-1.amazonaws.com:5432/d4m6e055t45i28',
  ssl: { rejectUnauthorized: false }
};

export const appConfig = {
  secretKey: 'TechnicalAssessment',
  expiresIn : '1h'
}
import { Pool } from "pg";
const pool = new Pool(dbSetting);

export const dbPool = {
  query: text => pool.query(text),
  pool: pool
};


// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", err => {
  console.error('Unexpected error on idle client "DATABASE" class: ', err);
  process.exit(-1);
});


