import React, { useState } from 'react';
import { Button, Stack, Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import flowerShopBackground from './flower_shop.jpg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function FlowerShop() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duetime, setDueTime] = useState(null);
  const [taskType, setTaskType] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!title || !description || !duetime || !taskType) {
      alert('You have missing input');
      return;
    }

    try {
      await axios.post('/api/v1/task', {
        title,
        description,
        dueDate: new Date(duetime),
        flowerImages: 'tulip',
        taskType,
      });
      console.log('タスクを作成しました');
      handleClose();
    } catch (error) {
      console.error('Error creating task:', error);
      if (error.response && error.response.data.message === 'Error') {
        alert('You already have 8 tasks. Let\'s complete one before adding more');
      } else {
        alert('タスクの作成に失敗しました');
      }
    }
  };

  return (
    <div style={{ 
      backgroundImage: `url(${flowerShopBackground})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh', 
      position: 'relative' 
    }}>
      <Stack spacing={2} direction="row" sx={{ position: 'absolute', top: '65%', left: '67%', transform: 'translate(-50%, -50%)' }}>
        <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#ffffff', color: '#5e5e5e' }}>タスクを作成</Button>      
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-title">タスク作成</h2>
          <TextField 
            fullWidth 
            label="タスク名" 
            variant="standard" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }} 
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="期限"
              value={duetime}
              onChange={(newValue) => setDueTime(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
            />
          </LocalizationProvider>
          <TextField 
            fullWidth 
            label="コメント" 
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }} 
          />
          <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
            <InputLabel id="taskType-label">タスクタイプ</InputLabel>
            <Select
              labelId="taskType-label"
              id="taskType-select"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
              label="タスクタイプ"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="study">勉強</MenuItem>
              <MenuItem value="housework">家事</MenuItem>
              <MenuItem value="activity">活動</MenuItem>
            </Select>
          </FormControl>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: '#ffffff', color: '#5e5e5e' }}>タスク作成</Button>        
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default FlowerShop;
