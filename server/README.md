# API Server for BSU-tennants web application
## POST requests
The following are the routes for server's POST request. These are mostly CreateUpdateDelete operation on the database.

### `/api/login` **authority: none**
Logs in the credentials provided, and checks if the credentials provided is a valid credential

**request format:** `{"username": <username/email>, "password": <password>}`

**response format:** `{loggedin: <true/false>, error: <error>}`



### `/api/register/student` **authority: none**
Registers an *unverified* student account, for verification, an **admin** must verify it first.

**request format:**

```
{
    "username": <username>,
    "password": <password>,
    "email": <email>,
    "contact": <contact no.>,
    "name": {
        "first": <firstname>,
        "last": <lastname>,
        "middle": <middlename>
    }
}
```

**response format:** `{"created": <true/false>, error: <error>}`

### `/api/register/admin` **authority: admin**
Registers an admin account. ONLY admin can use this route

**request format:**

```
{
    "password": <password>,
    "email": <email>,
    "contact": <contact no.>,
    "name": {
        "first": <firstname>,
        "last": <lastname>,
        "middle": <middlename>
    }
}
```