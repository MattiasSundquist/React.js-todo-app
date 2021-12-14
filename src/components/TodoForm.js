import { Button, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
    border: 'solid 1px lightgrey',
    padding: theme.spacing(1)
  },
  formRoot: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  }
}));

export const TodoForm = ({ onTodoAdd }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [error, setError] = useState(false);
  const [todoDescription, setTodoDescription] = useState('');
  const classes = useStyles();

  const handleOnAdd = (e) => {
    e.preventDefault();
    if (todoTitle) {
      onTodoAdd(todoTitle, todoDescription);
      setTodoTitle('');
      setTodoDescription('');
      setError(false);
    } else {
      setError(true);
    }
  };

  const onTitleChange = (text) => {
    setTodoTitle(text);
    if (text) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Container maxWidth='md' align='center' className={classes.root}>
      <form>
        <Grid container direction='column' className={classes.formRoot}>
          <Typography variant='h6'>Add todo</Typography>
          <Grid item className={classes.formRoot}>
            <TextField
              multiline
              required
              label='Todo title'
              value={todoTitle}
              fullWidth
              error={error}
              helperText={error ? 'Todo must have a title' : ''}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleOnAdd(e);
                }
              }}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </Grid>
          <Grid item className={classes.formRoot}>
            <TextField
              label='Add description'
              multiline
              value={todoDescription}
              fullWidth
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleOnAdd(e);
                }
              }}
              onChange={(e) => setTodoDescription(e.target.value)}
            />
          </Grid>
          <Grid item className={classes.formRoot}>
            <Button variant='contained' color='primary' onClick={handleOnAdd}>
              Add todo
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
