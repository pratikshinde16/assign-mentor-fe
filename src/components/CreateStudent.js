import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateStudent = () => {
  const [studentName, setStudentName] = useState('');
  const [availableMentors, setAvailableMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(''); // Initialize with an empty string

  useEffect(() => {
    // Fetch available mentors from the backend
    axios
      .get('https://assign-mentor-k96m.onrender.com/api/mentors') // Use the absolute URL
      .then((response) => {
        setAvailableMentors(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch mentors:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if selectedMentor is an empty string (no mentor selected)
    const mentorId = selectedMentor === '' ? null : selectedMentor;
    
    if (studentName.trim() !== '') {
      axios
        .post('https://assign-mentor-k96m.onrender.com/api/students', { // Use the absolute URL
          name: studentName,
          mentor: mentorId, // Include selected mentor's ID or null in the request
        })
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
      alert('Please enter a valid student name');
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
            <option value="">No Mentor</option> {/* Add an option for no mentor selected */}
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
