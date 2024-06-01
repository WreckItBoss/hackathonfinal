require('dotenv').config(); //.env ファイルを探して.envの内容を読み込む
const express = require('express'); //expressはより簡単にNode.jsでウェブアプリなどを構築できるフレームワーク
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const path = require('path');
const http = require('http'); // Add this line to import the http module

const connectDB = require('./server/config/db'); //
const { isActiveRoute } = require('./server/helper/routeHelpers'); //isActiceRoute関数を利用できるようにする

const app = express(); // express起動
const server = http.createServer(app); // Create HTTP server
const io = require('socket.io')(server); // Initialize Socket.io
const PORT = 3000 || process.env.PORT; //ローカルでのポートナンバー || デプロイした時のポートナンバーを自動に設定

const { setSocketIoInstance } = require('./server/models/Task'); // Import setSocketIoInstance

connectDB(); //データベースとのコネクション開始
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // フォームから内容を取り入れる
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'keyboard cat', //セッションのパスワード
    resave: 'false', //何も変換されなかったらセッションを保存しない
    saveUninitialized: true, //新しいセッションを保存
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI //mongoDBにセッションを保存
    }),
}));

app.locals.isActiveRoute = isActiveRoute; //isActiveRouteの関数を全ての.ejsで利用できるようにしている

app.use(express.static('public'));//publicからCSSやHTMLファイルなどを読み込む
app.set('layout', './layouts/main');//「サイトのレイアウトは'./layouts/main'に書いてあるものを使ってねー」って言ってる
app.set('view engine', 'ejs'); //「サイトのテンプレートはviewフォルダーに入ってる.ejsって書いてあるものに従えー」って定義している (PS:自動に「view」の名前のフォルダーを探してくれる)

app.use('/', require('./server/routes/main')); //ホームページに接続したら'./server/routes/main'に書いてあることをやれと言っている

// Set the Socket.io instance in the Task model
setSocketIoInstance(io);

// Socket.io connection event
io.on('connection', (socket) => {
  console.log('New WebSocket connection');
});

// Start the server
server.listen(PORT, () => {
    console.log(`App listening on Port ${PORT}`); //サーバ起動
});
