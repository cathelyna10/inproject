const db = require('../database')

exports.all = async () => {
  const { rows } = await db.getPool().query("select * from country order by id");
  return db.camelize(rows);
 }
 exports.add = async (country) => {
  return db.getPool()
    .query("INSERT INTO country(country_name) VALUES($1) RETURNING *", [country.country_name]);
}
exports.get = async (id) => {
  const { rows } = await db.getPool().query("select * from country where id = $1", [id])
  return db.camelize(rows)[0]
 }

exports.update = async (country) => {
  return await db.getPool()
    .query("UPDATE country SET country_name = $1 where id = $2 RETURNING *",
      [country.country_name, country.id]); 
}

exports.upsert = async (country) => {
  if (country.id) {
   return exports.update(country);
 } else {
   return exports.add(country);
 }
}
 

exports.getEventsForCountry = async (countryId) => {
  try {
    const { rows } = await db.getPool().query(`
      SELECT e.event_name
      FROM event e
      JOIN event_country ec ON e.id = ec.event_id
      WHERE ec.country_id = $1;
    `, [countryId]);
    return db.camelize(rows);
  } catch (error) {
    console.error('Error fetching events for country:', error);
    throw error;
  }
};







 
/*
  exports.upsert = async (genre) => {
    if (genre.id) {
      return exports.update(genre.id, genre.name)
    }
    return exports.create(genre.name)
   }
exports.create = async (name) => {
  return db.getPool().query("INSERT INTO country(country_name) VALUES($1) RETURNING *", [name]);
 }
   exports.update = async (id, name) => {
    return db.getPool().query("UPDATE country SET name = $1 where id = $2 RETURNING *", [name, id]);
   }
   
   exports.upsert = (genre) => {
    if (genre.id) {
      exports.update(genre);
    } else {
      exports.add(genre);
    }
  }
  */
 /*
const genres = [
    {genreName: "Theory"},
    {genreName: "Philosophy"},
    {genreName: "Manifesto"},
  ]
  //the req body, were going to give it a name aka genre
  // array?
 */
 
/*   
  exports.update = (genre) => {
    genres[genre.id] = genre;
  }
 */

  //the req body, were going to give it a name aka genre
  // array?

  //exports.all = genres

   
   
    /*exports.get = (idx) => {
    return genres[idx];
  }
  
  exports.add = (genre) => {
    genres.push(genre);
  }*/