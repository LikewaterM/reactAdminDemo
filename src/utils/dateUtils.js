export function formateDate(val){
	if(!val) return '未获取到当前时间';
	let date = new Date(val);
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	let D = date.getDate()>9 ? date.getDate()+' ' : '0'+date.getDate()+' ';
	let h = date.getHours()>9? date.getHours() + ':' : '0'+date.getHours()+":";
	let m = date.getMinutes()>9? date.getMinutes() + ':' : '0' + date.getMinutes()+':';
	let s = date.getSeconds()>9? date.getSeconds() : '0'+date.getSeconds();
	return Y+M+D+h+m+s;
}