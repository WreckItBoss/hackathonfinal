import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Paper, TextField, Typography } from '@mui/material';
import background from './IMG_7494.JPG'; // 新しい背景画像のパス

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
      <Button onClick={handleOpen}>ログイン画面へ</Button>
      <Modal open={open} onClose={handleOpen}>
        <StyledPaper>
          <form className='form' onSubmit={handleSignIn}>
            <Typography variant={'h5'}>ログイン</Typography>
            <TextField label="メールアドレス" variant="standard" className="text" />
            <TextField label="パスワード" variant="standard" className="text" type="password" />
            <center><Button type="submit" className="login btn">ログイン</Button></center>
            <center><Button className="signup btn">新規会員登録はこちら</Button></center>
            <center><Button variant="outlined" onClick={handleOpen}>閉じる</Button></center>
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
    background-color: lightseagreen;
  }
  .signup {
    background-color: #06579b;
  }
`;

export default SignIn;
