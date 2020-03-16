import React,{Component} from 'react'
import {Card,Form,Input,Upload,Cascader,Button,Icon} from 'antd'
import LinkButton from '../../../components/link-button/linkButton.js'

const Item = Form.Item
const {TextArea} = Input

class ProductAddUpdate extends Component{
	//商品价格验证
	validatorPrice = (rule, value, callback) => {
		if(value*1 > 0){
			callback()
		}else{
			callback('商品价格必须大于零')
		}
	}
	
	//表单提交
	submit = () => {
		this.props.form.validateFields((err,val)=>{
			if(!err){
				alert('提交表单成功')
			}
		})
	}
	
	render(){
		const {getFieldDecorator } = this.props.form
		const title = (
		  <span>
		    <LinkButton onClick={()=>this.props.history.goBack()}>
				<Icon type="arrow-left" className='detail-card-icon'/>
				</LinkButton>	    
		    <span>添加商品</span>
		  </span>
		)
		const formItemLayout = {
		  labelCol: { span: 3 },
		  wrapperCol: { span: 8 },
		}
		return(
		  <Card title={title}>
		    <Form {...formItemLayout}>
			  <Item label='商品名称'>
			    {getFieldDecorator('name',{
					initialValue:'',
					rules:[
						{required:true,message:'商品名称必填'}
					]
				})(<Input placeholder='请输入商品名称' />)}
			  </Item>
			  <Item label='商品描述'>
			    {getFieldDecorator('desc',{
			    	initialValue:'',
			    	rules:[
			    		{required:true,message:'商品描述必填'}
			    	]
			    })(<TextArea placeholder="请输入商品描述" autoSize />)}
			  </Item>
			  <Item label='商品价格'>
			    {getFieldDecorator('price',{
			    	initialValue:'',
			    	rules:[
			    		{required:true,message:'商品价格必填'},
						{validator:this.validatorPrice}
			    	]
			    })(<Input type='number' placeholder='请输入商品价格' addonAfter='元' />)}
			  </Item>
			  <Item label='商品分类'>
			    <div>商品分类</div>
			  </Item>
			  <Item label='商品图片'>
			    <div>商品图片</div>
			  </Item>
			  <Item label='商品详情'>
			    <div>商品详情</div>
			  </Item>
			  <Item>
			    <Button type='primary' onClick={this.submit}>提交</Button>
			  </Item>
			</Form>
		  </Card>
		)
	}
}

const ProductAddUpdateForm = Form.create()(ProductAddUpdate)
export default ProductAddUpdateForm