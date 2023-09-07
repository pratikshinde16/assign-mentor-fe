import React, { useState, useEffect } from 'react';

const MentorStudents = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [students, setStudents] = useState([]);

  // Fetch the list of mentors
  useEffect(() => {
    // Make an API request to fetch the list of mentors from your backend
    // You can use the fetch API or a library like Axios for this
    // Example using fetch:
    fetch('/api/mentors') // Update the URL to match your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setMentors(data);
      })
      .catch((error) => {
        console.error('Error fetching mentors:', error);
      });
  }, []);

  // Fetch students when a mentor is selected
  useEffect(() => {
    if (selectedMentor) {
      // Make an API request to fetch the students assigned to the selected mentor
      // Example using fetch:
      fetch(`/api/mentor-students/${selectedMentor._id}`) // Update the URL to match your API endpoint
        .then((response) => response.json())
        .then((data) => {
          setStudents(data);
        })
        .catch((error) => {
          console.error('Error fetching students:', error);
        });
    } else {
      // Clear the students list when no mentor is selected
      setStudents([]);
    }
  }, [selectedMentor]);

  return (
    <div>
      <h2>Mentor Students</h2>
      <label>Select a Mentor: </label>
      <select
        onChange={(e) => {
          // Get the selected mentor object based on the value of the select input
          const mentorId = e.target.value;
          const selectedMentor = mentors.find((mentor) => mentor._id === mentorId);
          setSelectedMentor(selectedMentor);
        }}
      >
        <option value="">Select a Mentor</option>
        {mentors.map((mentor) => (
          <option key={mentor._id} value={mentor._id}>
            {mentor.name}
          </option>
        ))}
      </select>

      <div>
        {selectedMentor && (
          <div>
            <h3>Students under {selectedMentor.name}</h3>
            <ul>
              {students.map((student) => (
                <li key={student._id}>{student.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorStudents;
