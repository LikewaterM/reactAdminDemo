import React,{Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav/leftNav.js'
import Header from '../../components/header/header.js'

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout

/*后台管理主界面路由组件*/
export default class Admin extends Component{
	
	render(){
		const user = memoryUtils.user
		//如果内存中没有存储用户 == 当前没有登录
		if(!user){
			//自动跳转到登录界面
			return <Redirect to = '/login' />
		}
		return(
		   <Layout style={{height:'100%'}}>
			 <Sider>
			   <LeftNav/>
			 </Sider>
			 <Layout style={{backgroundColor:'#F0F2F5'}}>
			   <Header></Header>
			   <Content style={{backgroundColor:'#fff',margin:20,marginBottom:10}}>
			     <Switch>
				   <Route path='/home' component={Home}></Route>
				   <Route path='/category' component={Category}></Route>
				   <Route path='/product' component={Product}></Route>
				   <Route path='/user' component={User}></Route>
				   <Route path='/role' component={Role}></Route>
				   <Route path='/charts/bar' component={Bar}></Route>
				   <Route path='/charts/line' component={Line}></Route>
				   <Route path='/charts/pie' component={Pie}></Route>
				   <Redirect to='/home' />
				 </Switch>
			   </Content>
			   <Footer style={{textAlign:'center',color:'#ccc',backgroundColor:'#fff'}}>推荐使用谷歌浏览器,可以获得更佳页面操作体验</Footer>
			 </Layout>
		   </Layout>
		)
	}
}