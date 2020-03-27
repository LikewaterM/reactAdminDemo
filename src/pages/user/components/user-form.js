import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Input,Select} from 'antd'

const Item = Form.Item
const Option = Select.Option

class UserForm extends Component{
	constructor(props){
		super(props)
		
	}
	
	static propTypes = {
		setForm:PropTypes.func.isRequired,
		roles:PropTypes.array.isRequired,
		user:PropTypes.object,
	}
	
	componentWillMount(){
		this.props.setForm(this.props.form)
	}
	
	render(){
		const {roles,user} = this.props
		const { getFieldDecorator } = this.props.form
		const formItemLayout = {
		  labelCol: { span: 5 },
		  wrapperCol: { span: 16 },
		}
		return(
		  <Form {...formItemLayout}>
			<Item label="用户名:">
				{getFieldDecorator('username',{
					initialValue:user.username,
					rules:[
						{required:true,message:'用户名称必填'}
					]
				})(
				  <Input placeholder='请输入用户名称'/>
				)} 
			</Item>
			{
				user.username ? null : (
				  <Item label="密码:">
				  	{getFieldDecorator('password',{
				  		initialValue:user.password,
				  		rules:[
				  			{required:true,message:'密码必填'}
				  		]
				  	})(
				  	  <Input type='password' placeholder='请输入密码'/>
				  	)} 
				  </Item>
				)
			}
			<Item label="电话:">
				{getFieldDecorator('phone',{
					initialValue:user.phone,
					rules:[
						{required:true,message:'电话必填'}
					]
				})(
				  <Input placeholder='请输入电话'/>
				)} 
			</Item>
			<Item label="邮箱:">
				{getFieldDecorator('email',{
					initialValue:user.email,
				})(
				  <Input placeholder='请输入邮箱'/>
				)} 
			</Item>
			{/*当antd的Select和Form组件一起使用时，Form的initialValue默认为空字符串时，Select的placeholder不起作用，所以设置为undefined,才起作用*/}
			<Item label="角色:">
				{getFieldDecorator('role_id',{
					initialValue:user.role_id?user.role_id:undefined,
					rules:[
						{required:true,message:'角色必选'}
					]
				})(
				  <Select placeholder="请选择角色">
				    {
						roles.map((role)=><Option key={role._id} value={role._id}>{role.name}</Option>)
					}
				  </Select>
				)} 
			</Item>
		  </Form>
		)
	}
}

const WrappedNormalUserForm = Form.create()(UserForm)
export default WrappedNormalUserForm