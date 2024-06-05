import React from 'react';
import styled from '@emotion/styled';
import background from './garden_back.jpg'; // 修正した背景画像のパス

const Garden = () => {
  return (
    <GardenContainer>
      <Content>
        {/*<h1>Welcome to the Garden</h1>*/}
        {/* 他のコンテンツをここに追加 */}
      </Content>
    </GardenContainer>
  );
};

const GardenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  text-align: center;
  color: white;
  /* 他のスタイルをここに追加 */
`;

export default Garden;
