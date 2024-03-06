import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Aboutus from './Aboutus';
import Login from './Login';
function App() {
  return (
    <div className="App">
    <Router>
      <div>
        <div className="cards">
          <Routes>
          <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/Home"
              element={<Home />}
            />
            <Route
              path="/Aboutus"
              element={<Aboutus />}
            />
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;