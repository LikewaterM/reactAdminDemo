import React,{Component} from 'react'
import {Card,Table,Button,Icon,message,Modal} from 'antd'

import LinkButton from '../../components/link-button/linkButton.js'
import {reqCategorys} from '../../api/api.js'
import {categorySimulationData} from '../../api/simulationDatas/categorySimulationData.js'
import {categoryTwoSimulationData} from '../../api/simulationDatas/categoryTwoSimulationData.js'
import './category.less'
import WrappedNormalAddForm from './components/add-form.js'
import WrappedNormalUpdateForm from './components/update-form.js'


/*商品分类路由*/
export default class Category extends Component{
	constructor(props) {
	    super(props)
		this.state = {
			loading:false,//是否显示加载中
			categorys:[],//一级分类列表
			subCategorys:[],//二级分类列表
			categoryId:'0',//分类列表ID,根据此ID来决定显示一级分类还是二级分类
			categoryName:'',//分类列表Name
			showStatus:0,//表示添加/更新确认框是否显示,0都不显示,1显示添加,2显示更新
		}
	}
	
	//初始化Table的列数据
	initColumns = () => {
		this.columns = [
		  {
		    title: '分类的名称',
		    dataIndex: 'name',
		  },
		  {
		    title: '操作',
			width:300,
		    render: (item) => (
			  <span>
			    <LinkButton onClick={() => this.showUpdate(item)}>修改分类</LinkButton>
				{/*如何向事件回调函数传递参数:先定义一个匿名函数,在函数中调用处理的函数并传入参数*/}
				{this.state.categoryId === '0' ? (<LinkButton onClick={() => this.showSubCategorys(item)}>查看子分类</LinkButton>):null}
			  </span>
			)
		  }
		]
	}
	
	//异步获取一级/二级分类列表
	getCategorys = async() => {
		// this.setState({loading:true})
		// const {categoryId} = this.state
		// const result = await reqCategorys(categoryId)
		// this.setState({loading:false})
		// if(result.status == 0){
		// 	const categorys = result.data
			// if(categoryId == '0'){
			// 	this.setState({
			// 		categorys
			// 	})
			// }else{
			// 	this.setState({
			// 		subCategorys:categorys
			// 	})
			// }
		// }else{
		// 	message.error('获取一级分类列表失败')
		// }
		
		//此数据为自建的一级模拟数据
		this.setState({loading:true})
		setTimeout(() => {
			this.setState({
				categorys:categorySimulationData
			})
			this.setState({loading:false})
		},3000)
	}
	
	//返回一级分类列表
	showCategorys = () => {
		this.setState({
			subCategorys:[],
			categoryId:'0',
			categoryName:''
		})
	}
	
	//显示指定一级分类的二级分类列表
	showSubCategorys = (item) => {
		// this.setState({
		// 	categoryId:item._id,
		// 	categoryName:item.name
		// },() => {
		// 	this.getCategorys()
		// })
		
		//此数据为自建的二级模拟数据
		let categoryTwoSimulationDataArr = []
		categoryTwoSimulationData.forEach((subItem) => {
			if(subItem.parentId == item._id){
				console.log(subItem,'subItem')
				categoryTwoSimulationDataArr.push(subItem)
			}
		})
		this.setState({loading:true})
		setTimeout(() => {
			this.setState({
				categoryId:'1',
				categoryName:item.name,
				subCategorys:categoryTwoSimulationDataArr
			})
			this.setState({loading:false})
		},3000)
	}
	
	//关闭添加/更新确认框
	handleCancel = () => {
		this.setState({
			showStatus:0
		})
	}
	
	//显示添加确认框
	showAdd = () => {
		this.setState({
			showStatus:1
		})
	}
	
	//显示更新确认框
	showUpdate = (item) => {
		this.updateCategoryData = item
		this.setState({
			showStatus:2
		})
	}
	
	//添加分类确定事件
	addCategory = () => {
		
	}
	
	//更新分类确定事件
	updateCategory = () => {
		
	}
	
	//第一次执行的生命周期
	componentWillMount(){
		this.initColumns()
	}
	
	//发送异步请求
	componentDidMount(){
		this.getCategorys()
	}
	
	render(){
		const {categorys,loading,subCategorys,categoryId,categoryName,showStatus} = this.state
		const updateCategoryData = this.updateCategoryData || {}
		const cardTitle = categoryId === '0' ? '一级分类列表':(
		  <span>
		    <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
			<Icon type="arrow-right" />
			<span className='card-extra-span'>{categoryName}</span>
		  </span>
		)
		const cardRightButton = (
		  <Button type="primary" icon="plus" onClick={this.showAdd}>
			添加
		  </Button>
		)
		
		return(
		  <Card title={cardTitle} extra={cardRightButton}>
			<Table 
			   loading={loading}
			   dataSource={categoryId === '0' ? categorys:subCategorys} 
			   columns={this.columns} 
			   bordered
			   rowKey='_id'
			   pagination={{defaultPageSize:5,showQuickJumper:true}}
			/>
			
			<Modal
				title="添加分类"
				visible={showStatus === 1}
				onOk={this.addCategory}
				onCancel={this.handleCancel}
				okText="确认"
				cancelText="取消"
			>
			    <WrappedNormalAddForm />
			</Modal>
							  
			<Modal
				title="更新分类"
				visible={showStatus === 2}
				onOk={this.updateCategory}
				onCancel={this.handleCancel}
				okText="确认"
				cancelText="取消"
			>
				<WrappedNormalUpdateForm updateFormData={updateCategoryData.name}/>
			</Modal>
		  </Card>
		)
	}
}