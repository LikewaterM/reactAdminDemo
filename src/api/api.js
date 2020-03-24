/*包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
*/

import ajax from './ajax.js'

//const base = 'http://localhost:5000'
const base = ''

//登录
export const reqLogin = (username,password) => ajax(base + '/login',{username,password},'POST')

//添加用户
export const reqAddUser = (user) => ajax(base + '/manage/user/add',user,'POST')