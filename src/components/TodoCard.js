import { Card, Fab, Grid, makeStyles, Typography, Zoom } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import React from 'react';
import { useState } from 'react';
import { EditTodoForm } from './EditTodoForm';
import { green, grey, blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  card: {
    transition: theme.transitions.create(['background', 'background-color'], {
      duration: theme.transitions.duration.complex
    }),
    '&:hover': {
      backgroundColor: blue[50]
    },
    padding: 10
  },
  buttons: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600]
    }
  },
  fabGrey: {
    color: theme.palette.common.white,
    backgroundColor: grey[500],
    '&:hover': {
      backgroundColor: grey[600]
    }
  }
}));

export const TodoCard = ({ todo, onTodoDelete, onTodoEdit, onTodoCompleteToggle }) => {
  const [buttonsFade, setButtonsFade] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditDialogClose = (newTodoTitle, newTodoDescription) => {
    if (newTodoTitle) {
      onTodoEdit(todo, newTodoTitle, newTodoDescription);
    }
    setEditDialogOpen(false);
  };

  const classes = useStyles();
  return (
    <Card
      variant='outlined'
      className={classes.card}
      onMouseOut={() => {
        setButtonsFade(false);
      }}
      onMouseOver={() => {
        setButtonsFade(true);
      }}
    >
      <Grid container direction='row' justifyContent='space-between' alignItems='center'>
        <Grid item style={{ width: '80%' }}>
          <Typography variant='h6' align='left'>
            {todo.completed ? <strike>{todo.text}</strike> : todo.text}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary' align='left'>
            {todo.completed ? <strike>{todo.description}</strike> : todo.description}
          </Typography>
        </Grid>
        <Grid item>
          <Zoom in={buttonsFade}>
            <div className={classes.buttons}>
              <Fab
                onClick={() => {
                  setEditDialogOpen(true);
                }}
                size='small'
                color='primary'
              >
                <EditIcon />
              </Fab>
              <Fab
                size='small'
                color='inherit'
                className={todo.completed ? classes.fabGrey : classes.fabGreen}
                onClick={() => {
                  onTodoCompleteToggle(todo);
                }}
              >
                <CheckIcon />
              </Fab>
              <Fab
                onClick={() => {
                  onTodoDelete(todo);
                }}
                size='small'
                color='secondary'
              >
                <DeleteIcon />
              </Fab>
            </div>
          </Zoom>
        </Grid>
      </Grid>
      <EditTodoForm
        editDialogOpen={editDialogOpen}
        handleEditDialogClose={handleEditDialogClose}
        defaultTitle={todo.text}
        defaultDescription={todo.description}
      />
    </Card>
  );
};