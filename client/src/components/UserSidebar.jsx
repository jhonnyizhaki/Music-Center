
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import '../AdminSidebar.css';

const UserSidebar = ({ isOpen, closeSidebar }) => {
  return (
    <Drawer anchor="left" open={isOpen} onClose={closeSidebar}>
      <div className="sidebar" inert={!isOpen ? "inert" : undefined}>
        <Typography variant="h5" className="sidebar-header">
          System Management
        </Typography>
        <List>
          <ListItem button component={NavLink} to="/" onClick={closeSidebar}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={NavLink} to="/user-orders" onClick={closeSidebar}>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button component={NavLink} to="/" onClick={closeSidebar}>
            <ListItemText primary="H" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default UserSidebar;
