import React from 'react';
import { fetchTodos, deleteTodo, createTodo, updateTodo } from './todo-api.js';

class ListPage extends React.Component {
    state = {
        todos: [], 
        description: ''
    }

    componentDidMount = async () => {
        if (!this.props.token) {
        this.props.history.push('/login');
        } else {
        const data = await fetchTodos(this.props.token)
    
        this.setState({
            todos: data.body
        })
        }
    }

    handleTodoChange = e => {
        this.setState({ description: e.target.value });
        }

    handleCompletedChange = async (id, todo) => {

        await updateTodo(
            id, 
            {
                todo: todo.todo,
                completed: true
            }
            );
            const data = await fetchTodos(this.props.token)
    
            this.setState({ todos: data.body })
        }  

    handleDelete = async (id) => {
        await deleteTodo(id);

        const data = await fetchTodos(this.props.token)
    
        this.setState({ todos: data.body })
        }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createTodo({
              todo: this.state.description,
              completed: false,
            });
    
            this.setState({
              description: '',
            });

            const data = await fetchTodos(this.props.token)
    
            this.setState({ todos: data.body })

        } catch(e) {
            console.log(e.message)
        }
    }

  render() {
    return (
        <div>
            <h1>Your To-Do List</h1>
            <div className="todo-list">
                {
                    this.state.todos.map((todo) => {
                        if(todo.completed === false) {
                            return <div className="todo" key={`${todo.id}`}>
                            <p>Task: {todo.todo}</p>
                            <button onClick={() => this.handleCompletedChange(todo.id, todo)}>Mark Task Complete</button>
                            <button className="delete" onClick={() => this.handleDelete(todo.id)}>Delete Task</button>
                            </div>
                        } else {
                            return <div className="todo completed" key={`${todo.id}`}>
                            <p>Task: {todo.todo}</p>
                            <button className="delete" onClick={() => this.handleDelete(todo.id)}>Delete Task</button>
                            </div>
                        }
                    })
                }
            </div>
            <div>
                Create a New Task
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Description: 
                        <br />
                        <input onChange={this.handleTodoChange}/>
                    </label>
                    <button>Create Task</button>
                </form>
            </div>
        </div>
    )
}
}

export default ListPage;