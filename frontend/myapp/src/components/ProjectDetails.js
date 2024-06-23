import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const ProjectDetails = () => {
  const { projectId } = useParams(); // Get the projectId from the URL
  const [project, setProject] = useState(null); // Initialize project state

  useEffect(() => {
    // Fetch project details when the component mounts
    axios
      .get(`http://localhost:8000/api/project/role/${projectId}`)
      .then((response) => {
        console.log("Fetched project details:", response.data.data);
        setProject(response.data.data); // Set the fetched project data to the state
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
      });
  }, [projectId]); // Re-run effect when projectId changes

  if (!project) {
    return <div>Loading...</div>; // Show loading message if project data is not yet loaded
  }

  const handleApprove = () => {
    // Send a PATCH request to update the current_status of the project
    axios
      .patch(`http://localhost:8000/api/project/approve/${projectId}`, {
        current_status: "accepted",
      })
      .then((response) => {
        console.log("Project approved:", response.data);
      })
      .catch((error) => {
        console.error("Error approving project:", error);
      });
  };

  const handleDecline = () => {
    axios
      .patch(`http://localhost:8000/api/project/reject/${projectId}`, {
        current_status: "accepted",
      })
      .then((response) => {
        console.log("Project approved:", response.data);
      })
      .catch((error) => {
        console.error("Error approving project:", error);
      });
  };

  return (
    <div className="container">
      <div className="project-details">
        <h1>{project.ngo_name}</h1>
        <p>
          <strong>Project ID:</strong> {project._id}
        </p>
        <p>
          <strong>Budget:</strong> ${project.budget.toLocaleString()}
        </p>
        <p>
          <strong>Current Stage:</strong> {project.current_stage}
        </p>
        <p>
          <strong>Current Status:</strong> {project.current_status}
        </p>
        <div className="buttons-container">
          <button className="accept-button" onClick={handleApprove}>
            Approve
          </button>
          <button className="decline-button" onClick={handleDecline}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;