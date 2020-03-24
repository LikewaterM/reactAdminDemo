import React,{Component} from 'react'
import {Card,Icon,List} from 'antd'
import LinkButton from '../../../components/link-button/linkButton.js'
import {reqCategory} from '../../../api/api.js'

const Item = List.Item

export default class PrductDetail extends Component{
	constructor(props) {
	    super(props)
		this.state = {
			cName1:'',
			cName2:'',
		}
	}
	
	async componentDidMount(){
		const {pCategoryId,categoryId} = this.props.location.state
		if(pCategoryId == '0'){ //当只有一级分类时,获取一级分类的name
			const result = await reqCategory(categoryId)
			const cName1 = result.data.name
			this.setState({
				cName1
			})
		}else{ //有二级分类时,获取一级和二级分类的name
		  // 通过多个await发送多个请求,只有当第一个请求发送返回成功后,才执行后面的请求
			// const result1 = await reqCategory(pCategoryId)
			// const result2 = await reqCategory(categoryId)
			// const cName1 = result1.data.name
			// const cName2 = result2.data.name
			
			//使用Promise.all可以一次发送多个请求,当所有请求都返回成功才继续执行
			const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
			const cName1 = results[0].data.name
			const cName2 = results[1].data.name
			this.setState({
				cName1,
				cName2
			})
		}
	}
	
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
			  	{/*<span className='detail-card-spanvalue'>{cName1}{cName2?' -->'+cName2:''}</span>*/}
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