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

    if (message.split(" ")[0] == "newRecord") {
      var code = message.split(" ")[1];
      var rid = db.getSerialnNumber();
      code = rid + ";" + code;

      await db                                      //check是不是觀看中
        .checkRecord(code)
        .then(results => {
          DBresult = JSON.stringify(results);
        });
      if (JSON.stringify(DBresult) == '"[]"') {   // 確定沒在觀看 才新增
        
        await db
          .newRecord(code)
          .then(results => {
            DBresult = JSON.stringify(results);
          });
        ctx.websocket.send("success " + rid);
      }
      else {
        ctx.websocket.send("nowWatching ");
      }
    }

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