class Book {
    constructor(title, author, isbn, available = true) {
        this.title = title;
        this.author = author;
        this._isbn = isbn;
        this.available = available;
    }

    get() {
        return this._isbn;
    }

    borrowBook() {
        if (this.available) {
            console.log(`${this.title} by ${this.author} is available.`);
        } else {
            console.log(`${this.title} by ${this.author} is not available.`);
        }
    }

    returnBook() {
        this.available = true;
        console.log(`${this.title} by ${this.author} is returned.`);
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        console.log(`Added ${book.title} by ${book.author} to the library.`);
    }

    // removeBook(isbn) {
    //     const index = this.books.findIndex((b) => b.isbn === isbn);
    //     if (index !== -1) {
    //         const removedBook = this.books[index];
    //         this.books.splice(index, 1);
    //         console.log(`Removed ${removedBook.title} by ${removedBook.author} from the library.`);
    //     } else {
    //         console.log(`No book found with ISBN ${isbn}.`);
    //     }
    // }

    removeBook(isbn) {
        const index = this.books.findIndex((b) => b.isbn === isbn);
        if (index !== -1) {
            const removedBook = this.books[index];  // Capture the book details before removal
            this.books.splice(index, 1);  // Remove the book
            console.log(`Removed ${removedBook.title} by ${removedBook.author} from the library.`);
        } else {
            console.log(`No book found with ISBN ${isbn}.`);
        }
    }

    findBookByTitle(title) {
        const book = this.books.find((b) => b.title.toLowerCase() === title.toLowerCase());
        if (book) {
            console.log(`${book.title} by ${book.author} is available.`);
        } else {
            console.log(`No book found with title ${title}.`);
        }
    }
}

class DigitalLibrary extends Library {
    constructor() {
        super();
        this.downloadedBooks = [];
    }

//     downloadBook(isbn) {
//         const book = this.books.find((b) => b.isbn === isbn)
//         if(book) {
//             this.downloadedBooks.push(book);
//             console.log(`downloaded book ${book.title} by ${book.author} on ${new Date().toLocaleString()}`)
//         } else {
//             console.log("no book was downloaded")
//         }
//         return this.downloadedBooks
//     }
// }

downloadBook(isbn) {
    const book = this.books.find((b) => b.isbn === isbn);  // Find the book by ISBN
    if (book) {
        this.downloadedBooks.push(book);
        console.log(`Downloaded book ${book.title} by ${book.author} on ${new Date().toLocaleString()}`);
    } else {
        console.log("No book was downloaded.");
    }
    return this.downloadedBooks;
}
}

const book = new Book('The Angels are Good', 'John Smith', 101012, false)
book.borrowBook()
book.returnBook()

// const books = ['The Angels are Good', 'John Smith', 101012, true]
// const library = new Library()
// library.addBook(new Book(...books))
// library.removeBook(101012)
// library.findBookByTitle('The Angels are Good')

// const digitalLibrary = new DigitalLibrary()
// digitalLibrary.addBook(new Book(...books))
// digitalLibrary.downloadBook(101012)
// digitalLibrary.downloadBook(99999)
// console.log(digitalLibrary.downloadedBooks)

// Create a book array
const books = ['The Angels are Good', 'John Smith', 101012, true];

// Create a library
const library = new Library();  // Library constructor should not take arguments
library.addBook(new Book(...books));  // Add the book to the library

// Remove book by ISBN
library.removeBook(101012);

// Find the book by title
library.findBookByTitle('The Angels are Good');

// Create a digital library
const digitalLibrary = new DigitalLibrary();  // DigitalLibrary also should not take arguments

// Add the same book to the digital library
digitalLibrary.addBook(new Book(...books));  // You must first add the book

// Download the book
digitalLibrary.downloadBook(101012);  // This will now work

// Try downloading a non-existent book (should not work)
digitalLibrary.downloadBook(99999);

// Log downloaded books
console.log(digitalLibrary.downloadedBooks);