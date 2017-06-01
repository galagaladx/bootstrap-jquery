/**
 * Created by Administrator on 2016/12/20.
 */



$(function(){
  function resize(){
     var windwoWidth = $(window).width();
     var isSmallScreen = windwoWidth < 768;
     $('#main_ad > .carousel-inner > .item').each(function (i, item) {
         var $item = $(item);
         var imgSrc = $item.data(isSmallScreen ? 'image-sm' : 'image-lg');
         //ele.date()获取自定义属性 参数要取得的属性值
         $item.css('backgroundImage','url("'+imgSrc+'")');
         //console.log(imgSrc);
         //我们需要小图的时候尺寸等比例变化所以小图的时候使用img标签。
         if(isSmallScreen){
             $item.html('<img src="'+imgSrc+'" alt="" />');
         }else{
             //删除元素
             $item.empty();
         }
     });
  }
    $(window).on('resize',resize).trigger('resize'); //trigger()先调用一次这个函数
    //初始话tooltips插件
    $('[data-toggle="tooltip"]').tooltip();

    /*控制标签页的标签同期宽度*/

    var $ulContainer = $('.nav-tabs');
    //console.log($ulContainer.children());
    var width = 30; //因为原本的UL上有20的padding

    $ulContainer.children().each(function (index, ele) {
        //ele.clientWidth
        //console.log($(ele).width());
        //console.log(ele.clientWidth);
         width += $(ele).width();
        //console.log(width);
    });
    //判断当前UL的宽度是否超出屏幕 超出就显示滚动条
    if(width > $(window).width()){
        $ulContainer
                    .css('width',width)
                    .parent().css('overflow-x','scroll');
    }
//    a点击注册事件
    var $newTitle = $('.news-title');
    //console.log($newTitle);
    $('#news .nav-pills a').on('click', function () {
        //获取当前点击的元素
        var $this = $(this);
        //获取对应的titles值
        var title = $this.data('title');
        //将title设置到相对应的位置
        $newTitle.text(title);
    });



    //1.获取手指在轮播图区域的一个滑动方向

    //手指触摸开始时记录一下手指所在的坐标X
    //结束触摸的一瞬间记录最后手指所在的坐标X

    //获取界面上的轮播图容器
    var $carousel = $('.carousel');
    var starX,endX;
    var offset = 20;
    //注册滑动事件
    $carousel.on('touchstart',function(e){
        starX = e.originalEvent.touches[0].clientX;
        //console.log(e.originalEvent.touches[0].clientX);
    });
    $carousel.on('touchmove',function(e){
        //变量重复赋值取最后的值
        endX = e.originalEvent.touches[0].clientX;
        //console.log(e.originalEvent.touches[0].clientX);
    });
    $carousel.on('touchend',function(e){
        //控制精度 获取每次运动的距离，当距离大于一定值时认为是有方向变化
        var distance = Math.abs(starX - endX);
        if(distance > offset) {
            //2.根据获得到的方向选择上一张或者下一张
            //利用bootstrap原生的carousel()方法实现
            //多利用this
            $(this).carousel(starX > endX ? "next" : "prev");
        }
    });


});