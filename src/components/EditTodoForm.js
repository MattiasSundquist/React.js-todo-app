import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Zoom } from '@material-ui/core';
import React, { useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom direction='up' ref={ref} {...props} />;
});

export const EditTodoForm = ({ editDialogOpen, handleEditDialogClose, defaultTitle, defaultDescription }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [error, setError] = useState(false);

  const onTitleChange = (text) => {
    setTodoTitle(text);
    if (text) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Dialog open={editDialogOpen} TransitionComponent={Transition} onClose={() => handleEditDialogClose(todoTitle, todoDescription)} fullWidth>
      <DialogTitle>Edit todo</DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditDialogClose(todoTitle, todoDescription);
          }}
        >
          <TextField
            defaultValue={defaultTitle}
            required
            error={error}
            helperText={error ? 'Todo must have a title' : ''}
            autoFocus
            multiline
            margin='dense'
            label='New todo title'
            fullWidth
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <TextField
            defaultValue={defaultDescription}
            multiline
            margin='dense'
            label='New todo description'
            fullWidth
            onChange={(e) => {
              setTodoDescription(e.target.value);
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          color='secondary'
          onClick={() => {
            handleEditDialogClose(todoTitle, todoDescription);
          }}
        >
          Cancle
        </Button>
        <Button
          color='primary'
          onClick={() => {
            handleEditDialogClose(todoTitle, todoDescription);
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};