import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VoteSubmission() {
  const [parties, setParties] = useState([]);
  const [selectedVotes, setSelectedVotes] = useState([]);
  const [voterId, setVoterId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/PartiesRoute');
      setParties(response.data);
    } catch (error) {
      toast.error('Failed to fetch parties: ' + error.message);
    }
  };

  const handleVoteChange = (position, candidateName) => {
    // Check if a candidate is already selected for that position
    const existingVoteIndex = selectedVotes.findIndex(vote => vote.Position === position);

    if (existingVoteIndex !== -1) {
      // Update the existing vote for that position
      const updatedVotes = [...selectedVotes];
      updatedVotes[existingVoteIndex] = { CandidateName: candidateName, Position: position };
      setSelectedVotes(updatedVotes);
    } else {
      // Add a new vote if the position is not already voted for
      setSelectedVotes(prev => [
        ...prev,
        { CandidateName: candidateName, Position: position }
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!voterId) {
      toast.error('Please enter a Voter ID');
      return;
    }

    // Check if all three positions have been selected
    const positions = ['President', 'Vice-President', 'Secretary'];
    const selectedPositionKeys = selectedVotes.map(vote => vote.Position);
    const hasAllPositions = positions.every(pos => selectedPositionKeys.includes(pos));

    if (!hasAllPositions) {
      toast.error('Please select candidates for all 3 positions');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/ISVotedRoute/add-vote', {
        voterId: voterId,
        votes: selectedVotes
      });

      if (response.status === 200) {
        toast.success('Vote submitted successfully');
        setSelectedVotes([]); // Reset selected votes after successful submission
        setVoterId(''); // Clear voter ID input
      } else {
        throw new Error('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      toast.error('Failed to submit vote: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Submit Your Vote</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="voterId" className="form-label">Voter ID:</label>
          <input
            type="text"
            className="form-control"
            id="voterId"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            required
          />
        </div>
        
        {Object.entries(parties.reduce((acc, party) => {
          if (!acc[party.Position]) {
            acc[party.Position] = [];
          }
          acc[party.Position].push(party);
          return acc;
        }, {})).map(([position, candidates]) => (
          <div key={position} className="mb-3">
            <h4>{position}</h4>
            {candidates.map(candidate => (
              <div className="form-check" key={candidate._id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={position}
                  id={candidate._id}
                  checked={selectedVotes.some(vote => vote.Position === position && vote.CandidateName === candidate.CandidateName)}
                  onChange={() => handleVoteChange(position, candidate.CandidateName)}
                />
                <label className="form-check-label" htmlFor={candidate._id}>
                  {candidate.CandidateName} ({candidate.PartyName})
                </label>
              </div>
            ))}
          </div>
        ))}
        
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Vote'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default VoteSubmission;
