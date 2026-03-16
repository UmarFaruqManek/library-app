const db = require("../config/db");

const loansController = {
    index: (req, res) => {
        const query = `
            SELECT l.*, b.title as book_title, m.name as member_name 
            FROM loans l
            JOIN books b ON l.book_id = b.id
            JOIN members m ON l.member_id = m.id
            ORDER BY l.loan_date DESC
        `;
        db.query(query, (err, results) => {
            if (err) throw err;
            res.render("loans/list", { loans: results });
        });
    },
    addForm: (req, res) => {
        // Fetch books and members for dropdowns
        const booksQuery = "SELECT id, title FROM books WHERE stock > 0";
        const membersQuery = "SELECT id, name FROM members";
        
        db.query(booksQuery, (err, books) => {
            if (err) throw err;
            db.query(membersQuery, (err, members) => {
                if (err) throw err;
                res.render("loans/add", { books, members });
            });
        });
    },
    create: (req, res) => {
        const { member_id, book_id, loan_date, return_date } = req.body;
        const query = "INSERT INTO loans (member_id, book_id, loan_date, return_date, status) VALUES (?, ?, ?, ?, 'borrowed')";
        
        db.query(query, [member_id, book_id, loan_date, return_date], (err) => {
            if (err) {
                req.flash("error", "Failed to create loan record.");
                return res.redirect("/loans/add");
            }
            // Update book stock
            db.query("UPDATE books SET stock = stock - 1 WHERE id = ?", [book_id], (err) => {
                if (err) {
                    req.flash("error", "Loan created but failed to update book stock.");
                } else {
                    req.flash("success", "Book successfully borrowed!");
                }
                res.redirect("/loans");
            });
        });
    }


};

module.exports = loansController;
