async function fetchTasks() {
    try {
      const response = await fetch('/tasks'); // Create an endpoint to get tasks
      const tasks = await response.json();
      const taskList = document.querySelector('.task-list');
  
      taskList.innerHTML = ''; // Clear the current list
  
      tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
          <div>
            <p>Task Type: ${task.taskType}</p>
            <p>Due Date: ${new Date(task.dueDate).toDateString()}</p>
            <img src="${task.flowerImages}" alt="${task.status} flower">
          </div>
        `;
        taskList.appendChild(taskItem);
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }
  
  // Fetch tasks every minute
  setInterval(fetchTasks, 60000);
  
  // Initial fetch
  fetchTasks();
  