import React,{Component} from 'react'
import'./header.less'
import weather from '../../assets/images/weather.png'

export default class Header extends Component{
	render(){
		return(
		  <div className='header'>
		    <div className='header-top'>
			  <span>欢迎,admin</span>
			  <a href='javascript:void(0)'>退出</a>
			</div>
			<div className='header-bottom'>
			  <div className='header-bottom-left'>
			    <span>首页</span>
			  </div>
			  <div className='header-bottom-right'>
			    <span>2020-03-02 21:04:39</span>
				<img src={weather} alt='' />
				<span>晴</span>
			  </div>
			</div>
		  </div>
		)
	}
}