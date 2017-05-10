if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function list() {
    const sql = `
        SELECT * FROM posts
        ORDER BY id DESC
    `;
    return db.any(sql);
}

function get(id) {
    const sql = `
        SELECT * FROM posts
        WHERE id = ${id}
    `;
    return db.any(sql);
}

module.exports = {
    list,
    get
};
