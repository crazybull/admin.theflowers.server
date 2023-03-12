const express=require('express');
const router=express.Router();
const routerHandle=require("../router_handler/user");
const expressJoi=require("@escook/express-joi");//验证规则中间件
const {reg_login_schema}=require("../schema/user")
//注册用户
router.post('/register',expressJoi(reg_login_schema),routerHandle.regUser)

//登录

router.post('/login',expressJoi(reg_login_schema),routerHandle.login)

module.exports=router;