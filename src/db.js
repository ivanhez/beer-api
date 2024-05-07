import conn from "./conn.js";

export async function getAllPosts() {
  const [rows] = await conn.query("SELECT * FROM tbl_beer");
  return rows;
}

export async function getPostById(id) {
  const [rows] = await conn.query("SELECT * FROM tbl_beer WHERE id = ?", [id]);
  return rows;
}

export async function createPost(postData) {
  const { beer_name, beer_type, flavors, abv, ibu, brewery } = postData;
  const [result] = await conn.query(
    "INSERT INTO tbl_beer (beer_name, beer_type, flavors, abv, ibu, brewery) VALUES (?, ?, ?, ?, ?, ?)",
    [beer_name, beer_type, flavors, abv, ibu, brewery]
  );
  return getPostById(result.insertId);
}

export async function updatePostById(id, postData) {
  const entries = Object.entries(postData);
  const setClause = entries.map(([key, _]) => `${key} = ?`).join(", ");
  const values = entries.map(([_, value]) => value);

  values.push(id);

  const query = `UPDATE tbl_beer SET ${setClause} WHERE id = ?`;

  await conn.query(query, values);
  return getPostById(id);
}

export async function deletePostById(id) {
  const [result] = await conn.query("DELETE FROM tbl_beer WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

export async function login(user, password_md5) {
  const [rows] = await conn.query(
    "SELECT id FROM users WHERE user = ? AND password = ?",
    [user, password_md5]
  );
  if (rows.length === 1) {
    return rows[0].id;
  }
  return false;
}

export async function register(user, password_md5) {
  const [rows] = await conn.query(
    "INSERT INTO users (user, password) VALUES (?, ?)",
    [user, password_md5]
  );
  return rows;
}

export async function user_permissions(user_id) {
  const [rows] = await conn.query(
    "SELECT action FROM actions WHERE user_id = ?",
    [user_id]
  );
  return rows.map((row) => row.action);
}
