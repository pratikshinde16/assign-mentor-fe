import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChangeMentor = () => {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('');

  useEffect(() => {
    // Fetch all students from the backend
    axios.get('/api/students')
  .then((response) => {
    setStudents(response.data);
  })
  .catch((error) => {
    console.error('Failed to fetch students:', error);
  });

    // Fetch available mentors from the backend
    axios
      .get('/api/mentors')
      .then((response) => {
        setMentors(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch mentors:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedStudent !== '' && selectedMentor !== '') {
      axios
        .put(`/api/assign-mentor/${selectedStudent}`, {
          mentorId: selectedMentor,
        })
        .then((response) => {
          console.log('Mentor assigned/changed for student successfully');
          // Clear the selections after successful assignment
          setSelectedStudent('');
          setSelectedMentor('');
        })
        .catch((error) => {
          console.error('Failed to assign/change mentor for student:', error);
        });
    } else {
      alert('Please select a student and a mentor');
    }
  };

  return (
    <div>
      <h2>Assign/Change Mentor for Student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Student:
          <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
            <option value="">Select a Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Select Mentor:
          <select value={selectedMentor} onChange={(e) => setSelectedMentor(e.target.value)}>
            <option value="">Select a Mentor</option>
            {mentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Assign/Change Mentor</button>
      </form>
    </div>
  );
};

export default ChangeMentor;
