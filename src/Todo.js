// rfce
import React, {useState} from 'react';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import "./Todo.css";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from '@material-ui/core/Modal';
import db from './firebase';
// import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();;

    const handleOpen = () => {
        setOpen(true);
    }

    const updateTodo = () => {
        // update the todo in db with new input text
        db.collection('todos').doc(props.todoObj.id).set({
            todo: input
        }, {merge: true})
        setOpen(false);
    }

    return (
        <>
        <Modal
            open={open}
            onClose={event => {setOpen(false)}}
        >
            <div className={classes.paper}>
                <h1>Modal</h1>
                <input value={input} placeholder={props.todoObj.todo} onChange={event => setInput(event.target.value)} />
                <button onClick={updateTodo}>Update Todo</button>
            </div>
        </Modal>
        <List>
            <ListItem>
                <ListItemText primary={props.todoObj.todo} secondary="Todo" />
            </ListItem>
            <DeleteForeverIcon onClick={event => {db.collection('todos').doc(props.todoObj.id).delete()}} />

            <button onClick={e => setOpen(true)}> Edit </button>
        </List>
        </>
    )
}

export default Todo;
