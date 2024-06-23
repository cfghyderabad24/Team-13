import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/project/frontliner/1/${projectId}`
        );
        console.log(response.data.data);
        setProject(response.data.data);
      } catch (error) {
        setError("Failed to fetch project details.");
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="details-container">
        <h1>{project.ngo_name}</h1>
        <p>ID: {project._id}</p>
        <p>Budget: ${project.budget.toLocaleString()}</p>
        <p>Current Stage: {project.current_stage}</p>
        <p>Current Status: {project.current_status}</p>
        <p>Deadline: {project.deadline}</p>
        <p>Description: {project.description}</p>
        <Link to="/">
          <button className="back-button">Back to Projects</button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetails;
