/**
 * Created by wanglin on 2016/9/21.
 */
(function($){
    var n = 1;
    var o = {};
    $.fn.MoveBox=function(options){
        var opts = $.extend({}, $.fn.MoveBox.defaults, options);
        return this.each(function(i){
                $(this).mousedown(function(e){
                    o.iTop = $(this).position().top - e.pageY;
                    o.iLeft = $(this).position().left - e.pageX;
                    n++;
                    $this = $(this);
                    $this.css({'z-index':n});
                    $(document).bind("mousemove",function(e){
                        var iLeft = e.pageX + o.iLeft;
                        var iTop = e.pageY + o.iTop;
                        if(iLeft<0){
                            iLeft = 0;
                        }else if(iLeft>$this.parent().width()-$this.width()){
                            iLeft = $this.parent().width()-$this.width();
                        }
                        if(iTop<0){
                            iTop = 0;
                        }else if(iTop>$this.parent().height()-$this.height()){
                            iTop = $this.parent().height()-$this.height();
                        }

                        $this.css({
                            'left':iLeft +"px",
                            'top':iTop + "px"
                        })
                    });
                    $(document).bind("mouseup",function(){
                        $(document).unbind("mousemove");
                        $(document).unbind("mouseup");
                    });
                });


        });
    };

    $.fn.MoveBox.defaults = {
        out:false //默认不可跑出线外
    };
})(jQuery);