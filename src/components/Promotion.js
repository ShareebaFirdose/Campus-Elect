import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component

const candidates = [
  {
    name: 'Shareeba',
    position: 'Candidate for President',
    videoUrl: 'https://www.youtube.com/embed/your-video-id1',
    imageUrl: 'https://images.meesho.com/images/products/272111410/q1bcs_512.webp',
    vision: [
      'Improve campus facilities and resources for all students.',
      'Promote inclusivity and diversity in all campus activities.',
      'Establish transparent communication between students and administration.',
      'Support and enhance mental health resources for everyone.',
      'Organize more engaging events and activities to build a stronger community.',
    ],
  },
  {
    name: 'Mona',
    position: 'Candidate for Vice President',
    videoUrl: 'https://www.youtube.com/embed/your-video-id2',
    imageUrl: 'https://media.istockphoto.com/id/1349414698/photo/attractive-girl-with-brown-hair-walks-out-of-corporate-building-for-break-dressed-in-smart.jpg?s=612x612&w=0&k=20&c=lx8yiHonIP_ZrKxQVUZUJWpJaTgvDhPVgp0vnpeDsdM=',
    vision: [
      'Introduce more sports and extracurricular activities.',
      'Enhance academic resources and support systems.',
      'Foster a culture of innovation and creativity.',
      'Promote environmental sustainability on campus.',
      'Encourage student leadership and participation in decision-making.',
    ],
  },
  // Add more candidates as needed
];

const CandidatePromotion = () => {
  return (
    <div>
      <Navbar /> {/* Render the Navbar component */}

      <div className={`cards-container color-change-3x`} style={styles.cardsContainer}>
        {candidates.map((candidate, index) => (
          <div key={index} className="promotion-card" style={styles.promotionCard}>
            <div className="candidate-info" style={styles.candidateInfo}>
              <img src={candidate.imageUrl} alt={candidate.name} style={styles.candidateImage} />
              <h2 style={styles.candidateName}>{candidate.name}</h2>
              <p style={styles.candidatePosition}>{candidate.position}</p>
            </div>

            <div className="video-section" style={styles.videoSection}>
              <iframe
                src={candidate.videoUrl}
                style={styles.video}
                title={`Campaign Video of ${candidate.name}`}
                allowFullScreen
              ></iframe>
            </div>

            <div className="platform" style={styles.platform}>
              <h3>My Vision and Goals:</h3>
              <ul>
                {candidate.vision.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          body, html {
            margin: 0; /* Remove default margin */
            padding: 0; /* Remove default padding */
            height: 100%; /* Ensure the body takes the full height */
          }

          .color-change-3x {
            -webkit-animation: color-change-3x 4s linear infinite alternate both;
            animation: color-change-3x 4s linear infinite alternate both;
          }

          @-webkit-keyframes color-change-3x {
            0% {
              background: #19dcea;
            }
            50% {
              background: #b22cff;
            }
            100% {
              background: #ea2222;
            }
          }
          @keyframes color-change-3x {
            0% {
              background: #19dcea;
            }
            50% {
              background: #b22cff;
            }
            100% {
              background: #ea2222;
            }
          }
        `}
      </style>
    </div>
  );
};

// Define inline styles
const styles = {
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
    marginTop: '1rem', // Adjust margin as needed
  },
  promotionCard: {
    maxWidth: '350px',
    backgroundColor: '#FA9E8C',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  candidateInfo: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  candidateImage: {
    borderRadius: '50%',
    width: '220px',
    height: '300px',
    objectFit: 'cover',
    border: '3px solid #ffc107',
  },
  candidateName: {
    margin: '10px 0 5px',
    color: '#333',
  },
  candidatePosition: {
    color: '#666',
    fontSize: '16px',
  },
  videoSection: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  video: {
    width: '100%',
    maxWidth: '300px',
    height: '170px',
    border: 'none',
    borderRadius: '8px',
  },
  platform: {
    backgroundColor: '#ffc107',
    padding: '15px',
    borderRadius: '5px',
    color: '#333',
    textAlign: 'left',
  },
};

export default CandidatePromotion;
