// // src/mockProjects.js

// export const projects = [
//     {
//       projectId: '1',
//       NGO_name: 'Helping Hands',
//       budget: 500000,
//       current_stage: 'Front_liner',
//       current_status: 'pending',
//       deadline: '2024-07-01',
//       description: 'A project to provide food and shelter to the homeless.'
//     },
//     {
//       projectId: '2',
//       NGO_name: 'Green Earth',
//       budget: 750000,
//       current_stage: 'Front_liner',
//       current_status: 'pending',
//       deadline: '2024-08-15',
//       description: 'A project to plant trees and promote sustainable living.'
//     },
//     {
//       projectId: '3',
//       NGO_name: 'Education for All',
//       budget: 800000,
//       current_stage: 'head_of_program',
//       current_status: 'pending',
//       deadline: '2024-09-10',
//       description: 'A project to provide education to underprivileged children.'
//     },
//     {
//       projectId: '4',
//       NGO_name: 'Health First',
//       budget: 1000000,
//       current_stage: 'General_manager',
//       current_status: 'pending',
//       deadline: '2024-10-05',
//       description: 'A project to build healthcare facilities in rural areas.'
//     },
//     {
//       projectId: '5',
//       NGO_name: 'Clean Water Initiative',
//       budget: 1100000,
//       current_stage: 'regional_director',
//       current_status: 'pending',
//       deadline: '2024-11-20',
//       description: 'A project to provide clean and safe drinking water.'
//     },
//     {
//       projectId: '6',
//       NGO_name: 'Women Empowerment',
//       budget: 1200000,
//       current_stage: 'head_office',
//       current_status: 'pending',
//       deadline: '2024-12-15',
//       description: 'A project to support women entrepreneurship and education.'
//     }
//   ];
  
//   export const stages = ['Front_liner', 'SL', 'head_of_program', 'General_manager', 'regional_director', 'head_office'];
  
//   export const getFilteredProjects = (currentStageIndex) => {
//     return projects.filter(project => stages.indexOf(project.current_stage) <= currentStageIndex && project.current_status === 'pending');
//   };