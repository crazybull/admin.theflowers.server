const joi=require("joi");

const username=joi.string().alphanum().min(3).max(10).required();
const password=joi
.string()
.pattern(/^[\S]{3,12}$/)
.required();
const id=joi.number().integer().min(1).required();
const nickname=joi.string().required();
const email=joi.string().email().required();
const avatar=joi.string().dataUri().required();
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
        email
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
        avatar
    }
}