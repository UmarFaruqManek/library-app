const db = require("../config/db");

const booksController = {
    // Get all books with search and pagination
    getAllBooks: (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = 5; // Books per page
        const offset = (page - 1) * limit;
        const search = req.query.search || "";

        let query = "SELECT * FROM books";
        let countQuery = "SELECT COUNT(*) as total FROM books";
        let queryParams = [];

        if (search) {
            query += " WHERE title LIKE ? OR author LIKE ? OR isbn LIKE ?";
            countQuery += " WHERE title LIKE ? OR author LIKE ? OR isbn LIKE ?";
            const searchTerm = `%${search}%`;
            queryParams = [searchTerm, searchTerm, searchTerm];
        }

        query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
        
        db.query(countQuery, queryParams, (err, countResult) => {
            if (err) throw err;
            
            const totalBooks = countResult[0].total;
            const totalPages = Math.ceil(totalBooks / limit);

            db.query(query, [...queryParams, limit, offset], (err, results) => {
                if (err) throw err;
                res.render("books/list", { 
                    books: results, 
                    currentPage: page, 
                    totalPages: totalPages,
                    search: search
                });
            });
        });
    },

    // Render form to add a book
    addForm: (req, res) => {
        res.render("books/add");
    },

    // Create a new book
    createBook: (req, res) => {
        const { title, author, publisher, year, isbn, category, stock } = req.body;
        const query = "INSERT INTO books (title, author, publisher, year, isbn, category, stock) VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.query(query, [title, author, publisher, year, isbn, category, stock], (err) => {
            if (err) {
                req.flash("error", "Failed to add book.");
                return res.redirect("/books/add");
            }
            req.flash("success", "Book added successfully!");
            res.redirect("/books");
        });
    },

    // Render form to edit a book
    editForm: (req, res) => {
        const { id } = req.params;
        db.query("SELECT * FROM books WHERE id = ?", [id], (err, result) => {
            if (err) throw err;
            res.render("books/edit", { book: result[0] });
        });
    },

    // Update a book
    updateBook: (req, res) => {
        const { id } = req.params;
        const { title, author, publisher, year, isbn, category, stock } = req.body;
        const query = "UPDATE books SET title = ?, author = ?, publisher = ?, year = ?, isbn = ?, category = ?, stock = ? WHERE id = ?";
        db.query(query, [title, author, publisher, year, isbn, category, stock, id], (err) => {
            if (err) {
                req.flash("error", "Failed to update book.");
                return res.redirect(`/books/edit/${id}`);
            }
            req.flash("success", "Book updated successfully!");
            res.redirect("/books");
        });
    },

    // Delete a book
    deleteBook: (req, res) => {
        const { id } = req.params;
        db.query("DELETE FROM books WHERE id = ?", [id], (err) => {
            if (err) {
                req.flash("error", "Failed to delete book.");
            } else {
                req.flash("success", "Book deleted successfully!");
            }
            res.redirect("/books");
        });
    }
};

module.exports = booksController;
