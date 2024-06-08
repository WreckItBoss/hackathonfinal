// import React from 'react';
// import styled from '@emotion/styled';
// import background from './profile.jpg'; // 背景画像のパス

// const Profile = () => {
//   // ここでユーザー情報を取得する
//   const userName = "User Name"; // 例：取得したユーザー名
//   const userEmail = "user@example.com"; // 例：取得したユーザーのメールアドレス

//   return (
//     <ProfileContainer>
//       <ProfileContent>
//         <ProfileField>
//           <ProfileName>{userName}</ProfileName>
//           <Line />
//         </ProfileField>
//         <ProfileField>
//           <ProfileEmail>{userEmail}</ProfileEmail>
//           <Line />
//         </ProfileField>
//       </ProfileContent>
//     </ProfileContainer>
//   );
// };

// const ProfileContainer = styled.div`
//   width: 100vw;
//   height: 100vh;
//   background-image: url(${background});
//   background-size: cover;
//   background-position: center;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ProfileContent = styled.div`
//   text-align: center;
//   color: black; /* テキストを見やすくするために色を設定 */
// `;

// const ProfileField = styled.div`
//   position: relative;
//   margin: 20px 0;
// `;

// const ProfileName = styled.div`
//   font-size: 20px;
//   position: absolute;
//   top: -80px; /* 線の上に表示されるように調整 */
//   left: 50%;
//   transform: translateX(-50%);
// `;

// const ProfileEmail = styled.div`
//   font-size: 18px;
//   position: absolute;
//   top: 80px; /* 線の上に表示されるように調整 */
//   left: 50%;
//   transform: translateX(-50%);
// `;

// const Line = styled.div`
//   width: 100%;
//   height: 1px;
//   background-color: black;
//   margin: 0 auto;
// `;

// export default Profile;

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import background from './profile.jpg';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/v1/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <ProfileContainer>
      <ProfileContent>
        <ProfileField>
          <ProfileName>{userInfo.name || "User Name"}</ProfileName>
          <Line />
        </ProfileField>
        <ProfileField>
          <ProfileEmail>{userInfo.email || "user@example.com"}</ProfileEmail>
          <Line />
        </ProfileField>
      </ProfileContent>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileContent = styled.div`
  text-align: center;
  color: black;
`;

const ProfileField = styled.div`
  position: relative;
  margin: 20px 0;
`;

const ProfileName = styled.div`
  font-size: 20px;
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
`;

const ProfileEmail = styled.div`
  font-size: 18px;
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: black;
  margin: 0 auto;
`;

export default Profile;
