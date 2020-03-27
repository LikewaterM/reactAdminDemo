import React,{Component} from 'react'
import {Card,Button,Table,Modal,message} from 'antd'
import {formateDate} from '../../utils/dateUtils.js'
import LinkButton from '../../components/link-button/linkButton.js'
import {PAGE_SIZE} from '../../utils/contents.js'
import {reqUsers,reqDeleteUser,reqAddUser} from '../../api/api.js'
import {userData} from '../../api/userDatas/userData.js'
import WrappedNormalUserForm from './components/user-form.js'

/*用户管理路由*/
export default class User extends Component{
	constructor(props) {
	    super(props)
		this.state = {
			users:[],//用户列表
			roles:[],//角色列表
			isAddUpdate:false,
		}
	}
	
	initColumns = () => {
		this.columns = [
			{
				title: '用户名',
				dataIndex: 'username',
				key: 'username',
			},
			{
				title: '邮箱',
				dataIndex: 'email',
				key: 'email',
			},
			{
				title: '电话',
				dataIndex: 'phone',
				key: 'phone',
			},
			{
				title: '注册时间',
				dataIndex: 'create_time',
				key: 'create_time',
				render:formateDate
			},
			{
				title: '所属角色',
				dataIndex: 'role_id',
				key: 'role_id',
				// render:(role_id)=>this.roleNames[role_id]
			},
			{
				title: '操作',
				render:(item)=>(
				  <span>
				    <LinkButton onClick={()=>this.updateUser(item)}>修改</LinkButton>
					<LinkButton onClick={()=>this.deleteUser(item)}>删除</LinkButton>
				  </span>
				)
			},
		]
	}
	
	updateUser = (item) => {
		this.user = item
		this.setState({
			isAddUpdate:true
		})
	}
	
	addUser = () => {
		this.user = undefined
		this.setState({
			isAddUpdate:true,
		})
	}
	
	deleteUser = (item) => {
		Modal.confirm({
		    title: `是否删除${item.username}用户？`,
			okText:'确定',
			cancelText:'取消',
		    onOk:async () => {
		      const result = await reqDeleteUser(item._id)
			  if(result.status == 0){
				  message.success('删除用户成功')
			  }else{
				  message.error('删除用户失败')
			  }
		    },
		})
	}
	
	initRoleNames = (roles) => {
		const roleNames = roles.reduce((pre,role)=>{
			pre[role._id]=role.name
			return pre
		},{})
		this.roleNames = roleNames
	}
	
	getUsers = async () => {
		// const result = await reqUsers()
		// if(result.status == 0){
		// 	const {users,roles} = result.data
		// 	this.initRoleNames(roles)
		// 	this.setState({
		// 		users,
		// 		roles
		// 	})
		// }
		
		//模拟数据
		this.setState({
			users:userData
		})
	}
	
	addUpdate = async () => {
		this.setState({
			isAddUpdate:false
		})
		const user = this.form.getFieldsValue
		this.form.resetFields()
		const result = await reqAddUser(user)
		if(result.status == 0){
			message.success('添加用户成功')
			this.getUsers()
		}else{
			message.error('添加用户失败')
		}
	}
	
	componentWillMount(){
		this.initColumns()
	}
	
	componentDidMount(){
		this.getUsers()
	}
	
	render(){
		const {users,isAddUpdate,roles} = this.state
		const title = <Button type='primary' onClick={this.addUser}>创建用户</Button>
		return(
		  <Card title={title}>
		    <Table
		       dataSource={users} 
		       columns={this.columns} 
		       bordered
		       rowKey='_id'
		       pagination={{defaultPageSize:PAGE_SIZE,showQuickJumper:true}}
		    />
		    <Modal
		    	title={this.user?'修改用户':'创建用户'}
		    	visible={isAddUpdate}
		    	onOk={this.addUpdate}
		    	onCancel={()=>{
					this.form.resetFields()
					this.setState({isAddUpdate:false})
				}}
		    	okText="确认"
		    	cancelText="取消"
		    >
		        <WrappedNormalUserForm setForm={(form)=>this.form = form} roles={roles} user={this.user || {}}/>
		    </Modal>
		  </Card>
		)
	}
}