//创建一个在选中的图片单击时添加边框的插件，其实质就是在baidu.editor.plugins塞进一个闭包
var current_active_ueitem = null;
//插件的扩展要在整个编辑器形成之前
UE.plugins["click_popup"] = function () {
    var me = this,
        editor = this;
    var utils = baidu.editor.utils,
        Popup = baidu.editor.ui.Popup,
        Stateful = baidu.editor.ui.Stateful,
        editorui = baidu.editor.ui,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase;
    var domUtils = baidu.editor.dom.domUtils;

    //第一种，jq方法实现的
    var clickPop = new baidu.editor.ui.Popup({
        content: "",
        editor: me,
        _remove: function () {
            $(clickPop.anchorEl).remove();
            clickPop.hide();
        },
        _copy: function () {
            $(clickPop.anchorEl).prop('outerHTML');
            clickPop.hide();
        },
        _preblank: function () {
            $('<p><br/></p>').insertBefore(clickPop.anchorEl);
            clickPop.hide();
        },
        _blank: function () {
            $('<p><br/></p>').insertAfter(clickPop.anchorEl);
            clickPop.hide();
        },
        _changeColor: function () {
            // 更改区块主题色
            editor.fireEvent('changeColor', clickPop.anchorEl);
            //clickPop.hide();
        },
        className: 'edui-bubble'
    });

    //注册一个触发命令的事件，同学们可以在任意地放绑定触发此命令的事件
    editor.addListener('blur', function (t, evt) {
        //去掉红色边框
        var range = editor.selection.getRange();
        var aDom = range.document.getElementsByClassName('ILokaEditorActive');
        $(aDom).each(function () {
            $(this).removeClass('ILokaEditorActive')
        })
    });
    editor.addListener('click', function (t, evt) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        //图片本身自带一个popup，防止覆盖
        if (el.tagName == "IMG") {
            el = $(el).parents('body').find('.ILokaEditor');
            $(el).removeClass('ILokaEditorActive');
            return;
        }
        //选中元素设置
        if ($(el).parents('.ILokaEditor').size() > 0) {

            el = $(el).parents('.ILokaEditor').get(0);

            //添加区域选中标识,用于替换颜色
            elother = $(el).parents().parent().find('.ILokaEditor');
            $(elother).removeAttr('style');
            $(elother).removeClass('ILokaEditorActive');
            $(el).addClass('ILokaEditorActive');
            var color = $(el).attr('data-color') || 'rgb(255,255,255)';
            current_ILokaEditorActive_ueitem = el;
            clickPop.render();
            var html = clickPop.formatHtml('<nobr class="pop-tools">' +
                '<span id="copy" >复制</span><b></b>' +
                '<span id="cut" >剪切</span><b></b>' +
                '<span onclick="$$._remove()" Stateful>删除</span><b></b>' +
                '<span onclick="$$._changeColor()" Stateful><i style="position:relative;border-radius:50%;width:18px;height:18px;display:inline-block;vertical-align:-5px;background-color:' + color + '"></i></span><b></b>' +
                '<span onclick="$$._preblank()" Stateful>其前插入空行</span><b></b>' +
                '<span onclick="$$._blank()" Stateful>其后插入空行</span></nobr>');
            var content = clickPop.getDom('content');
            content.innerHTML = html;
            clickPop.anchorEl = el;
            clickPop.showAnchor(clickPop.anchorEl);

            var client = new ZeroClipboard($('#copy'));
            client.on('ready', function (event) {
                client.on('copy', function (event) {
                    event.clipboardData.setData('text/html', $(clickPop.anchorEl).prop('outerHTML'));
                    clickPop.hide();
                });
            });

            var cut_client = new ZeroClipboard($('#cut'));
            cut_client.on('ready', function (event) {
                cut_client.on('copy', function (event) {
                    event.clipboardData.setData('text/html', $(clickPop.anchorEl).prop('outerHTML'));
                    clickPop.hide();
                    $(clickPop.anchorEl).remove();
                });
            });
        } else {
            //移除其他的样式
            if (el.tagName == "BODY") {
                $(el).find('.ILokaEditor').removeClass('ILokaEditorActive');
            } else {
                $(el).parents('body').find('.ILokaEditor').removeClass('ILokaEditorActive');
            }
            if (current_active_ueitem) {
                current_active_ueitem = null;
            }
        }
    });
    //第二种这种采用Ue方法实现的
    // var clickPop = new baidu.editor.ui.Popup({
    //     content: "",
    //     editor: me,
    //     _lineBehind: function() {
    //         me.execCommand("insertparagraph");
    //         clickPop._focusThis();
    //     },
    //     _lineFront: function() {
    //         var n = clickPop.anchorEl
    //             , i = document.createElement("p")
    //             , a = document.createElement("br");
    //         i.appendChild(a);
    //         me.selection.getRange().selectNode(n).insertNode(i)
    //     },
    //     _onRemoveButtonClick: function() {
    //         var n = clickPop.anchorEl;
    //         me.selection.getRange().selectNode(n).deleteContents(),
    //             this.hide()
    //     },
    //     _focusThis: function(e) {
    //         me.focus()
    //     },
    //     _onStyleCopyClick: function() {
    //         var n = clickPop.anchorEl;
    //         me.selection.getRange().selectNode(n).select();
    //         me.execCommand("copy")
    //     },
    //     queryAutoHide: function(n) {
    //         return n && n.ownerDocument == clickPop.document && ("img" == n.tagName.toLowerCase() || UE.dom.domUtils.findParentByTagName(n, "a", !0)) ? n !== clickPop.anchorEl : UE.ui.Popup.prototype.queryAutoHide.call(this, n)
    //     },
    //     className: 'edui-bubble'
    // });
    // clickPop.render();
    // me.addListener("selectionchange", function(n, i) {
    //     if (i) {
    //         var a = ""
    //             , r = []
    //             , o = me.selection.getRange().getClosedNode();
    //         me.ui._dialogs;
    //         if (!o && "br" != me.selection.getStart().tagName) {
    //             r = me.selection.getStartElementPath();
    //             for (var s = 0; s < r.length; s++)
    //                 "SECTION" == r[s].tagName && $(r[s]).hasClass("ILokaEditor") && (a = clickPop.formatHtml('<nobr class="pop-tools"><span onclick=$$._onRemoveButtonClick() class="newrankClick">删除</span><span onclick=$$._onStyleCopyClick() class="newrankClick">复制</span><b></b><span onclick=$$._lineFront() class="newrankClick">前插行</span><span onclick=$$._lineBehind() class="newrankClick">后插行</span>'),
    //                     a ? (clickPop.getDom("content").innerHTML = a,
    //                         clickPop.anchorEl = r[s],
    //                         clickPop.showAnchor(clickPop.anchorEl)) : clickPop.hide())
    //         }
    //     }
    // })
};
