import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Select,Input} from 'antd'

const Item = Form.Item
const Option = Select.Option

class AddForm extends Component{
	constructor(props){
		super(props)
		
	}
	
	static propTypes = {
		categorys:PropTypes.array.isRequired,
		subCategorys:PropTypes.array.isRequired,
		parentId:PropTypes.string.isRequired,
		setForm:PropTypes.func.isRequired,
	}
	
	componentWillMount(){
		this.props.setForm(this.props.form)
	}
	
	render(){
		const { categorys,subCategorys,parentId } = this.props
		const { getFieldDecorator } = this.props.form
		return(
		  <Form>
		    <Item label="请选择分类:">
			  {getFieldDecorator('parentId',{
				  initialValue:parentId
			  })(
			    <Select>
			      <Option value='0'>一级分类</Option>
			      {
					  categorys.map((item)=><Option value={item._id} key={item._id}>{item.name}</Option>)
				  }
			    </Select>
			  )}
			</Item>
			
			<Item label="分类名称:">
			{getFieldDecorator('categoryName',{
				initialValue:'',
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

const WrappedNormalAddForm = Form.create()(AddForm)
export default WrappedNormalAddForm