const fs = require('fs');
const path = require('path');
const Koa = require('koa')
const Router = require('koa-route')
//const websockify = require('koa-websocket')
const websockify = require('koa-wss');
var db = require("./db_connection");

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, './private.key')),
  cert: fs.readFileSync(path.resolve(__dirname, './certificate.crt'))
};


const app = websockify(new Koa(), {}, httpsOptions);



// Note it's app.ws.use and not app.use
// This example uses koa-route
app.ws.use(Router.all('/test', async (ctx, next) => {



  ctx.websocket.on('message', async (message) => {
    // do something with the message from client 來自client的訊息
    console.log(message);

    if (message.split(" ")[0] == "getDanmo") {
      var code = message.split(" ")[1];
      //console.log("getDanmo");

      var DBresult;
      await db
        .getMarks(code)//
        .then(results => {
          DBresult = JSON.stringify(results);
        });

      ctx.websocket.send("Danmo@" + DBresult);

    }

    if (message.split(" ")[0] == "newDanmo") {
      var code = message.split(" ")[1];
      await db
        .newMarks(code)//
        .then(results => {
          DBresult = JSON.stringify(results);
        });
      ctx.websocket.send("success");

    }

    if (message.split(" ")[0] == "getLiveViewers") {
      var code = message.split(" ")[1];
      await db
        .getLiveViewers(code)//
        .then(results => {
          DBresult = JSON.stringify(results);
        });
        ctx.websocket.send("LiveViewers@" + DBresult);

    }
    //////////////////////////////////////////////////////
    if (message.split(" ")[0] == "newRecord") { //新觀看紀錄
      var code = message.split(" ")[1]; //uid + vid
      let DBresult = "";
      let rid = "";
      let isWatching = 0;
      await db                                      //check是不是觀看中
        .checkRecord(code)
        .then(results => {
          DBresult = JSON.stringify(results);
        });
        
        if(JSON.stringify(DBresult) == '"[]"') {//無觀看紀錄
          isWatching = 0;
        }
        else {
          let RecordArr = JSON.parse(DBresult);
          let closedate = RecordArr[0]['closedate'];
          let nowdate = db.getDateTime();
          rid = RecordArr[0]['rid'];
          console.log("\n---------------"+ closedate.substring( 0, 10 )+ "\n" + nowdate.substring( 0, 10 ));
          console.log(closedate.substring( 0, 10 ).toString() == nowdate.substring( 0, 10 ).toString());
          if( closedate.substring( 0, 10 ).toString() == nowdate.substring( 0, 10 ).toString() ) { //同一天 在一小時內
            isWatching = 1;
          }
          else { //有觀看紀錄但是 time out 標示已經結束
            await db
            .completeRecord(rid)
            .then(results => {
              DBresult = JSON.stringify(results);
            });
            isWatching = 0;
          }
        }

      if (isWatching == 0 ) {   // 確定沒在觀看 才新增
        rid = db.getSerialnNumber();
        code = rid + ";" + code;
        await db
          .newRecord(code)
          .then(results => {
            DBresult = JSON.stringify(results);
          });
      }

      ctx.websocket.send("Watching " + rid);
      
    }
    ////////////////
    if (message.split(" ")[0] == "updateCloseDate") {
      var code = message.split(" ")[1];
      await db
        .UpdateCloseDate(code)//
        .then(results => {
          DBresult = JSON.stringify(results);
        });
      ctx.websocket.send("success ");

    }


    if (message.split(" ")[0] == "newRecordBehavior") {
      var code = message.split(" ")[1];
      await db
        .newRecordBehavior(code)//
        .then(results => {
          DBresult = JSON.stringify(results);
        });
      ctx.websocket.send("success ");

    }

    if (message.split(" ")[0] == "login") {
      console.log("login  " + message);
      var code = message.split(" ")[1];
      await db
        .UserLogin(code)
        .then(results => {
          DBresult = JSON.stringify(results);
        });
      if (JSON.stringify(DBresult) == '"[]"') {    //如果帳密錯誤就回傳fail
        ctx.websocket.send("fail");
      }
      else {
        userdata = JSON.parse(DBresult);
        uid = userdata[0].uid;
        ctx.websocket.send("success;" + uid);
      }


    }

  });
  return next()
}));



app.listen(3000);
/*
const router = new Router()

app.ws.use((ctx, next) => {
  return next(ctx)
})

router.get('/', async ctx => {
  ctx.body = '欢迎'
})

router.all('/websocket/:id', async ctx => {
  let t = setInterval(function() {
    let n = Math.random()
    if(n > 0.3) {
      let msg = JSON.stringify({ 'id': ctx.params.id, 'n': n })
      ctx.websocket.send(msg)
    }
  }, 1000)
  ctx.websocket.on('message', msg => {
    console.log('前端发过来的数据：', msg)
  })
  ctx.websocket.on('close', () => {
    console.log('前端关闭了websocket')
  })
})

app
.ws
.use(router.routes())
.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('koa is listening in 3000')
})
*/