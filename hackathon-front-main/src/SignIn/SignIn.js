import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Paper, TextField, Typography } from '@mui/material';
import background from './signup-back.jpg';
import axios from 'axios';

const SignIn = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/flower-shop');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('サインインに失敗しました');
    }
  };

  const handleRegisterSubmit = async (event) => {
    if (email === '' || password === '') {
      alert('メールアドレスとパスワードを入力してください');
      return;
    }
    event.preventDefault();
    console.log(email, password);
    console.log('ユーザ登録開始');
    try {
      console.log('ユーザ登録中');
      const response = await axios.post('/api/v1/auth/register', {
        email,
        password,
      });
      console.log('ユーザ登録成功');
      localStorage.setItem('token', response.data.token);
      console.log('ユーザ登録完了');
      setOpen(false); // Close the modal after successful registration
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.response && error.response.data.message === 'Error') {
        alert('You already have 8 tasks. Let\'s complete one before adding more');
      } else {
        alert('ユーザー登録失敗しました');
      }
    }
  };

  return (
    <AppContainer>
      <Button variant="contained" onClick={handleOpen} sx={{ bgcolor: '#ffffff', color: '#a9a9a9' }}>ログイン画面へ</Button>
      <Modal open={open} onClose={handleOpen}>
        <StyledPaper>
          <form className='form' onSubmit={handleSignIn}>
            <Typography variant={'h5'}>Sign In</Typography>
            <TextField 
              label="Email address" 
              variant="standard" 
              className="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField 
              label="Password" 
              variant="standard" 
              className="text" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <center>
              <Button type="submit" className="login btn">Sign In</Button>
            </center>
            <center>
              <Button className="signup btn" onClick={handleRegisterSubmit}>Register</Button>
            </center>
            <center>
              <Button variant="outlined" onClick={handleOpen}>Close</Button>
            </center>
          </form>
        </StyledPaper>
      </Modal>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 960px;
  height: 540px;
  .form {
    width: 60%;
    margin: 3rem;
    text-align: center;
  }
  .text {
    width: 100%;
    margin: 1rem 0;
  }
  .btn {
    width: 60%;
    color: white;
    text-align: center;
    margin: 1.5rem 0;
  }
  .login {
    background-color: #66cdaa;
  }
  .signup {
    background-color: #008080;
  }
`;

export default SignIn;
