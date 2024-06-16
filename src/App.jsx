import './styles/App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Welcome from './pages/welcome';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/login';
import Navigation from './modules/navigation';
import Register from './pages/register';
import { useState, useEffect } from 'react';
import MainPage from './pages/mainpage';
import Auction from './pages/auction';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const storedUsername = localStorage.getItem('username');

    if (storedIsAuthenticated && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
  };

  return (
    <div className="container">
      <div className="col-md-10 shadow m-auto px-5">
        <Router>
          <Navigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}  />
          <Routes>
            {!isAuthenticated &&<Route path='/' element={<Welcome />} />}
            {isAuthenticated && <Route path='/' element={<MainPage username={username} />} />}
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            {!isAuthenticated && <Route path='/login' element={<Login setUsername={handleLogin} setIsAuthenticated={setIsAuthenticated} />} />}
            <Route path='/register' element={<Register />} />
            {isAuthenticated && <Route path='/auctionpage' element={<Auction />}/>}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
