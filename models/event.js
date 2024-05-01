const db = require('../database');

exports.all = async () => {
  const { rows } = await db.getPool().query("SELECT * FROM event ORDER BY id");
  return db.camelize(rows);
};

exports.get = async (id) => {
  const { rows } = await db.getPool().query("SELECT * FROM event WHERE id = $1", [id]);
  return db.camelize(rows)[0];
};


exports.getIndividuals = async (eventId) => {
  try {
    const { rows } = await db.getPool().query(`
    SELECT i.individual_name, i.individual_role
    FROM event e
    JOIN individual_event ie ON e.id = ie.event_id
    JOIN individual i ON ie.individual_id = i.id
    WHERE e.id = $1;
    
    `, [eventId]);
    return db.camelize(rows); 
  } catch (error) {
    console.error('Error retrieving individuals:', error);
    throw error;  
  }
};
exports.allForEvent = async (eventId) => {
  try {
    const { rows } = await db.getPool().query(`
    SELECT e.id, e.event_name, e.event_year, c.country_name, ua.action_name, ua.action_description
    FROM event e 
    JOIN event_country ec ON e.id = ec.event_id
    JOIN country c ON ec.country_id = c.id
    JOIN us_action ua ON e.us_action_id = ua.id
    WHERE e.id = $1;
    `, [eventId]); 
    return db.camelize(rows);
  } catch (error) {
    console.error('Failed to retrieve event details:', error);
    throw error; // Propagate the error
  }
};  