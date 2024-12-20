import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Navbar from '../components/Navbar';

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  message: yup.string().required('Message is required'),
});

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('access_key', 'b652ca6b-38fb-47b2-89d2-46285a957981');
      formData.append('subject', 'New Contact Form Submission from Web3Forms');
      formData.append('from_name', 'My Website');
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Your message has been sent!');
        reset(); // Reset form after successful submission
      } else {
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was a problem sending your message.');
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.field}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              style={styles.input}
            />
            {errors.name && <p style={styles.error}>{errors.name.message}</p>}
          </div>
          <div style={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              style={styles.input}
            />
            {errors.email && <p style={styles.error}>{errors.email.message}</p>}
          </div>
          <div style={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              {...register('message')}
              rows="4"
              style={styles.textarea}
            />
            {errors.message && <p style={styles.error}>{errors.message.message}</p>}
          </div>
          <button type="submit" style={styles.button} disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  page: {
    minHeight: '100vh',
    padding: '0 1rem',
    animation: 'color-change-5x 8s linear infinite alternate', // Background animation
  },
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#FA9E8C',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    marginBottom: '1.5rem',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    backgroundColor: '#ffffff',
  },
  textarea: {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    backgroundColor: '#ffffff',
  },
  button: {
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#ffc107', // Changed to golden color
    color: '#ffffff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  error: {
    color: '#ff4d4d',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
  },
};

// Add CSS keyframes for Animations
const stylesSheet = document.styleSheets[0];

const keyframesColorChange = `
@keyframes color-change-5x {
  0% {
    background: #19dcea;
  }
  25% {
    background: #b22cff;
  }
  50% {
    background: #ea2222;
  }
  75% {
    background: #f5be10;
  }
  100% {
    background: #3bd80d;
  }
}`;

stylesSheet.insertRule(keyframesColorChange, stylesSheet.cssRules.length);

export default Contact;
