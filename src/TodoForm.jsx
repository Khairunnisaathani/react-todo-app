function TodoForm({ input, setInput, addTask }) {
  return (
    <form onSubmit={addTask}>
      <input
        type="text"
        placeholder="Enter a new task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  )
}

export default TodoForm