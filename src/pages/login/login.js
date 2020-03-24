import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd'
import './login.less'
import logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api/api.js'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

/*登录的路由组件*/
class Login extends Component{
	handleSubmit = (event) => {
		event.preventDefault()
		const form = this.props.form
		const values = form.getFieldsValue()
		console.log('输出值是:',values)
		form.validateFields(async (err, values) => {
		  if (!err) {
							// reqLogin(values.username,values.password).then(response => {
								
							// }).catch(error => {
								
							// })
			if(values.username != 'admin' || values.password != '1234'){
				message.error('用户名或密码错误')
			}else{
				message.success('登录成功')
				//保存用户
				memoryUtils.user = values
				storageUtils.saveUser(values)
				this.props.history.replace('/')
			}
			// const result = await reqLogin(values.username,values.password)
			// console.log('请求成功了!',response.data)
			// if(result.status == 0){//登录成功
			// 	message.success('登录成功')
			//  //保存用户
			//  memoryUtils.user = result.data
			//  storageUtils.saveUser(result.data)
			// 	//跳转到主界面
			// 	//replace不可回退,push可以回退
			// 	this.props.history.replace('/')
			// }else{//登录失败
			// 	message.error(result.msg)
			// }
		  }else{
			console.log('验证失败:',err)
		  }
		})
	}
	validatorProving = (rule, value, callback) => {
		if(!value){
			callback('请输入密码!')
		}else if(value.length < 4){
			callback('密码长度不能小于4位!')
		}else if(value.length > 12){
			callback('密码长度不能大于12位!')
		}else{
			callback()
		}
	}
	render(){
		//如果用户已经登录,自动跳转到主界面
		const user = memoryUtils.user
		if(user && user.username){
			return <Redirect to='/' />
		}
		const { getFieldDecorator } = this.props.form
		return(
		   <div className='login'>
	         <header className='login-header'>
			    <img src={logo} alt='logo'/>
				<h2>青羽后台管理系统---react</h2>
			 </header>
			 <section className='login-content'>
			    <h2>用户登录</h2>
				<Form onSubmit={this.handleSubmit} className="login-form">
				        <Form.Item>
						{getFieldDecorator('username', {
							rules: [
								{ required: true,whitespace:true, message: '请输入用户名!' },
								{ min: 4, message: '用户名最少4位!' },
								{ max: 12, message: '用户名最多12位!' },
								{ pattern: /^[A-Za-z0-9]+$/, message: '用户名必须是字母,数字和下划线!' },
							],
						  })(
							<Input
							  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							  placeholder="用户名"
							/>,
						  )}
				        </Form.Item>
				        <Form.Item>
						  {getFieldDecorator('password', {
						  	rules: [{ validator:this.validatorProving }],
						    })(
						  	<Input
						  	  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						  	  type="password"
						  	  placeholder="密码"
						  	/>,
						    )}
				        </Form.Item>
				        <Form.Item>
				          <Button type="primary" htmlType="submit" className="login-form-button">
				            登录
				          </Button>
				        </Form.Item>
				      </Form>
			 </section>
		   </div>
		)
	}
}

const WrappedNormalLoginForm = Form.create()(Login)
export default WrappedNormalLoginForm

/*
async和await
1.作用
  简化promise对象的使用:不用再使用then()来指定成功/失败的回调函数
  以同步编码(没有了回调函数)方式实现异步流程
2.哪里用await
  在返回promise的表达式左侧写await:不想要promise,想要promise异步执行的成功的value数据
3.哪里用async
  await所在函数(最近的)定义的左侧
*/