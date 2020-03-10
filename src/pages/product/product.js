import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import ProductHome from './subrouter/home.js'
import ProductAddUpdate from './subrouter/add-update.js'
import ProductDetail from './subrouter/detail.js'

/*商品路由*/
export default class Product extends Component{
	render(){
		return(
		  <Switch>
		    <Route path='/product' component={ProductHome} exact/>
			<Route path='/product/addUpdate' component={ProductAddUpdate} />
			<Route path='/product/detail' component={ProductDetail} />
			<Redirect path='/product' />
		  </Switch>
		)
	}
}