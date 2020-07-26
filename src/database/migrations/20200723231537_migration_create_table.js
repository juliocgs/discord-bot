exports.up = function (knex) {
    return knex.schema
        .createTable('reminder', function (table) {
            table.uuid('id').primary();
            table.string('user_id', 255).notNullable();
            table.text('message').notNullable();
            table.datetime('execution_date').notNullable();
        });
}

exports.down = function (knex) {
    return knex.schema.dropTable('reminder');
}