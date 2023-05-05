const express=require('express');
const router=express.Router();
const article_Handle=require("../router_handler/article");
const expressJoi=require("@escook/express-joi");//验证规则中间件
const {add_article_schema,del_article_schema,update_article_schema}=require("../schema/article")
//获取文章
router.post('/list',article_Handle.getArticle);
//新增文章
router.post('/add',expressJoi(add_article_schema),article_Handle.addArticle);
// 删除文章
router.post('/del',expressJoi(del_article_schema),article_Handle.delArticleById);
// 获取文章
router.post('/get_byid',expressJoi(del_article_schema),article_Handle.getArticleById);
// 更新文章
router.post('/update',expressJoi(update_article_schema),article_Handle.updateArticle);
module.exports=router;