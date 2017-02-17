/**
 * By Xurry
 * time  2015/10/21
 */

var browser={ 
    versions:function(){   
           var u = navigator.userAgent, app = navigator.appVersion;   
           return {//移动终端浏览器版本信息   
                trident: u.indexOf('Trident') > -1, //IE内核  
                presto: u.indexOf('Presto') > -1, //opera内核  
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器  
                iPad: u.indexOf('iPad') > -1, //是否iPad    
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
            };  
         }()
}
  
if( browser.versions.android || browser.versions.iPhone){   //判断移动端浏览器 
	$(".note-content-list ul li").click(function(event){   //点击显示内容
		$(".note-content").hide();
		$(".note-detail").fadeIn();
	});

	$(".note-detail-closeBtn").bind("touchend", function(event){   //触摸关闭内容
		$(".note-detail").hide();
		$(".note-detail").animate({scrollTop: "0"},"fast");
		$(".note-content").fadeIn();
	}); 

  $(".note-category-showBtn").bind("touchend", function(event){   //触摸显示侧边栏
    var ulHeight=$(".note-category").height()-$(".note-cat-top").outerHeight()-
                 $(".note-cat-bottom").outerHeight();
    $(".note-cat-list").css("height", ulHeight);   //计算列表高度，决定列表是否显示滚动条
    $("#hover-content").removeClass("mob-dis-none");
    $(".note-category").fadeIn();
    $('body').css('overflow', 'hidden'); //显示侧边栏时禁止后面内容滚动 
  });

  $("#hover-content").click(function(event){   //点击关闭侧边栏
    $(".note-category").fadeOut();
    $("#hover-content").addClass("mob-dis-none");
    $('body').css('overflow', '');
  });
};   
