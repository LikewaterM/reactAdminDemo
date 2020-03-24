import React,{Component} from 'react'
import {Card,Button,Table,message} from 'antd'
import {roleData} from '../../api/roleDatas/roleData.js'
import {PAGE_SIZE} from '../../utils/contents.js'
import {reqRoles} from '../../api/api.js'

/*角色管理路由*/
export default class Role extends Component{
	state = {
		roles:roleData || [],
		loading:false,
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
			},
			{
				title: '授权时间',
				dataIndex: 'auth_time',
				key: 'auth_time',
			},
			{
				title: '授权人',
				dataIndex: 'auth_name',
				key: 'auth_name',
			},
		]
	}
	
	getRoles = async () => {
		const result = await reqRoles()
		if(result.status == 0){
			const roles = result.data
			this.setState({roles})
		}else{
			message.error('获取角色数据失败')
		}
	}
	
	onRow = (recode) => {
		return {
		  onClick: event => {// 点击行
			  console.log(recode,'recode')
		  }, 
		  // onDoubleClick: event => {},
		  // onContextMenu: event => {},
		  // onMouseEnter: event => {}, // 鼠标移入行
		  // onMouseLeave: event => {},
		}
	}
	
	componentWillMount(){
		this.initColumns()
	}
	
	componentDidMount(){
		this.getRoles()
	}
	
	render(){
		const {roles,loading} = this.state
		const title = (
		  <span>
		    <Button type="primary" style={{marginRight:10}}>创建角色</Button>
			<Button type="primary" disabled>设置角色权限</Button>
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
			   rowSelection={{type:'radio'}}
			   onRow={this.onRow}
		    />
		  </Card>
		)
	}
}