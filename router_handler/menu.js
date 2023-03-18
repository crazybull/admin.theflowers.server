const db=require("../db");
const bcrypt=require("bcryptjs");//加密
// 获取菜单列表，三级
exports.getMenuList=(req,res)=>{
    const sqlStr="select id,name,alias from article_cate where is_del=0 order by id desc";
    db.query(sqlStr,(err,result)=>{
        if(err) return res.cc(err);
        res.send({
            status:0,
            message:'获取菜单分类成功',
            data:result
        })
    });
}
// 增加菜单分类
exports.addMenu=(req,res)=>{
    const querySql="select * from article_cate where name=? or alias=?";
    db.query(querySql,[req.body.name,req.body.alias],(err,result)=>{
        if(err) return res.cc(err);
        if(result.length>=1) return res.cc("分类名或别名重复");
        const sqlStr="insert into article_cate set ?";
        db.query(sqlStr,req.body,(err,result)=>{
            if(err) return res.cc(err);
            if(result.affectedRows!==1) return res.cc("新增分类失败");
            res.cc("新增分类成功",0);
        });
    });
}
// 修改菜单分类
exports.updateMenu=(req,res)=>{
    const querySql="select * from article_cate where id<>? and (name=? or alias=?)";
    const userinfo=req.body;
    db.query(querySql,[userinfo.id,userinfo.name,userinfo.alias],(err,result)=>{
        if(err) return res.cc(err);
        if(result.length>=1) return res.cc("分类名或别名重复");
        const sqlStr="update article_cate set ? where id=?";
        db.query(sqlStr,[userinfo,userinfo.id],(err,result)=>{
            if(err) return res.cc(err);
            if(result.affectedRows!==1) return res.cc("更新分类失败");
            res.cc("更新分类成功",0);
        });
    });
}

// 删除菜单分类
exports.delMenuById=(req,res)=>{
    const userinfo=req.body;
    const updateSql=`update article_cate set is_del=1 where id=?`;
    db.query(updateSql,userinfo.id,(err,result)=>{
        if(err) return res.cc(err);
        if(result.affectedRows!==1) return res.cc("删除菜单分类失败");
        res.cc("删除菜单分类成功",0);
    });
}
// 获取某个菜单分类
exports.getMenuById=(req,res)=>{
    const userinfo=req.body;
    const sqlStr="select id,name,alias,is_del from article_cate where id=?";
    db.query(sqlStr,userinfo.id,(err,result)=>{
        if(err) return res.cc(err);
        if(result.length!==1) return res.cc("获取文章分类失败");
        res.send({
            status:0,
            message:"获取文章分类成功",
            data:result[0]
        });
    });
}

