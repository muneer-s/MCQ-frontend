import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PageNotFound from './pages/404/PageNotFound';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import HomeComp from './component/Home/HomeComp';
import Questions from './pages/Questions/Questions';
import PublicRoute from './component/PublicRoute/PublicRoute';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        {/* Protected routes */}

        <Route path="/startingPage" element={<ProtectedRoute> <HomeComp /> </ProtectedRoute>} />
        <Route path="/questionsPage" element={<ProtectedRoute> <Questions /> </ProtectedRoute>} />

        {/* 404 fallback */}
        <Route path="*" element={<PageNotFound />} />


      </Routes>
    </Router>
  );
}

export default App;
