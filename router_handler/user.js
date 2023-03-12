const db=require("../db");
const bcrypt=require("bcryptjs");//加密
const jwt=require("jsonwebtoken");//jwt
const config=require("../config")
// 注册用户
exports.regUser=(req,res)=>{
    const userinfo=req.body;
    const sqlStr="select * from users where username=?";
    db.query(sqlStr,userinfo.username,(err,result)=>{
        if(err){
            return res.cc(err.message)
        }
        if(result.length>0){
            return res.cc("用户名已存在")
        }
        userinfo.password=bcrypt.hashSync(userinfo.password,10);
        //注册用户
        const regSqlStr="insert into users set ?";
        db.query(regSqlStr,userinfo,(err,result)=>{
            if(err){
                return res.cc(err.message)
            }
            if(result.affectedRows!==1){
                return res.cc("注册失败")
            }
            res.cc("注册成功");
        })
    });
    //res.send('register ok')
}
// 登录
exports.login=(req,res)=>{
    const userinfo=req.body;
    const sqlStr="select * from users where username=?";
    db.query(sqlStr,userinfo.username,(err,result)=>{
        if(err) return res.cc(err);
        if(result.length!==1){return res.cc("登录失败")};
        /**
         * 通过bscypt比较加密后的密码和传过来的密码
         */
        const compareResult=bcrypt.compareSync(userinfo.password,result[0].password);
        if(!compareResult) return res.cc("密码不正确");
        const user={...result[0],password:"",user_pic:""};
        const tokenStr=jwt.sign(user,config.jwtSecretKey,{expiresIn:'12h'});
        res.cookie("token","Bearer "+tokenStr)
        res.send({
            status:0,
            message:"登录成功",
            token:"Bearer "+tokenStr
        })
    })
}