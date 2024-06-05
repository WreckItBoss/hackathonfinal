import React, { useState } from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import axios from 'axios';

const TaskFlower = ({ task, index, checkFlowerCondition, refreshTasks }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`/api/v1/task/${task._id}`);
      console.log('タスクを削除しました');
      refreshTasks(); // 修正: タスクをリフレッシュ
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('タスクの削除に失敗しました');
    }
  };
  
  return (
    <FlowerWrapper>
      <FlowerImage
        index={index}
        src={checkFlowerCondition(task)} // 修正: タスクの状態をチェックして画像を取得
        alt={task.flower}
        onClick={toggleTooltip} // 修正: マウスオーバーでツールチップを表示
        //onMouseLeave={toggleTooltip} // 修正: マウスアウトでツールチップを非表示
      />
      {tooltipVisible && (
        <Tooltip>
          <p>タイトル：{task.title}</p>
          <p>内容：{task.description}</p>
          <p>期限：{task.dueDate}</p>
          <Button variant="contained" color="primary" onClick={deleteTask}>削除</Button>
        </Tooltip>
      )}
    </FlowerWrapper>
  );
};

const FlowerWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: 10px;
`;

const FlowerImage = styled.img`
  width: 150px;
  height: 150px;
  cursor: pointer;
`;

const Tooltip = styled.div`
  visibility: visible;
  width: 200px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* 画像の上にツールチップを配置 */
  left: 50%;
  margin-left: -100px;
  opacity: 1;
  transition: opacity 0.3s;
`;

export default TaskFlower;
