import React,{Component} from 'react'
import {Card,Form,Input,Upload,Cascader,Button,Icon} from 'antd'
import LinkButton from '../../../components/link-button/linkButton.js'
import {reqCategorys} from '../../../api/api.js'
import {categorySimulationData} from '../../../api/simulationDatas/categorySimulationData.js'
import {categoryTwoSimulationData} from '../../../api/simulationDatas/categoryTwoSimulationData.js'
import PicturesWall from './pictures-will.js'

const Item = Form.Item
const {TextArea} = Input

class ProductAddUpdate extends Component{
	constructor(props){
		super(props)
		this.state = {
			options:[],
		}
	}
	//商品价格验证
	validatorPrice = (rule, value, callback) => {
		if(value*1 > 0){
			callback()
		}else{
			callback('商品价格必须大于零')
		}
	}
	
	initOptions = async (data) => {
		const options = data.map((item)=>({
			value: item._id,
			label: item.name,
			isLeaf: false,
		}))
		const {isUpdate,updateData} = this
		if(isUpdate && updateData.pCategoryId != '0'){
			// //获取对应的二级分类列表
			// const subCategorys = await this.getCategorys(updateData.pCategoryId) 
			// //生成二级下拉列表的option
			// const cOptions = subCategorys.map((item)=>({
			// 	value: item._id,
			// 	label: item.name,
			// 	isLeaf: true,
			// }))
			// //找到当前商品对应的一级option
			// const targetOption = options.find(item=>item.value==updateData.pCategoryId)
			// //关联到对应的一级option
			// targetOption.children = cOptions
		}
		this.setState({
			options,
		})
	}
	
	//加载一级/二级分类列表
	getCategorys = async (parentId) => {
		// const result = await reqCategorys(parentId)
		// if(result.status == 0){
		// 	if(parentId == '0'){//加载一级分类
		// 		this.initOptions(result.data)
		// 	}else{//加载二级分类
		// 		return result.data
		// 	}
		// }
		
		//模拟数据
		if(parentId == '0'){//加载一级分类
			this.initOptions(categorySimulationData)
		}else{//加载二级分类
		    let categoryTwoSimulationDataArr = []
		    categoryTwoSimulationData.forEach((subItem) => {
		    	if(subItem.parentId == parentId){
		    		categoryTwoSimulationDataArr.push(subItem)
		    	}
		    })
			return categoryTwoSimulationDataArr
		}
	}
	
	//商品分类异步加载数据
	loadData = async selectedOptions => {
	    const targetOption = selectedOptions[selectedOptions.length - 1];
	    targetOption.loading = true;
		//根据选中的一级分类加载二级分类
		// const subCategorys = await this.getCategorys(targetOption.value)
		//模拟数据,根据选中的一级分类加载二级分类
		const subCategorys = await this.getCategorys(targetOption.value)
		targetOption.loading = false;
	    if(subCategorys && subCategorys.length > 0){
			const cOptions = subCategorys.map((item)=>({
				value: item._id,
				label: item.name,
				isLeaf: true,
			}))
			//关联到当前的targetOption上
			targetOption.children = cOptions
		}else{
			targetOption.isLeaf = true
		}
		this.setState({
		  options: [...this.state.options],
		});
	}
	
	//表单提交
	submit = () => {
		this.props.form.validateFields((err,val)=>{
			if(!err){
				alert('提交表单成功')
			}
		})
	}
	
	componentDidMount(){
		this.getCategorys('0')
	}
	
	componentWillMount(){
		const updateData = this.props.location.state
		this.isUpdate = !!updateData
		this.updateData = updateData || {}
	}
	
	render(){
		const {isUpdate,updateData} = this
		const categoryIds = []
		if(updateData.pCategoryId == '0'){
			categoryIds.push(updateData.categoryId)
		}else{
			categoryIds.push(updateData.pCategoryId)
			categoryIds.push(updateData.categoryId)
		}
		const {getFieldDecorator } = this.props.form
		const title = (
		  <span>
		    <LinkButton onClick={()=>this.props.history.goBack()}>
				<Icon type="arrow-left" className='detail-card-icon'/>
				</LinkButton>	    
		    <span>{isUpdate ? '修改商品':'添加商品'}</span>
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
					initialValue:updateData.name,
					rules:[
						{required:true,message:'商品名称必填'}
					]
				})(<Input placeholder='请输入商品名称' />)}
			  </Item>
			  <Item label='商品描述'>
			    {getFieldDecorator('desc',{
			    	initialValue:updateData.desc,
			    	rules:[
			    		{required:true,message:'商品描述必填'}
			    	]
			    })(<TextArea placeholder="请输入商品描述" autoSize />)}
			  </Item>
			  <Item label='商品价格'>
			    {getFieldDecorator('price',{
			    	initialValue:updateData.price,
			    	rules:[
			    		{required:true,message:'商品价格必填'},
						{validator:this.validatorPrice}
			    	]
			    })(<Input type='number' placeholder='请输入商品价格' addonAfter='元' />)}
			  </Item>
			  <Item label='商品分类'>
			    {getFieldDecorator('categoryIds',{
			    	initialValue:categoryIds,
			    	rules:[
			    		{required:true,message:'商品分类必选'},
			    	]
			    })(
				  <Cascader
				    placeholder='请指定商品分类'
				  	options={this.state.options}
				  	loadData={this.loadData}
				  />
				)}
			    
			  </Item>
			  <Item label='商品图片'>
			    <PicturesWall />
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