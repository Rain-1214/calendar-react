import * as React from 'react';
import './App.css';
import Calendar from './component/calendar/Calendar.component';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Calendar />
      </div>
    );
  }
}

export default App;
