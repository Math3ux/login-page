import './App.css';
import Login from './components/login';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';



function App() {

  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return token ? true : false;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          {/*<Route path="/" element={<Login />} />*/}
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={
              isAuthenticated() 
                ? <h1>Success</h1> 
                : <Navigate to="/login" replace />
    } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
