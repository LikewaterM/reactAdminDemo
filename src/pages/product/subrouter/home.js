import React,{Component} from 'react'
import {Card,Select,Input,Button,Icon,Table} from 'antd'
import {productHomeData} from '../../../api/productDatas/productHomeData.js'
import {reqProducts,reqSearchProducts} from '../../../api/api.js'
import {PAGE_SIZE} from '../../../utils/contents.js'
import {productHomeColumns} from '../columns/productHomeColumns.js'

const Option = Select.Option

export default class ProductHome extends Component{
	constructor(props) {
	    super(props)
		this.state = {
			total:0,//数据的总记录数
			products:[],
			loading:false,
			searchType:'productName',
			searchName:'',
		}
	}
	
	// getProductHomeColumns = () => {
	// 	this.columns = 
	// }
	
	getProducts = async (pageNum) => {
		// this.setState({loading:true})
		// const {searchName,searchType} = this.state
		// let result
		// if(searchName){
		// 	result = await reqSearchProducts({pageNum,PAGE_SIZE,searchName,searchType})
		// }else{
		// 	result = await reqProducts({pageNum,PAGE_SIZE})
		// }
		// this.setState({loading:false})
		// if(result.status == 0){
		// 	const {total,list} = result
		// 	this.setState({
		// 		total,
		// 		products:list
		// 	})
		// }
				
		const {searchName,searchType} = this.state
		let searchProductHomeData = []
		this.setState({loading:true})
		if(searchName){
			if(searchType == 'productName'){
				productHomeData.forEach((item,index)=>{
					item.name.indexOf(searchName) != (-1) ? searchProductHomeData.push(item):void(0)
					// if(item.name.indexOf(searchName) != -1){
					// 	searchProductHomeData.push(item)
					// }
				})
			}else{
				productHomeData.forEach((item,index)=>{
					item.desc.indexOf(searchName) != -1 ? searchProductHomeData.push(item):void(0)
					// if(item.desc.indexOf(searchName) != -1){
					// 	searchProductHomeData.push(item)
					// }
				})
			}
		}
		setTimeout(()=>{
			this.setState({
				products:searchProductHomeData.length>0?searchProductHomeData:productHomeData
			})
			this.setState({loading:false})
		},3000)
	}
	
	componentWillMount(){
		this.columns = productHomeColumns(this.props)
	}
	
	componentDidMount(){
		this.getProducts(1)
	}
	
	render(){
		const {products,total,loading,searchName,searchType} = this.state
		const title = (
		  <span>
		    <Select 
			  value={searchType} 
			  style={{width:150}} 
			  onChange={value=>this.setState({searchType:value})}
			>
			  <Option value='productName'>按名称搜索</Option>
			  <Option value='productDesc'>按描述搜索</Option>
			</Select>
			<Input 
			  placeholder="请输入关键字" 
			  style={{width:150,margin:'0 10px'}}
			  value={searchName}
			  onChange={e=>this.setState({searchName:e.target.value})}
			/>
			<Button type="primary" onClick={()=>this.getProducts(1)}>
				搜索
			</Button>
		  </span>
		)
		const extra = (
		  <Button type="primary" icon="plus">
			添加商品
		  </Button>
		)
		return(
		  <Card title={title} extra={extra}>
		    {/*<Table
			  rowKey="_id"
			  bordered
			  loading={loading}
			  dataSource={products} 
			  columns={this.columns} 
			  pagination={{
				  defaultPageSize:PAGE_SIZE,
				  showQuickJumper:true,
				  total:total,
				  onChange:this.getProducts
			  }}
		    />*/}
			<Table
			  rowKey="_id"
			  bordered
			  loading={loading}
			  dataSource={products} 
			  columns={this.columns} 
			  pagination={{
				  defaultPageSize:PAGE_SIZE,
				  showQuickJumper:true,
			  }}
			/>
		  </Card>
		)
	}
}