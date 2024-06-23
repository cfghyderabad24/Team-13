const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
let projects = [
  {
    projectId: '1',
    NGO_name: 'Health for All',
    budget: 500000,
    current_stage: 'HP',
    current_status: 'pending',
    deadline: '2024-07-01',
    description: 'A project to improve health facilities in rural areas.'
  },
  {
    projectId: '2',
    NGO_name: 'Water for All',
    budget: 300000,
    current_stage: 'SL',
    current_status: 'pending',
    deadline: '2024-08-15',
    description: 'A project to provide clean water in remote areas.'
  },
  {
    projectId: '3',
    NGO_name: 'Health for All',
    budget: 500000,
    current_stage: 'HP',
    current_status: 'pending',
    deadline: '2024-07-01',
    description: 'A project to improve health facilities in rural areas.'
  },
  {
    projectId: '4',
    NGO_name: 'Water for All',
    budget: 300000,
    current_stage: 'SL',
    current_status: 'pending',
    deadline: '2024-08-15',
    description: 'A project to provide clean water in remote areas.'
  },
  // Add more projects as needed
];
// Get all projects
app.get('/projects', (req, res) => {
  res.json(projects);
});
// Get project by ID
app.get('/projects/:projectId', (req, res) => {
  const project = projects.find(p => p.projectId === req.params.projectId);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});
// Update project stage by ID
app.patch('/projects/:projectId', (req, res) => {
  const project = projects.find(p => p.projectId === req.params.projectId);
  if (project) {
    project.current_stage = req.body.current_stage;
    res.json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});