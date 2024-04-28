const db = require('../database')

exports.all = async () => {
  const { rows } = await db.getPool().query("select * from individual order by id");
  return db.camelize(rows);
 }

exports.get = async (id) => {
  const { rows } = await db.getPool().query("select * from individual where id = $1", [id])
  return db.camelize(rows)[0]
 }

 