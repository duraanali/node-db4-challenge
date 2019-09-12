
exports.seed = function (knex) {

  return knex('instructions').insert([
    { instruction: 'Dont over cook' },
  ]);
};
