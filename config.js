username = "SLMT"
hostname = "127.0.0.1"
dbName = "very_sec_db"

process.env.DB_URL = `postgres://${username}@${hostname}/${dbName}`;
