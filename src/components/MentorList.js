import React, { useEffect, useState } from "react";
import axios from "axios";

const MentorList = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    // Fetch the list of mentors from the backend API
    axios
      // .get("http://localhost:3000/api/mentors")
      .get("https://assign-mentor-k96m.onrender.com/api/mentors")

      .then((response) => {
        setMentors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching mentors:", error);
      });
  }, []);

  return (
    <div>
      <h2>List of Mentors</h2>
      <ul>
        {mentors.map((mentor) => (
          <li key={mentor._id}>{mentor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MentorList;
