import React from 'react'
import {Button} from 'antd'
import LinkButton from '../../../components/link-button/linkButton.js'

export function productHomeColumns(props){
	return(
	  [
	  	{
	  		title: '商品名称',
	  		width:150,
	  		dataIndex: 'name',
	  	  },
	  	  {
	  		title: '商品描述',
	  		dataIndex: 'desc',
	  	  },
	  	  {
	  		title: '价格',
	  		dataIndex: 'price',
	  		render:(price)=>{
	  			return '¥' + price
	  		}
	  	  },
	  	  {
	  		title: '状态',
	  		width:100,
	  		dataIndex: 'status',
	  		render:(item)=>{
				const {status,_id} = item
				const newStatus = status == 1 ? 2:1
	  			return (
	  			  <span>
	  			    <Button type="primary" onClick={()=>this.updateStatus(_id,newStatus)}>
	  			    	{status == 1 ? '下架':'上架'}
	  			    </Button>
	  				<span>{status == 1 ? '在售':'已下架'}</span>
	  			  </span>
	  			)
	  		}
	  	  },
	  	  {
	  		title: '操作',
	  		width:100,
	  		render:(item)=>{
	  			return (
	  			  <span>
	  				<LinkButton onClick={()=>props.history.push('/product/detail',item)}>详情</LinkButton>
	  				<LinkButton>修改</LinkButton>
	  			  </span>
	  			)
	  		}
	  	  },
	  ]
	)
}