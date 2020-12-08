import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import classes from './task.module.css';
import Checkbox from '@material-ui/core/Checkbox';


export default function InteractiveList(props) {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        props.onChangeStatus(props.id)
    };
    const listClasses = props.status == 1 ? classes.completed : null;
    const listClasses2 = props.status == 0 ? classes.pending : null;
    const total = listClasses + ' ' + listClasses2;
  return (
    <div className={classes.listClass + ' ' + total}>
    <List>
        <ListItem>
            <ListItemText className={classes.listitemContent}
            primary={props.children}
            />
            <ListItemSecondaryAction>
            <Checkbox
                checked={props.status == 0 ? false : true}
                onChange= {e => { handleChange(e)}}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <IconButton onClick={() => props.deleteNote(props.id)} edge="end" aria-label="delete">
                <DeleteIcon />
            </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    </List>
    </div>
  );
}
