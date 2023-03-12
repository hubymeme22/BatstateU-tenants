# API Server for BSU-tennants web application
## POST requests
Following are the list of POST request routes from the server:

```
/api/login
/api/login/admin  -- (admin)
/api/register/admin  -- (admin)
/api/register/student
/api/forgotpass/
/api/forgotpass/pin/:key
/api/forgotpass/change/:key
/api/billing/:slot/:username -- (admin)
/api/slots/new  -- (admin)
/api/students/
/api/students/room -- (admin)
```

## GET requests
Following are the list of GET request routes from the server
```
/api/billing/ -- (admin)
/api/billing/unpaid -- (admin)
/api/billing/unpaid/:username -- (admin)
/api/slots/ -- (admin)
/api/slots/available -- admin()
/api/slots/available/:space
```

## DELETE requests
Following are the list of DELETE request routes from the server
```
/api/billing/:slot/:username
```

Purposes, parameters, and other route details will be added here soon...
