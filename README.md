## 自己封装了在移动端使用的框架（使用方法跟jQuery一样）
### 使用了html5 css3 等属性封装，所以比较适合在移动使用

### 有以下API

#### 选择器跟扩展方法
```
	$()
	Query.extend 工具扩展
	Query.fn.extend 原型扩展
	
```
#### 事件方法
```
	on()
	un()
	click()
```
#### css方法
```
		css()
	addClass()
	removeClass()
	hasClass()
	hide()
	show()
	toggleClass()
```
#### dom操作方法
```
	html()
	text()
	val()
	attr()
	append()
	before()
	after()
	prepend()
```
#### 查找工具
```
	find()
	next()
	prev()
	eq()
```
#### ajax 模块
```
	$.ajax(obj)

	obj ={
		url: string,
		type: get | post, 
		param: {usrename:123},可选
		datatype: json | xml | text | html |jsonp ,
		async : true | false, (默认为true) 可选
		jsonp: 默认为callback,可选
		jsonpCallback: 默认为你添加一个函数名 myjsonp1492847033628,可选
		success: function(res),
		error: function()
	}

```
#### 动画模块
```
	animation(params, speed, timing, callback)
	
	params 是一个对象 {'top':'240px','left':'600px'}

	speed  时间过程 '3s'

	timing 运动规律 ease-in | ease-out | ease-in-out | ease |　linear

	callback　完成后的回调函数	

```
