import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Input,Tree} from 'antd'
import './update-form.less'
import menuList from '../../../config/menuConfig.js'

const Item = Form.Item
const { TreeNode } = Tree

export default class UpdateForm extends Component{
	static propTypes = {
		role:PropTypes.object
	}
	
	constructor(props){
		super(props)
		const {menus} = this.props.role
		this.state = {
			checkedKeys:menus
		}
	}
	
	getTreeNodes = (items) => {
		return items.reduce((pre,item)=>{
			pre.push(
			  <TreeNode title={item.title} key={item.key}>
			    {item.children ? this.getTreeNodes(item.children):null}
			  </TreeNode>
			)
			return pre
		},[])
	}
	
	onCheck = (checkedKeys, info) => {
	    console.log('onCheck', checkedKeys, info)
		this.setState({
			checkedKeys
		})
	}
	
	//将数据传递给父组件
	getMenuLists = () => this.state.checkedKeys
	
	componentWillMount(){
		this.treeNodes = this.getTreeNodes(menuList)
	}
	
	componentWillReceiveProps(nextProps){
		const menus = nextProps.role.menus
		this.setState({
			checkedKeys:menus
		})
	}
	
	render(){
		const {role} = this.props
		const {checkedKeys} = this.state
		const formItemLayout = {
		  labelCol: { span: 5 },
		  wrapperCol: { span: 16 },
		}
		return(
		  <div className='update-form'>
		    <Form>
				<Item label="角色名称:" {...formItemLayout}>
				  <Input disabled value={role.name}/>
				</Item>
		    </Form>
			<Tree
			    className='update-form-tree'
				checkable
				defaultExpandAll={true}
				checkedKeys={checkedKeys}
				onCheck={this.onCheck}
			>
				<TreeNode title="平台权限" key="all">
				  {this.treeNodes}
				</TreeNode>
			</Tree>
		  </div>
		)
	}
}
