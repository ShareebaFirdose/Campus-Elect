import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VotingCardsRow(props) {
  const { Id, obj, onVote } = props;
  const { PartyName, CandidateName, Image, Position } = obj;

  const handleClick = () => {
    const voteData = {
      Id: Id,
      PartyVoted: PartyName,
      CandidateName: CandidateName,
      Position: Position,
    };

    // Call the onVote function passed from VotingCards to handle the voting logic
    onVote(voteData);
  };

  return (
    <div className="col-md-4 col-lg-3 mb-4"> {/* Added mb-4 for vertical spacing */}
      <div className="card d-flex" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', padding: '10px' }}>
        <div className="row justify-content-center">
          <img src={Image} className="mt-3 card-img-top" alt={`${PartyName} Candidate`} style={{ height: "100px", width: "100px" }} />
        </div>
        <div className="card-body">
         
          <p className="card-text"><b>Candidate Name:</b> {CandidateName}</p>
          <p className="card-text"><b>Position:</b> {Position}</p>
        </div>
        <div className="card-footer d-flex justify-content-center">
          <button onClick={handleClick} className="btn btn-warning" style={{ color: "white" }}>
            <i className="fa-solid fa-computer-mouse"></i> Click to Vote
          </button>
        </div>
      </div>
    </div>
  );
}

export default VotingCardsRow;
