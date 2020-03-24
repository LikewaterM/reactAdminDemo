import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd'

import './leftNav.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig.js'

const { SubMenu } = Menu

class LeftNav extends Component{
	/*
	方法一：
	根据menu的数据数组生成对应的标签数组
	使用map()+递归调用
	*/
	getMenuNodes_map = (menuListData) => {
		return menuListData.map(item => {
			if(!item.children){
				return(
				  <Menu.Item key={item.key}>
					<Link to={item.key}>
					  <Icon type={item.icon} />
					  <span>{item.title}</span>
					</Link>
				  </Menu.Item>
				)
			}else{
				return(
				  <SubMenu
					key={item.key}
					title={
					  <span>
						<Icon type={item.icon} />
						<span>{item.title}</span>
					  </span>
					}
	              >
					{this.getMenuNodes_map(item.children)}
				  </SubMenu>
				)
			}
		})
	}
	
	/*
	方法二：
	根据menu的数据数组生成对应的标签数组
	使用reduce()+递归调用
	*/
	getMenuNodes = (menuListData) => {
		const path = this.props.location.pathname
		return menuListData.reduce((pre,item) => {
			//想pre中添加<Menu.Item>
			if(!item.children){
				pre.push((
				  <Menu.Item key={item.key}>
					<Link to={item.key}>
					  <Icon type={item.icon} />
					  <span>{item.title}</span>
					</Link>
				  </Menu.Item>
				))
			}else{
				const openPath = item.children.filter(cItem => cItem.key == path)
				if(openPath.length != 0){
					this.openPathKey = item.key
				}
				//向pre中添加<SubMenu>
				pre.push((
				  <SubMenu
					key={item.key}
					title={
					  <span>
						<Icon type={item.icon} />
						<span>{item.title}</span>
					  </span>
					}
				  >
				  	{this.getMenuNodes(item.children)}
				  </SubMenu>
				))
			}
			return pre
		},[])
	}
	
	componentWillMount(){
		this.getMenu = this.getMenuNodes(menuList)
	}
	
	render(){
		//得到当前请求的路由路径
		const path = this.props.location.pathname
		const openPath = this.openPathKey
		return(
		  <div className='left-nav'>
		    <Link to='/' className='left-nav-header'>
			   <img src={logo} alt='logo'/>
			   <h1>青羽后台</h1>
			</Link>
			<Menu
			  mode="inline"
			  theme="dark"
			  selectedKeys={[path]}
			  defaultOpenKeys={[openPath]}
			>
			  {/*<Menu.Item key="/home">
				<Link to='/home'>
				  <Icon type="pie-chart" />
				  <span>首页</span>
				</Link>
			  </Menu.Item>
			  
			  <SubMenu
				key="sub1"
				title={
				  <span>
					<Icon type="mail" />
					<span>商品</span>
				  </span>
				}
  >
				<Menu.Item key="/category">
				   <Link to='/category'>
					 <Icon type="mail" />
					 <span>品类管理</span>
				   </Link>
				</Menu.Item>
				<Menu.Item key="/product">
				   <Link to='/product'>
					 <Icon type="mail" />
					 <span>商品管理</span>
				   </Link>
				</Menu.Item>
			  </SubMenu>*/}
			  
			  {
			   this.getMenu
			  }
			  
			</Menu>
		  </div>
		)
	}
}

/*
withRouter是高阶组件：
用来包装非路由组件，返回一个新的组件
新的组件向非路由组件传递三个属性：history / location / match
*/
export default withRouter(LeftNav)