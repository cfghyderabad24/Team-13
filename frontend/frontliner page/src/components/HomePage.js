import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const HomePage = () => {
  const currentStage = "Front_liner";
  const stages = [
    "Front_liner",
    "SL",
    "head_of_program",
    "General_manager",
    "regional_director",
    "head_office",
  ];
  const currentStageIndex = stages.indexOf(currentStage);
  const [projects, setProjects] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [error, setError] = useState("");
  const [newNGO, setNewNGO] = useState({
    ngo_name: "",
    budget: "",
    itrFile: null,
    proposalFile: null,
  });

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/project/frontliner/1"
        );
        const data = response.data.data;
        // Filter projects based on currentStage
        console.log(data);
        setProjects(data);
      } catch (error) {
        setError("An error occurred while fetching projects.");
      }
    };

    fetchProjects();
  }, [currentStageIndex]);

  const handleUpload = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setNewNGO((prevState) => ({ ...prevState, [name]: files[0] }));
    }
  };

  const handleCreate = () => {
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setNewNGO({ ngo_name: "", budget: "", itrFile: null, proposalFile: null });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNGO((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !newNGO.ngo_name ||
      !newNGO.budget ||
      !newNGO.itrFile ||
      !newNGO.proposalFile
    ) {
      setError("Please fill in all fields and upload both PDF files.");
      return;
    }

    const newProject = {
      projectId: projects.length + 1,
      NGO_name: newNGO.ngo_name,
      budget: parseFloat(newNGO.budget),
      current_stage: "Front_liner",
      itrFile: newNGO.itrFile.name,
      proposalFile: newNGO.proposalFile.name,
    };

    setProjects([...projects, newProject]);
    handleCloseFormModal();
  };

  return (
    <div className="container">
      <div className="heading-box">
        <h1>Projects to Look Over</h1>
      </div>
      {projects.length > 0 ? (
        <div className="cards-container">
          {projects.map((project) => (
            <div key={project._id} className="card">
              <h3>NGO Name: {project.ngo_name}</h3>
              <p>Project ID: {project._id}</p>
              <p>Budget: ${project.budget.toLocaleString()}</p>
              <Link to={`/project/${project._id}`}>
                <button className="details-button">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't added anything yet.</p>
      )}
      <div className="button">
        <button onClick={handleCreate}>
          <span className="plus-icon">+</span> Create New NGO
        </button>
      </div>

      {showFormModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New NGO Project</h2>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="ngo_name">NGO Name</label>
                <input
                  type="text"
                  name="ngo_name"
                  value={newNGO.ngo_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="budget">Budget</label>
                <input
                  type="text"
                  name="budget"
                  value={newNGO.budget}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="itrFile">Upload ITR</label>
                <input
                  type="file"
                  name="itrFile"
                  accept="application/pdf"
                  onChange={handleUpload}
                />
              </div>
              <div>
                <label htmlFor="proposalFile">Upload Proposal Document</label>
                <input
                  type="file"
                  name="proposalFile"
                  accept="application/pdf"
                  onChange={handleUpload}
                />
              </div>
              {error && <p className="error">{error}</p>}
              <div className="button-container">
                <button className="approve-button" type="submit">
                  Submit
                </button>
                <button
                  className="back-button"
                  type="button"
                  onClick={handleCloseFormModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
