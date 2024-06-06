import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bouquet = () => {
  const [bouquetInfo, setBouquetInfo] = useState({});

  const fetchCompletedTasks = async () => {
    try {
      const response = await axios.get('/api/v1/tasks/completed-this-week');
      calculateBouquet(response.data);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    }
  };

  const calculateBouquet = (tasks) => {
    let studyCount = 0;
    let activityCount = 0;
    let houseworkCount = 0;
    let points = 0;
  
    tasks.forEach((task) => {
      const condition = task.flowerStatus;
      console.log(`Task ID: ${task._id}, Flower Status: ${condition}`);
  
      if (condition === 'healthy') points += 2;
      else if (condition === 'dying') points += 1;
      else if (condition === 'dead') points += 0;
  
      if (task.taskType === 'study') studyCount++;
      else if (task.taskType === 'activity') activityCount++;
      else if (task.taskType === 'housework') houseworkCount++;
    });
  
    const totalTasks = tasks.length;
    console.log(`Total tasks: ${totalTasks}`);
    console.log(`Points: ${points}`);
  
    const completionRatio = points / (totalTasks * 2);
    const studyRatio = studyCount / totalTasks;
    const houseworkRatio = houseworkCount / totalTasks;
    const activityRatio = activityCount / totalTasks;
  
    console.log(`Completion Ratio: ${completionRatio}`);
    console.log(`Study Ratio: ${studyRatio}`);
    console.log(`Housework Ratio: ${houseworkRatio}`);
    console.log(`Activity Ratio: ${activityRatio}`);
  
    let majorityType;
  
    // Check if ratios are balanced
    if (studyRatio >= 0.25 && studyRatio <= 0.45 &&
        houseworkRatio >= 0.25 && houseworkRatio <= 0.45 &&
        activityRatio >= 0.25 && activityRatio <= 0.45) {
      majorityType = 'Balanced';
    } else {
      // Create an array of ratios with their corresponding types
      const ratios = [
        { type: 'Red', ratio: studyRatio },
        { type: 'White', ratio: activityRatio },
        { type: 'Yellow', ratio: houseworkRatio }
      ];
  
      // Sort the ratios in descending order
      ratios.sort((a, b) => b.ratio - a.ratio);
  
      if (ratios[0].ratio === ratios[1].ratio) {
        // Randomly choose between the top two if there's a tie
        majorityType = Math.random() < 0.5 ? ratios[0].type : ratios[1].type;
      } else {
        // Choose the highest ratio as majorityType
        majorityType = ratios[0].type;
      }
    }
  
    const bouquetCondition = (completionRatio > 0.75) ? 'Healthy' :
                             (completionRatio >= 0.25) ? 'Dying' : 'Dead';
  
    setBouquetInfo({ majorityType, bouquetCondition });
  };
  
  useEffect(() => {
    fetchCompletedTasks();
  }, []);
  
  

  return (
    <div>
      <h1>Bouquet</h1>
      <p>Type: {bouquetInfo.majorityType}</p>
      <p>Condition: {bouquetInfo.bouquetCondition}</p>
    </div>
  );
};

export default Bouquet;
