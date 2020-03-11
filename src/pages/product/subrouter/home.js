import React,{Component} from 'react'
import {Card,Select,Input,Button,Icon,Table} from 'antd'
import {productHomeColumns} from '../columns/productHomeColumns.js'
import {productHomeData} from '../../../api/productDatas/productHomeData.js'

const Option = Select.Option

export default class ProductHome extends Component{
	constructor(props) {
	    super(props)
		this.state = {
			products:[],
		}
	}
	
	componentWillMount(){
		this.columns = productHomeColumns
		this.setState({
			products:productHomeData
		})
	}
	
	render(){
		const {products} = this.state
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
		    <Table
			  rowKey="_id"
			  bordered
			  dataSource={products} 
			  columns={this.columns} 
		  />
		  </Card>
		)
	}
}