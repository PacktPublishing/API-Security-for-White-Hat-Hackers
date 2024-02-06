## BREACHME API PROJECT DOCUMENTATIONS

### Project Overview
The API is designed for a financial institution and provides various functionalities for managing user accounts, generating API keys for authentication, accepting payments, withdrawing funds, and viewing transactions. Additionally, certain administrative privileges are required for deleting users and viewing all transactions.


## DOCUMENTATION

The api documentation for the project

### Base URL
```
   http://localhost:3030/api
   
```   
### Authentication
The API uses bearer token authentication. Include the `token` in the request header for authenticated endpoints.

### Endpoints

#### Auth

##### Login
- **Endpoint:** `/users/login`
- **Method:** `POST`
- **Description:** Allows users to log in to their account and obtain an authentication token.
- **Request:**
  ```json
  {
      "username": "admin",
      "password": "admin123"
  }

- **Response:** The response will include an authentication token.


##### Register
- **Endpoint:** `/users/register`
- **Method:** `POST`
- **Description:** Allows users to register an account.
- **Request:**
  ```json
  {
      "username": "username",
      "email": "myemail@gmail.com",
      "password": "mypassword"
  }

- **Response:** The response will include an authentication token.

##### Generate API Key
- **Endpoint:** `/users/generate-key`
- **Method:** `POST`
- **Description:** Generates an API key for the authenticated user.
- **Request:** Include the authentication token in the request header.
- **Response:** The response will include the generated API key.

#### Users

##### Update User
- **Endpoint:** `/users/update/{user_id}`
- **Method:** `PUT`
- **Description:** Updates the details of a authorized user.
- **Request:** Include the authentication token in the request header.
- **Response:** The response will indicate a successful update.

##### Delete User
- **Endpoint:** `/users/delete/{user_id}`
- **Method:** `DELETE`
- **Description:** Deletes a user (admin only).
- **Request:** Include the authentication token in the request header.
- **Response:** The response will indicate a successful deletion.

##### Get All Users
- **Endpoint:** `/users/all`
- **Method:** `GET`
- **Description:** Retrieves all users (admin only).
- **Request:** Include the authentication token in the request header.
- **Response:** The response will include a list of all users.

#### Transactions

##### Get User Transactions
- **Endpoint:** `/transactions/user`
- **Method:** `GET`
- **Description:** Retrieves transactions for the authenticated user related to the apikey.
- **Request Headers:** Include the api key in the request header (Bearer token).
- **Response:** The response will include a list of user transactions.

##### Pay
- **Endpoint:** `/transactions/pay`
- **Method:** `GET`
- **Description:** Allows users to make payments.
- **Request Parameters:** Include the amount and apikey in the request query parameters.
- **Request Headers:** Include the api key in the request header (Bearer token).
- **Response:** The response will indicate a successful payment.

##### Withdraw
- **Endpoint:** `/transactions/withdraw`
- **Method:** `POST`
- **Description:** Allows users to withdraw funds.
- **Request Headers:** Include the api key in the request header (Bearer token).
- **Request Body:**
  ```json
  {
      "amount": 100
  }
- **Response:** The response will indicate a successful withdrawal.

##### Get All Transactions
- **Endpoint:** `/transactions/all`
- **Method:** `GET`
- **Description:** Retrieves all transactions (admin only).
- **Request:** Include the authentication token in the request header.
- **Response:** The response will include a list of all transactions.


### If You wish to install the API Locally

Pre-Requisites

To run this project locally, you will need NODEJS NPM and MYSQL(for database) installed on your local machine.

Clone the project

```bash
  git clone https://github.com/sisinerd/BreachMe-API.git
```

Go to the project directory

```bash
  cd BreachMe-API
  cd CODE
```
Install and configure mysql

Login to mysql using your mysql-username and password and create a database with whatever name you want, then give it privileges

```bash
  mysql -u username -p
  CREATE DATABASE breachme;
  GRANT ALL PRIVILEGES ON breachme.* TO 'username'@'localhost' IDENTIFIED BY 'your_password';
  exit;
```
To run this project, you will need to copy the .env.example contents to your .env file and update their values. The JWTSECRET should be any random word. Replace the username and your_password field with your personal details created earlier

```bash
  gedit .env
  PORT = 3030
  JWTSECRET = "Ifyou#cangu^essthisthe&nides(0er$vetobehacked"
  ADMIN_EMAIL = "admin@admin.com"
  ADMIN_USERNAME = "admin"
  ADMIN_PASSWORD = "admin123"
  DATABASE_URL="mysql://username:your_password@localhost:3306/breachme"
```
Save and exit the .env file

Install dependencies

```bash
  sudo apt install npm
  npm --version
```
Run the following

```bash
  npx prisma db push
  npx prisma generate
```
Now it will be reachable at http://localhost:3030/

Before you begin testing you need to create an Admin user that will be used for the test

```bash
   npm run seed-admin
```

To start the server run the following

```bash
   npm start
```

### Vulnerabilities

#### Bypassing User Authentication Controls

One of the intentional vulnerabilities present in this API is related to the login endpoint. The default credentials (`admin` as the username and `admin123` as the password) have been deliberately set to weak and easily guessable values.

**Impact**: By exploiting this vulnerability, an attacker can bypass the authentication controls and gain unauthorized access to the system with administrative privileges.


#### Bypassing Token-Based Authentication Controls

Another  intentional vulnerability present in this API is related to the update user endpoint. The API requires a valid authentication token for authorization to update a user's data. However, the API does not properly validate the user ID passed in the request parameter, allowing an attacker to potentially swap tokens and edit somebody else's data.

**Impact**: By exploiting this vulnerability, an attacker with a valid authentication token can manipulate the request by replacing the user ID parameter, leading to unauthorized access and potential data tampering.

### ### Vulnerabilities

#### Bypassing User Authentication Controls

One of the intentional vulnerabilities present in this API is related to the login endpoint. The default credentials (`admin` as the username and `admin123` as the password) have been deliberately set to weak and easily guessable values.

**Impact**: By exploiting this vulnerability, an attacker can bypass the authentication controls and gain unauthorized access to the system with administrative privileges.


#### Bypassing Token-Based Authentication Controls

Another  intentional vulnerability present in this API is related to the update user endpoint. The API requires a valid authentication token for authorization to update a user's data. However, the API does not properly validate the user ID passed in the request parameter, allowing an attacker to potentially swap tokens and edit somebody else's data.

**Impact**: By exploiting this vulnerability, an attacker with a valid authentication token can manipulate the request by replacing the user ID parameter, leading to unauthorized access and potential data tampering.

#### Bypassing Role-Based and Attribute-Based Access Controls

This vulnability is present in the getAllTransactions endpoint.This is an endpoint that returns transactions for all users and its meant to be only for admins. However an authenticated user can bypass this by calling the endpoint with a non-admin token and access such resources.

#### Bypassing API Key Authentication Controls

This vulnability is present in the Pay endpoint. Since the api key is used to authenicate the transactions endpoints, the api key are hashed. But still given back to the user so he/she can pass them on the request header for pay and withdraw endpoints. This vulnabilty requires high level of security in how the token is exposed since it is the only source of truth for the pay and withdraw requests. In this case, the pay request is a get request that exposes the apikey in the endpouint url as a parameter. An attacker might use that to authenticate other requests
