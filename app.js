require('dotenv').config();
const express=require('express');//导入express模块
const cors=require('cors');
const joi=require("joi");
const {expressjwt}=require("express-jwt");//7,x以后要解构出expressjwt才能用
const config=require("./config")

//创建express服务实例
const app=express();
// 配置跨域中间件
app.use(cors());
// 配置解析表单数据中间件
app.use(express.urlencoded({extended:false}));
 
//一定要在路由之前，挂载错误提示函数cc
app.use((req,res,next)=>{
    // @ts-ignore
    res.cc=function(err,status=1){
        res.send({
            status:status,
            message:err instanceof Error?err.message:err
        })
    }
    // @ts-ignore
    res.success=function(message,data,status=0){
        res.send({
            status,
            data,
            message
        })
    }
    next();
})

//一定要在路由之前，配置解析token，要配置在cc函数定义之后，不然会报cc is not funtion
app.use(expressjwt({secret:config.jwtSecretKey, algorithms: ["HS256"] }).unless({path: [/^\/api/]}));//7.x要配置 algorithms: ["HS256"]
// 导出并使用用户路由模块
const userRouter=require('./router/user');
// 导出并使用用户信息路由模块
const userInfoRouter=require('./router/userinfo');
// 导出并使用菜单路由模块
const menuRouter=require('./router/menu');
// @ts-ignore
app.use('/api',userRouter);
app.use('/menu',menuRouter);
app.use('/admin',userInfoRouter);
const articleCateRouter=require('./router/article_cate');//文章类别
app.use('/admin/article',articleCateRouter);
const articleRouter=require('./router/article');//文章
app.use('/admin/article',articleRouter);
//定义错误级别的中间件
app.use((err,req,res,next)=>{
    //验证失败
    if(err instanceof joi.ValidationError) return res.cc('身份认证失败',403);//身份认证失败
    if(err.name==="UnauthorizedError") return res.cc(err);
    res.cc(err)
})

//调用app.listen方法，指定端号口并启动服务器
app.listen(80,()=>{
    console.log('api server is running at 127.0.0.0:3007');
})