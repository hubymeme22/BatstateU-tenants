# API Server for BSU-tennants web application
## POST requests
Following are the list of POST request routes from the server:

```
/api/login
/api/login/admin
/api/register/admin  -- (admin)
/api/register/student
/api/forgotpass/
/api/forgotpass/pin/:key
/api/forgotpass/change/:key
/api/admin/billing/:slot/:username -- (admin)
/api/admin/slots/new  -- (admin)
/api/admin/students/room -- (admin)
/api/admin/students/pay/:srCode -- (admin)
```

## GET requests
Following are the list of GET request routes from the server
```
/api/admin/billing/ -- (admin)
/api/admin/billing/unpaid -- (admin)
/api/admin/billing/unpaid/:username -- (admin)
/api/admin/students/details -- (admin)
/api/admin/slots/ -- (admin)
/api/admin/slots/available -- (admin)
/api/admin/slots/available/:space -- (admin)
/api/admin/summary/room/:roomID -- (admin)
```

## DELETE requests
Following are the list of DELETE request routes from the server
```
/api/admin/billing/:slot/:username -- (admin)
```

## PUT requests
Followng are the list of PUT request routes from the server
```
/api/admin/students/verify -- (admin)
/api/admin/students/unverify -- (admin)
```

<br><br>

# API Routes Documentation
Below are the individual routes, their purposes, usage, authorization, etc.

<br>

## Student login
- **`/api/login/student`**
  - Logs in a student account
  - **Permission**: Public (anyone can use this route)
  - **Method**: <b style="color: yellow">POST</b>
  - **Parameters**: `username`, `password`
  - Sample request:
    ```json
    {
        "username": "20-00000",
        "password": "password123"
    }
    ```
  - Sample Response:
    ```json
    { "isLoggedIn": true, "error": "", "token": "..." }
    ```
  - This route returns three(3) key responses: `isLoggedIn`, `token` and `error`
    - `isLoggedIn` can be `true` if the requested credentials has successfully logged in or `false` if not.
    - `token` is a series of pseudorandomly generated string returned by the server if the login is successful.
    - `error` contains a string/JSON which can be used for debugging.

<br>

## Admin login
- **`/api/login/admin`**
  - Logs in an admin account
  - **Permission**: Public (anyone can use this route)
  - **Method**: <b style="color: yellow">POST</b>
  - **Parameters**: `email`, `password`
  - Sample request:
    ```json
    {
        "email": "admin@g.batstate-u.edu.ph",
        "password": "admin"
    }
    ```
  - Sample Response:
    ```json
    { "isLoggedIn": true, "error": "", "token": "..." }
    ```
  - This route returns three(3) key responses: `isLoggedIn`, `token` and `error`
    - `isLoggedIn` can be `true` if the requested credentials has successfully logged in or `false` if not.
    - `token` is a series of pseudorandomly generated string returned by the server if the login is successful.
    - `error` contains a string/JSON which can be used for debugging.

<br>

## Admin Registration
- **`/api/admin/register/admin`**
  - Registers an admin account
  - **Permission**: Admin
  - **Method**: <b style="color: yellow">POST</b>
  - **Parameters**: `email`, `contact`, `name`, `password`, `token`
    - note: `name` is a json containing the ff:
      - `first` - firstname of the admin
      - `last` - lastname of the admin
      - `middle` - middlename of the admin
    - note: Since admins are the only accounts that has authority to create another admin, `token` is also added as parameter for session authority checking.

  - Sample request:
    ```json
    {
        "email": "admin@g.batstate-u.edu.ph",
        "contact": "+6391234567890",
        "password": "admin",
        "token": "...",
        "name": {
            "first": "Juan",
            "middle": "Dela",
            "last": "Cruz"
        }
    }
    ```
  - Sample Response:
    ```json
    { "created" : true, "error": "" }
    ```
  - This route returns two(2) key responses: `created` and `error`
    - `created` set to `true` if the new account is created, otherwise `false`.
    - `error` contains a string/JSON which can be used for debugging.


<br>

## Student Registration
- **`/api/register/student`**
  - Registers a student account
  - **Permission**: Public (Anyone can use this route)
  - **Method**: <b style="color: yellow">POST</b>
  - **Parameters**: `username`, `email`, `contact`, `name`, `password`
    - note: `name` is a json containing the ff:
      - `first` - firstname of the admin
      - `last` - lastname of the admin
      - `middle` - middlename of the admin
  - Sample request:
    ```json
    {
        "username": "20-00000",
        "email": "admin@g.batstate-u.edu.ph",
        "contact": "+6391234567890",
        "password": "admin",
        "name": {
            "first": "Juan",
            "middle": "Dela",
            "last": "Cruz"
        }
    }
    ```
  - Sample Response:
    ```json
    { "created" : true, "error": "" }
    ```
  - This route returns two(2) key responses: `created` and `error`
    - `created` set to `true` if the new account is created, otherwise `false`.
    - `error` contains a string/JSON which can be used for debugging.

<br>

## Forgotten password changing
- **`/api/forgotpass/`**
  - Emails the provided gsuite account of the student where pin will be sent to.
  - **Permission**: Public (Anyone can use this route)
  - **Method**: <b style="color: yellow">POST</b>
  - **Parameter**: `email`
  - Sample request:
    ```json
    {"email": "20-00000@g.batstate-u.edu.ph"}
    ```
  - Sample Response:
    ```json
    { "code": "...", "error": "" }
    ```
  - This route returns two(2) key responses: `code` and `error`
    - `code` is a random string that will be used for validating pin that will be sent on the email. This `code` will be used for the route below (`/pin/:code`).
    - `error` contains a string/JSON which can be used for debugging.

<br>

- **`/api/forgotpass/pin/:code`**
  - Checks the pin provided to validate the actual user.
  - **Permission**: Public (Anyone can use this route)
  - **Method**: <b style="color: yellow">POST</b>
  - **Parameter**: `pin`
  - Sample request:
    ```json
    {"pin": 12345678}
    ```
  - Sample Response:
    ```json
    { "key": "...", "error": "" }
    ```
  - This route returns two(2) key responses: `code` and `error`
    - `key` is a random string that will be used for changing password. This key is a one-time use.
    - `error` contains a string/JSON which can be used for debugging.

<br>

- **`/api/forgotpass/change/:key`**
  - Uses the key generated above to change the password by the password provided.
  - **Permission**: Public (Anyone can use this route)
  - **Method**: <b style="color: yellow">POST</b>
  - **Parameter**: `password`
  - Sample request:
    ```json
    {"password": "newpassword_123"}
    ```
  - Sample Response:
    ```json
    { "changed": true, "error": "" }
    ```
  - This route returns two(2) key responses: `code` and `error`
    - `changed` response can be either true, which indicates that the password has successfuly been changed, or false if not.
    - `error` contains a string/JSON which can be used for debugging.

<br>

# Billings
## Reading the billings
On getting/reading the billings, different routes are introduced for filtering the needed billings statements.

<br>

- **`/api/admin/billing/`**
  - Gets all the bills stored in the database.
  - **Permission**: Admin
  - **Method**: <b style="color: green">GET</b>
  - **Note**: Make sure that the token on `cookies` are set.
  - Sample Response:
    ```json
    {
      "billings": [{
        "slot": "RM-02",
        "rate": 20,
        "previousKWH": 300,
        "currentKWH": 523,
        "fullyPaid": false,
        "currentPayment": 4460,
        "dueDate": {
            "month": 4,
            "day": 15,
            "year": 2023
        },
        "users": [
            {
                "username": "20-05845",
                "paid": false,
                "cost": 4460,
                "daysPresent": 30,
                "_id": "6415df6217381a08b19c8b07"
            }
        ],
        "_id": "6415df6217381a08b19c8b06",
        "__v": 0
        }, ...],
        "error": ""
      ]
    }
    ```
  - This route returns two(2) key responses: `billings` and `error`
    - `billings` contains an array containing the collection of **ALL** the billings stored in the database.
    - `error` contains a string/JSON which can be used for debugging.

<br>

- **`/api/admin/billing/:username`**
  - Gets all the bills of the specified username.
  - **Permission**: Admin
  - **Method**: <b style="color: green">GET</b>
  - **Note**: Make sure that the token on `cookies` are set.
  - Sample Response:
    ```json
    {
      "billings": [{
        "slot": "RM-02",
        "rate": 20,
        "previousKWH": 300,
        "currentKWH": 523,
        "fullyPaid": false,
        "currentPayment": 4460,
        "dueDate": {
            "month": 4,
            "day": 15,
            "year": 2023
        },
        "users": [
            {
                "username": "username",
                "paid": false,
                "cost": 4460,
                "daysPresent": 30,
                "_id": "..."
            }
        ],
        "_id": "6415df6217381a08b19c8b06",
        "__v": 0
        }, ...],
        "error": ""
      ]
    }
    ```
  - This route returns two(2) key responses: `billings` and `error`
    - `billings` contains an array containing the collection of **ALL** the billings of the specified user.
    - `error` contains a string/JSON which can be used for debugging.

<br>

## Adding a new billing
- **`/api/admin/billing/:slotID/:username`**
  - Adds a new bill to the room of the specified username.
  - **Permission**: Admin
  - **Method**: <b style="color: yellow">POST</b>
  - **Parameters**: `month`, `day`, `year`, `rate`, `previous_kwh`, `current_kwh`, `days_present`
  - **Note**: `month`, `day`, and `year` are numerical values. `month` can have values 1-12 which represents January-December, and the `day` can have values 1-31 which represents the day in a month. The `days_present` represents the days that a tennant is present in the room, which must be keep track on, so that equal distribution of billing will be applied.
  - Sample request:
    ```json
    {
      "month": 3,
      "day": 13,
      "year": 2023,
      "rate": 30,
      "previous_kwh": 30,
      "current_kwh": 626,
      "days_present": 30
    }
    ```
  - Sample Response:
    ```json
    { "added": true, "error": "" }
    ```
  - This route returns two(2) key responses: `added` and `error`
    - `added` response can be either `true`, which indicates that the billing has been added to the database, or `false` if not.
    - `error` contains a string/JSON which can be used for debugging.

<br>

## Deleting a billing **[WILL BE UNDER CONSTRUCTION]**
- **`/api/admin/billing/:slot/:username`**
  - Deletes a tennant from the bill.
  - **Permission**: Admin
  - **Method**: <b style="color: orange">DELETE</b>
  - Sample Response:
    ```json
    { "deleted": true, "error": "" }
    ```
  - This route returns two(2) key responses: `deleted` and `error`
    - `deleted` response can be either `true`, which indicates that the billing is already deleted from the database, or `false` if not.
    - `error` contains a string/JSON which can be used for debugging.

<br>

# Slots

<br>

# Students
## Verifying a student account
- **`/api/admin/student/:srCode`**
  - Verifies a newly registered student account
  - **Permission**: Admin
  - **Method**: <b style="color: green">PUT</b>
  - **Parameter**: `srCode`
  - Sample Response:
    ```json
    { "verified": true, "error": "" }
    ```
  - This route returns two(2) key responses: `verified` and `error`
    - `verified` response can be either `true`, which indicates that the student is verified, and `false` if not, alongside with error which indicates the type of error encoutered in verifying the student account.
    - `error` contains a string/JSON which can be used for debugging.

<br>

<br>

# Summmary