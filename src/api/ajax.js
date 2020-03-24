/*能发送异步ajax请求的函数模块*/
/*
1.优化:统一处理请求异常
       在外层包一个自己创建的promise对象
	   在请求出错时,不reject(error),而是显示错误提示
2.异步得到不是reponse,而是reponse.data
  在请求成功resolve时:resolve(response.data)
*/

import axios from 'axios'
import { message } from 'antd'

export default function ajax(url,data={},type='GET'){
	let promise
	return new Promise((resolve,reject) => {
		//1.执行异步ajax请求
		if(type.toUpperCase() === 'GET'){
			promise = axios.get(url,{
				params:data
			})
		}else{
			promise = axios.post(url,data)
		}
		
		promise.then(response => {
			resolve(response.data)
		}).catch(error => {
			message.error('请求出错了:' + error.message)
		})
	})
}