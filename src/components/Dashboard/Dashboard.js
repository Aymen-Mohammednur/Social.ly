import { useAuth } from '../../hooks/useAuth';
import { usePages } from '../../hooks/usePages';
import DashboardLink from '../DashboardLink/DashboardLink'
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../../shared/service/firebase'

function Dashboard() {
  const { authUser } = useAuth();
  const pages = usePages(authUser?.uid);
  const navigate = useNavigate()

  useEffect(() => {
    console.log(pages);
  }, [pages])

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login')
    })
  }

  return (
    <div className={styles.main}>
      <h1>Pages</h1>

      <div
        onClick={() => navigate('/create-page')}
        className={styles.createPageButton}
      >
        Create New Page
      </div>

      {pages?.map((p, index) => {
        return <DashboardLink key={index} page={p} />;
      })}

      <div className={styles.logout}>
        <button onClick={handleLogout}
          className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard