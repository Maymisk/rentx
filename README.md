<p align="center">
  <img src="https://media0.giphy.com/media/26BRrcK4dXrxl817q/giphy.gif" />
</p>


# 🚗 Rentx

This is a car rent service REST API.

<p align="center">
    <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="#-running-locally">Running locally</a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="#-api-docs">Docs</a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="#-entity-relationship-diagram">ERD</a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="#-improvements">Improvements</a>&nbsp;&nbsp;&nbsp;&nbsp;
</p>




## 🏃‍♂️ My journey

<p align="center">
    <strong>This API was my main project for the first trimester of 2022</strong>
</p>

This project taught me most of what I know back-end wise. It's very thorough - built according to the SOLID principles, these are some of its features:

- CRUD
- Image upload
- CSV upload
- JWT Authentication
- Refresh Token 
- Password reset with email 🔑
- Unit tests ✅
- Integration tests ✅
- Documentation with Swagger (not complete!) 📃

**Rentx was also my first experience with cloud services** - more specifically, AWS. This project made use of S3 (to store images) and SES (to send the password emails). At the same time, I implemented temporary file system storage and a fake SMTP service ([**Ethereal!**](https://ethereal.email))

Enjoy!
## ✨ Technologies

- Node JS
- Typescript
- Express
- Typeorm
- Prisma 💠
- Docker 🐋
- PostgreSQL 🐘
- Bcrypt 🔒

## 💻 Running locally

To run this project, [**you will need Docker installed.**](https://www.docker.com)

Clone the project

```bash
  git clone https://github.com/Maymisk/rentx.git
```

Get in the project's directory

```bash
  cd rentx
```

Install the dependencies

```bash
  npm install
  #
  yarn
```

**Create a .env file - you can copy from .env.example, setting all the AWS related variables to random strings**


Then, create the database and application containers:

```bash
npm run docker:app
#
yarn docker:app
```

You're ready to go!

---


**If you want a DBMS, the following command will execute prisma studio:**
```bash
npm run prisma:dev studio
#
yarn prisma:dev studio
```


## ✅ Running the tests

**There are 3 commands to run the tests:**
- "test", which'll run every test
- "unit", which'll run only unit tests
- "integration", which'll run only integration tests

To run unit tests:

```bash
npm run unit
#
yarn unit
```
#

**If you want to run integration tests, [you will need Docker installed.](https://www.docker.com)**

First, start by setting up the test database container:
```bash
npm run docker:test-db
#
yarn docker:test-db
```

With the container online, run the migrations to apply the schema to the database:
```bash
npm run prisma:migrate-test
#
yarn prisma:migrate-test
```

Now you're ready to run integration tests 👏

## 📃 API Docs

***READ THIS!!!!!***

**```The base URL is http://localhost:3333```**

**The authentication is done using bearer tokens. To access any routes that require authentication, provide an 'authorization' header with the respective token.**

**There are routes that require admin access. To test them, generate an admin user by typing the following in the CLI:**


```bash
npm run seed:admin
#
yarn seed:admin
```

**The generated user's email is admin@admin.com, and the password is 'admin'.**

<p align="center">
  <a href="#-user">User Routes</a>&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#-authentication-routes">Authentication Routes</a>&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#-password-reset-routes">Password Reset Routes</a>&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#-car">Car Routes</a>&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#-rent">Rent Routes</a>&nbsp;&nbsp;&nbsp;&nbsp;
</p>

### 👤 User

```base path: /users```

 <br />

#### 🆕 Creates an user

```http
POST /
```

| Body Att | Type       | Description                           | Required |
| :---------- | :--------- | :---------------------------------- | :----- |
| `email` | `string` | The user's email | ✅ |
| `name` | `string` | The user's name | ✅ |
| `password` | `string` | The user's password | ✅ |
| `driver_license` | `string` | The user's driver license | ✅ |

#

#### 🔃 Updates a user's avatar

```http
PATCH /avatar
```

**The avatar file should be sent using multipart/form-data**

| Form Data Att | Type       | Description                           | Required |
| :---------- | :--------- | :---------------------------------- | :----- |
| `avatar` | `file` | The user's avatar | ✅ |

**Authentication required ✅**

#

#### 📃 Returns the authenticated user

```http
GET /profile
```

**Authentication required ✅**

### 🔓 Authentication Routes

#### 🆕 Authenticates an user

```http
POST /session
```

| Body Att | Type       | Description                           | Required |
| :---------- | :--------- | :---------------------------------- | :----- |
| `email` | `string` | The user's email | ✅ |
| `password` | `string` | The user's password | ✅ |

If the authentication is successful, this will return an access token and a refresh token.

#

#### 🆕 Refreshes an user's access token

```http
POST /refresh_token
```

| Body Att | Type       | Description                           | Required |
| :---------- | :--------- | :---------------------------------- | :----- |
| `token` | `string` | A refresh token (generated on /session) | ✅ |

This token can also be sent using query parameters **(?token=)** or an '**x-access-token**' header.

**If successful, this generates a new access token and a new refresh token.**

### 🔑 Password Reset Routes

```base path: /password```

#### 🆕 Sends a password reset email

```http
POST /forgot
```

| Body Att | Type       | Description                           | Required |
| :---------- | :--------- | :---------------------------------- | :----- |
| `email` | `string` | The email address to message | ✅ |

**If successful, this route will trigger the fake SMTP service, Ethereal.**

In order to see the email that was sent, check your app container logs - there should be an URL that redirects you to the proper page.

With that said, **the URL provided by the email cannot be used in the browser, since the password reset route is a POST request.** Copy the locator to your clipboard and use an API client of your choice to reset your password!

#

#### 🔃 Resets a user's password

```http
POST /reset
```

| Body Att | Type       | Description                           | Required |
| :---------- | :--------- | :---------------------------------- | :----- |
| `password` | `string` | The user's new password | ✅ |

| Query Params |  Description                           | Required |
| :---------- |  :---------------------------------- | :----- |
| `token`  | A special token, only generated by the /forgot route. | ✅ |

#

### 🚗 Car

**```base path: /cars```**

#### 🆕 Creates a car

```http
POST /
```

| Body Att | Type       | Description                           | Required |
| :---------- | :--------- | :---------------------------------- | :----- |
| `name` | `string` | The car's name | ✅ |
| `description` | `string` | A brief description to the car | ✅ |
| `daily_rate` | `number` | The amount paid daily to rent this car | ✅ |
| `license_plate` | `string` | The car's license_plate | ✅ |
| `fine_amount` | `string` | *  | ✅ |
| `brand` | `string` | The car's brand | ✅ |
| `category_id` | `string` | The ID of a category associated with the car | ✅ |

**\*The amount a user pays for a day's worth of not returning the car after the rent time expired.**

**Authentication required ✅**

**Admin privileges required ✅**

#

#### 📃 Lists available cars

```http
GET /available
```

| Query Params | Description                           | Required |
| :---------- |  :---------------------------------- | :----- |
| `name` | A car name | ❌ |
| `brand` | A car brand | ❌ |
| `category_id` | A category ID | ❌ |

#

#### 🔃 Uploads images related to a car

```http
POST /images/${id}
```

**The image files should be sent using multipart/form-data**

| Route Params | Description                           | Required |
| :---------- |  :---------------------------------- | :----- |
| `id` | The ID of the car the images are associated with | ✅ |

| Form Data Att | Description                           | Required |
| :---------- |  :---------------------------------- | :----- |
| `images` | An image file | ✅ |

Multiple images can be sent at once by repeating the 'images' attribute.

**Authentication required ✅**

**Admin privileges required ✅**

### 🗃 Car Categories Routes

**```base path: /categories```**

#### 🆕 Creates a car category

```http
POST /
```

| Body Att      | Type     | Description                         | Required |
| :-------------| :------- |:----------------------------------- | :------- |
| `name`        | `string` | The name of the category            | ✅      |
| `description` | `string` | A brief description of the category | ✅      |

**Authentication required ✅**
**Admin privileges required ✅**

#

#### 🆕 Imports categories from a CSV file

**The CSV file should be sent using multipart/form-data**

```http
POST /import
```

| Form Data | Description                           | Required |
| :---------- |  :---------------------------------- | :----- |
| `file` | The CSV file | ✅ |

**Authentication required ✅**

**Admin privileges required ✅**

**It is expected the file lines to have the following format:**
```${name_of_the_category},${description_of_the_category}```
#

#### 📃 Lists car categories

```http
GET /
```

***Authentication required ✅***

#

### 🗄 Car Specifications Routes

```base path: /specifications```

#### 🆕 Creates a car specification

```http
POST /
```

| Form Data | Description                           | Required |
| :---------- |  :---------------------------------- | :----- |
| `file` | The CSV file | ✅ |


#

#### 🔃 Updates a car's specifications 

```http
PUT /${id}
```
| Route Params         | Description                         | Required |
| :------------------ | :----------------------------------- | :------- |
| `id` |  The IDs of the car related to the specifications            | ✅      |


| Body Att            | Type       | Description                         | Required |
| :------------------ | :--------- |:----------------------------------- | :------- |
| `specification_ids` | `string[]` | The IDs of the specifications to assign to the car            | ✅      |

**Authentication required ✅**

**Admin privileges required ✅**

#

### 💲 Rent

**```base path: /rents```**

#### 🆕 Creates a rent

```http
POST /
```

| Body Att            | Type       | Description                         | Required |
| :------------------ | :--------- |:----------------------------------- | :------- |
| `car_id` | `string` | The ID of the car to rent | ✅      |
| `expected_return_date` | `string` | A date string of the expected return date | ✅      |

**Authentication required ✅**

#

#### 🔃 Finishes a rent

```http
POST /end/${id}
```

| Route Params            | Description                         | Required |
| :------------------ |:----------------------------------- | :------- |
| `id` | The ID of the rent to end | ✅      |

**Authentication required ✅**

#

#### 📃 Lists rents by user

```http
GET /user
```

**Authentication required ✅**
## 🗺 Entity Relationship Diagram

<p align="center">
    <img src="/prisma/ERD.svg" />
</p>

# 🔧 Improvements

- Implement data validation on the controllers
- Implement file validation
- Implement queues for the email use case
- Create more integration tests
- Abstract entities from the ORMs
