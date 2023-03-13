/**
 * 菜单路由处理
 */
const express=require('express');
const router=express.Router();
const menu_Handle=require("../router_handler/menu");
const expressJoi=require("@escook/express-joi");//验证规则中间件
const {add_menu_schema,del_menu_schema,update_menu_schema}=require("../schema/menu")
//获取菜单分类
router.get('/list',menu_Handle.getMenuList);
//新增菜单分类
router.post('/add_menu',expressJoi(add_menu_schema),menu_Handle.addMenu);
// 删除菜单分类
router.post('/del_menu',expressJoi(del_menu_schema),menu_Handle.delMenuById);
// 更新菜单分类
router.post('/update_menu',expressJoi(update_menu_schema),menu_Handle.updateMenu);
module.exports=router;