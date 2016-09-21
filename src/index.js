/**
 * Created by wanglin on 2016/9/20.
 */
/**
 * index.js
 */
;(function (w, $) {
    function h5maker(opts) {
        var defaultOpts = {
            node: null
        };
        /**
         * 合并参数
         */
        this.opts = $.extend(defaultOpts, opts);
        var sWrap = $(this.opts.node);

        this._init();
    }
    $.extend(h5maker.prototype, {
        /**
         * 初始化入口
         * @private
         */
        _init: function () {
            this._bind();
            this._changeStyle();



        },
        /**
         * 事件绑定
         * @private
         */
        _bind: function () {
            var self = this;
            $('#main-wrapper').delegate('.text-input-show','dblclick',function(){self._editRight('text')});
            $('#main-wrapper').delegate('.img-show','dblclick',function(){self._editRight('image')});
            $('#choose_image').on('change',function(){
                self._setImagePreviews();
            })
        },
        /**
         * 选择改变何种属性
         * @private
         */
        _changeStyle:function(){
            var changeBtnArea = $(this.opts.node).find('.left-area').find('li.item');
            var changeSize = changeBtnArea.find('#change-size');
            var changePosition = changeBtnArea.find('#change-position');
            changeSize.on('click',function(){
                var $this = $(this);
                $this.parents('ul').find('.current').removeClass('current');
                $this.parents('.item').addClass('current');
            });
            changePosition.on('click',function(){
                var $this = $(this);
                $this.parents('ul').find('.current').removeClass('current');
                $this.parents('.item').addClass('current');
                $('#main-wrapper #text-item').MoveBox();
                $('#main-wrapper #img-item').MoveBox();
            });

        },
        /**
         * 呼出右侧编辑区域
         * @param type
         * @private
         */
        _editRight: function(type){
            $('.right-area').show(200);
            $('.right-area').find('.item').hide();


            switch(type){
                case 'text':
                    $('.right-input').show(200);
                    this._editText();
                    break;
                case 'image':
                    $('.right-image').show(200);
                    break;
                default:
                    console.log('nothing');
            }


        },
        /**
         * 文本编辑
         * @private
         */
        _editText:function(){
            $('.right-input').find('.change-text-color').find('li').on('click',function(){
                var $this = $(this);
                var thisColor = $this.data('color');
                $('#text-input').css('color',thisColor);
                $('#text-item').css('color',thisColor);

            });
            $('#text-input').on('keyup',function(){
                var thisVal = $(this).val();
                var thisColor = $(this).css('color');
                $('#text-item').css('color',thisColor).html(thisVal);
            });
        },
        /**
         * 图片预览
         * @returns {boolean}
         * @private
         */
        _setImagePreviews:function(){
            //var docObj = $('#choose_image');
            //var dd = $('#image-upload-show');
            var docObj = document.getElementById("choose_image");

            var dd = document.getElementById("image-upload-show");
            var cc = document.getElementById("img-item");
            dd.innerHTML = "";
            cc.innerHTML = "";
            var fileList = docObj.files;
            for (var i = 0; i < fileList.length; i++) {
                dd.innerHTML += "<div style='float:left' > <img id='img" + i + "'  /> </div>";
                cc.innerHTML += "<div style='float:left' > <img id='imgCopy" + i + "'  /> </div>";
                var imgObjPreview = document.getElementById("img"+i);
                var imgObjCopyPreview = document.getElementById("imgCopy"+i);
                if (docObj.files && docObj.files[i]) {
                    //火狐下，直接设img属性
                    imgObjPreview.style.display = 'block';
                    imgObjCopyPreview.style.display = 'block';
                    //imgObjPreview.style.width = '150px';
                    //imgObjPreview.style.height = '180px';
                    //imgObjPreview.src = docObj.files[0].getAsDataURL();
                    //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
                    imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);
                    imgObjCopyPreview.src = window.URL.createObjectURL(docObj.files[i]);
                }
                else {
                    //IE下，使用滤镜
                    docObj.select();
                    var imgSrc = document.selection.createRange().text;
                    alert(imgSrc);
                    var localImagId = document.getElementById("img" + i);
                    //必须设置初始大小
                    //localImagId.style.width = "150px";
                    //localImagId.style.height = "180px";
                    //图片异常的捕捉，防止用户修改后缀来伪造图片
                    try {
                        localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                        localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
                    }
                    catch (e) {
                        alert("您上传的图片格式不正确，请重新选择!");
                        return false;
                    }
                    imgObjPreview.style.display = 'none';
                    imgObjCopyPreview.style.display = 'none';
                    document.selection.empty();
                }
            }
            return true;

        },




        /**
         * 重载
         */
        reload: function () {
            this._init();
        }
    });

    /**
     * 暴露全局变量
     */
    if (!w.h5maker) {
        w.h5maker = function () {
            $('.wrapper').each(function () {

                new h5maker({
                    node: this
                });

            });
        };
    }

    /**
     * 入口
     */
    $(function () {
        w.h5maker();
    });

})(window, jQuery);