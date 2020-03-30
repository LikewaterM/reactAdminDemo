import React,{Component} from 'react'
import {Card,Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

/*柱状图表路由*/
export default class Bar extends Component{
	state = {
		sales:[5, 20, 36, 10, 10, 20],//销量
		store:[15, 10, 26, 20, 17, 20],//库存
	}
	
	//返回柱状图的配置对象
	getOtion = (sales,store) => {
		return {
		  title: {
			  text: 'ECharts 入门示例'
		  },
		  tooltip: {},
		  legend: {
			  data:['销量','库存']
		  },
		  xAxis: {
			  data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
		  },
		  yAxis: {},
		  series: [{
			  name: '销量',
			  type: 'bar',
			  data: sales
		  },{
			  name: '库存',
			  type: 'bar',
			  data: store
		  }]
		}
	}
	
	upDate = () => {
		this.setState((state)=>({
			sales:state.sales.map(sale=>sale+1),
			store:state.store.reduce((pre,item)=>{
				pre.push(item-1)
				return pre
			},[])
		}))
	}
	
	render(){
		const {sales,store} = this.state
		return(
		  <div>
		    <Card>
		      <Button type='primary' onClick={this.upDate}>更新</Button>
		    </Card>
		    <Card title='柱状图'>
		      <ReactEcharts
				option={this.getOtion(sales,store)}
				className='react_for_echarts' 
			  />
		    </Card>
		  </div>
		)
	}
}