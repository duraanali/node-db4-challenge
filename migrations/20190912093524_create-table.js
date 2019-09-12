
exports.up = function (knex) {
    return knex.schema
        .createTable('recipes', tbl => {
            tbl.increments();
            tbl.string('recipe_name', 128)
                .notNullable();

        })
        // we can chain together createTable
        .createTable('ingredients', tbl => {
            tbl.increments();
            tbl.string('ingredient_name', 128)
                .notNullable();

        })
        .createTable('instructions', tbl => {
            tbl.increments();
            tbl.string('instruction', 128);

        })
        .createTable('recipes_ingredients', tbl => {
            tbl
                .integer('recipe_id')
                .unsigned()
                .references('id')
                .inTable('recipes')
                .onDelete('CASCADE') // if the PK record is deleted
                .onUpdate('CASCADE'); // if the PK value updates

            tbl
                .integer('ingredient_id')
                .unsigned()
                .references('id')
                .inTable('ingredients')
                .onDelete('CASCADE') // if the PK record is deleted
                .onUpdate('CASCADE'); // if the PK value updates


            // the combination of the two keys becomes our primary key
            // will enforce unique combinations of ids
            tbl.primary(['recipe_id', 'ingredient_id']);
        });
};

exports.down = function (knex) {
    // drop in the opposite order
    return knex.schema
        .dropTableIfExists('instructions')
        .dropTableIfExists('recipes_ingredients')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('recipes')
};
