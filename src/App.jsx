import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/login-page';
import RegistrationProcessPage from './pages/registration-process-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/registration-process"
          element={<RegistrationProcessPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
