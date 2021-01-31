var mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '114.35.11.36',
  user: 'learnMain',
  password: '123456',
  database: 'learning_project',
  debug: true,
});

const pool2 = mysql.createPool({

  connectionLimit: 10,
  host: '114.35.11.36',
  user: 'abc',
  password: '123456',
  database: 'account_db',
});

var data;

const getMarks = data => { //data是vid youtube的id
  vid = data;
  return new Promise((resolve, reject) => {
    pool.query(

      'SELECT * FROM marks where  vid = "' + vid + '"' + 'order by time asc',
      (err, rows, fields) => {
        //console.log(rows);
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });

};

const newMarks = data => { //data是vid youtube的id
  //vid = data;
  var val = data.toString().split(';');
  var col = ["vid", "content", "time", "emolevel",  "uid",  "hashtag", "date"];      //
  var values = [val[0], val[1], val[2], "-", val[3], val[4], getDateTime()];       //
  var InsertContent = InsertTOOL("marks", col, values);
  return new Promise((resolve, reject) => {
    pool.query(

      InsertContent,
      (err, rows, fields) => {
        //console.log(rows);
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });

};


const getLiveViewers = data => {                   //獲取線上人數
  var list = data.toString().split(';');
  

  return new Promise((resolve, reject) => {
    pool.query(
     
      'SELECT COUNT(*) FROM record_watch WHERE vid = "' + list[0] + '" AND  complete = "' + "-" + '"',
      (err, rows, fields) => {
        console.log(rows);
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};



const newRecord = data => { //data是vid youtube的id
  //vid = data;
  var rid = getSerialnNumber();
  var val = data.toString().split(';');
  var col = ["rid", "uid", "vid", "complete", "closedate"];      //
  //var values = [val[0], val[1], val[2], getDateTime()];       //
  var values = [val[0], val[1], val[2], "-", getDateTime()];              //
  var InsertContent = InsertTOOL("record_watch", col, values);
  return new Promise((resolve, reject) => {
    pool.query(

      InsertContent,
      (err, rows, fields) => {
        //console.log(rows);
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });

};



const checkRecord = data => {                   //確認使用者現在是不是正在看影片
  var account = data.toString().split(';');
  

  return new Promise((resolve, reject) => {
    //var account = data
    pool.query(
      //'SELECT * FROM user_login WHERE account = ? ; ' ,account[0],
      'SELECT * FROM record_watch WHERE vid = "' + account[1] + '" AND  uid = "' + account[0] + '" AND  complete = "' + "-" + '"',
      (err, rows, fields) => {
        console.log(rows);
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });

};

const completeRecord = data => {  //data = rid           

  return new Promise((resolve, reject) => {
    
    pool.query(
      'UPDATE record_watch SET complete = "y" WHERE rid = "' + data + '"',
      (err, rows, fields) => {
        console.log(rows);
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });

};

const UpdateCloseDate = data => {                   //確認使用者現在是不是正在看影片
  var account = data.toString().split(';');
  //console.log(account[0]);

  return new Promise((resolve, reject) => {
    //var account = data
    pool.query(
       
      'UPDATE record_watch SET closedate  = "' + getDateTime() + '" WHERE vid = "' + account[2] + '" AND  uid = "' + account[1] + '"',
      //'SELECT * FROM record_watch WHERE vid = "' + account[2] + '" AND  uid = "' + account[1] + '" AND  complete = "' + "-" + '"',
      (err, rows, fields) => {
        console.log(rows);
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};



const newRecordBehavior = data => { //data是vid youtube的id
  //vid = data;
  var val = data.toString().split(';');
  var col = ["rid", "event", "time", "date"];      //
  var values = [val[0], val[1], val[2] ,getDateTime()];       //
  var InsertContent = InsertTOOL("record_watch_behavior", col, values);
  return new Promise((resolve, reject) => {
    pool.query(
      InsertContent,
      (err, rows, fields) => {
        //console.log(rows);
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });

};

const UserLogin = data => {
  
  var account = data.toString().split(';');
  console.log(account[0]);
  return new Promise((resolve, reject) => {
    //var account = data
    pool2.query(
      //'SELECT * FROM user_login WHERE account = ? ; ' ,account[0],
      'SELECT * FROM user_login WHERE account = "' + account[0] + '" AND  password = "' + account[1] + '"',
      (err, rows, fields) => {
        console.log(rows);
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};








function InsertTOOL(Table, colum, VALUES)  //Table:要插入哪個資料表  colum 欄位  //VALUES: 欄位裡的值
{
  //"INSERT INTO shopcart (uid, item_id , name , image) VALUES ('Company Inc', 'Highway 37' , '123' , ' https://upload.cc/i1/2020/01/01/ETaIpo.jpg ' )", 範例指令
  var InsertData = "INSERT INTO " + Table + " (";   //前面 INSERT INTO XXX (

  for (i = 0; i < colum.length; i++)    //for迴圈填入 colum 資料
  {
    InsertData += colum[i];
    if (i != colum.length - 1) {
      InsertData += ",";
    }
  }
  InsertData += ")VALUES ('";          //填入VALUES

  for (i = 0; i < VALUES.length; i++) {
    InsertData += VALUES[i];

    if (i != colum.length - 1) {
      InsertData += "', '";
    }
    else {
      InsertData += "' )";
    }
  }
  return InsertData;
}

function getSerialnNumber() {
  var d = new Date();
  date = (d.getMonth() + 1).toString() + d.getSeconds().toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString();

  gg = Math.floor(Math.random() * 60); //回傳0或1
  yy = Math.floor(Math.random() * 60); //回傳0或1
  rr = Math.floor(Math.random() * 60); //回傳0或1
  pp = Math.floor(Math.random() * 60); //回傳0或1
  ee = Math.floor(Math.random() * 60); //回傳0或1


  if (gg.length % 2 != 0) {
    gg += "0";
  }

  if (yy.length % 2 != 0) {
    yy += "0";
  }

  if (rr.length % 2 != 0) {
    rr += "0";
  }

  if (pp.length % 2 != 0) {
    pp += "0";
  }

  if (ee.length % 2 != 0) {
    ee += "0";
  }

  s1 = date.substring(0, 6);  //string s1
  s2 = date.substring(6, date.length);  //string s2

  s1 += ee + rr;
  s2 = yy + s2 + gg + pp;

  return decode_jr(s1) + decode_ke(s2);
}

function decode_jr(str) //String str
{
  var code = "";
  for (i = 0; i < str.length; i += 2) {
    tar = str.substring(i, i + 2); //String tar
    che = tar;
    //console.log(che);
    if (che <= 25)     // a-z    = 00 - 25  
    {
      code += (String.fromCharCode(parseInt(che, 10) + 97));
    }

    if (che > 25 && che <= 35)  // 50-75  = 26 - 51
    {
      code += (String.fromCharCode(parseInt(che, 10) + 22));
    }

    if (che > 35 && che <= 60)  // A-Z    = 51 - 60
    {
      code += (String.fromCharCode(parseInt(che, 10) + 29));
    }
  }
  //console.log(code);
  return code;
}

function decode_ke(str) //String str
{
  code = "";
  for (i = 0; i < str.length; i += 2) {
    tar = str.substring(i, i + 2);
    che = tar;
    //console.log(che);
    if (che <= 25)     // A-Z    = 00 - 25  
    {
      code += (String.fromCharCode(parseInt(che, 10) + 65));
    }

    if (che > 25 && che <= 51)  // a-z  = 26 - 51
    {
      code += (String.fromCharCode(parseInt(che, 10) + 71));
    }

    if (che > 51 && che <= 60)  // 0-9    = 51 - 60
    {
      code += (String.fromCharCode(parseInt(che, 10) - 3));
    }
  }
  return code;
}

function getDateTime()
{
  var d = new Date();
  if(d.getMonth() + 1 < 10) {
    date = d.getFullYear().toString() + "-0" + (d.getMonth() + 1).toString() + "-" + d.getDate().toString() + " " + d.getHours().toString() + ":" + d.getMinutes().toString() + ":" + d.getSeconds().toString() ;
  } else {
    date = d.getFullYear().toString() + "-" + (d.getMonth() + 1).toString() + "-" + d.getDate().toString() + " " + d.getHours().toString() + ":" + d.getMinutes().toString() + ":" + d.getSeconds().toString() ;
  }
  return date;
}

module.exports = { getMarks, getSerialnNumber, newMarks, UserLogin, getDateTime, newRecord, newRecordBehavior, checkRecord, completeRecord, getLiveViewers, UpdateCloseDate };

//exports.connectSQL = connectSQL;
//exports.getObject = getObject();

