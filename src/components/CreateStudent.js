import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateStudent = () => {
  const [studentName, setStudentName] = useState('');
  const [availableMentors, setAvailableMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');

  useEffect(() => {
    // Fetch available mentors from the backend
    axios
      .get('http://localhost:3000/api/mentors')
      .then((response) => {
        setAvailableMentors(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch mentors:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentName.trim() !== '' && selectedMentor !== '') {
      axios
        .post('http://localhost:3000/api/students', { name: studentName })
        .then((response) => {
          console.log('Student created successfully:', response.data);
          // Clear the input fields after successful submission
          setStudentName('');
          setSelectedMentor('');
        })
        .catch((error) => {
          console.error('Failed to create student:', error);
        });
    } else {
      alert('Please enter a valid student name and select a mentor');
    }
  };

  return (
    <div>
      <h2>Create Student and Assign Mentor</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student Name:
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </label>
        <label>
          Select Mentor:
          <select value={selectedMentor} onChange={(e) => setSelectedMentor(e.target.value)}>
            <option value="">Select a Mentor</option>
            {availableMentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create Student</button>
      </form>
    </div>
  );
};

export default CreateStudent;
