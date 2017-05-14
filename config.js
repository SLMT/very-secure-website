// TODO: Change the following connection information to yours
PG_USERNAME = "SLMT"
PG_PASSWORD = "" // Leave this empty if the user do not have a password
PG_HOSTNAME = "127.0.0.1"
PG_PORT = "5432"
PG_DB_NAME = "very_sec_db"

if (PG_PASSWORD && PG_PASSWORD != "")
  process.env.DB_URL = `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOSTNAME}:${PG_PORT}/${PG_DB_NAME}`;
else
  process.env.DB_URL = `postgres://${PG_USERNAME}@${PG_HOSTNAME}:${PG_PORT}/${PG_DB_NAME}`;
