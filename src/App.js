import './App.css';

function App() {

  const getClickCoords = (e) => {
    const x = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    const y = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );
    console.log(x, y)
    return {x, y};
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="/wheres-waldo1.jpg" onClick={getClickCoords} className='img-fluid shadow-4' alt="Where's Waldo1" />
      </header>
    </div>
  );
}

export default App;
