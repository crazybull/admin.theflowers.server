const express=require('express');
const router=express.Router();
const userInfo_Handle=require("../router_handler/userinfo");
const expressJoi=require("@escook/express-joi");//验证规则中间件
const {update_userinfo_schema,update_pwd_schema,update_avatar_schema,get_list_schema}=require("../schema/user")
//获取用户信息
router.get('/userinfo',userInfo_Handle.getUserInfo);
//更新用户信息
router.post('/updateuserinfo',expressJoi(update_userinfo_schema),userInfo_Handle.updateUserInfo);
//更换密码
router.post('/updatePwd',expressJoi(update_pwd_schema),userInfo_Handle.updateUserPwd);
//更换头像
router.post('/updateAvatar',expressJoi(update_avatar_schema),userInfo_Handle.updateUserAvatar);
//获取所有用户
router.post('/user/list',expressJoi(get_list_schema),userInfo_Handle.getUserList);

module.exports=router;