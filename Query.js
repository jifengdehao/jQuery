 /*模仿jQuery框架, 自己做一个简单的 Query 框架*/
 (function(window) {
 	//构造函数
 	function Query(selector,dom) {
 		return new Query.fn.init(selector,dom);
 	}
 	//绑定原型链
 	Query.prototype = Query.fn = {
 		//选择器
 		init: function(selector, dom) {
 			//保存每个实例获取的DOM 元素
 			this.elements = [];
 			//如果选择器是一个 HTMLCollection 对象,直接赋值给this.elements
 			if (typeof selector == 'object') {
 				this.elements.push(selector);
 			} else {
 				//如果是HTML标签字符串,创建元素
 				if (/<\w+>/g.test(selector)) {
 					//创建元素，把selector转为HTML，赋值给this.elements;
 					var ele = document.createElement('div');
 					ele.innerHTML = selector;
 					this.elements = ele.children;
 				} else {
 					if (dom) {
 						var domArry = [];
 						each(dom);
 						//遍历所有元素
 						function each(dom){
 							dom.forEach(function(val, idx){
 								//如果是数组继续遍历
 								if(Object.prototype.toString.call(val) === '[object NodeList]'){
 									console.log("干啥")
 									each(val);
 								}else{
 									var Ele = val.querySelectorAll(selector);
 									domArry.push(Ele);
 								}
 							})
 						}
 						this.elements = domArry;
 					} else {
 						this.elements = document.querySelectorAll(selector);
 					}

 				}
 			}
 		},
 		//返回值
 		// Returns: function(ele){
 		// 	var eles = ele;
 		// 	var r = {'elements':eles,'length':ele.length,splice: function(){},'__proto__': Query.fn};
 		// 	return r
 		// }
 	}
 	Query.fn.init.prototype = Query.fn;
 	/*扩展方法 Query.extend工具扩展, Query.fn.extend 原型扩展*/
 	Query.extend = Query.fn.extend = function(options) {
 			var target = this;
 			var copy;
 			for (name in options) {
 				copy = options[name];
 				target[name] = copy;
 			}
 			return target;
 		}
 	/*事件模块*/
 	Query.fn.extend({
 			on: function(type, callback) {
 				var dom = this.elements,
 					type = type.trim();
 				for (var i = 0; i < dom.length; i++) {
 					dom[i].addEventListener(type, callback);
 				}
 				return this;
 			},
 			un: function(type, callback) {
 				var dom = this.elements,
 					type = type.trim();
 				for (var i = 0; i < dom.length; i++) {
 					dom[i].removeEventListener(type, callback);
 				}
 				return this;
 			},
 			click: function(callback) {
 				this.on('click', callback);
 				return this;
 			}
 		})
 	/*css样式模块*/
 	Query.fn.extend({
 			css: function(sty, value) {
 				var dom = this.elements;
 				//如果参数大于1，表示要修改css
 				if (arguments.length > 1) {
 					this.addcss(dom, sty, value);
 				} else {
 					//如果参数是一个对象，是另外一种方式修改css值
 					if (typeof sty === "object") {
 						for (var key in sty) {
 							this.addcss(dom, key, sty[key]);
 						}
 					} else {
 						return getComputedStyle(dom[0], null)[sty];
 					}
 				}
 				return this;
 			},
 			addClass: function(Name) {
 				var dom = this.elements,
 					//把传过来的参数去掉两边空格，再把两个字符之间多余的空格替换成一个空格 "name1   name2"
 					name = Name.trim().replace(/\s+/g, ' ');
 				for (var i = 0; i < dom.length; i++) {
 					dom[i].className = dom[i].className + ' ' + name;
 				}
 				return this;
 			},
 			removeClass: function(Name) {
 				var dom = this.elements,
 					//把传过来的参数去掉两边空格，再把两个字符之间多余的空格替换成一个空格
 					name = Name.trim().replace(/\s+/g, ' ');
 				console.log(name);
 				for (var i = 0; i < dom.length; i++) {
 					console.log(123);
 					dom[i].className = dom[i].className.replace(name, ' ');
 				}
 				return this;
 			},
 			hasClass: function(Name) {
 				var dom = this.elements,
 					//把传过来的参数去掉两边空格，再把两个字符之间多余的空格替换成一个空格
 					name = Name.trim().replace(/\s+/g, ' '),
 					//正则匹配
 					reg = new RegExp(name, "g");
 				for (var i = 0; i < dom.length; i++) {
 					if (!reg.test(dom[i].className)) {
 						return false;
 					}
 				}
 				return true;
 			},
 			hide: function() {
 				var dom = this.elements;
 				for (var i = 0; i < dom.length; i++) {
 					dom[i].style.display = 'none';
 				}
 				return this;
 			},
 			show: function() {
 				var dom = this.elements;
 				for (var i = 0; i < dom.length; i++) {
 					dom[i].style.display = '';
 				}
 			},
 			toggleClass: function(name) {
 				var dom = this.elements;
 				for (var i = 0; i < dom.length; i++) {
 					dom[i].classList.toggle(name);
 				}
 				return this;
 			}
 		})
 	/*dom 增删改查模块*/
 	Query.fn.extend({
 			html: function(element) {
 				var dom = this.elements;
 				if (element) {
 					for (var i = 0; i < dom.length; i++) {
 						dom[i].innerHTML = element;
 					}
 					return this.elements;
 				} else {
 					return dom[0].innerHTML;
 				}
 			},
 			text: function(element) {
 				var dom = this.elements;
 				if (element) {
 					for (var i = 0; i < dom.length; i++) {
 						dom[i].innerHTML = element;
 					}
 					return this.elements;
 				} else {
 					return dom[0].textContent;
 				}
 			},
 			val: function(v) {
 				var dom = this.elements;
 				if (v) {
 					for (var i = 0; i < dom.length; i++) {
 						dom[i].value = v;
 					}
 					return this.elements;
 				} else {
 					return dom[0].value;
 				}
 			},
 			attr: function(key, value) {
 				var dom = this.elements;
 				if (arguments.length > 1) {
 					for (var i = 0; i < dom.length; i++) {
 						dom[i].setAttribute(key, value);
 					}
 					return this.elements;
 				} else {
 					return dom[0].getAttribute(key);
 				}
 			},
 			append: function(element) {
 				var dom = this.elements;
 				//判断element是否是一个对象
 				if (typeof element === "object") {
 					//判断是Query 实例，还是htmlcollection对象
 					var Ele = this.isQuery(element);
 					console.log(Ele);
 					dom.forEach(function(val, idx) {
 						//克隆节点
 						for(var i=0; i<Ele.length; i++){
 							 f = Ele[i].cloneNode(true);
 							 val.appendChild(f);
 						}
 					})
 				} else {
 					dom.forEach(function(val, idx) {
 						//先创建对象，用innerHTML把字符串添加该对象,children获取到的是元素节点
 						var div = document.createElement('div');
 						div.innerHTML = element;
 						var ele = div.children;
 						while(ele.length >= 1){
 							val.appendChild(ele[0]);
 						}
 					})
 				}

 				return this.elements;
 			},
 			before: function(ele) {
 				var dom = this.elements;
 				if (typeof ele === "object") {
 					//判断是Query 实例，还是htmlcollection对象
 					var Ele = this.isQuery(ele);
 					dom.forEach(function(val, idx) {
 						//克隆节点
 						for(var i=0; i<Ele.length; i++){
 							f = Ele[i].cloneNode(true);
 							document.body.insertBefore(f, val);
 						}
 						
 					})
 				} else {
 					dom.forEach(function(val, idx) {
 						val.insertAdjacentHTML('beforebegin', ele);
 					})
 				}
 				return this.elements;
 			},
 			after: function(ele) {
 				var dom = this.elements;
 				console.log(typeof ele);
 				if (typeof ele === "object") {
 					//判断是Query 实例，还是htmlcollection对象
 					var Ele = this.isQuery(ele);
 					dom.forEach(function(val, idx) {
 						//克隆节点
 						for(var i=0; i<Ele.length; i++){
 							f = Ele[i].cloneNode(true);
 							document.body.insertBefore(f, val.nextSibling);
 						}
 						// var f = Ele.cloneNode(true);
 						// document.body.insertBefore(f, val.nextSibling);
 					})
 				} else {
 					dom.forEach(function(val, idx) {
 						val.insertAdjacentHTML('afterend', ele);
 					})
 				}
 				return this.elements;
 			},
 			prepend: function(ele) {
 				var dom = this.elements;
 				//判断element是否是一个对象
 				if (typeof ele === "object") {
 					//判断是Query 实例，还是htmlcollection对象
 					var Ele = this.isQuery(ele);
 					dom.forEach(function(val, idx) {
 						//克隆节点
 						for(var i=0; i<Ele.length; i++){
 							f = Ele[i].cloneNode(true);
 							val.insertBefore(f, val.firstChild);
 						}
 						// var f = Ele.cloneNode(true);
 						// val.insertBefore(f, val.firstChild);
 					})
 				} else {
 					dom.forEach(function(val, idx) {
 						val.insertAdjacentHTML('afterbegin', ele);
 					})
 				}

 				return this.elements;
 			}
 		})
 	/*查找工具模块*/
 	Query.fn.extend({
 			isQuery: function(element) {
 				//判断是Query 实例，还是htmlcollection
 				if (element instanceof Query) {
 					return element.elements;
 				} else {
 					return element;
 				}
 			},
 			find: function(str) {
 				var dom = this.elements;
 				// return new Query.fn.init(str,dom);
 				return this;
 			},
 			addcss: function(dom, sty, value) {
 				for (var i = 0; i < dom.length; i++) {
 					var r = Object.prototype.toString.call(dom[i]);
 					if (r == '[object NodeList]') {
 						this.addcss(dom[i], sty, value);
 					} else {
 						dom[i].style[sty] = value;
 					}
 				}
 			},
 			next: function() {
 				var dom = this.elements,
 					Earray = [];
 				feach(dom);
 				this.elements = Earray;
 				function feach(dom) {
 					for (var i = 0; i < dom.length; i++) {
 						var r = Object.prototype.toString.call(dom[i]);
 						if (r == '[object NodeList]') {
 							feach(dom[i]);
 						} else {
 							Earray.push(dom[i].nextElementSibling);
 						}
 					}
 				}
 				var q = new Query.fn.init();
 				q.elements = this.elements;
 				return q;
 			},
 			prev: function() {
 				var dom = this.elements,
 					Earray = [];
 				feach(dom);
 				this.elements = Earray;

 				function feach(dom) {
 					for (var i = 0; i < dom.length; i++) {
 						var r = Object.prototype.toString.call(dom[i]);
 						if (r == '[object NodeList]') {
 							feach(dom[i]);
 						} else {
 							Earray.push(dom[i].previousElementSibling);
 						}
 					}
 				}
 				var q = new Query.fn.init();
 				q.elements = this.elements;
 				return q;
 			},
 			eq: function(idx) {
 					var dom = this.elements,
 						eqE = [];
 					feach(dom, idx);

 					function feach(dom, idx) {
 						for (var i = 0; i < dom.length; i++) {
 							var r = Object.prototype.toString.call(dom[i]);
 							if (r == '[object NodeList]') {
 								feach(dom[i], idx);
 							} else {
 								eqE.push(dom[idx]);
 							}
 						}
 					}
 					this.elements = eqE;
 					var q = new Query.fn.init();
 					q.elements = this.elements;
 					return q;
 				}
 				// children: function()
 		})
 	/*动画框架*/
 	Query.fn.extend({
 			animation: function(params, speed, timing, callback) {
 				var me = this,
 					type;
 				// transitionend  事件兼容
 				if (typeof window.ontransitionend) {
 					type = 'transitionend';
 				} else if (typeof window.onwebkitTransitionEnd) {
 					type = 'webkitTransitionEnd';
 				} else if (typeof window.onmozTransitionEnd) {
 					type = 'mozTransitionEnd';
 				} else {
 					alert(new Error("浏览器不支持"));
 				}
 				//把回调函数替换掉，在原来的基础上添加一个解绑事件，因为TransitionEnd事件会触发多次
 				var call = function() {
 						//原有回调函数
 						callback();
 						//解绑事件
 						me.un(type, call);
 					}
 					//绑定回调函数
 				this.on(type, call);
 				//添加样式
 				var param = {};
 				var style = this.prefixFree('transition');
 				param[style] = 'all' + ' ' + speed + ' ' + timing;
 				for (var key in params) {
 					param[key] = params[key];
 				}
 				this.css(param);
 			},
 			//浏览器前缀兼容
 			prefixFree: function(style) {
 				//获取兼容浏览器的所有样式
 				var preStyle = addPre(style);
 				//获取最终支持结果
 				var styles = ST(preStyle);

 				return styles;

 				// 1.兼容所有前缀
 				function addPre(style) {
 					//浏览器前缀
 					var prefix = ['Moz', 'webkit', 'ms', 'O'],
 						//['Moz-Transform','webkit-Transform','ms-Transform','O-Transform'] 绑到样式上
 						preStyle = prefix.map(function(val, idx) {
 							return val + '-' + style;
 						});
 					preStyle.unshift(style);
 					//把 '-'' 后面的第一个字母大写 webkit-Transform
 					for (var i = 0; i < preStyle.length; i++) {
 						//用正则替换
 						preStyle[i] = preStyle[i].replace(/-(\w)/g, function($0, $1) {
 							return $1.toUpperCase();
 						})
 					}
 					return preStyle;
 				}
 				//2.返回浏览器支持值
 				function ST(pre) {
 					//获取浏览器的style样式
 					var htmlStyle = document.documentElement.style;
 					var styles = "";
 					// 遍历 preStyle 是否存在 htmlStyle
 					for (var i = 0; i < pre.length; i++) {
 						if (pre[i] in htmlStyle) {
 							styles = pre[i];
 							break;
 						}
 					}
 					return styles;
 				}
 			}
 		})
 	/*ajax框架*/
 	Query.extend({
 		ajax: function(data) {
 			var xhr;
 			// 兼容IE浏览器
 			if (window.XMLHttpRequest) {
 				xhr = new XMLHttpRequest();
 			} else {
 				xhr = new ActiveXObject('Microsoft.XMLHTTP');
 			}
 			data.async = data.async || true;
 			//把提交格式转化为小写字符
 			var type = data.type.toLocaleLowerCase();

 			//定义接受提交参数数组
 			var params = [];

 			//获取data.param的所有key值
 			var key = Object.keys(data.param);
 			for (var i = 0; i < key.length; i++) {
 				//把每一个参数添加到数组中
 				params.push(key[i] + '=' + data.param[key[i]]);
 			}
 			//把数组拼接成表单提交格式字符串
 			params = params.join('&');

 			//判断是否是jsonp
 			if (data.datatype == 'jsonp') {
 				var jsonp = data.jsonp || 'callback',
 					jsonpCallback = data.jsonpCallback || 'myjsonp' + new Date().getTime(),
 					src = data.url + "?" + params + "&" + jsonp + "=" + jsonpCallback,
 					// src = params ? (data.url+"&"+params) : data.url,
 					script = document.createElement('script');
 				window[jsonpCallback] = function(res) {
 					data.success(res)
 				}
 				script.src = src;
 				document.body.appendChild(script);
 			} else {

 				//判断请求方法
 				if (type == 'get') {
 					var url = data.url + "?" + params;

 					xhr.open(type, url, data.async);
 					xhr.send();
 				} else {
 					xhr.open(type, data.url, data.async);
 					xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 					xhr.send(params);
 				}

 				//链接服务器成功执行函数

 				xhr.onreadystatechange = function(){
 					if(this.readyState == 4){
 						if(this.status == 200){
 							if( data.datatype == 'html' || data.datatype == 'text'){
 								var res = this.responseText;
 							}else if(data.datatype == 'xml'){
 								var res = this.responseXML;
 							}else if(data.datatype == 'json'){
 								var res = this.responseText;
 								res = JSON.parse(res);
 							}
 							data.success(res);
 						}else{
 							data.error();
 						}
 					}
 				}
 			}
 		}	
 	})
 	//暴露 $ 全局对象
 	window.Query = window.$ = Query;
 })(window)