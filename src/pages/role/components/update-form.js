import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Input,Tree} from 'antd'

const Item = Form.Item

export default class UpdateForm extends Component{
	constructor(props){
		super(props)
		
	}
	
	static propTypes = {
		role:PropTypes.object
	}
	
	componentWillMount(){
		
	}
	
	render(){
		const {role} = this.props
		const formItemLayout = {
		  labelCol: { span: 6 },
		  wrapperCol: { span: 16 },
		}
		return(
		  <Form>
			<Item label="角色名称:" {...formItemLayout}>
			  <Input disabled value={role.name}/>
			</Item>
		  </Form>
		)
	}
}
