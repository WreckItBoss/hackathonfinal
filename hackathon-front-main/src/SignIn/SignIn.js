import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Paper, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import background from './signup-back.jpg';

const SignIn = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
    setError(''); // Clear previous errors when opening modal
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/flower-shop');
    } catch (error) {
      setError('ログインに失敗しました: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <AppContainer>
      <Button variant="contained" onClick={handleOpen}>ログイン画面へ</Button>
      <Modal open={open} onClose={handleOpen}>
        <StyledPaper>
          <form className="form" onSubmit={handleSignIn}>
            <Typography variant="h5">Sign In</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField 
              label="Username" 
              variant="standard" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text" 
            />
            <TextField 
              label="Password" 
              variant="standard" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text" 
            />
            <center>
              <Button type="submit" className="login btn">Sign In</Button>
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
`;

export default SignIn;
