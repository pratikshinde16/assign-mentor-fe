import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'; 
import Home from './components/Home';
import CreateMentor from './components/CreateMentor';
import CreateStudent from './components/CreateStudent';
import AssignStudentToMentor from './components/AssignStudentToMentor';
import ViewStudentDetails from './components/ViewStudentDetails';
import ChangeMentor from './components/ChangeMentor';
import MentorStudents from './components/MentorStudents';
import MentorList from './components/MentorList';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create-mentor">Create Mentor</Link>
            </li>
            <li>
              <Link to="/create-student">Create Student</Link>
            </li>
            <li>
              <Link to="/assign-student">Assign Student to Mentor</Link>
            </li>
            <li>
              <Link to="/change-mentor">Assign/Change Mentor</Link>
            </li>
            <li>
              <Link to="/view-student-details">View Student Details</Link>
            </li>
            <li>
              <Link to="/mentor-students">Mentor Students</Link>
            </li>
            <li>
              <Link to="/mentor-list">Mentor List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-mentor" element={<CreateMentor />} />
          <Route path="/create-student" element={<CreateStudent />} />
          <Route path="/assign-student" element={<AssignStudentToMentor />} />
          <Route path="/view-student-details" element={<ViewStudentDetails />} />
          <Route path="/mentor-students" element={<MentorStudents />} />
          <Route path="/change-mentor" element={<ChangeMentor />} />
          <Route path="/mentor-list" element={<MentorList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
