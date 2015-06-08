// JavaScript Document
$(document).ready(function(){
    showToggle();
	createFile();	
	subStr(30);
	selected();
	resetWid();
	//placeHolder();
})

function showToggle(){
	$("#changeVal").click(function(){
		$(this).hide();
		$("#password").focus();
	});
	//IE9时，添加
	$("#password").focus(function(){
		$("#changeVal").hide();
	});
	$("#password").blur(function(){
		var val = $(this).val();
		if(val!==""&&val!==null){
			$("#changeVal").hide();
		}else{
			$("#changeVal").show();
		}
	})
}

function placeHolder(){
	var doc=document,
	inputs=doc.getElementsByTagName('input'),
	supportPlaceholder='placeholder'in doc.createElement('input'),
	placeholder=function(input){
		var text=input.getAttribute('placeholder'),
		defaultValue=input.defaultValue;
        if(defaultValue==''){
			input.value=text;
		}
        input.onfocus=function(){
            if(input.value===text){
				this.value='';
			}
		};
        input.onblur=function(){
			if(input.value===''){
				this.value=text;
			}
		}
	};
	if(!supportPlaceholder){
		for(var i=0,len=inputs.length;i<len;i++){
			var input=inputs[i],
			text=input.getAttribute('placeholder');
			if((input.type==='text'&&text)||(input.type==='password'&&text)){
				placeholder(input);
			}
		}
	}
}

function createFile(){
	$("#newFile").click(function(){
	    var _file = '<input type="file" class="newfile" style="display:none"/>';	
		$(this).after(_file);
		$(".newfile").click();
	})	
}

function subStr(maxLen){
	var str = $(".subStr").text(),
		strLen = str.length;
		
	if(maxLen<strLen){
		str = str.substring(0, maxLen);
		str = str + '...';
	}
	$(".subStr").text(str);
}


function selected(){
    $(".selectBox").on("click",function(){
		var $selectList = $(this).find(".selectList");
		var $li = $selectList.children('li');
		var $checked = $(this).find(".checked");
		$selectList.toggle();
		$li.each(function(){
			var cur = $(this);
			cur.click(function(){
				$checked.text(cur.text());
			});
		});		
	});	
}

$(window).scroll(function(){
   var scrollTop = $(window).scrollTop();
   if(scrollTop>200){
	   $(".goTop").show();
   }else{
	   $(".goTop").hide();
   }
 })

function goTo(top){
	$("html,body").animate({scrollTop:top},500);	
	if(top<=0||top>200){
		$(".goTop").hide();
	}else{
		$(".goTop").show();
	}
}
function resetWid(){
   var _wid = $(".header").width();
   var len = $(".header .li").length;
   var newWid = parseInt(_wid/len);
   $(".header .li").width(newWid);
}
