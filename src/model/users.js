if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function get(username, password) {
    const sql = `
        SELECT * FROM users
        WHERE username = '${username}' AND password = '${password}'
    `;
    return db.any(sql);
}

module.exports = {
    get
};
