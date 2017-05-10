# Very Secure Website

Actually, this website is very **insecure**.

The website is a demostration for some common attacks to web servers.

## Preparation

1. Install [PostgreSQL](https://www.postgresql.org/) and create a database on it.

2. Run `node install` to install dependencies for this server.

3. Configure `config.js` in order to connect to your PostgreSQL database.

4. Run `node src/model/schema.js` to initialize your database.

5. Run `node src/server.js` to start up your server.
  - The server will be run on port `8080`.

6. Enjoy !

## Vulnerability

Here are the vulnerabilities you can try on this website:

### SQL Injections

#### Login as Administrator

Type in `admin' --` as username and anything as password on the login form.

#### View All Tables and Their Columns in The Database

Send a GET request to this URL:

```
http://127.0.0.1:8080/api/posts?id=-1 UNION SELECT 1, table_name, column_name FROM information_schema.columns WHERE table_schema = 'public';
```

You can achieve this by simply typing this on the URL bar of your browser.

#### View All Users' Data

Send a GET request to this URL:

```
http://127.0.0.1:8080/api/posts?id=-1 UNION SELECT id, username, password FROM users;
```

You can achieve this by simply typing this on the URL bar of your browser.

### Brute-Force Attacks

#### Brute-Force the Password of the Administrator

Run `node util/brute.js`

## Defense

### SQL Injections

To prevent SQL injections, you could use [Prepared Statements](https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example#prepared-statements) provided by [pg-promise](https://github.com/vitaly-t/pg-promise).

Prepared statements clearly separate the SQL command and the data. Therefore, it prevents the client inputs become a part of SQL command.

### Brute-Force Attacks

A simple way to prevent brute-force attacks is limit how many times a user can try to login in a given time window. [rate-limiter](https://github.com/tj/node-ratelimiter) is a good middleware for this job.

## References

- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
  - A checklist for developers to prevent security risks on Node.js.
- [OWASP Node Goat Project](https://www.owasp.org/index.php/Projects/OWASP_Node_js_Goat_Project)
  - An example project for developers to learn how common security risks on Node.js apply to web applications developed using Node.js and how to effectively address them.
