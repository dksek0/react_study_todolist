import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { useState } from 'react';
import axios from 'axios';

function SignUp () {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const getEmail = (e) => {
    setEmail(e.target.value);
  }
  const getPassword = (e) => {
    setPassword(e.target.value);
  }

  const signUpHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {"Content-Type":"application/json"}
    }

    try {
      const { data } = await axios.post('https://pre-onboarding-selection-task.shop/auth/signup', { email: email, password: password }, config);
      localStorage.setItem("accesstoken", `${data.access_token}`);
      alert('회원가입이 완료되었습니다')
      navigate('/');
    } catch (error) {
      alert('이미 가입된 이메일입니다')
    }
  }

  return (
    <div>
      <Header header="Sign Up" />
      <div>
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
      </div>
      <div className="btnWrap">
        <button onClick={() => navigate("/")} className="btn" type="button">Cancel</button>
        <button onClick={signUpHandler} className="btn" type="submit" disabled={!email.includes("@") || password.length < 8}>OK</button>
      </div>
    </div>
  )
}

export default SignUp;