import React, { useState } from 'react';
import axios from 'axios';

const CreateMentor = () => {
  const [mentorName, setMentorName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mentorName.trim() !== '') {
      axios
        .post('http://localhost:3000/api/mentors', { name: mentorName }) // Change the URL
        .then((response) => {
          console.log('Mentor created successfully:', response.data);
          // Clear the input field after successful submission
          setMentorName('');
        })
        .catch((error) => {
          console.error('Failed to create mentor:', error);
        });
    } else {
      alert('Please enter a valid mentor name');
    }
  };

  return (
    <div>
      <h2>Create Mentor</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Mentor Name:
          <input
            type="text"
            value={mentorName}
            onChange={(e) => setMentorName(e.target.value)}
          />
        </label>
        <button type="submit">Create Mentor</button>
      </form>
    </div>
  );
};

export default CreateMentor;
