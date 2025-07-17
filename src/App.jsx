import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PageNotFound from './pages/404/PageNotFound';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import HomeComp from './component/Home/HomeComp';
import Questions from './pages/Questions/Questions';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/pagenotfound' element={<PageNotFound/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/startingPage' element={<HomeComp/>} />
        <Route path='/questionsPage' element={<Questions/>} />
        

      </Routes>
    </Router>
  );
}

export default App;
