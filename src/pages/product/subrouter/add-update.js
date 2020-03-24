import React,{Component} from 'react'
import {Card,Form,Input,Upload,Cascader,Button,Icon,message} from 'antd'
import LinkButton from '../../../components/link-button/linkButton.js'
import {reqCategorys,reqAddOrUpdateProduct} from '../../../api/api.js'
import {categorySimulationData} from '../../../api/simulationDatas/categorySimulationData.js'
import {categoryTwoSimulationData} from '../../../api/simulationDatas/categoryTwoSimulationData.js'
import PicturesWall from './pictures-will.js'
import RichTextEditor from './richTextEditor.js'

const Item = Form.Item
const {TextArea} = Input

class ProductAddUpdate extends Component{
	constructor(props){
		super(props)
		this.state = {
			options:[],
		}
		
		//创建用来保存ref标识的标签对象的容器
		this.myRef = React.createRef()//图片上传
		this.editor = React.createRef()//富文本编辑器
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
		this.props.form.validateFields(async (err,val)=>{
			if(!err){
				//收集数据
				const {name,desc,price,categoryIds} = val
				let pCategoryId,categoryId
				if(categoryIds.length == 1){
					pCategoryId = '0'
					categoryId = categoryIds[0]
				}else{
					pCategoryId = categoryIds[0]
					categoryId = categoryIds[1]
				}
				//提交时,获取子组件的图片name
				const imgs = this.myRef.current.getImgs
				//提交时,获取子组件的富文本内容
				const editors = this.editor.current.getDetail
				const product = {name,desc,price,pCategoryId,categoryId,imgs,editors}
				if(this.isUpdate){
					product._id = this.updateData._id
				}
				//调用接口请求函数添加或修改
				const result = await reqAddOrUpdateProduct(product)
				//根据结果提示
				if(result.status == 0){
					message.success(`${this.isUpdate?'修改':'添加'}商品成功`)
					this.props.history.goBack()
				}else{
					message.error(`${this.isUpdate?'修改':'添加'}商品失败`)
				}
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
		const tailFormItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 19 },
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
			  <Item label='商品图片' {...tailFormItemLayout}>
			    <PicturesWall ref={this.myRef} imgs={updateData.imgs}/>
			  </Item>
			  <Item label='商品详情' {...tailFormItemLayout} className='add-update-details'>
			    <RichTextEditor ref={this.editor} detail={updateData.detail} />
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

/*
父组件读取子组件的数据方法:
1.子组件调用父组件的方法:将父组件的方法以函数属性的形式传递给子组件,子组件就可以调用
2.父组件调用子组件的方法:在父组件中通过ref得到子组件标签对象,调用其方法
*/