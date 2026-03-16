const db = require("../config/db");

const dashboardController = {
    index: (req, res) => {
        const queries = {
            totalBooks: "SELECT COUNT(*) as count FROM books",
            totalMembers: "SELECT COUNT(*) as count FROM members",
            borrowedBooks: "SELECT COUNT(*) as count FROM loans WHERE status = 'borrowed'",
            recentLoans: `
                SELECT l.*, b.title as book_title, m.name as member_name 
                FROM loans l 
                JOIN books b ON l.book_id = b.id 
                JOIN members m ON l.member_id = m.id 
                ORDER BY l.loan_date DESC LIMIT 5
            `
        };

        db.query(queries.totalBooks, (err, booksCount) => {
            if (err) throw err;
            db.query(queries.totalMembers, (err, membersCount) => {
                if (err) throw err;
                db.query(queries.borrowedBooks, (err, borrowedCount) => {
                    if (err) throw err;
                    db.query(queries.recentLoans, (err, loans) => {
                        if (err) throw err;
                        res.render("dashboard", {
                            stats: {
                                totalBooks: booksCount[0].count,
                                totalMembers: membersCount[0].count,
                                borrowedBooks: borrowedCount[0].count
                            },
                            recentLoans: loans
                        });
                    });
                });
            });
        });
    }
};

module.exports = dashboardController;
