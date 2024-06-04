import './App.css';
import { Route, BrowserRouter as Router} from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Welcome from './pages/welcome';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/login';
import Navigation from './modules/navigation';
import Register from './pages/register';

function App() {
  return (
      <Router>
          <Navigation/>
          <Routes>
              <Route path='/' element={<Welcome/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/contact' element={<Contact/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
          </Routes>
      </Router>
  );
}

export default App;
