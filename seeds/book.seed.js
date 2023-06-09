const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Book } = require("../models/Book.js");
const { faker } = require("@faker-js/faker");

const bookList = [
  { title: "Harry Potter", author: "J.K. Rowling", pages: 543, },
  { title: "1984", author: "George Orwell", pages: 328, },
  { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 281, },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180, },
  { title: "Pride and Prejudice", author: "Jane Austen", pages: 279, },
];

for (let i = 0; i < 50; i++) {
  const newBook = {
    title: faker.name.title(),
    author: faker.name.author(),
    pages: faker.pages.number("###"),
  };
  bookList.push(newBook);
}

connect().then(() => {
  console.log("Tenemos conexión");

  Book.collection.drop().then(() => {
    console.log("Usuarios eliminados");

    const documents = bookList.map((book) => new Book(book));
    Book.insertMany(documents)
      .then(() => console.log("Datos guardados correctamente!"))
      .catch((error) => console.error(error))
      .finally(() => mongoose.disconnect());
  });
});
