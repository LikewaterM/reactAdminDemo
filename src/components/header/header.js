import React,{Component} from 'react'
import { Modal, Button } from 'antd'
import {withRouter} from 'react-router-dom'
import'./header.less'
import weather from '../../assets/images/weather.png'
import {formateDate} from '../../utils/dateUtils.js'
import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils.js'
import menuList from '../../config/menuConfig.js'
import LinkButton from '../link-button/linkButton.js'

class Header extends Component{
	constructor(props) {
	    super(props)
		this.state = {
			currentTime:formateDate(Date.now())
		}
	}
	
	//获取当前时间
	getTime = () => {
		this.timeIntervalId = setInterval(()=>{
			const currentTime = formateDate(Date.now())
			this.setState({currentTime})
		},1000)
	}
	
	//获取当前页面title
	getTitle = () => {
		const path = this.props.location.pathname
		let title
		menuList.forEach((item) => {
			if(!item.children){
				if(item.key === path){
					title = item.title
				}
			}else{
				item.children.forEach((cItem) => {
					if(cItem.key === path || path.indexOf(cItem.key) != -1){
						title = cItem.title
					}
				})
			}
		})
		return title
	}
	
	//退出登录
	loginOut = () => {
		Modal.confirm({
			content: '确定退出登录?',
			okText:'确定',
			cancelText: '取消',
			onOk: () => {
			  //删除保存的user信息
			  storageUtils.removeUser()
			  memoryUtils.user = {}
			  //返回到登录界面
			  this.props.history.replace('/login')
			},
			onCancel() {
			  console.log('Cancel');
			},
		})
	}
	
	componentDidMount(){
		this.getTime()
	}
	
	componentWillUnmount(){
		//清除定时器
		clearInterval(this.timeIntervalId)
	}
	
	render(){
		const {currentTime} = this.state
		const {username} = memoryUtils.user
		const title = this.getTitle()
		return(
		  <div className='header'>
		    <div className='header-top'>
			  <span>欢迎,{username}</span>
			  <LinkButton onClick={this.loginOut}>退出</LinkButton>
			</div>
			<div className='header-bottom'>
			  <div className='header-bottom-left'>
			    <span>{title}</span>
			  </div>
			  <div className='header-bottom-right'>
			    <span>{currentTime}</span>
				<img src={weather} alt='' />
				<span>晴</span>
			  </div>
			</div>
		  </div>
		)
	}
}

export default withRouter(Header)
