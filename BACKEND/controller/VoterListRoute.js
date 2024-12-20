const express = require("express");
const VoterListSchema = require("../model/VoterListSchema");
const VoterListRoute = express.Router();
const mongoose = require("mongoose");

// To Read the Data
VoterListRoute.get("/", (req, res) => {
    VoterListSchema.find((err, data) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(data);
        }
    });
});

// To add the Data to the database
VoterListRoute.post("/AddVoter", async (req, res) => {
    try {
        const voter = new VoterListSchema(req.body);

        // Save the voter to the database
        const savedVoter = await voter.save();
        res.status(201).json(savedVoter);
    } catch (error) {
        console.error("Error adding voter:", error);
        res.status(500).json({ error: "An error occurred while adding the voter." });
    }
});



// To update the Data
VoterListRoute.route("/update-Voter/:id")
    .get((req, res) => {
        VoterListSchema.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.json(data);
            }
        });
    })
    .put((req, res) => {
        VoterListSchema.findByIdAndUpdate(
            mongoose.Types.ObjectId(req.params.id),
            { $set: req.body },
            (err, data) => {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    res.json(data);
                }
            }
        );
    });

// To get a single Voter by ID
VoterListRoute.route("/get-voter/:id")
    .get((req, res) => {
        VoterListSchema.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.json(data);
            }
        });
    });

// To delete a Voter
VoterListRoute.delete("/delete-Voter/:id", (req, res) => {
    VoterListSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), (err, data) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(data);
        }
    });
});

// Count Voters
VoterListRoute.get('/Voters-count', (req, res) => {
    VoterListSchema.countDocuments({}, (err, count) => {
        if (err) {
            res.status(500).json({ error: 'An error occurred while counting voter documents.' });
        } else {
            res.json({ count });
        }
    });
});

module.exports = VoterListRoute;
