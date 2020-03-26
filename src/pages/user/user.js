import React,{Component} from 'react'
import {Card,Button,Table,Modal} from 'antd'
import {formateDate} from '../../utils/dateUtils.js'
import LinkButton from '../../components/link-button/linkButton.js'
import {PAGE_SIZE} from '../../utils/contents.js'
import {reqUsers} from '../../api/api.js'

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
				render:(role_id)=>this.roleNames[role_id]
			},
			{
				title: '操作',
				render:(item)=>(
				  <span>
				    <LinkButton>修改</LinkButton>
					<LinkButton>删除</LinkButton>
				  </span>
				)
			},
		]
	}
	
	initRoleNames = (roles) => {
		const roleNames = roles.reduce((pre,role)=>{
			pre[role._id]=role.name
			return pre
		},{})
		this.roleNames = roleNames
	}
	
	getUsers = async () => {
		const result = await reqUsers()
		if(result.status == 0){
			const {users,roles} = result.data
			this.initRoleNames(roles)
			this.setState({
				users,
				roles
			})
		}
	}
	
	addUpdate = () => {
		
	}
	
	componentWillMount(){
		this.initColumns()
	}
	
	componentDidMount(){
		this.getUsers()
	}
	
	render(){
		const {users,isAddUpdate} = this.state
		const title = <Button type='primary'>创建用户</Button>
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
		    	title="创建用户"
		    	visible={isAddUpdate}
		    	onOk={this.addUpdate}
		    	onCancel={()=>this.setState({isAddUpdate:false})}
		    	okText="确认"
		    	cancelText="取消"
		    >
		        <div>用户</div>
		    </Modal>
		  </Card>
		)
	}
}