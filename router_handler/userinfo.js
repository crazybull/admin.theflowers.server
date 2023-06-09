const db=require("../db");
const bcrypt=require("bcryptjs");//加密
// 获取用户基信息
exports.getUserInfo=(req,res)=>{
const sqlStr="select id,username,email,status,user_pic,role from users where id=?";
    db.query(sqlStr,req.auth.id,(err,result)=>{
        if(err) return res.cc(err);
        if(result.length!==1) return res.cc("获取用户信息失败");
        res.success('获取用户信息成功',result[0])
    });
}
// 更新用户信息
exports.updateUserInfo=(req,res)=>{
    const sqlStr="update users set ? where id=?";
    db.query(sqlStr,[req.body,req.body.id],(err,result)=>{
        if(err) return res.cc(err);
        if(result.affectedRows!==1) return res.cc("更新用户信息失败");
        res.success("更新用户信息成功");
    });
}

// 更新用户密码
exports.updateUserPwd=(req,res)=>{
    const userinfo=req.body;
    const querySql="select * from users where id=?";
    db.query(querySql,req.auth.id,(err,result)=>{
        if(err) return res.cc(err);
        if(result.length!==1) return res.cc("获取用户信息失败");
        const compareResult=bcrypt.compareSync(userinfo.oldpwd,result[0].password);
        if(!compareResult) return res.cc("密码不正确");
        const updateSql=`update users set password=? where id=${req.auth.id}`;
        const newpwd=bcrypt.hashSync(userinfo.newpwd,10);//bcrypt加密
        db.query(updateSql,newpwd,(err,result)=>{
            if(err) return res.cc(err)
            if(result.affectedRows!==1) return res.cc("更新用户密码失败");
            res.success("更新用户信息成功");
        })
    });
}
// 更新用户头像
exports.updateUserAvatar=(req,res)=>{
    const userinfo=req.body;
    const updateSql=`update users set user_pic=? where id=?`;
    db.query(updateSql,[userinfo.user_pic,userinfo.id],(err,result)=>{
        console.log(result);
        if(err) return res.cc(err);
        if(result.affectedRows!==1) return res.cc("更新用户头像失败");
        res.success("更新用户头像成功");
    });
}
// 获取用户列表
exports.getUserList=(req,res)=>{
    const userinfo=req.body;
    let {pageNo,pageSize,keyword}=userinfo;
    keyword=keyword?keyword:"";
    const sqlStr=`select id,username,email,status,user_pic,role,nickname from users where is_del=0 and username like '%${keyword}%' limit ?,?`;
    pageNo =( parseInt(pageNo) )* pageSize || 0;
    db.query(sqlStr,[pageNo,pageSize],(err,result)=>{
        if(err) return res.cc(err);
        let sql = `SELECT COUNT(id) as total FROM users;`
        db.query(sql, [], (err, resultCount) => {
            let total = resultCount[0]['total'];
            res.success('获取用户列表成功',{total,list:result})
        })
    });
}

// 获取用户基信息
exports.getUserInfoById=(req,res)=>{
    const sqlStr="select id,username,nickname,email,status,user_pic,role,sex,introduction,country,city,province,addr from users where id=?";
    const userinfo=req.body;
    let {id}=userinfo;
    db.query(sqlStr,id,(err,result)=>{
        if(err) return res.cc(err);
        if(result.length!==1) return res.cc("获取用户信息失败");
        res.success('获取用户信息成功',result[0])
    });
}
