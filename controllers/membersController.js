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
            req.flash("success", "Member registered successfully!");
            res.redirect("/members");
        });
    },
    editForm: (req, res) => {
        const { id } = req.params;
        db.query("SELECT * FROM members WHERE id = ?", [id], (err, results) => {
            if (err) throw err;
            if (results.length === 0) {
                req.flash("error", "Member not found.");
                return res.redirect("/members");
            }
            res.render("members/edit", { member: results[0] });
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const { name, email, phone, address } = req.body;
        const query = "UPDATE members SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?";
        db.query(query, [name, email, phone, address, id], (err) => {
            if (err) {
                req.flash("error", "Failed to update member.");
                return res.redirect(`/members/edit/${id}`);
            }
            req.flash("success", "Member updated successfully!");
            res.redirect("/members");
        });
    },
    delete: (req, res) => {
        const { id } = req.params;
        // Check if member has active loans before deleting (optional but professional)
        db.query("SELECT COUNT(*) as count FROM loans WHERE member_id = ? AND status = 'borrowed'", [id], (err, results) => {
            if (err) throw err;
            if (results[0].count > 0) {
                req.flash("error", "Cannot delete member with active loans.");
                return res.redirect("/members");
            }
            db.query("DELETE FROM members WHERE id = ?", [id], (err) => {
                if (err) {
                    req.flash("error", "Failed to delete member.");
                } else {
                    req.flash("success", "Member deleted successfully!");
                }
                res.redirect("/members");
            });
        });
    }
};

module.exports = membersController;
