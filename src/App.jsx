import { useState, useEffect } from 'react'
import './App.css'

import Header from './components/Header'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App() {
const [tasks, setTasks] = useState(() => {
const savedTasks = localStorage.getItem('tasks')
return savedTasks ? JSON.parse(savedTasks) : []
})

const [input, setInput] = useState('')
const [filter, setFilter] = useState('all')

useEffect(() => {
localStorage.setItem('tasks', JSON.stringify(tasks))
}, [tasks])

function addTask(e) {
e.preventDefault()

if (!input.trim()) return

const newTask = {
  id: Date.now(),
  text: input,
  completed: false
}

setTasks([...tasks, newTask])
setInput('')

}

function deleteTask(id) {
setTasks(tasks.filter(task => task.id !== id))
}

function toggleTask(id) {
setTasks(tasks.map(task =>
task.id === id
? { ...task, completed: !task.completed }
: task
))
}

const filteredTasks = tasks.filter(task => {
if (filter === 'pending') return !task.completed
if (filter === 'completed') return task.completed
return true
})

return (
<div className="container">
<Header />

  <TodoForm
    input={input}
    setInput={setInput}
    addTask={addTask}
  />

  <div className="filters">
    <button onClick={() => setFilter('all')}>All</button>
    <button onClick={() => setFilter('pending')}>Pending</button>
    <button onClick={() => setFilter('completed')}>Completed</button>
  </div>

  <TodoList
    tasks={filteredTasks}
    toggleTask={toggleTask}
    deleteTask={deleteTask}
  />

  <p className="task-count">
    Total Tasks: {tasks.length}
  </p>
</div>

)
}

export default App