const socket = io();

// Listen for taskUpdated events
socket.on('taskUpdated', (task) => {
  const taskElement = document.querySelector(`li[data-id="${task._id}"]`);
  if (taskElement) {
    taskElement.querySelector('p:nth-child(2)').textContent = `Due Date: ${new Date(task.dueDate).toDateString()}`;
    taskElement.querySelector('img').src = task.flowerImages;
    taskElement.querySelector('img').alt = `${task.status} flower`;
  } else {
    const taskList = document.querySelector('.task-list');
    const taskItem = document.createElement('li');
    taskItem.setAttribute('data-id', task._id);
    taskItem.innerHTML = `
      <div>
        <p>Task Type: ${task.taskType}</p>
        <p>Due Date: ${new Date(task.dueDate).toDateString()}</p>
        <img src="${task.flowerImages}" alt="${task.status} flower">
      </div>
    `;
    taskList.appendChild(taskItem);
  }
});
