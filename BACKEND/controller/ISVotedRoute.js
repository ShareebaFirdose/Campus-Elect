const express = require('express');
const router = express.Router();
const ISVoted = require('../model/IsVotedSchema'); // Assuming this is your Mongoose model

// Add a vote
router.post('/add-vote', async (req, res) => {
  try {
    console.log('Received data:', req.body); // Debugging log
    const { voterId, votes } = req.body;

    if (!voterId || !votes || !Array.isArray(votes)) {
      return res.status(400).json({ error: "Missing voterId or votes" });
    }

    // Check if the voter has already voted
    const existingVotes = await ISVoted.findOne({ voterId });
    if (existingVotes) {
      // Check for conflicting votes
      const existingPositions = existingVotes.votes.map(vote => vote.Position);
      const newPositions = votes.map(vote => vote.Position);
      const conflict = newPositions.some(position => existingPositions.includes(position));
      
      if (conflict) {
        return res.status(400).json({ error: "Voter has already voted for one or more positions" });
      }
    }

    const newVote = new ISVoted({ voterId, votes });
    await newVote.save();
    res.status(200).json({ message: "Vote submitted successfully" });
  } catch (error) {
    console.error('Error adding vote:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all votes
router.get('/', async (req, res) => {
  try {
    const allVotes = await ISVoted.find();
    res.status(200).json(allVotes);
  } catch (error) {
    console.error('Error fetching votes:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a vote
router.delete('/delete-isvoted/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ISVoted.findByIdAndDelete(id);
    res.status(200).json({ message: "Vote deleted successfully" });
  } catch (error) {
    console.error('Error deleting vote:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
