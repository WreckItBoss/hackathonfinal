// import React, { useEffect, useState } from 'react';
// import styled from '@emotion/styled';
// import background from './assets/garden_back.jpg'; // Background image

// // Import flower images
// import rose from './assets/Rose.png';
// import poppy from './assets/Poppy.png';
// import lily from './assets/Lily.png';

// const Garden = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const storedTasks = localStorage.getItem('tasks');
//     if (storedTasks) {
//       setTasks(JSON.parse(storedTasks));
//     }
//   }, []);

//   // Function to get the corresponding flower image
//   const getFlowerImage = (flowerType) => {
//     switch (flowerType) {
//       case 'rose':
//         return rose;
//       case 'poppy':
//         return poppy;
//       case 'lily':
//         return lily;
//       default:
//         return null;
//     }
//   };

//   return (
//     <GardenContainer>
//       <Content>
//         {tasks.map((task, index) => (
//           <div key={index}>
//             <h3>{task.taskName}</h3>
//             <img src={getFlowerImage(task.flower)} alt={task.flower} style={{ width: '100px', height: '100px' }} />
//             <p>{task.color}</p>
//           </div>
//         ))}
//       </Content>
//     </GardenContainer>
//   );
// };

// const GardenContainer = styled.div`
//   width: 100vw;
//   height: 100vh;
//   background-image: url(${background});
//   background-size: cover;
//   background-position: center;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Content = styled.div`
//   text-align: center;
//   color: white;
//   /* Add other styles here */
// `;

// export default Garden;

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import background from './assets/garden_back 2.jpg'; // Background image

// Import flower images
import rose from './assets/Rose.png';
import poppy from './assets/Poppy.png';
import lily from './assets/Lily.png';

const Garden = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Function to get the corresponding flower image
  const getFlowerImage = (flowerType) => {
    switch (flowerType) {
      case 'rose':
        return rose;
      case 'poppy':
        return poppy;
      case 'lily':
        return lily;
      default:
        return null;
    }
  };

  return (
    <GardenContainer>
      <Content>
        {tasks.map((task, index) => (
          <FlowerImage
            key={index}
            src={getFlowerImage(task.flower)}
            alt={task.flower}
            index={index}
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
  position: relative;
  width: 100%;
  height: 100%;
`;

const FlowerImage = styled.img`
  position: absolute;
  top: ${({ index }) => 150+ Math.floor(index / 4) * 200}px; /* Adjust top position based on index */
  left: ${({ index }) => 230 + (index % 4) * 180}px; /* Adjust left position based on index */
  width: 150px;
  height: 150px;
`;
export default Garden;
