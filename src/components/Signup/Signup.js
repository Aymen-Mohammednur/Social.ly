import { useState, useEffect } from 'react'
import styles from './styles.module.css';
import { emailRegex } from '../../shared/constants';
import { auth } from '../../shared/service/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [email, setEmail] = useState('');
  const [pw, setPW] = useState('');
  const [verifyPW, setVerifyPW] = useState('');
  const [valid, setValid] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    setValid(
      email && emailRegex.test(email) && pw && verifyPW && pw === verifyPW,
    );
  }, [email, pw, verifyPW]);

  const signup = () => {
    if (valid) {
      createUserWithEmailAndPassword(auth, email, pw).then((cred) => {
        navigate('/login')
      })
    }
  };

  return (
    <div className={styles.main}>
      <h1>Sign Up</h1>

      <input
        type="email"
        value={email}
        placeholder="Email Address"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={pw}
        placeholder="Password"
        onChange={e => setPW(e.target.value)}
      />

      <input
        type="password"
        value={verifyPW}
        placeholder="Verify Password"
        onChange={e => setVerifyPW(e.target.value)}
      />

      <button onClick={signup} disabled={!valid}>
        Sign Up
      </button>
      <button onClick={() => navigate('/login')}>
        Log In
      </button>
    </div>
  )
}

export default Signup