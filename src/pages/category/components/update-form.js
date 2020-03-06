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
		updateFormData:PropTypes.string.isRequired
	}
	render(){
		const {updateFormData} = this.props
		const { getFieldDecorator } = this.props.form
		return(
		  <Form>
			<Item>
			{getFieldDecorator('categoryName',{
				initialValue:updateFormData
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