import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Submit.css';
import { ArrowLeft } from 'lucide-react';

const SubmitPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState('');
  const [projectTasks, setProjectTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState({});

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const relatedTasks = tasks.filter(t => t.projectId === projectId);
    const initialChecked = {};
    relatedTasks.forEach(task => {
      initialChecked[task.task] = false;
    });

    setProjectTasks(relatedTasks);
    setCheckedTasks(initialChecked);
  }, [projectId]);

  const handleCheck = (taskName) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskName]: !prev[taskName]
    }));
  };

  const handleSubmit = () => {
  const total = projectTasks.length;
  const selected = projectTasks.filter(task => checkedTasks[task.task]).length;

  let newStatus = 'Pending';
  if (selected === total) newStatus = 'Completed';
  else if (selected > 0) newStatus = 'In Progress';

  const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = allTasks.map(task => {
    if (task.projectId === projectId) {
      return {
        ...task,
        status: newStatus,
        github: link
      };
    }
    return task;
  });

  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  navigate('/');
};


  if (projectTasks.length === 0) return <p>Task not found</p>;

  return (
    <div className="submit-container">
      <div className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={22} />
      </div>

      <h2>Submit Tasks for Project</h2>
      <form className="submit-form" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        <div>
          <label>Project:</label>
          <input type="text" value={projectTasks[0]?.name || ''} readOnly />
        </div>

        <div>
          <label>Due Dates:</label>
          <input
            type="text"
            value={projectTasks.map(t => t.duedate).join(', ')}
            readOnly
          />
        </div>

        <div>
          <label>Tasks:</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {projectTasks.map(task => (
              <label key={task.task}>
                <input
                  type="checkbox"
                  checked={checkedTasks[task.task] || false}
                  onChange={() => handleCheck(task.task)}
                />
                {task.task}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label>GitHub Link:</label>
          <input
            type="url"
            placeholder="Enter GitHub link"
            value={link}
            onChange={e => setLink(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default SubmitPage;
