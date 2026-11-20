# Project 1 — Library Book Management API

## Folder structure

```text
Project_1_Library_Book_Management_API/
├── file/
│   ├── A1.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── outputs/
└── README.md
```

## Setup

1. Install Node.js and make sure MongoDB is running, or create a MongoDB Atlas database.
2. Open a terminal inside the `file` folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env` and set your own MongoDB connection string.
5. For Project 2, also set a long private `JWT_SECRET`.
6. Start the API with `npm start` (or `node A1.js`).

The server uses port 3000 by default.

## API endpoints

- `POST /books — add a book`
- `GET /books — list all books`
- `GET /books/:id — get one book`
- `PUT /books/:id — update a book`
- `DELETE /books/:id — delete a book`

## Sample request body

Use this JSON with the relevant POST endpoint:

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "price": 250,
  "category": "Fiction",
  "isAvailable": true
}
```

## Testing

Use Postman or Thunder Client. Save your real request/response screenshots in `outputs/`.
For database evidence, open MongoDB Compass and capture the relevant collection after inserting data.

Do not upload your `.env` file or fabricated screenshots.

## GitHub submission

Create a separate **Public** GitHub repository for this project. Upload the contents of this folder, including the `file`, `outputs`, and `README.md` items. Add your screenshots before final submission.
