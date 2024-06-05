import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Paper, TextField, Typography } from '@mui/material';
import background from './assets/signup-back.jpg'; // 新しい背景画像のパス

const SignIn = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    setOpen(false);
    navigate('/garden'); // ログインボタンでガーデン画面に遷移
  };

  return (
    <AppContainer>
      <Button variant="contained" onClick={handleOpen} sx={{ bgcolor: '#ffffff', color: '#a9a9a9' }}>ログイン画面へ</Button>
      <Modal open={open} onClose={handleOpen}>
        <StyledPaper>
          <form className='form' onSubmit={handleSignIn}>
            <Typography variant={'h5'}>Sign In</Typography>
            <TextField label="Email address" variant="standard" className="text" />
            <TextField label="Password" variant="standard" className="text" type="password" />
            <center><Button type="submit" className="login btn">Sign In</Button></center>
            <center><Button className="signup btn">register</Button></center>
            <center><Button variant="outlined" onClick={handleOpen}>close</Button></center>
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
