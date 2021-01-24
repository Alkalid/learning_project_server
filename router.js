// router.js

'use strict';

const router = require('koa-router')();

router.get('/', (ctx, next) => {


ctx.body = 'Hello World!';
console.log("come");

});

module.exports = router;