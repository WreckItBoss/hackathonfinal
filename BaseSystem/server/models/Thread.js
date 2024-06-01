const mongoose = require('mongoose');
//データベースの構成
const ThreadSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxlength: 20,
    },
    content:{
        type : String,
        required: true,
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
      }
    });
//他のファイルからアクセスできるようにエクスポート
module.exports = mongoose.model('Thread', ThreadSchema);