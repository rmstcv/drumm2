import './App.css';
import Drum from './components/drum/Drum';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Drum name="kick"></Drum>
        <Drum name="snare"></Drum>
        <Drum name="hihat"></Drum>
        <Drum name="hit"></Drum>
        DRUMM2
      </header>
    </div>
  );
}

export default App;
