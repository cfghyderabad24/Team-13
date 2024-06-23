import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const HomePage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/project/role/state_lead")
      .then((response) => {
        console.log(response.data);
        setProjects(response.data.data);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="container">
      <div className="heading-box">
        <h1>Head of Processing</h1>
      </div>
      <div className="cards-container">
        {projects.map((project) => (
          <div key={project._id} className="card">
            <h3>NGO Name: {project.ngo_name}</h3>
            <p>Project ID: {project._id}</p>
            <p>Budget: ${project.budget.toLocaleString()}</p>
            <Link to={`http://localhost:8000/api/project/role/${project._id}`}>
              <button className="details-button">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;