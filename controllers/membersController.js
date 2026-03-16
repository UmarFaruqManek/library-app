const db = require("../config/db");

const membersController = {
    index: (req, res) => {
        db.query("SELECT * FROM members ORDER BY created_at DESC", (err, results) => {
            if (err) throw err;
            res.render("members/list", { members: results });
        });
    },
    addForm: (req, res) => {
        res.render("members/add");
    },
    create: (req, res) => {
        const { name, email, phone, address } = req.body;
        const query = "INSERT INTO members (name, email, phone, address) VALUES (?, ?, ?, ?)";
        db.query(query, [name, email, phone, address], (err) => {
            if (err) throw err;
            res.redirect("/members");
        });
    }
};

module.exports = membersController;
