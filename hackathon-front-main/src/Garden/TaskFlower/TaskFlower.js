// // import React, { useState } from 'react';
// // import { Button } from '@mui/material';
// // import styled from '@emotion/styled';
// // import axios from 'axios';

// // const TaskFlower = ({ task, index, checkFlowerCondition, refreshTasks }) => {
// //   const [tooltipVisible, setTooltipVisible] = useState(false);

// //   const toggleTooltip = () => {
// //     setTooltipVisible(!tooltipVisible);
// //   };

// //   const deleteTask = async () => {
// //     try {
// //       await axios.delete(`/api/v1/task/${task._id}`);
// //       console.log('タスクを削除しました');
// //       refreshTasks(); // 修正: タスクをリフレッシュ
// //     } catch (error) {
// //       console.error('Error deleting task:', error);
// //       alert('タスクの削除に失敗しました');
// //     }
// //   };
  
// //   return (
// //     <FlowerWrapper>
// //       <FlowerImage
// //         index={index}
// //         src={checkFlowerCondition(task)} // 修正: タスクの状態をチェックして画像を取得
// //         alt={task.flower}
// //         onClick={toggleTooltip} // 修正: マウスオーバーでツールチップを表示
// //         //onMouseLeave={toggleTooltip} // 修正: マウスアウトでツールチップを非表示
// //       />
// //       {tooltipVisible && (
// //         <Tooltip>
// //           <p>タイトル：{task.title}</p>
// //           <p>内容：{task.description}</p>
// //           <p>期限：{task.dueDate}</p>
// //           <Button variant="contained" color="primary" onClick={deleteTask}>削除</Button>
// //         </Tooltip>
// //       )}
// //     </FlowerWrapper>
// //   );
// // };

// // const FlowerWrapper = styled.div`
// //   position: relative;
// //   display: inline-block;
// //   margin: 10px;
// // `;

// // const FlowerImage = styled.img`
// //   width: 150px;
// //   height: 150px;
// //   cursor: pointer;
// // `;

// // const Tooltip = styled.div`
// //   visibility: visible;
// //   width: 200px;
// //   background-color: black;
// //   color: #fff;
// //   text-align: center;
// //   border-radius: 6px;
// //   padding: 5px 0;
// //   position: absolute;
// //   z-index: 1;
// //   bottom: 125%; /* 画像の上にツールチップを配置 */
// //   left: 50%;
// //   margin-left: -100px;
// //   opacity: 1;
// //   transition: opacity 0.3s;
// // `;

// // export default TaskFlower;

// import React, { useState } from 'react';
// import { Button } from '@mui/material';
// import styled from '@emotion/styled';
// import axios from 'axios';

// const TaskFlower = ({ task, index, checkFlowerCondition, refreshTasks }) => {
//   const [tooltipVisible, setTooltipVisible] = useState(false);

//   const toggleTooltip = () => {
//     setTooltipVisible(!tooltipVisible);
//   };

//   const deleteTask = async () => {
//     try {
//       await axios.delete(`/api/v1/task/${task._id}`);
//       console.log('タスクを削除しました');
//       refreshTasks();
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       alert('タスクの削除に失敗しました');
//     }
//   };

//   const markAsCompleted = async () => {
//     try {
//       await axios.put(`/api/v1/task/${task._id}`, { completedAt: new Date() });
//       console.log('タスクを完了しました');
//       refreshTasks(); // Refresh tasks after marking as complete
//     } catch (error) {
//       console.error('Error marking task as completed:', error);
//       alert('タスクの完了に失敗しました');
//     }
//   };

//   return (
//     <FlowerWrapper>
//       <FlowerImage
//         index={index}
//         src={checkFlowerCondition(task)}
//         alt={task.flower}
//         onClick={toggleTooltip}
//       />
//       {tooltipVisible && (
//         <Tooltip>
//           <p>タイトル：{task.title}</p>
//           <p>内容：{task.description}</p>
//           <p>期限：{task.dueDate}</p>
//           <Button variant="contained" color="primary" onClick={markAsCompleted}>完了</Button>
//           <Button variant="contained" color="secondary" onClick={deleteTask}>削除</Button>
//         </Tooltip>
//       )}
//     </FlowerWrapper>
//   );
// };

// const FlowerWrapper = styled.div`
//   position: relative;
//   display: inline-block;
//   margin: 10px;
// `;

// const FlowerImage = styled.img`
//   width: 150px;
//   height: 150px;
//   cursor: pointer;
// `;

// const Tooltip = styled.div`
//   visibility: visible;
//   width: 200px;
//   background-color: black;
//   color: #fff;
//   text-align: center;
//   border-radius: 6px;
//   padding: 5px 0;
//   position: absolute;
//   z-index: 1;
//   bottom: 125%;
//   left: 50%;
//   margin-left: -100px;
//   opacity: 1;
//   transition: opacity 0.3s;
// `;

// export default TaskFlower;
import React, { useState } from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import axios from 'axios';

import Tulip_Blooming from '../FlowersIMGFile/Tulip/Blooming.png';
import Tulip_Half_Blooming from '../FlowersIMGFile/Tulip/Half-blooming.png';
import Tulip_Withered from '../FlowersIMGFile/Tulip/Withered.png';

const TaskFlower = ({ task, index, checkFlowerCondition, refreshTasks }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`/api/v1/task/${task._id}`);
      console.log('タスクを削除しました');
      refreshTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('タスクの削除に失敗しました');
    }
  };

  const markAsCompleted = async () => {
    try {
      const flowerStatus = checkFlowerCondition(task);
      await axios.put(`/api/v1/task/complete/${task._id}`, {
        flowerStatus,
        taskType: task.taskType,
        completedAt: new Date()
      });
      console.log('タスクを完了しました');
      refreshTasks();
    } catch (error) {
      console.error('Error marking task as completed:', error);
      alert('タスクの完了に失敗しました');
    }
  };

  const getFlowerImage = (flowerStatus) => {
    if (flowerStatus === 'healthy') {
      return Tulip_Blooming;
    } else if (flowerStatus === 'dying') {
      return Tulip_Half_Blooming;
    } else {
      return Tulip_Withered;
    }
  };

  return (
    <FlowerWrapper>
      <FlowerImage
        index={index}
        src={getFlowerImage(checkFlowerCondition(task))}
        alt={task.flower}
        onClick={toggleTooltip}
      />
      {tooltipVisible && (
        <Tooltip>
          <p>タイトル：{task.title}</p>
          <p>内容：{task.description}</p>
          <p>期限：{task.dueDate}</p>
          <Button variant="contained" color="primary" onClick={markAsCompleted}>完了</Button>
          <Button variant="contained" color="secondary" onClick={deleteTask}>削除</Button>
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
  bottom: 125%;
  left: 50%;
  margin-left: -100px;
  opacity: 1;
  transition: opacity 0.3s;
`;

export default TaskFlower;
