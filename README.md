# Blogging-api
This is a Minimal Blogging Platform RESTful API that has employed various techologies such as Node.js, Express, Prisma ORM, Postman, PostgreSql for the database and Visual studio code for the base code. It is also deployed on Render for use.
Postman was also used for some testing on the various endpoints used in this API and the testing was fruitful at the end.

## Technologies
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Postman
- Deployed on Render

## API Endpoints

### Users
| Method | Route        | Description                        |
|--------|--------------|------------------------------------|
| GET    | /users       | Get all users                      |
| GET    | /users/:id   | Get a specific user and their posts|
| POST   | /users       | Create a new user                  |

### Posts
| Method | Route        | Description                        |
|--------|--------------|------------------------------------|
| GET    | /posts       | Get all posts with author details  |
| GET    | /posts/:id   | Get a specific post with author    |
| POST   | /posts       | Create a new post                  |
| PUT    | /posts/:id   | Update a post                      |
| DELETE | /posts/:id   | Soft-delete a post                 |

### Sample Request (Create User)
```json
POST /users
{
  "firstName": "Zandrelius",
  "lastName": "Akain",
  "emailAddress": "Zand@example.com",
  "username": "ZandAkain"
}

### Sample post
```json
POST /posts
{
  "title": "This is my first blog",
  "Content": "Welcome to my first blog, I am happy to have you here"
}
