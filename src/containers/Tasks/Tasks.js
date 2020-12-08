import classes from './Tasks.module.css';
import React, {Component} from 'react';
import Task from '../../components/task/task';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class Tasks extends Component {
    // 1 = Complete
    // 0 = Pending
    state = {
        tasks: [
            {name: 'I want to call the police', status: 0, id: 1},
            {name: 'Wash clothes', status: 0, id: 2},
            {name: 'Go to market', status: 1, id: 3},
            {name: 'Make a bed for sleep', status: 0, id: 4}
        ],
        isOpen: false,
        value: ''
    }

    changeStatus = (id) => {
        let findItem = 0;
        findItem = this.state.tasks.findIndex(item => id == item.id);
        let temp = this.state.tasks;
        temp[findItem].status = !this.state.tasks[findItem].status
        this.setState({
            tasks: temp
        })
    }

    openDialog = () => {
        this.setState({
            isOpen: true
        })
    }

    handleClose = () => {
        this.setState({
            isOpen: false
        })
        
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
      }

      deleteNoteById = (id)  => {
        let oldArr = this.state.tasks;
        let idx = oldArr.findIndex((oldItem) => id == oldItem.id);
        oldArr.splice(idx, 1);
        this.setState({
            tasks: oldArr
        })
    }
    
      handleSubmit = () => {
        let oldArr = this.state.tasks;
        let newObj = {
            name: this.state.value,
            status: 0,
            id: oldArr.length + 1
        }
        oldArr.push(newObj);
        this.setState({
            tasks: oldArr,
            isOpen: false,
            value: ''
        })
      }

    render() {
        let dialog = null;
        if (this.state.isOpen) {
            dialog = (
            <div>
            <form onSubmit={ this.handleSubmit }>
                <Dialog open={this.state.isOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Add New Note</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Add a note, so you won't forget your task in the day!
                    </DialogContentText>
                    <TextField
                      value={this.state.value} 
                      onChange={this.handleChange}
                      autoFocus
                      margin="dense"
                      id="note"
                      label="Your Note"
                      type="text"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
                </form>
              </div>
            )
        }
        let taskList = null;
        if (this.state.tasks.length) {
            taskList = this.state.tasks.map((task) => {
            return <Task deleteNote= {this.deleteNoteById} id={task.id} onChangeStatus= {this.changeStatus} key={task.id} status = {task.status}>{task.name}</Task>
            })
        } else {
            taskList = <h1>Yay! There are no tasks today!</h1>
        }
        return(
            <div>
                {taskList}
                <IconButton onClick={this.openDialog} className={classes.addButton} aria-label="delete" color="primary">
                    <AddIcon fontSize="large"/>
                </IconButton>
                {dialog}
            </div>
        )
    }
}

export default Tasks;