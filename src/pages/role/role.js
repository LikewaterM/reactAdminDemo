import React,{Component} from 'react'
import {Card,Button,Table,message,Modal} from 'antd'
import {roleData} from '../../api/roleDatas/roleData.js'
import {PAGE_SIZE} from '../../utils/contents.js'
import {reqRoles,reqAddRole,reqUpdateRole} from '../../api/api.js'
import WrappedNormalAddForm from './components/add-form.js'
import UpdateForm from './components/update-form.js'
import memoryUtils from '../../utils/memoryUtils.js'
import {formateDate} from '../../utils/dateUtils.js'

/*角色管理路由*/
export default class Role extends Component{
	constructor(props){
		super(props)
		this.state = {
			roles:roleData || [],
			loading:false,
			role:{},//选中行的数据
			radioChange:[],//选中单选框的数据
			isAddRole:false,
			isUpdateRole:false,
		}
		this.auth = React.createRef()
	}
	
	initColumns = () => {
		this.columns = [
			{
				title: '角色名称',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				key: 'create_time',
				render:(create_time)=>formateDate(create_time)
			},
			{
				title: '授权时间',
				dataIndex: 'auth_time',
				key: 'auth_time',
				render:formateDate
			},
			{
				title: '授权人',
				dataIndex: 'auth_name',
				key: 'auth_name',
			},
		]
	}
	
	getRoles = async () => {
		// const result = await reqRoles()
		// if(result.status == 0){
		// 	const roles = result.data
		// 	this.setState({roles})
		// }else{
		// 	message.error('获取角色数据失败')
		// }
	}
	
	onRow = (recode) => {
		return {
		  onClick: event => {// 点击行
			  this.setState({
				  role:recode,
				  radioChange:[]
			  })
		  }, 
		  // onDoubleClick: event => {},
		  // onContextMenu: event => {},
		  // onMouseEnter: event => {}, // 鼠标移入行
		  // onMouseLeave: event => {},
		}
	}
	
	selectChange = (index,item) => {
		this.setState({
			radioChange:index,
			role:item[0]
		})
	}
	
	establishRole = () => {
		this.setState({
			isAddRole:true
		})
	}
	
	setAuthRole = () => {
		this.setState({
			isUpdateRole:true
		})
	}
	
	addRole = () => {
		this.form.validateFields(async (err,values)=>{
			if(!err){
				const {roleName} = values
				this.form.resetFields()
				this.setState({isAddRole:false})
				const result = await reqAddRole(roleName)
				if(result.status == 0){
					message.success('添加角色成功')
					//将新增的角色添加到角色列表里
					this.setState(state=>({
						roles:[...state.roles,result.data]
					}))
				}else{
					message.error('添加角色失败')
				}
			}
		})
	}
	
	updateRole = async () => {
		this.setState({isUpdateRole:false})
		const {role} = this.state
		const menus = this.auth.current.getMenuLists()
		role.menus = menus
		role.auth_name = memoryUtils.user.username
		role.auth_time = Date.now()
		const result = await reqUpdateRole(role)
		if(result.state == 0){
			message.success('更新角色权限成功')
			this.setState({
				roles:[...this.state.roles]
			})
		}else{
			message.error('更新角色权限失败')
		}
	}
	
	componentWillMount(){
		this.initColumns()
	}
	
	componentDidMount(){
		this.getRoles()
	}
	
	render(){
		const {roles,loading,role,radioChange,isAddRole,isUpdateRole} = this.state
		console.log(role,'role')
		let key = radioChange.length==0?role._id:radioChange[0]
		const title = (
		  <span>
		    <Button type="primary" style={{marginRight:10}} onClick={this.establishRole}>创建角色</Button>
			<Button type="primary" disabled={!key} onClick={this.setAuthRole}>设置角色权限</Button>
		  </span>
		)
		return(
		  <Card title={title}>
		    <Table
		       loading={loading}
		       dataSource={roles} 
		       columns={this.columns} 
		       bordered
		       rowKey='_id'
		       pagination={{defaultPageSize:PAGE_SIZE,showQuickJumper:true}}
			   rowSelection={{type:'radio',selectedRowKeys:[key],onChange:this.selectChange}}
			   onRow={this.onRow}
		    />
			<Modal
				title="创建角色"
				visible={isAddRole}
				onOk={this.addRole}
				onCancel={()=>this.setState({isAddRole:false})}
				okText="确认"
				cancelText="取消"
			>
			    <WrappedNormalAddForm setForm={(form)=>{this.form=form}}/>
			</Modal>
			<Modal
				title="设置角色权限"
				visible={isUpdateRole}
				onOk={this.updateRole}
				onCancel={()=>this.setState({isUpdateRole:false})}
				okText="确认"
				cancelText="取消"
			>
			    <UpdateForm ref={this.auth} role={role}/>
			</Modal>
		  </Card>
		)
	}
}