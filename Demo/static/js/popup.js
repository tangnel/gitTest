/**
***author:lila
***date:2015-06-12
***target:the ID of some element who trigger off 
***widthBox:the width of popup's context
**/
var Popup =  function(o){
	this.setting   = typeof o === 'object' ? o : {};
	this.target    = this.setting.target || 'popup'; 
	this.eventType = this.setting.eventType || 'click';
	this.title     = this.setting.title || '';
	this.content   = this.setting.content || '';
	this.closeBtn  = this.setting.closeBtn || true;
	this.sureBtn   = this.setting.sureBtn || false;
	this.cancleBtn = this.setting.cancleBtn || true;
	this.widthBox  = this.setting.widthBox || '500';
	this.heightBox = this.setting.heightBox || '200';
	
	this.init();
	this.handleEvent();	
};
	 
Popup.prototype = {
	init:function(){
		this.bodyBox = document.getElementsByTagName("body")[0];
		this.mask = document.createElement('div');
		this.maskbg = document.createElement('div');
		this.maskCon = document.createElement('div');
		this.maskcontext = document.createElement('div');
		this.maskconHead = document.createElement('div');
		this.maskconBtn = document.createElement('div');
		this.mask.className = "maskDiv";
		this.maskbg.className = "maskBg";
		this.maskCon.className = "maskCon";
		this.maskconHead.className = "maskconHead";
		this.maskconBtn.className = "maskconBtn";
		this.maskCon.style.width = this.widthBox + "px";
		this.maskCon.style.height = this.heightBox + "px";
		this.maskCon.style.marginLeft = -(this.widthBox/2) + "px";
		//this.maskCon.style.marginTop = -(this.heightBox/2) + "px";  //ie6不兼容，若忽略ie6，可打开本注释
		this.maskconHead.style.height =  (this.heightBox/5) +"px";
		this.maskcontext.className = "maskcontext";
		this.maskcontext.style.width = (this.widthBox-40) +"px";
		this.maskcontext.style.height = (this.heightBox/2) +"px";
		this.maskcontext.innerHTML = this.content;
		this.maskconBtn.style.height = (this.heightBox/10) +"px";
		
		if(this.title!=null||this.title.length!=0){
			this.contitle = document.createElement('div');
			this.contitle.className = "contitle";
			this.contitle.innerHTML = this.title;
			this.maskconHead.appendChild(this.contitle);
		}
		if(this.closeBtn){
		    this.clBtn = document.createElement('div');
			this.clBtn.className = "close";	
			this.clBtn.id = "close";
			this.clBtn.innerHTML = "&times;";
			this.maskconHead.appendChild(this.clBtn);
		}
		this.maskCon.appendChild(this.maskconHead);
		this.maskCon.appendChild(this.maskcontext);
		if(this.sureBtn){
			this.seBtn = document.createElement('div');
			this.seBtn.className = "sure";
			this.seBtn.id = "sure";
			this.seBtn.style.height = (this.heightBox/10) +"px";
			this.seBtn.style.marginLeft = (this.widthBox/2 - 150) + "px";
			this.seBtn.innerHTML = "确定";
			this.maskconBtn.appendChild(this.seBtn);
		}
		if(this.cancleBtn){
			this.cnBtn = document.createElement('div');
			this.cnBtn.className = "cancle";
			this.cnBtn.id = "cancle";
			this.cnBtn.style.height = (this.heightBox/10) +"px";
			if(this.sureBtn){
				this.cnBtn.style.marginLeft = (this.widthBox/2 - 160) + "px";
			}else{
				this.cnBtn.style.marginLeft = (this.widthBox - 100)/2 + "px";
			}
			this.cnBtn.innerHTML = "取消";
			this.maskconBtn.appendChild(this.cnBtn);
		}
		this.maskCon.appendChild(this.maskconBtn);
		this.mask.appendChild(this.maskbg);
		this.mask.appendChild(this.maskCon);
		this.bodyBox.appendChild(this.mask);
	},
	popShow: function(){
		this.mask.style.display ="block";
	},
	handleEvent: function() {
		var that = this;
		var el = document.getElementById(this.target);
		this.addEvent(el, this.eventType, function() {
			that.popShow();
		});
		if(this.closeBtn){
			var elc = document.getElementById("close");
			this.addEvent(elc, this.eventType, function() {
			    that.closeMe();
		    });
		}
		if(this.sureBtn){
			var els = document.getElementById("sure");
			this.addEvent(els, this.eventType, function() {
			    that.closeMe();
				that.goUrl();
		    });
		}
		if(this.cancleBtn){
			var ele = document.getElementById("cancle");
			this.addEvent(ele, this.eventType, function() {
			    that.closeMe();
		    });
		}
				
	},
	addEvent: function(el, type, fn) {
		if(window.addEventListener) {
			el.addEventListener(type, fn, false);
		}
		else if(window.attachEvent) {
			el.attachEvent('on' + type, fn);
		};
	},
	closeMe:function(){
	    this.mask.style.display ="none";
	},
	goUrl: function(){
		window.location.href = "www.baidu.com";
	}
};

 
var pp = new Popup({targetElement:'popup',title:'我是一个测试的弹出框',content:'我是测试弹出框的内容',sureBtn:true});	
        
