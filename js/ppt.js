//  ****锁的设置及解锁  定时器****

var $box = $('.wrapper .box'),
    $content = $('.wrapper .box .content'),
    $image = $('.wrapper .box .image'),
    $li = $('.wrapper .radio ul li'),
    $btnLt = $('.wrapper .btn .btnLt'),
    $btnRt = $('.wrapper .btn .btnRt'),
    num = 0,
    timer,
    delayTimer,
    initTimer,
    oIndex,
    flag = 1;

// 设置初始样式
function init(oIndex){
	$box.eq((num+2) % 3).css({opacity:0});
	$box.eq((num+1) % 3).css({opacity:0});

	$li.eq(num % 3).prop('class','active');
	$box.eq(num % 3).animate({opacity:0},800)
	                  .animate({opacity:1},2000);
	$content.eq(num % 3).animate({'top':'300px','left':'80px'},'linear').delay(700)
	       .animate({'top':'100px','opacity':1},800,'linear');
	$image.eq(num % 3).animate({'opacity':0,'left':'400px','top':'20px'},'linear').delay(900)
	      .animate({'opacity':1,'left':'600px','top':'100px','width':'300px','height':'340px'},1300,'linear',function() {
	      	flag = 1;
	      });
}

// 此时第一个div显示，像左运动获得下一个（第二个）div
function leftMove() {
	$li.prop('class','radio');
	$box.eq(num % 3).css({opacity:0});
	$box.eq((num+2) % 3).css({opacity:0});
    
    $li.eq((num+1) % 3).prop('class','active');
	$box.eq((num+1) % 3).animate({opacity:0},800)
	                  .animate({opacity:1},2000);
	$content.eq((num+1) % 3).animate({'top':'300px','left':'80px'},'linear').delay(700)
	       .animate({'top':'100px','opacity':1},800,'linear',function(){});
	$image.eq((num+1) % 3).animate({'opacity':0,'left':'500px','top':'20px','width':0,'height':0},'linear').delay(900)
	      .animate({'opacity':1,'left':'600px','top':'100px','width':'300px','height':'340px'},1300,'linear',function(){
	      	flag = 1;
	      }); 

    num++;
}

// 此时第一个div显示，像右运动获得上一个（第三个）div
function rightMove() {
    $box.eq(num % 3).css({opacity:0});
	$box.eq((num+1) % 3).css({opacity:0});

	$li.prop('class','radio');
	$li.eq((num+2) % 3).prop('class','active');
	$box.eq((num+2) % 3).animate({opacity:0},800)
	                  .animate({opacity:1},2000);
	$content.eq((num+2) % 3).animate({'top':'300px','left':'80px'},'linear').delay(700)
	       .animate({'top':'100px','opacity':1},800,'linear');
	$image.eq((num+2) % 3).animate({'opacity':0,'left':'400px','top':'20px'},'linear').delay(900)
	      .animate({'opacity':1,'left':'600px','top':'100px','width':'300px','height':'340px'},1300,'linear',function(){
	      	flag = 1;
	      });   

    num--;  
}

// 正常运动时的样式 向左
init();
timer = setInterval(leftMove,3600);

// 点击按钮后重启定时器
function time() {
	delayTimer = setTimeout(function(){
    	timer = setInterval(leftMove,3600);
    },2000)
}

// 点击右边按钮  ---- 设置锁及解锁
$btnRt.click(function(){
     clearInterval(timer);
     clearTimeout(delayTimer);
	 if(flag == 1) {
	      flag = 0;
		  leftMove();
	  }
	  time();
})

// 点击左边按钮
$btnLt.click(function(){
   clearInterval(timer);
   clearTimeout(delayTimer);
   if(flag == 1) {
      flag = 0;
	  rightMove();
  }
  time();
})

// 点击下边的小圆点
$li.on('click', function(){
	clearInterval(timer);
    clearTimeout(delayTimer);
    clearTimeout(initTimer);
	oIndex = $(this).index();
	num = oIndex;
	initTimer = setTimeout(function(){
	  if(flag == 1){
	  	flag = 0;
	  	$li.prop('class','radio');
	  	init(num);
   }
  },80)

	time();
})

