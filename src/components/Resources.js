import React from 'react';
import Navbar from '../components/Navbar'; // Import Navbar

const Resources = () => {
  return (
    <div style={styles.page} className="color-change-3x">
      <Navbar logged={false} /> {/* Include Navbar */}

      <div style={styles.container}>
        <h1 style={styles.header}>Resources</h1>
        <p style={styles.intro}>Explore the following resources to help you get started with the CampusElect system.</p>

        <div style={styles.cards}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>User Guide</h2>
            <p style={styles.cardContent}>Learn how to use the BlockVote system with our comprehensive user guide.</p>
            <a href="https://studentgovresources.org" target="_blank" rel="noopener noreferrer" style={styles.linkButton}>
              Read Guide
            </a>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>FAQs</h2>
            <p style={styles.cardContent}>Find answers to the most frequently asked questions about BlockVote.</p>
            <button style={styles.cardButton} onClick={() => window.location.href = '/faq'}>View FAQs</button>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Tutorial Videos</h2>
            <p style={styles.cardContent}>Watch step-by-step tutorial videos to get acquainted with BlockVote.</p>
            <div>
              <a href="https://youtu.be/-7LkDO6JUDA?si=CZXb-PNjMIDDQKEg" target="_blank" rel="noopener noreferrer" style={styles.linkButton}>
                Watch Video 1
              </a>
              <a href="https://youtu.be/R_h6HSE367c?si=G15HeSYZJv_8uwrL" target="_blank" rel="noopener noreferrer" style={styles.linkButton}>
                Watch Video 2
              </a>
              <a href="https://youtu.be/NLKZ5r8A34U?si=yDK7SJnWsPWLU90h" target="_blank" rel="noopener noreferrer" style={styles.linkButton}>
                Watch Video 3
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
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

          .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .card:hover {
            transform: scale(1.05); /* Scale the card on hover */
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */
          }
        `}
      </style>
    </div>
  );
};

// Inline Styles
const styles = {
  page: {
    backgroundColor: '#44b09e', // Light sky blue background
    minHeight: '300vh',
    padding: '0',
    margin: '0',
  },
  
  container: {
    maxWidth: '900px',
    margin: '2rem auto', // Add margin to create space above and below
    padding: '2rem',
    backgroundColor: '#FA9E8C', // White background for the container
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  header: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '1rem',
  },
  intro: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '2rem',
  },
  cards: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    flex: '1 1 30%',
    maxWidth: '300px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '1rem',
  },
  cardContent: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '1rem',
  },
  cardButton: {
    backgroundColor: '#ff8c00', // Orange color for the button
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  linkButton: {
    display: 'block',
    margin: '0.5rem 0',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#ff8c00', // Orange color for link buttons
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Resources;
