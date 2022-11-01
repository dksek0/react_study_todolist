import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { useState } from 'react';
import styles from './Home.module.css';
import axios from 'axios';

function Home () {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const data = { "email": email, "password": password }
  const getEmail = (e) => {
    setEmail(e.target.value);
  }
  const getPassword = (e) => {
    setPassword(e.target.value);
  }
  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {"Content-Type":"application/json"}
    }

    try {
      const { data } = await axios.post('https://pre-onboarding-selection-task.shop/auth/signin', { email: email, password: password }, config);
      localStorage.setItem("accesstoken", `${data.access_token}`);
      navigate('/todo');
    } catch (error) {
      alert('가입된 정보가 없습니다')
    }
  }

  return (
    <div>
      <Header header="Login" />
      <div className="inputWrap">
        <span className="label">Email</span>
        <span className="inputItem">
          <label htmlFor="Email" className="sr_only">Email</label>
          <input type="text" id="Email" placeholder="Email을 입력하세요" className="input" onChange={getEmail} value={email} />
        </span>
      </div>
      <div className="inputWrap">
        <span className="label">Password</span>
        <span className="inputItem">
          <label htmlFor="Password" className="sr_only">Password</label>
          <input type="password" id="Password" placeholder="Password를 입력하세요" className="input" onChange={getPassword} value={password} />
        </span>
      </div>
      <div className="btnWrap">
      <button onClick={loginHandler} className="btn" disabled={!email.includes("@") || password.length < 8}>Login</button>
        <div className={styles.link}>
          <button type="button" onClick={() => navigate("/signup")}>회원가입</button>
        </div>
      </div>
    </div>
  )
}

export default Home;