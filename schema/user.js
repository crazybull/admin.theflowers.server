const joi=require("joi");

const username=joi.string().alphanum().min(3).max(10).required();
const password=joi
.string()
.pattern(/^[\S]{3,12}$/)
.required();
const id=joi.number().required();
const nickname=joi.string();
const sex=joi.string();
const introduction=joi.string().max(100);
const province=joi.string();
const city=joi.string();
const addr=joi.string();
const email=joi.string().email();
const user_pic=joi.string().dataUri();
const pageNo=joi.number().integer().min(0);
const pageSize=joi.number().integer().min(0);
const keyword=joi.string().allow('').allow(null);
// 登录和注册
exports.reg_login_schema={
    body:{
        username,
        password
    }
}
// 更新用户信息
exports.update_userinfo_schema={
    body:{
        id,
        nickname,
        email,
        sex,
        introduction,
        province,
        city,
        addr
    }
}
// 更新密码
exports.update_pwd_schema={
    body:{
        oldpwd:password,
        // @ts-ignore
        newpwd:joi.not(joi.ref('oldpwd')).concat(password),
    }
}
//更新头像
exports.update_avatar_schema={
    body:{
        id,
        user_pic
    }
}
//获取用户列表
exports.get_list_schema={
    body:{
        pageNo,
        pageSize,
        keyword
    }
}
// 通过用户id获取用户信息
exports.get_userinfo_byid_schema={
    body:{
        id
    }
}
