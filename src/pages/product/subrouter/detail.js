import React,{Component} from 'react'
import {Card,Icon,List} from 'antd'
import LinkButton from '../../../components/link-button/linkButton.js'

const Item = List.Item

export default class PrductDetail extends Component{
	render(){
		const homeGoDetailData = this.props.location.state
		const title = (
		  <span>
		    <LinkButton onClick={()=>this.props.history.goBack()}>
			  <Icon type="arrow-left" className='detail-card-icon'/>
			</LinkButton>	    
		    <span>商品详情</span>
		  </span>
		)
		return(
		  <Card title={title} className='detail-card'>
		    <List>
			  <Item className='detail-card-item'>
			    <span className='detail-card-spankey'>商品名称:</span>
				<span className='detail-card-spanvalue'>{homeGoDetailData.name}</span>
			  </Item>
			  <Item className='detail-card-item'>
			    <span className='detail-card-spankey'>商品描述:</span>
			  	<span className='detail-card-spanvalue'>{homeGoDetailData.desc}</span>
			  </Item>
			  <Item className='detail-card-item'>
			    <span className='detail-card-spankey'>商品价格:</span>
			  	<span className='detail-card-spanvalue'>{homeGoDetailData.price}元</span>
			  </Item>
			  <Item className='detail-card-item'>
			    <span className='detail-card-spankey'>所属分类:</span>
			  	<span className='detail-card-spanvalue'>电脑-->笔记本</span>
			  </Item>
			  <Item className='detail-card-item'>
			    <span className='detail-card-spankey'>商品图片:</span>
			    {
					homeGoDetailData.imgs.map((item)=>(
					  <img src={item} key={item} alt='' className='detail-card-img' />
					))
				}
			  </Item>
			  <Item className='detail-card-item'>
			    <span className='detail-card-spankey'>商品详情:</span>
				{/*dangerouslySetInnerHTML 是 React 为浏览器 DOM 提供 innerHTML 的替换方案。但当你想设置 dangerouslySetInnerHTML 时，需要向其传递包含 key 为 __html 的对象*/}
			    <span dangerouslySetInnerHTML={{__html:homeGoDetailData.detail}}></span>
			  </Item>
			</List>
		  </Card>
		)
	}
}