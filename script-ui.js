
var addTaskBtn = document.getElementById('add-task-js')
var taskText = document.getElementById('task-text-js')
var tasks = document.getElementById('todo')

function addTaskRow (taskKey, task) {
  let template = document.getElementById('task-template')
  let clone = document.importNode(template.content, true)

  clone.querySelector('.task').id = taskKey
  clone.querySelector('.text').textContent = task.text
  clone.querySelector('.task').classList.add(task.complete)
  clone.querySelector('.btn-update').classList.add(task.complete)
  clone.querySelector('.btn-update').addEventListener('click', updateTask)
  clone.querySelector('.btn-update.danger').classList.add(task.complete)
  clone.querySelector('.btn-update.danger').addEventListener('click', updateTask)
  clone.querySelector('.btn-delete').addEventListener('click', deleteTask)

  tasks.insertBefore(clone, tasks.firstChild)
  taskText.value = ''

  updateCount()
}

function createTask () {
  let text = taskText.value || ''
  if (!text.trim().length) return
  createTaskInDatabase({
    text: text,
    complete: false
  })
}

function updateTask (event) {
  let task = this.parentElement.parentElement
  let status = task.classList.contains('false')

  updateTaskInDatabase(task.id, status)
}

// Update the status of task on page
function updateTaskRow (taskKey) {
  let task = document.getElementById(taskKey)

  task.classList.add(task.complete)
  task.querySelector('btn-update').classList.add(task.complete)
  clone.querySelector('.btn-update.danger').classList.add(task.complete)
}

// Remove a task from the page
function deleteTaskRow (taskKey) {
  let task = document.getElementById(taskKey)
  task.parentElement.removeChild(task)
}

// Remove the clicked woof from the database
function deleteTask () {
  let task = this.parentElement.parentElement
  deleteTaskFromDatabase(task.id)
}

function deleteAllTasks () {
  deleteAllTasksFromDatabase ()
}

function updateCount () {
  let tasks = document.getElementsByClassName('task')
  let taskCount = document.getElementById('taskCount')

  let activeTasks = []
  for (let i = 0; i < Object.keys(tasks).length; i++) {
    if (tasks[i].classList.contains('false'))
      activeTasks.push(tasks[i])
  }

  taskCount.textContent = activeTasks.length
}

function toggleActiveTasks () {
  let tasks = document.getElementsByClassName('task')
  for (let i = 0; i < Object.keys(tasks).length; i++) {
    if (tasks[i].classList.contains('false') && tasks[i].classList.contains('hidden')) {
      tasks[i].classList.remove('hidden')
    } else if (tasks[i].classList.contains('false')) {
      tasks[i].classList.add('hidden')
    }
  }
}

function toggleInActiveTasks () {
  let tasks = document.getElementsByClassName('task')
  for (let i = 0; i < Object.keys(tasks).length; i++) {
    if (tasks[i].classList.contains('true') && tasks[i].classList.contains('hidden')) {
      tasks[i].classList.remove('hidden')
    } else if (tasks[i].classList.contains('true')) {
      tasks[i].classList.add('hidden')
    }
  }
}

document.getElementById('delete-all-tasks').addEventListener('click', deleteAllTasks)
document.getElementById('toggleActive').addEventListener('click', toggleActiveTasks)
document.getElementById('toggleComplete').addEventListener('click', toggleInActiveTasks)
addTaskBtn.addEventListener('click', createTask)
taskText.addEventListener('keypress', function (event) {
  if (event.keyCode === 13) createTask()
})
