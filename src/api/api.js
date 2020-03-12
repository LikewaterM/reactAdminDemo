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

//获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax(base + '/manage/category/list',{parentId})

//添加分类
export const reqAddCategory = (parentId,categoryName) => ajax(base + '/manage/category/add',{parentId,categoryName},'POST')

//更新分类
export const reqUpdateCategory = ({categoryName,categoryId}) => ajax(base + '/manage/category/update',{categoryName,categoryId},'POST')

//获取商品分页列表
export const reqProducts = ({pageNum,pageSize}) => ajax(base + '/manage/product/list',{pageNum,pageSize})