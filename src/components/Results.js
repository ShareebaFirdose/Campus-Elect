import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import axios from "axios";
import './Results.css';  
import Foot from './foot';  

// Registering necessary elements for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Options for the Bar chart
const option = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: {
      display: true,
      text: "Polls Result",
    },
  },
};

export default function Results() {
  // States to manage the chart data and the table data
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Votes",
        data: [],
        backgroundColor: "#ffd700",  // Gold color
      },
    ],
  });

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the list of parties/candidates
        const partyResponse = await axios.get("http://localhost:5000/PartiesRoute");
        const parties = partyResponse.data;

        // Fetch the list of votes
        const votesResponse = await axios.get("http://localhost:5000/ISVotedRoute");
        const votes = votesResponse.data;

        // Counting votes for each candidate based on the position
        const voteCount = {};
        votes.forEach((vote) => {
          vote.votes.forEach((candidateVote) => {
            const key = `${candidateVote.CandidateName}-${candidateVote.Position}`;
            voteCount[key] = (voteCount[key] || 0) + 1;
          });
        });

        // Preparing data for the chart and the table
        const labels = [];
        const voteCounts = [];
        const tableData = [];

        parties.forEach((party) => {
          const key = `${party.CandidateName}-${party.Position}`;
          const voteNumber = voteCount[key] || 0;
          
          labels.push(`${party.CandidateName} (${party.Position})`);
          voteCounts.push(voteNumber);
          
          tableData.push({
            position: party.Position,
            candidate: party.CandidateName,
            votes: voteNumber,
          });
        });

        // Updating the chart data
        setData({
          labels: labels,
          datasets: [
            {
              label: "Number of Votes",
              data: voteCounts,
              backgroundColor: "#ffd700",  // Gold color
            },
          ],
        });

        // Updating the table data
        setTableData(tableData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <div className="row barResults">
          <div className="col-lg-6" style={{ height: "70vh" }}>
            <Bar options={option} data={data} />
          </div>
          <div className="col-lg-6">
            <h2 className="mb-5 text-center">Number of Votes for each Candidate</h2>
            <table className="table table-bordered">
              <thead>
                <tr className="table-dark">
                  <th>Position</th>
                  <th>Candidate</th>
                  <th>Count of Votes</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.position}</td>
                    <td>{entry.candidate}</td>
                    <td>{entry.votes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Foot /> {/* Rendering the footer component */}
    </div>
  );
}
