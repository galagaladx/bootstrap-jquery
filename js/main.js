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
         //ele.date()��ȡ�Զ������� ����Ҫȡ�õ�����ֵ
         $item.css('backgroundImage','url("'+imgSrc+'")');
         //console.log(imgSrc);
         //������ҪСͼ��ʱ��ߴ�ȱ����仯����Сͼ��ʱ��ʹ��img��ǩ��
         if(isSmallScreen){
             $item.html('<img src="'+imgSrc+'" alt="" />');
         }else{
             //ɾ��Ԫ��
             $item.empty();
         }
     });
  }
    $(window).on('resize',resize).trigger('resize'); //trigger()�ȵ���һ���������
    //��ʼ��tooltips���
    $('[data-toggle="tooltip"]').tooltip();

    /*���Ʊ�ǩҳ�ı�ǩͬ�ڿ��*/

    var $ulContainer = $('.nav-tabs');
    //console.log($ulContainer.children());
    var width = 30; //��Ϊԭ����UL����20��padding

    $ulContainer.children().each(function (index, ele) {
        //ele.clientWidth
        //console.log($(ele).width());
        //console.log(ele.clientWidth);
         width += $(ele).width();
        //console.log(width);
    });
    //�жϵ�ǰUL�Ŀ���Ƿ񳬳���Ļ ��������ʾ������
    if(width > $(window).width()){
        $ulContainer
                    .css('width',width)
                    .parent().css('overflow-x','scroll');
    }
//    a���ע���¼�
    var $newTitle = $('.news-title');
    //console.log($newTitle);
    $('#news .nav-pills a').on('click', function () {
        //��ȡ��ǰ�����Ԫ��
        var $this = $(this);
        //��ȡ��Ӧ��titlesֵ
        var title = $this.data('title');
        //��title���õ����Ӧ��λ��
        $newTitle.text(title);
    });



    //1.��ȡ��ָ���ֲ�ͼ�����һ����������

    //��ָ������ʼʱ��¼һ����ָ���ڵ�����X
    //����������һ˲���¼�����ָ���ڵ�����X

    //��ȡ�����ϵ��ֲ�ͼ����
    var $carousel = $('.carousel');
    var starX,endX;
    var offset = 20;
    //ע�Ử���¼�
    $carousel.on('touchstart',function(e){
        starX = e.originalEvent.touches[0].clientX;
        //console.log(e.originalEvent.touches[0].clientX);
    });
    $carousel.on('touchmove',function(e){
        //�����ظ���ֵȡ����ֵ
        endX = e.originalEvent.touches[0].clientX;
        //console.log(e.originalEvent.touches[0].clientX);
    });
    $carousel.on('touchend',function(e){
        //���ƾ��� ��ȡÿ���˶��ľ��룬���������һ��ֵʱ��Ϊ���з���仯
        var distance = Math.abs(starX - endX);
        if(distance > offset) {
            //2.���ݻ�õ��ķ���ѡ����һ�Ż�����һ��
            //����bootstrapԭ����carousel()����ʵ��
            //������this
            $(this).carousel(starX > endX ? "next" : "prev");
        }
    });


});