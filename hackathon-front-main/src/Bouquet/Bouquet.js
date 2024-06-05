import React from 'react';
import styled from '@emotion/styled';
import background from './bouquet.jpg'; // 背景画像のパス

const Bouquet = () => {
  return (
    <BouquetContainer>
      <Content>
        {/*<h1>Welcome to the Bouquet Page</h1>*/}
        {/* 他のコンテンツをここに追加 */}
      </Content>
    </BouquetContainer>
  );
};

const BouquetContainer = styled.div`
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
  color: white; /* テキストを見やすくするために色を設定 */
`;

export default Bouquet;
