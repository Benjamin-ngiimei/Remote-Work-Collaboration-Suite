import './TaskBoard.css';
const initialTasks = {
  'todo': [
    { id: 'task-1', content: 'Set up project structure' },
    { id: 'task-2', content: 'Install dependencies' },
  ],
  'in-progress': [
    { id: 'task-3', content: 'Develop login page' },
  ],
  'done': [
    { id: 'task-4', content: 'Design landing page' },
    { id: 'task-5', content: 'Initialize frontend application' },
  ],
};

const columns = [
  { id: 'todo', title: 'To-Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export default function TaskBoard() {
  return (
    <div className="task-board-container">
      <h1>Task Board</h1>
      <div className="task-board-columns">
        {columns.map(column => (
          <div key={column.id} className="task-board-column">
            <h2>{column.title}</h2>
            <div className="task-list">
              {initialTasks[column.id].map(task => (
                <div key={task.id} className="task-card">
                  {task.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}