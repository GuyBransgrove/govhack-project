import * as React from 'react';
import './App.css';
import UserForm from './components/UserForm';
import Parking from './components/Parking';

class App extends React.Component {	
	public render() {
    return (
      <div className="App">
	  	<div className="App-header-text">Car Park Unknown</div>
		<header className="App-header" />
        <UserForm />
        <Parking />
      </div>
    );
  }
}

export default App;
