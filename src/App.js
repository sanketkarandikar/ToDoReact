import React, {Component} from 'react';
import classes from './App.module.css';
import Navbar from './components/navbar/navbar';
import Tasks from './containers/Tasks/Tasks';

class App extends Component {

  render() {
    return (
      <React.Fragment>
      <div>
        <Navbar></Navbar>
      </div>
      <div className={classes.App}>
        <Tasks/>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
