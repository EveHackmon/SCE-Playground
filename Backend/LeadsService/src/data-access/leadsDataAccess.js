import pool from './db.js';

export const createLead = async ({ full_name, phone, email, product_interest,lead_source }) => {
  const result = await pool.query(
    `INSERT INTO leads (full_name, phone, email, product_interest,lead_source)
     VALUES ($1, $2, $3, $4,$5)
     RETURNING *`,
    [full_name, phone, email, product_interest,lead_source]
  );
  return result.rows[0]; 
};



export const getAllLeads = async () => {
    const result = await pool.query('SELECT * FROM leads ORDER BY submission_date DESC');
    return result.rows;
  };


export const findLeadsByName = async (name) => {
    const result = await pool.query(
      'SELECT * FROM leads WHERE full_name ILIKE $1',
      [`%${name}%`] 
    );
    return result.rows;
  };

  export const filterLeadsByStatus = async (status) => {
    const result = await pool.query(
      'SELECT * FROM leads WHERE status ILIKE $1',
      [status]
    );
    return result.rows;
  };
  
  
  export const sortByNameAsc = async () => {
    const result = await pool.query(
      'SELECT * FROM leads ORDER BY LOWER(full_name) ASC'
    );
    return result.rows;
  };
  
  export const sortByNameDesc = async () => {
    const result = await pool.query(
      'SELECT * FROM leads ORDER BY LOWER(full_name) DESC'
    );
    return result.rows;
  };
  
  export const sortByProductAsc = async () => {
    const result = await pool.query(
      'SELECT * FROM leads ORDER BY product_interest ASC'
    );
    return result.rows;
  };
  
  export const sortByProductDesc = async () => {
    const result = await pool.query(
      'SELECT * FROM leads ORDER BY product_interest DESC'
    );
    return result.rows;
  };
  
  export const sortByDateAsc = async () => {
    const result = await pool.query(
      'SELECT * FROM leads ORDER BY submission_date ASC'
    );
    return result.rows;
  };
  
  export const sortByDateDesc = async () => {
    const result = await pool.query(
      'SELECT * FROM leads ORDER BY submission_date DESC'
    );
    return result.rows;
  };
  
  
  export const updateNoteByEmail = async (email, note) => {
    const result = await pool.query(
      `UPDATE leads
       SET note = $1
       WHERE email = $2
       RETURNING *`,
      [note, email]
    );
    return result.rows[0];
  };
  export const updateStatusByEmail = async (email, status) => {
    const result = await pool.query(
      `UPDATE leads
       SET status = $1
       WHERE email = $2
       RETURNING *`,
      [status, email]
    );
    return result.rows[0];
  };
  export const deleteLeadsByEmails = async (emails) => {
    const result = await pool.query(
      `DELETE FROM leads
       WHERE email = ANY($1::text[])
       RETURNING *`,
      [emails]
    );
    return result.rows;
  };
  export const getLeadsByProductName = async (productName) => {
    const result = await pool.query(
      'SELECT * FROM leads WHERE product_interest ILIKE $1',
      [productName] 
    );
    return result.rows;
  };
  
