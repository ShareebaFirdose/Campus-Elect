import Axios from "axios";
import { useEffect, useState } from "react";
import VotingCardsRow from "./votingCardsRow";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VotingCards(props) {
  const { Id } = props; // Assuming this is the voter ID
  const [arr, setArr] = useState([]);
  const [selectedVotes, setSelectedVotes] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/PartiesRoute/")
      .then((res) => {
        if (res.status === 200) setArr(res.data);
        else Promise.reject();
      })
      .catch((err) => console.error("Error fetching party data:", err));
  }, []);

  const handleVote = (vote) => {
    // Check if the user has already voted for the position
    const existingVote = selectedVotes.find(v => v.Position === vote.Position);
    
    if (existingVote) {
      toast.error('You have already voted for this position', {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    // Allow adding the vote
    setSelectedVotes([...selectedVotes, vote]);
    toast.success(`Voted for ${vote.CandidateName} as ${vote.Position}`, {
      position: "bottom-right",
      autoClose: 1000,
    });
  };

  const submitVotes = () => {
    if (selectedVotes.length < 1) {
      toast.error('You must vote for at least one position', {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    Axios.post("http://localhost:5000/isVotedRoute/add-vote", { votes: selectedVotes, voterId: Id })
      .then((response) => {
        console.log("Submit response:", response);
        toast.success('All votes submitted successfully', {
          position: "bottom-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error submitting votes:", error);
        toast.error('Failed to submit votes. Please try again.', {
          position: "bottom-right",
          autoClose: 2000,
        });
      });
  };

  const positions = {};
  arr.forEach(candidate => {
    const { Position } = candidate;
    if (!positions[Position]) {
      positions[Position] = [];
    }
    positions[Position].push(candidate);
  });

  return (
    <div>
      <div className="my-5">
        <div className="mt-3">
          <div className="row">
            {Object.keys(positions).map((position, index) => (
              <div key={index} className="col-12 mb-4">
                <h4 className="text-center">{position}</h4>
                <div className="row justify-content-center">
                  {positions[position].map((val, ind) => (
                    <VotingCardsRow key={ind} Id={Id} obj={val} onVote={handleVote} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center my-4">
        <button onClick={submitVotes} className="btn btn-success">
          Submit Votes
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default VotingCards;
