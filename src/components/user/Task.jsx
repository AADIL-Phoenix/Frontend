import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Task.css';
import { AiOutlineFileText } from 'react-icons/ai';
import { MdErrorOutline, MdCheckCircle, MdAutorenew, MdHourglassEmpty, MdArrowDownward } from 'react-icons/md';
import { FaFlag } from 'react-icons/fa';

function createData(projectId, name, task, duedate, priority, status) {
  return { projectId, name, task, duedate, priority, status };
}

const defaultRows = [
  // Project: Website Redesign (TSK-001)
  createData('TSK-001', 'Website Redesign', 'Design homepage layout', '2025-06-20', 'High', 'Pending'),
  createData('TSK-001', 'Website Redesign', 'Fix navbar responsiveness', '2025-06-20', 'High', 'Pending'),
  createData('TSK-001', 'Website Redesign', 'Update hero section images', '2025-06-20', 'High', 'Pending'),
  createData('TSK-001', 'Website Redesign', 'Test mobile responsiveness', '2025-06-20', 'High', 'Pending'),
  createData('TSK-001', 'Website Redesign', 'Optimize CSS for performance', '2025-06-20', 'High', 'Pending'),

  // Project: Mobile App
  createData('TSK-002', 'Mobile App', 'Fix login crash on Android', '2025-06-18', 'High', 'Pending'),

  // Project: API Development
  createData('TSK-003', 'API Development', 'Create user profile endpoint', '2025-06-22', 'Medium', 'Completed'),

  // Project: Testing Suite
  createData('TSK-004', 'Testing Suite', 'Write unit tests for utils', '2025-06-19', 'Low', 'Pending'),

  // Project: Authentication Module
  createData('TSK-005', 'Authentication Module', 'Implement password reset', '2025-06-21', 'High', 'Completed'),

  // Project: Analytics Integration
  createData('TSK-006', 'Analytics Integration', 'Integrate Google Analytics', '2025-06-23', 'Medium', 'Pending'),

  // Project: Presentation Prep
  createData('TSK-007', 'Presentation Prep', 'Create demo slides', '2025-06-24', 'Low', 'In Progress')
];


const Task = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks'));
    if (stored) {
      setRows(stored);
    } else {
      setRows(defaultRows);
      localStorage.setItem('tasks', JSON.stringify(defaultRows));
    }
  }, []);

  const renderBadge = (value) => {
    const iconMap = {
      High: <MdErrorOutline style={{ marginRight: '5px' }} />,
      Medium: <FaFlag style={{ marginRight: '5px' }} />,
      Low: <MdArrowDownward style={{ marginRight: '5px' }} />,
      Pending: <MdHourglassEmpty style={{ marginRight: '5px' }} />,
      'In Progress': <MdAutorenew style={{ marginRight: '5px' }} />,
      Completed: <MdCheckCircle style={{ marginRight: '5px' }} />
    };
    const colorMap = {
      High: '#e74c3c',
      Medium: '#f1c40f',
      Low: '#2ecc71',
      Pending: '#7f8c8d',
      Completed: '#27ae60',
      'In Progress': '#2980b9'
    };

    return (
      <span
        className="badge"
        style={{
          backgroundColor: colorMap[value] || '#ccc',
          color: '#fff',
          padding: '6px 12px',
          borderRadius: '30px',
          display: 'inline-flex',
          alignItems: 'center',
          fontSize: '0.8rem',
          fontWeight: 600,
          minWidth: '130px',
          justifyContent: 'center'
        }}
      >
        {iconMap[value]} {value}
      </span>
    );
  };

  // Group tasks by projectId
  const grouped = rows.reduce((acc, task) => {
    if (!acc[task.projectId]) {
      acc[task.projectId] = {
        projectId: task.projectId,
        name: task.name,
        tasks: []
      };
    }
    acc[task.projectId].tasks.push(task);
    return acc;
  }, {});
  const projects = Object.values(grouped);

  return (
    <div className="task-table-container">
      <div className="task-title">My Projects</div>
      <TableContainer component={Paper} className="task-table">
        <Table>
          <TableHead>
            <TableRow className="task-header-row" style={{ backgroundColor: '#f9f9f9' }}>
              <TableCell style={{ color: '#080808' }}>Project ID</TableCell>
              <TableCell style={{ color: '#080808' }}>Project</TableCell>
              <TableCell style={{ color: '#080808' }}>Due Dates</TableCell>
              <TableCell style={{ color: '#080808' }}>Priority</TableCell>
              <TableCell style={{ color: '#080808' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => {
              const priorities = [...new Set(project.tasks.map(t => t.priority))];
              const statuses = [...new Set(project.tasks.map(t => t.status))];
              const dueDates = [...new Set(project.tasks.map(t => t.duedate))];

              return (
                <TableRow
                  key={project.projectId}
                  onClick={() => navigate(`/submit/${project.projectId}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{project.projectId}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AiOutlineFileText size={18} color="#3498db" /> {project.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    {dueDates.map(date => (
                      <div key={date}>
                        {date}
                        <div style={{ fontSize: '0.75rem', color: new Date(date) < new Date() ? 'red' : '#888' }}>
                          {new Date(date) < new Date() ? 'Overdue' : 'On track'}
                        </div>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{priorities.map(p => renderBadge(p))}</TableCell>
                  <TableCell>{statuses.map(s => renderBadge(s))}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Task;
