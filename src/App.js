import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { BoardGamesProvider } from './context/BoardGameContext';
import Home from './views/home';
import SignUp from './views/signup';
import SignIn from './views/signin';
import NotFound from './views/notfound';

const PrivateRoute = () => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <Home /> : <Navigate to="/signin" replace />;
};

function App() {
  return (
    <div>
      <BoardGamesProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<PrivateRoute />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </BoardGamesProvider>
    </div>
  );
}

export default App;
