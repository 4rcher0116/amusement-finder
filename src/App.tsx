import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import ParkDetails from './pages/ParkDetails/ParkDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/park/:parkLocationId" element={<ParkDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
