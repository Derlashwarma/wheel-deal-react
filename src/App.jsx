import './styles/App.css';
import { Route, BrowserRouter as Router} from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Welcome from './pages/welcome';
import About from './pages/about';
import Contact from './pages/contact';  
import Login from './pages/login';
import Navigation from './modules/navigation';
import Register from './pages/register';
import { useState } from 'react';
import MainPage from './pages/mainpage';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
  return (
      <div className="container">
        <div className="col-md-10 shadow m-auto px-5">
          <Router>
              <Navigation isAuthenticated = {isAuthenticated} />   
              <Routes>
                  <Route path='/' element={<Welcome/>} />
                  <Route path='/about' element={<About/>} />
                  <Route path='/contact' element={<Contact/>} />
                  {!isAuthenticated && <Route path='/login' element={<Login setUsername={setUsername} setIsAuthenticated={setIsAuthenticated}/>} />}
                  <Route path='/register' element={<Register/>} />
                  {isAuthenticated && <Route path='/mainpage' element={<MainPage username={username} />} />}
              </Routes>
          </Router>
        </div>
      </div>
  );
}

export default App;
