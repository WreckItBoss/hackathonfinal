import React, { useState } from 'react';
import { Button, Stack, Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import flowerShopBackground from './flower_shop.jpg'; // 新しい画像ファイルのパスを指定

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
  const [flower, setFlower] = useState('');
  const [color, setColor] = useState('');
  const [dateTime, setDateTime] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ 
      backgroundImage: `url(${flowerShopBackground})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh', 
      position: 'relative' 
    }}>
      <Stack spacing={2} direction="row" sx={{ position: 'absolute', top: '65%', left: '67%', transform: 'translate(-50%, -50%)' }}>
        <Button variant="contained" onClick={handleOpen}>タスクを作成</Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-title">タスク作成</h2>
          <TextField fullWidth label="タスク名" variant="standard" sx={{ mb: 2 }} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="期限"
              value={dateTime}
              onChange={(newValue) => setDateTime(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
            />
          </LocalizationProvider>
          <TextField fullWidth label="コメント" variant="standard" sx={{ mb: 2 }} />
          <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
            <InputLabel id="flower-label">花の名前</InputLabel>
            <Select
              labelId="flower-label"
              id="flower-select"
              value={flower}
              onChange={(e) => setFlower(e.target.value)}
              label="花の名前"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="tulip">チューリップ</MenuItem>
              <MenuItem value="marguerite">マーガレット</MenuItem>
              <MenuItem value="rose">バラ</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
            <InputLabel id="color-label">色</InputLabel>
            <Select
              labelId="color-label"
              id="color-select"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              label="色"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="red">赤</MenuItem>
              <MenuItem value="blue">青</MenuItem>
              <MenuItem value="yellow">黄色</MenuItem>
            </Select>
          </FormControl>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button variant="contained" onClick={handleClose}>タスク作成</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default FlowerShop;
