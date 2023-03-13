const joi=require("joi");

const name=joi.string().required();
const id=joi.number().integer().min(0).required();
const alias=joi.string().alphanum().required();
const parentId=joi.number().integer().min(0).required();
const is_del=joi.number().integer().min(1).max(1).required();
// 新增菜单分类
exports.add_menu_schema={
    body:{
        name,
        alias,
        parentId
    }
}
// 删除菜单分类
exports.del_menu_schema={
    body:{
        id
    }
}
//更新菜单分类
exports.update_menu_schema={
    body:{
        id,
        name,
        alias
    }
}
