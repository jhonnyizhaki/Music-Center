import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import '../AdminSidebar.css';

const AdminSidebar = ({ isOpen, closeSidebar }) => {
  return (
    <Drawer anchor="left" open={isOpen} onClose={closeSidebar}>
      <div className="sidebar" inert={!isOpen ? "inert" : undefined}>
        <Typography variant="h5" className="sidebar-header">
          System Management
        </Typography>
        <List>
          <ListItem button component={NavLink} to="/" onClick={closeSidebar}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={NavLink} to="admin/orders" onClick={closeSidebar}>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button component={NavLink} to="admin/users" onClick={closeSidebar}>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={NavLink} to="admin/rooms" onClick={closeSidebar}>
            <ListItemText primary="Rooms" />
          </ListItem>
          <ListItem button component={NavLink} to="admin/stats" onClick={closeSidebar}>
            <ListItemText primary="Statistics" />
          </ListItem>
          <ListItem button component={NavLink} to="admin/edit-category" onClick={closeSidebar}>
            <ListItemText primary="edit-category" />
          </ListItem>
          <ListItem button component={NavLink} to="admin/edit-products" onClick={closeSidebar}>
            <ListItemText primary="edit-products" />
          </ListItem>
          <ListItem button component={NavLink} to="admin/admin-activity" onClick={closeSidebar}>
            <ListItemText primary="admin-activity" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default AdminSidebar;
