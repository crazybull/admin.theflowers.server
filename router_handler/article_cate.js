const db=require("../db");
const bcrypt=require("bcryptjs");//加密
// 获取文章分类
exports.getArticleCate=(req,res)=>{
    const userinfo=req.body;
    let {pageNo,pageSize,keyword}=userinfo;
    keyword=keyword?keyword:"";
    pageSize=parseInt(pageSize)?parseInt(pageSize):100;
    pageNo =( parseInt(pageNo) )* pageSize || 0;
    const sqlStr=`select id,name,alias,parent_id from article_cate where is_del=0 and parent_id=0 and alias like '%${keyword}%' limit ?,?`;
    db.query(sqlStr,[pageNo,pageSize],(err,result)=>{
        if(err) return res.cc(err);
        let sql = `SELECT COUNT(id) as total FROM article_cate where parent_id=0;`
        const idArr=[];
        result.map(item=>idArr.push(item.id));
        const subMenuSql=`SELECT id,name,alias,parent_id from article_cate where parent_id in (${idArr.join(",")}) ;`
        let returnList=[];
        db.query(subMenuSql, [], (err, subResult) => {
            if(err) return res.cc(err);
           returnList=result.map(item=>{
                return {...item,children:subResult.filter((subitem)=>item.id==subitem.parent_id)}
            })
            db.query(sql, [], (err, resultCount) => {
                let total = resultCount[0]['total'];
                res.success('获取文章分类成功',{total,list:returnList})
            })
        })
    });
}
// 增加文章分类
exports.addArticleCate=(req,res)=>{
    const querySql="select * from article_cate where name=? or alias=?";
    db.query(querySql,[req.body.name,req.body.alias],(err,result)=>{
        if(err) return res.cc(err);
        if(result.length>=1) return res.cc("分类名或别名重复");
        const sqlStr="insert into article_cate set ?";
        db.query(sqlStr,req.body,(err,result)=>{
            if(err) return res.cc(err);
            if(result.affectedRows!==1) return res.cc("新增分类失败");
            res.success("新增分类成功");
        });
    });
}
// 修改文章分类
exports.updateArticleCate=(req,res)=>{
    const querySql="select * from article_cate where id=?";
    const userinfo=req.body;
    db.query(querySql,[userinfo.id],(err,result)=>{
        if(err) return res.cc(err);
        if(result.length<=0) return res.cc("分类不存在");
        const sqlStr="update article_cate set ? where id=?";
        db.query(sqlStr,[userinfo,userinfo.id],(err,result)=>{
            if(err) return res.cc(err);
            if(result.affectedRows!==1) return res.cc("更新分类失败");
            res.success("更新分类成功",true);
        });
    });
}

// 删除文章分类
exports.delArticleCateById=(req,res)=>{
    const userinfo=req.body;
    const updateSql=`update article_cate set is_del=1 where id=? or parent_id=?`;
    db.query(updateSql,[userinfo.id,userinfo.id],(err,result)=>{
        console.log(result);
        if(err) return res.cc(err);
        if(result.affectedRows!==1) return res.cc("删除文章分类失败");
        res.success("删除文章分类成功",true);
    });
}
// 获取某个文章分类
exports.getArticleCateById=(req,res)=>{
    const userinfo=req.body;
    const sqlStr="select id,name,alias,is_del from article_cate where id=? or parent_id=?";
    db.query(sqlStr,[userinfo.id,userinfo.id],(err,result)=>{
        if(err) return res.cc(err);
        if(result.length!==1) return res.cc("获取文章分类失败");
        res.success("获取文章分类成功",result[0]);
    });
}

