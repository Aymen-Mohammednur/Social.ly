import styles from './styles.module.css'
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import CreatePage from '../CreatePage/CreatePage';
import Dashboard from '../Dashboard/Dashboard';
import Page from '../Page/Page';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PrivateRoute from '../PrivateRoute';

function App() {
  const { authUser } = useAuth();

  return (
    <div className={styles.main}>
      {authUser === undefined ? (
        <></>
      ) : (
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/page/:id" element={<Page />} />
          <Route exact path="/create-page" element={<CreatePage />} />
          <Route path="/edit-page/:id" element={<CreatePage /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      )}
    </div>
  );
}

export default App;
