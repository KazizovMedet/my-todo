import React, {useEffect, useState} from 'react';
import EditIcon from "./components/icons/edit-icon";
import DeleteIcon from "./components/icons/delete-icon";
import axios from "axios";

const App = () => {
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState('');
    const [edit, setEdit] = useState(null);

    useEffect(() => {
        axios.get('https://6434ec4f537112453fc9514e.mockapi.io/todos')
            .then(res => setTodoList(res.data))
    },[])

    const handleAddTodo = () => {
        if (todo.length){
            if (!!edit){
                setEdit(null)
                setTodo('')
                axios.put(`https://6434ec4f537112453fc9514e.mockapi.io/todos/${edit}`, {text: todo})
                    .then(({data}) => {

                        setTodoList(todoList.map(item => item.id === data.id  ? data : item))
                    })
            } else {
                const newTodo = {
                    text: todo,
                    completed: false
                }
                setTodo('')
                axios.post('https://6434ec4f537112453fc9514e.mockapi.io/todos', newTodo)
                    .then(res => {
                        setTodoList([...todoList, res.data])
                    })
            }
        }
    }


    const handleDelete = (id) => {
       setTodoList(todoList.filter(todo => todo.id !== id))
    }

    const handleEdit = (todo) => {
        setTodo(todo.text)
        setEdit(todo.id)
    }

    const handleComplete = (id, event) => {
        setTodoList(todoList.map(todo => todo.id === id ? {...todo, completed: event.target.checked} : todo))
    }

    const handleCompleteAll = (event) => {
        setTodoList(todoList.map(todo => ({...todo, completed: event.target.checked})))
    }

    return (
        <div className={'wrapper'}>
            <div>
                <div style={{display: 'flex', alignItems: 'center',   marginBottom: '10px', gap: '10px'}}>
                    <input type="checkbox" onChange={handleCompleteAll} disabled={!!edit}/>
                    <div className={'input-wrapper'}>
                        <input
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                            type="text"
                        />
                        <button className={`add-btn ${edit ? 'edit-color' : ''}`} onClick={handleAddTodo}>
                            { !edit ? 'add' : 'edit' }
                        </button>
                    </div>
                </div>
                {
                    todoList.map((todo) => {
                        return (
                            <div key={todo.id} style={{display: 'flex',   marginBottom: '10px', alignItems: 'center', gap: '10px'}}>
                                <input type="checkbox"
                                       checked={todo.completed}
                                       disabled={edit === todo.id}
                                       onChange={(e) => handleComplete(todo.id, e)}/>
                                <div className={`todo-wrapper ${todo.completed ? 'completed' : ''}`}>
                                    <span>{todo.text}</span>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        { !todo.completed &&
                                            <button
                                                onClick={(e) => handleEdit(todo)}
                                                className={'edit-btn'}
                                            >
                                                <EditIcon/>
                                            </button>
                                        }
                                        <button
                                            className={'edit-btn'}
                                            onClick={() => handleDelete(todo.id)}
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default App;
