
exports.up = function (knex) {
    return knex.schema
        .createTable('recipes', tbl => {
            tbl.increments();
            tbl.string('recipe_name', 128)
                .notNullable();
            tbl.integer('ingredient_id')
                // forces integer to be positive
                .unsigned()
                .notNullable()
                .references('id')
                // this table must exist already
                .inTable('ingredients')
        })
        // we can chain together createTable
        .createTable('ingredients', tbl => {
            tbl.increments();
            tbl.string('ingredient_name', 128);
            tbl.integer('recipe_id')
                // forces integer to be positive
                .unsigned()
                .notNullable()
                .references('id')
                // this table must exist already
                .inTable('recipes')
        })

        .createTable('recipes_ingredients', tbl => {
            tbl.integer('recipe_id')
                .unsigned()
                .notNullable()
                .references('id')
                // this table must exist already
                .inTable('recipes')
            tbl.integer('ingredient_id')
                .unsigned()
                .notNullable()
                .references('id')
                // this table must exist already
                .inTable('ingredients')

            // the combination of the two keys becomes our primary key
            // will enforce unique combinations of ids
            tbl.primary(['recipe_id', 'ingredient_id']);
        });
};

exports.down = function (knex) {
    // drop in the opposite order
    return knex.schema
        .dropTableIfExists('recipes_ingredients')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('recipes')
};
