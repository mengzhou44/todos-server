import { Pool } from 'pg';

 const pool = new Pool({
  user: 'menzhou',
  password: 'Aa1197344',
  host: 'localhost',
  port: 5432,
  database: 'perntodo',
});
 
export default pool