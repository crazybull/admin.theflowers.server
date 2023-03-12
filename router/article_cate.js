const express=require('express');
const router=express.Router();
const article_Handle=require("../router_handler/article_cate");
const expressJoi=require("@escook/express-joi");//验证规则中间件
const {add_articlecate_schema,del_articlecate_schema,update_articlecate_schema}=require("../schema/article_cate")
//获取文章分类
router.get('/cates',article_Handle.getArticleCate);
//新增文章分类
router.post('/addCate',expressJoi(add_articlecate_schema),article_Handle.addArticleCate);
// 删除文章分类
router.post('/delCate',expressJoi(del_articlecate_schema),article_Handle.delArticleCateById);
// 获取文章分类
router.post('/getCate',expressJoi(del_articlecate_schema),article_Handle.getArticleCateById);
// 更新文章分类
router.post('/updateCate',expressJoi(update_articlecate_schema),article_Handle.updateArticleCate);
module.exports=router;