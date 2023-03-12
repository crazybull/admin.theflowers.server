const joi=require("joi");

const name=joi.string().required();
const id=joi.number().integer().min(1).required();
const alias=joi.string().alphanum().required();
const is_del=joi.number().integer().min(1).max(1).required();
// 新增文章分类
exports.add_articlecate_schema={
    body:{
        name,
        alias
    }
}
// 删除文章分类
exports.del_articlecate_schema={
    body:{
        id
    }
}
//更新文章分类
exports.update_articlecate_schema={
    body:{
        id,
        name,
        alias
    }
}
