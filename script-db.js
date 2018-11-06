
var config = {
  apiKey: 'AIzaSyC5U0W-RKT-JnPfTHhGbxKvpPojEOt-7WY',
  authDomain: 'vf-test-c0a02.firebaseapp.com',
  databaseURL: 'https://vf-test-c0a02.firebaseio.com',
  projectId: 'vf-test-c0a02',
  storageBucket: 'vf-test-c0a02.appspot.com',
  messagingSenderId: '809732394146'
}
firebase.initializeApp(config)
firebase.auth().signInAnonymously()


// CREATE a new task in Firebase
function createTaskInDatabase (task) {
  firebase.database().ref('tasks').push(task)
}

// READ from Firebase when woofs are added, changed, or removed
// Add task, remove task, remove all tasks
function getTasks () {

  var ref = firebase.database().ref('tasks')
  .on('child_added', function (snapshot) {
    taskKey = snapshot.key
    task = snapshot.val()
    addTaskRow(taskKey, task)
  })

  var ref = firebase.database().ref('tasks')
  .on('child_changed', function (snapshot) {
    taskKey = snapshot.key
    task = snapshot.val()
    updateTaskRow(taskKey, task)
  })

  var ref = firebase.database().ref('tasks')
  .on('child_removed', function (snapshot) {
    taskKey = snapshot.key
    deleteTaskRow(taskKey)
  })
}

// UPDATE task in Firebase
function updateTaskInDatabase (taskKey, complete) {
  firebase.database().ref('tasks/'+taskKey+'/complete/').set('' + complete)
}

// DELETE task from Firebase
function deleteTaskFromDatabase (taskKey) {
  firebase.database().ref('tasks/'+taskKey+'').remove()
  updateCount ()
}

// DELETE tasks list from Firebase
function deleteAllTasksFromDatabase () {
  firebase.database().ref('tasks').remove()
  updateCount ()
}

// Load all data
getTasks()

