import React, { useEffect, useState } from "react";
import VotingCards from "./votingcards";

function UserVotePage(props) {
  const { Id } = props;
  const [isIdPresent, setIsIdPresent] = useState(false);
  const [hasVoted, setHasVoted] = useState(false); // Track if the user has voted
  const [partyVotedFor, setPartyVotedFor] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/ISVotedRoute/")
      .then((response) => response.json())
      .then((jsonData) => {
        const existingVoter = jsonData.find((item) => item.voterId === Id);

        if (existingVoter) {
          setIsIdPresent(true);
          setHasVoted(true); // Set to true if user has voted
          setPartyVotedFor(existingVoter.votes[0]?.CandidateName || ""); // Optional: Store candidate name if needed
        }
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
      });
  }, [Id]);

  return (
    <div>
      {hasVoted ? (
        <div className="votpageFamily mb-5" style={{ opacity: "0.5" }}>
          <h3 className="container mt-4 text-center" style={{ fontWeight: "bold" }}>
            Thank you for voting!
          </h3>
          <h3 className="container mt-4 text-center blink" style={{ fontWeight: "bold" }}>
            We appreciate your participation!
          </h3>
        </div>
      ) : (
        <div>
          <h1 className="container text-center blink" style={{ textDecoration: "underline", opacity: '0.5', textUnderlineOffset: "8px", fontFamily: "var(--font3)" }}>
            Vote for your Leader <i className="fa-solid fa-check-to-slot"></i>
          </h1>
          <VotingCards Id={Id} setHasVoted={setHasVoted} /> {/* Pass down setHasVoted to VotingCards */}
        </div>
      )}
    </div>
  );
}

export default UserVotePage;
