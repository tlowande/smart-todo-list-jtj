// load .env data into process.env
const addTask = async function (task, user_id, category_id) {
  const queryString = `
  INSERT INTO tasks (input, user_id, category_id)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const values = [task, user_id, category_id];
  console.log(values, queryString);
  try {
    const addTask = await db.query(queryString, values)
    return addTask.rows[0]
  } catch (err) {
    console.error('query error', err.stack)
  }
}

// addTask('buy this', 2, 2).then((res) => console.log(res));

module.exports = { addTask };

