const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  

  const {messange} = ctx.request.query
  ctx.body = {messange , reply: messange}
})

app.listen(3000)