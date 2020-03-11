import React from 'react'
import {Button} from 'antd'
import LinkButton from '../../../components/link-button/linkButton.js'
export const productHomeColumns = [
	{
		title: '商品名称',
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
		render:(status)=>{
			return (
			  <span>
			    <Button type="primary">
			    	下架
			    </Button>
				<span>在售</span>
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
				<LinkButton>详情</LinkButton>
				<LinkButton>修改</LinkButton>
			  </span>
			)
		}
	  },
]