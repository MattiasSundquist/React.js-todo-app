import { Button, Container, Grid, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';

export const sortingTypes = {
  ascending: 'ascending',
  descending: 'descending',
  completeFirst: 'completedFirst',
  completeLast: 'completedLast'
};

export const TodoActions = ({ sortTodos }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Container maxWidth='md' style={{ marginTop: 30, marginBottom: 30 }}>
      <Grid container direction='row' justifyContent='space-between' alignItems='center'>
        <Button variant='contained' onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
          Sort todos
        </Button>
        <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              handleClose();
              sortTodos(sortingTypes.ascending);
            }}
          >
            Sort ascending
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              sortTodos(sortingTypes.descending);
            }}
          >
            Sort descending
          </MenuItem>
        </Menu>
      </Grid>
    </Container>
  );
};
