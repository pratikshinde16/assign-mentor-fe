import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignStudentToMentor = () => {
  const [availableMentors, setAvailableMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [studentsWithoutMentor, setStudentsWithoutMentor] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    // Fetch available mentors from the backend
    axios
      // .get('http://localhost:3000/api/mentors')
      .get('https://assign-mentor-k96m.onrender.com/api/mentors')
      .then((response) => {
        setAvailableMentors(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch mentors:', error);
      });

    // Fetch students without any mentor assigned from the backend
    axios
      // .get('http://localhost:3000/api/students-without-mentor')
      .get('https://assign-mentor-k96m.onrender.com/api/students-without-mentor')

      .then((response) => {
        setStudentsWithoutMentor(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch students without mentor:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMentor !== '' && selectedStudents.length > 0) {
      axios
        // .post(`http://localhost:3000/api/assign-mentor/${selectedMentor}`, { studentIds: selectedStudents })
     
        .post(`https://assign-mentor-k96m.onrender.com/api/assign-mentor/${selectedMentor}`, { studentIds: selectedStudents })

        .then((response) => {
          console.log('Students assigned to mentor successfully:', response.data);
          // Clear the selection after successful assignment
          setSelectedMentor('');
          setSelectedStudents([]);
        })
        .catch((error) => {
          console.error('Failed to assign students to mentor:', error);
        });
    } else {
      alert('Please select a mentor and at least one student');
    }
  };

  return (
    <div>
      <h2>Assign Students to Mentor</h2>
      <form onSubmit={handleSubmit}>
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
        <label>
          Select Students:
          <select
            multiple
            value={selectedStudents}
            onChange={(e) => setSelectedStudents(Array.from(e.target.selectedOptions, (option) => option.value))}
          >
            {studentsWithoutMentor.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Assign Students to Mentor</button>
      </form>
    </div>
  );
};

export default AssignStudentToMentor;
