// used help from this video https://www.youtube.com/watch?v=6eFwtaZf6zc&t=0s

window.addEventListener('load', () => {
    const taskbar = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const listElement = document.querySelector('#tasks');
  
    function initializeTasks() {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      savedTasks.forEach(task => addTask(task));
    }
  
    function addTask(task) {
      const taskElement = createTaskElement(task);
      listElement.appendChild(taskElement);
      saveTask(task);
    }
  
    function saveTask(task) {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      savedTasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
  
    function deleteTask(taskElement) {
      const task = taskElement.querySelector('.text').value;
      listElement.removeChild(taskElement);
      removeTaskFromStorage(task);
    }
  
    function removeTaskFromStorage(task) {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTasks = savedTasks.filter(savedTask => savedTask !== task);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  
  
    function createTaskElement(task) {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task');
  
      const taskContentElement = document.createElement('div');
      taskContentElement.classList.add('content');
      taskElement.appendChild(taskContentElement);
  
      const taskInputElement = document.createElement('input');
      taskInputElement.classList.add('text');
      taskInputElement.type = 'text';
      taskInputElement.value = task;
      taskInputElement.setAttribute('readonly', 'readonly');
      taskContentElement.appendChild(taskInputElement);
  
      const taskActionsElement = document.createElement('div');
      taskActionsElement.classList.add('actions');
      taskElement.appendChild(taskActionsElement);
  
      const taskDoneElement = document.createElement('button');
      taskDoneElement.classList.add('done');
      taskDoneElement.innerHTML = 'Done';
      taskActionsElement.appendChild(taskDoneElement);
  
      const taskDeleteElement = document.createElement('button');
      taskDeleteElement.classList.add('delete');
      taskDeleteElement.innerHTML = 'Delete';
      taskActionsElement.appendChild(taskDeleteElement);
  
      taskDoneElement.addEventListener('click', () => {
        if (taskInputElement.style.textDecoration !== 'line-through') {
          taskInputElement.style.textDecoration = 'line-through';
          taskInputElement.style.color = 'grey';
          taskDoneElement.innerText = 'Go back';
        } else {
          taskInputElement.style.textDecoration = 'none';
          taskInputElement.style.color = 'black';
          taskDoneElement.innerText = 'Done';
        }
      });
      
  /*
      taskDoneElement.addEventListener('click', () => {
        if (taskDoneElement.innerText.toLowerCase() === 'done') {
          taskInputElement.removeAttribute('readonly');
          taskInputElement.focus();
          taskDoneElement.innerText = 'Save';
        } else {
          taskInputElement.setAttribute('readonly', 'readonly');
          taskDoneElement.innerText = 'Done';
        }
      });
  
      */
  
      taskDeleteElement.addEventListener('click', () => {
        deleteTask(taskElement);
      });
  
      return taskElement;
    }
  
    taskbar.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const task = input.value;
  
      if (!task) {
        alert('Please write a task.');
        return;
      }
  
      addTask(task);
      input.value = '';
    });
  
    initializeTasks();
  });
  
  