// Task 1: Library Book Management API
// Run: node A1.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

// Book schema and model
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: { type: String, required: [true, "Author is required"], trim: true },
    price: { type: Number, min: [1, "Price must be at least 1"] },
    category: { type: String, trim: true },
    isAvailable: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

// POST /books - add a book
app.post("/books", async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    next(error);
  }
});

// GET /books - list all books
app.get("/books", async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

// GET /books/:id - get one book
app.get("/books/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

// PUT /books/:id - update a book
app.put("/books/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    next(error);
  }
});

// DELETE /books/:id - delete a book
app.delete("/books/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully", book });
  } catch (error) {
    next(error);
  }
});

// Simple error-handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  if (error.name === "ValidationError" || error.name === "CastError" ||
      error.code === 11000 || error instanceof SyntaxError) {
    return res.status(400).json({ message: error.message || "Invalid input" });
  }
  res.status(500).json({ message: "Internal server error" });
});

async function startServer() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing. Add it to file/.env");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Task 1 API running at http://localhost:${PORT}`));
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
