exports.seed = function (knex) {
  console.log("asd");
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "angel",
          password: "password",
          department: "operations",
        },
      ]);
    });
};
