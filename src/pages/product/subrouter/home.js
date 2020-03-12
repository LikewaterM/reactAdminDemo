import React,{Component} from 'react'
import {Card,Select,Input,Button,Icon,Table} from 'antd'
import {productHomeColumns} from '../columns/productHomeColumns.js'
import {productHomeData} from '../../../api/productDatas/productHomeData.js'
import {reqProducts} from '../../../api/api.js'
import {PAGE_SIZE} from '../../../utils/contents.js'

const Option = Select.Option

export default class ProductHome extends Component{
	constructor(props) {
	    super(props)
		this.state = {
			total:0,//数据的总记录数
			products:[],
			loading:false,
		}
	}
	
	getProducts = async (pageNum) => {
		// this.setState({loading:true})
		// const result = await reqProducts({pageNum,PAGE_SIZE})
		// this.setState({loading:false})
		// if(result.status == 0){
		// 	const {total,list} = result
		// 	this.setState({
		// 		total,
		// 		products:list
		// 	})
		// }
		
		this.setState({loading:true})
		setTimeout(()=>{
			this.setState({
				products:productHomeData
			})
			this.setState({loading:false})
		},3000)
	}
	
	componentWillMount(){
		this.columns = productHomeColumns
	}
	
	componentDidMount(){
		this.getProducts(1)
	}
	
	render(){
		const {products,total,loading} = this.state
		const title = (
		  <span>
		    <Select value='1' style={{width:150}}>
			  <Option value='1'>按名称搜索</Option>
			  <Option value='2'>按描述搜索</Option>
			</Select>
			<Input placeholder="请输入关键字" style={{width:150,margin:'0 10px'}}/>
			<Button type="primary">
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