const db = require("../../database/db-config");

module.exports = {
  find,
  filterBy,
  add,
  usersByDepartment,
};

function find() {
  return db("users");
}

function usersByDepartment(department) {
  return db("users").where(department);
}

function filterBy(filter) {
  return db("users").where(filter).orderBy("id");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user);

    return id;
  } catch (err) {
    throw err;
  }
}
