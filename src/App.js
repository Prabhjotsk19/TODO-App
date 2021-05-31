import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  console.log("$", input);
 
  // When the app loads, we need to listen to database and fetch new todos as they are updated/deleted
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id, 
        todo: doc.data().todo})));  // read data from database
    })  
  }, [])


  const addTodo = (event) => {
    // this will fire off when we click the button
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // console.log("Working!!");
    // setTodos([...todos, input]);
    setInput('');
  }

  return (
    <div className="App">
      <h1>ToDo App</h1>

      <form>
        <FormControl>
          <InputLabel>Write your Input</InputLabel>
          <Input value={input} onChange={event =>  setInput(event.target.value)} />
        </FormControl>
        
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add Todo</Button>
        {/* <button onClick={addTodo}>Add Todo</button> */}
      </form>


      <ul>
        {todos.map(todo => (
          <Todo todoObj={todo} />
          // <li>{todo}</li>
        ))}
      </ul>


    </div>
  );
}

export default App;
