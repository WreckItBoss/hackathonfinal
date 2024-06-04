require('dotev').config();//データベースに接続するための環境変数を読み込む
const express = require('express'); //expressはより簡単にNode.jsでウェブアプリなどを構築できるフレームワーク
const methodOverride = require('method-override');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');

const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helper/routeHelpers'); //isActiceRoute関数を利用できるようにする

const app = express();
const server = http.createServer(app);//create HTTO sever
const io = require('socket.io')(server);//socket.ioを利用する
const PORT = 3000 || process.env.PORT;

const { setSocketIoInstance } = require('./server/models/Task');

connectDB();//データベースに接続
app.use(express.static(path.join(__dirname, 'src')));//publicディレクトリを静的ファイルのルートディレクトリとして指定
app.use(express.urlencoded({ extended: true }));//URLエンコードされたデータを解析するためのミドルウェア
app.use(express.json());//JSONデータを解析するためのミドルウェア
app.use(cookieParser());//cookieを解析するためのミドルウェア
app.use(methodOverride('_method'));//HTTPメソッドを変更するためのミドルウェア
app.use(session({
    secret: 'keyboard cat',
    resave: 'false',
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URI,
    }),
}));

app.use(express.static('src'));

setSocketIoInstance(io);//socket.ioのインスタンスを設定

// Socket.io connection event
io.on('connection', (socket) => {
   console.log('New WebSocket connection');
});
  
// Start the server
server.listen(PORT, () => {
    console.log(`App listening on Port ${PORT}`); //サーバ起動
});