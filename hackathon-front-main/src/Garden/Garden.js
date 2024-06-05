import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import background from './garden_back.jpg'; // 修正した背景画像のパス
import axios from 'axios';
import TaskFlower from './TaskFlower/TaskFlower'; // 修正したインポートパス

import Tulip_Blooming from './FlowersIMGFile/Tulip/Blooming.png';
import Tulip_Half_Blooming from './FlowersIMGFile/Tulip/Half-blooming.png';
import Tulip_Withered from './FlowersIMGFile/Tulip/Withered.png';

const Garden = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const data = await getAllTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 5000);
    return () => clearInterval(interval);
  }, []);

  const getAllTasks = async () => {
    try {
      const response = await axios.get('/api/v1/tasks');
      return response.data;
    } catch (error) {
      console.error('Error getting all tasks:', error);
      return [];
    }
  };
  
  const checkFlowerImage = (flowerImages) => {
    if (flowerImages === 'tulip') {
      return Tulip_Blooming;
    } else if (flowerImages === 'Tulip_Half_Blooming') {
      return Tulip_Half_Blooming;
    } else if (flowerImages === 'Tulip_Withered') {
      return Tulip_Withered;
    } else {
      return Tulip_Blooming;
    }
  };

  const checkFlowerCondition = (task) => {
    const BloomingTime = 0.5;
    const HalfBloomingTime = 0.33;

    const dueDate = new Date(task.dueDate);
    const createdAt = new Date(task.createdAt); // 修正: タスクの作成日を取得
    const now = new Date();

    const diffTime = Math.abs(dueDate - createdAt); // 修正: タスクの作成日から期限までの時間
    const limitTime = Math.abs(dueDate - now); // 修正: 現在から期限までの時間
    console.log(limitTime / diffTime);
    if (limitTime / diffTime > BloomingTime) {
      console.log('Tulip_Blooming');
      return Tulip_Blooming;
    } else if (limitTime / diffTime < BloomingTime && limitTime / diffTime > HalfBloomingTime) {
      console.log('Tulip_Half_Blooming');
      return Tulip_Half_Blooming;
    } else {
      console.log('Tulip_Withered');
      return Tulip_Withered;
    }
  };

  return (
    <GardenContainer>
      <Content>
        {tasks.map((task, index) => (
          <TaskFlower 
            key={task._id} 
            task={task} 
            index={index} 
            checkFlowerCondition={checkFlowerCondition} // 修正済みの関数を渡す
            refreshTasks={fetchTasks} // 修正: 子コンポーネントにリフレッシュ関数を渡す
          />
        ))}
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export default Garden;
