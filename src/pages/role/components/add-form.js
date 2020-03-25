import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Input} from 'antd'

const Item = Form.Item

class AddForm extends Component{
	constructor(props){
		super(props)
		
	}
	
	static propTypes = {
		setForm:PropTypes.func.isRequired,
	}
	
	componentWillMount(){
		this.props.setForm(this.props.form)
	}
	
	render(){
		const { getFieldDecorator } = this.props.form
		const formItemLayout = {
		  labelCol: { span: 6 },
		  wrapperCol: { span: 16 },
		}
		return(
		  <Form>
			<Item label="角色名称:" {...formItemLayout}>
			{getFieldDecorator('roleName',{
				initialValue:'',
				rules:[
					{required:true,message:'角色名称必填'}
				]
			})(
			  <Input placeholder='请输入角色名称'/>
			)} 
			</Item>
		  </Form>
		)
	}
}

const WrappedNormalAddForm = Form.create()(AddForm)
export default WrappedNormalAddForm