import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Select,Input} from 'antd'

const Item = Form.Item
const Option = Select.Option

class UpdateForm extends Component{
	constructor(props) {
	    super(props)
	}
	
	static propTypes = {
		updateFormData:PropTypes.string.isRequired,
		setForm:PropTypes.func.isRequired,
	}
	
	componentWillMount(){
		//将子组件的form通过setForm()方法传递给父组件
		this.props.setForm(this.props.form)
	}
	
	render(){
		const {updateFormData} = this.props
		const { getFieldDecorator } = this.props.form
		return(
		  <Form>
			<Item label="分类名称:">
			{getFieldDecorator('categoryName',{
				initialValue:updateFormData,
				rules:[
					{required:true,message:'分类名称必填'}
				]
			})(
			  <Input placeholder='请输入分类名称'/>
			)} 
			</Item>
		  </Form>
		)
	}
}

const WrappedNormalUpdateForm = Form.create()(UpdateForm)
export default WrappedNormalUpdateForm