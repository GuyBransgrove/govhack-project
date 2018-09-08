import * as React from 'react';
import './App.css';
import UserForm from './components/UserForm';
import Parking from './parking';

class App extends React.Component {	
	public render() {
    return (
      <div className="App">
	  	<UserForm />
		<Parking />
      </div>
    );
  }
}

export default App;
