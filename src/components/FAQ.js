import React from 'react';
import Navbar from '../components/Navbar';

const FAQ = () => {
  return (
    <div style={{ ...styles.page, ...styles.colorChange }}>
      {/* Navbar */}
      <Navbar logged={false} />

      {/* FAQ Content */}
      <div style={styles.container}>
        <h1 style={styles.title}>Frequently Asked Questions</h1>
        <div style={styles.faqSection}>
          <div style={styles.faqItem}>
            <h2 style={styles.question}>What is CampusElect?</h2>
            <p style={styles.answer}>
              CampusElect is a secure and transparent voting platform designed to
              revolutionize campus elections.
            </p>
          </div>
          <div style={styles.faqItem}>
            <h2 style={styles.question}>How do I create an account?</h2>
            <p style={styles.answer}>
              To create an account, click on the "Create Account" link on the
              homepage and fill in the required details.
            </p>
          </div>
          <div style={styles.faqItem}>
            <h2 style={styles.question}>Is my vote confidential?</h2>
            <p style={styles.answer}>
              Yes, your vote is confidential and protected using advanced
              encryption methods.
            </p>
          </div>
          <div style={styles.faqItem}>
            <h2 style={styles.question}>How can I view election results?</h2>
            <p style={styles.answer}>
              Once you are logged in, you can view the election results by
              clicking on the "Results" link in the navigation bar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    padding: '0',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    maxWidth: '800px',
    margin: '2rem auto', // Adds top and bottom margin
    padding: '2rem',
    backgroundColor: '#FA9E8C',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 1s ease-out',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    fontWeight: 'bold',
    animation: 'slideInDown 1s ease-out',
  },
  faqSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  faqItem: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#fafafa',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  question: {
    margin: '0',
    color: '#2c3e50',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  answer: {
    margin: '0.5rem 0 0 0',
    color: '#34495e',
    fontSize: '1rem',
  },
  colorChange: {
    animation: 'color-change-3x 4s linear infinite alternate both',
  },
};

// Add CSS keyframes for Animations
const stylesSheet = document.styleSheets[0];

const keyframesFadeIn = `
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}`;
stylesSheet.insertRule(keyframesFadeIn, stylesSheet.cssRules.length);

const keyframesSlideInDown = `
@keyframes slideInDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}`;
stylesSheet.insertRule(keyframesSlideInDown, stylesSheet.cssRules.length);

const keyframesColorChange = `
@keyframes color-change-3x {
  0% {
    background: #FF69B4;
  }
  50% {
    background: #800080;
  }
  100% {
    background: #8FBC8F;
  }
}`;
stylesSheet.insertRule(keyframesColorChange, stylesSheet.cssRules.length);

export default FAQ;
