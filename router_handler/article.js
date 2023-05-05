const db=require("../db");
const bcrypt=require("bcryptjs");//加密
// 获取所有文章
exports.getArticle=(req,res)=>{
    const userinfo=req.body;
    let {pageNo,pageSize,keyword}=userinfo;
    keyword=keyword?keyword:"";
    pageSize=parseInt(pageSize)?parseInt(pageSize):100;
    pageNo =( parseInt(pageNo) )* pageSize || 0;
    const sqlStr=`select t1.id,t1.title,t2.username from article as t1 left join users as t2 on t1.author_id=t2.id where t1.is_del=0 and t1.title like '%${keyword}%'  limit ?,?`;
    db.query(sqlStr,[pageNo,pageSize],(err,result)=>{
        if(err) return res.cc(err);
        let sql = `SELECT COUNT(id) as total FROM article where is_del=0;`
        db.query(sql, [], (err, resultCount) => {
            let total = resultCount[0]['total'];
            res.success('获取文章成功',{total,list:result})
        })
    })
}
// 增加文章
exports.addArticle=(req,res)=>{
    const sqlStr="insert into article set ?";
    db.query(sqlStr,req.body,(err,result)=>{
        if(err) return res.cc(err);
        if(result.affectedRows!==1) return res.cc("新增分类失败");
        res.success("新增分类成功",true);
    });
}
// 修改文章
exports.updateArticle=(req,res)=>{
    const querySql="select * from article where id<>? and (name=? or alias=?)";
    const userinfo=req.body;
    db.query(querySql,[userinfo.id,userinfo.name,userinfo.alias],(err,result)=>{
        if(err) return res.cc(err);
        if(result.length>=1) return res.cc("分类名或别名重复");
        const sqlStr="update article set ? where id=?";
        db.query(sqlStr,[userinfo,userinfo.id],(err,result)=>{
            if(err) return res.cc(err);
            if(result.affectedRows!==1) return res.cc("更新分类失败");
            res.success("更新分类成功",true);
        });
    });
}

// 删除文章
exports.delArticleById=(req,res)=>{
    const userinfo=req.body;
    const updateSql=`update article set is_del=1 where id=?`;
    db.query(updateSql,userinfo.id,(err,result)=>{
        if(err) return res.cc(err);
        if(result.affectedRows!==1) return res.cc("删除文章失败");
        res.success("删除文章成功",true);
    });
}
// 获取某个文章
exports.getArticleById=(req,res)=>{
    const userinfo=req.body;
    const sqlStr="select id,title,is_del from article where id=?";
    db.query(sqlStr,userinfo.id,(err,result)=>{
        if(err) return res.cc(err);
        if(result.length!==1) return res.cc("获取文章失败");
        res.success("新增分类成功",result[0]);
    });
}

