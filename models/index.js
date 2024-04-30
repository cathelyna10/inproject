const db = require('../database');

exports.all = async () => {
  const { rows } = await db.getPool().query("SELECT * FROM event ORDER BY id");
  return db.camelize(rows);
};

exports.get = async (id) => {
  const { rows } = await db.getPool().query("SELECT * FROM event WHERE id = $1", [id]);
  return db.camelize(rows)[0];
};

exports.allForEvent = async (eventId) => {
  const { rows } = await db.getPool().query(`
  SELECT e.id, e.event_name, e.event_year, c.country_name, ua.action_name, ua.action_description, i.individual_name, i.individual_role 
FROM 
  event e 
  JOIN event_country ec ON e.id = ec.event_id
  JOIN country c ON ec.country_id = c.id
  JOIN us_action ua ON e.us_action_id = ua.id
  LEFT JOIN individual_event ie ON e.id = ie.event_id 
  LEFT JOIN individual i ON ie.individual_id = i.id
WHERE e.id = $1;
  `, [eventId]); 
  return db.camelize(rows);
};
