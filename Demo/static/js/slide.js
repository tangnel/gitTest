// JavaScript Document
/*
**author:杨丽娟
**date:2015-06-05
**轮播插件，根据轮播盒子id,创建轮播缩略点，可根据需要扩展
*/
var Slider = (function (){
	
	var Carousel = function(o){
		this.setting      = typeof o === 'object' ? o : {};
		this.target       = this.setting.target || 'carousel';
		this.showMarkers  = this.setting.showMarkers || false;
		this.showControls = this.setting.showControls || false;
		this.timer        = null;
		this.currentTime  = null;
		this.nextTarget   = 0;
		this.autoMs       = 3000;
		
		this.init();
        this.handleEvent();
	};
	
	Carousel.prototype = {
		init: function(){
			this.objBox   = document.getElementById(this.target);
			this.oUl      = this.objBox.getElementsByTagName('ul')[0];
            this.aUlLis   = this.oUl.getElementsByTagName('li');
			this.number   = this.aUlLis.length;
			if(this.showMarkers) {
                var oDiv = document.createElement('div');
                var aLis = [];
                for(var i = 0; i < this.number; i++) {
                    aLis.push('<li>'+ (i+1) +'<\/li>');
                };
                oDiv.innerHTML = '<ol>'+ aLis.join('') +'<\/ol>';
                this.objBox.appendChild(oDiv.firstChild);
                this.aLis = this.objBox.getElementsByTagName('ol')[0].getElementsByTagName('li');
                this.aLis[0].className = 'on';
                oDiv = null;
            };
            
            if(this.showControls) {
                this.oPrev = document.createElement('p');
                this.oNext = document.createElement('p');
                this.oPrev.className = 'prev';
                this.oPrev.innerHTML = '&laquo;';
                this.oNext.className = 'next';
                this.oNext.innerHTML = '&raquo;';
                this.objBox.appendChild(this.oPrev);
                this.objBox.appendChild(this.oNext);
                
            };			
		
		},
		handleEvent: function() {
            var that = this;
			
            this.currentTime = setInterval(function() {
                that.autoPlay();
            }, this.autoMs);
            
            this.addEvent(this.objBox, 'mouseover', function() {
                clearInterval(that.currentTime);
            });
            
            this.addEvent(this.objBox, 'mouseout', function() {
                that.currentTime = setInterval(function() {
                    that.autoPlay();
                }, that.autoMs);
            });
            
            if(this.showMarkers) {
                for(var i = 0; i < this.number; i++) {
                    var el = this.aLis[i];
                    (function(index) {
                        that.addEvent(el, 'mouseover', function() {
                            that.goTime(index);
                        });
                    })(i);
                };
            };
            
            if(this.showControls) {
                this.addEvent(this.oPrev, 'click', function() {
                    that.fnPrev();
                });
                this.addEvent(this.oNext, 'click', function() {
                    that.autoPlay();
                });
            };
            
        },
		addEvent: function(el, type, fn) {
            if(window.addEventListener) {
                el.addEventListener(type, fn, false);
            }
            else if(window.attachEvent) {
                el.attachEvent('on' + type, fn);
            };
        },
        
        fnPrev: function() {
            this.nextTarget--;
            if(this.nextTarget < 0) {
                this.nextTarget = this.number - 1;
            };
            this.goTime(this.nextTarget);
        },
		
		autoPlay: function(){
			this.nextTarget++;
            if(this.nextTarget >= this.number) {
                this.nextTarget = 0;
            };
            this.goTime(this.nextTarget);
		},
		goTime: function(index) {
            var that = this;
            
            if(this.showMarkers) {
                for(var i = 0; i < this.number; i++) {
                    i == index ? this.aLis[i].className = 'on' : this.aLis[i].className = '';
                };
            };
            
            if(this.timer) {
                clearInterval(this.timer);
            };
            this.timer = setInterval(function() {
                that.doMove(index);
            }, this.ms);
        },
		doMove: function(index) {			
			if(this.showMarkers) {
                for(var i = 0; i < this.number; i++) {
                    i == index ? this.aUlLis[i].className = 'on' : this.aUlLis[i].className = '';
                };
				clearInterval(this.timer);
                this.timer = null;
            };
		}
	};
	
	return {
        
        carousel: function(o) {
            var tt = new Carousel(o);
        }
    };
})()

// 调用语句
Slider.carousel({
    'targetElement': 'carousel',
    'showMarkers': true,
    'showControls': true
});