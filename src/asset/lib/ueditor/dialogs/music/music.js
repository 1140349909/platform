// [修改] 2016.10.08 by jason
// 禁用exec中语句if (selectedItem == null)   return;
// 新增_getAudioUrl()
// 修改editor.execCommand中url为me._getAudioUrl(),
function Music() {
    this.init();
}
(function () {
    var pages = [],
        panels = [],
        selectedItem = null;
    Music.prototype = {
        total: 70,
        pageSize: 10,
        dataUrl: "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.common",
        playerUrl: "http://box.baidu.com/widget/flash/bdspacesong.swf",

        init: function () {
            var me = this;

            domUtils.on($G("J_searchName"), "keyup", function (event) {
                var e = window.event || event;
                if (e.keyCode == 13) {
                    me.dosearch();
                }
            });
            domUtils.on($G("J_searchBtn"), "click", function () {
                me.dosearch();
            });
            //新增
            domUtils.on($G("J_uploadBtn"), "change", function () {
                me.upload();
            });

            //修改时填充输入框
            $focus($G("J_onlineMusicUrl"));
            //支持修改时显示已有的url
            var audio = editor.selection.getRange().getClosedNode();

            if (audio != undefined) {
                $G("J_onlineMusicUrl").value = audio.getAttribute("_url");
            } else {
                $G("J_onlineMusicUrl").value = ''
            }

            //新增监听
            me.addUrlChangeListener($G("J_onlineMusicUrl"));

        },
        callback: function (data) {
            var me = this;
            me.data = data.song_list;
            setTimeout(function () {
                $G('J_resultBar').innerHTML = me._renderTemplate(data.song_list);
            }, 300);
        },
        dosearch: function () {
            var me = this;
            selectedItem = null;
            var key = $G('J_searchName').value;
            if (utils.trim(key) == "")return false;
            key = encodeURIComponent(key);
            me._sent(key);
        },
        doselect: function (i) {
            var me = this;
            if (typeof i == 'object') {
                selectedItem = i;
            } else if (typeof i == 'number') {
                selectedItem = me.data[i];
            }
        },
        onpageclick: function (id) {
            var me = this;
            for (var i = 0; i < pages.length; i++) {
                $G(pages[i]).className = 'pageoff';
                $G(panels[i]).className = 'paneloff';
            }
            $G('page' + id).className = 'pageon';
            $G('panel' + id).className = 'panelon';
        },
        listenTest: function (elem) {
            var me = this,
                view = $G('J_preview'),
                is_play_action = (elem.className == 'm-try'),
                old_trying = me._getTryingElem();

            if (old_trying) {
                old_trying.className = 'm-try';
                view.innerHTML = '';
            }
            if (is_play_action) {
                elem.className = 'm-trying';
                view.innerHTML = me._buildMusicHtml(me._getUrl(true));
            }
        },
        _sent: function (param) {
            var me = this;
            $G('J_resultBar').innerHTML = '<div class="loading"></div>';

            utils.loadFile(document, {
                src: me.dataUrl + '&query=' + param + '&page_size=' + me.total + '&callback=music.callback&.r=' + Math.random(),
                tag: "script",
                type: "text/javascript",
                defer: "defer"
            });
        },
        _removeHtml: function (str) {
            var reg = /<\s*\/?\s*[^>]*\s*>/gi;
            return str.replace(reg, "");
        },
        _getUrl: function (isTryListen) {
            var me = this;
            var param = 'from=tiebasongwidget&url=&name=' + encodeURIComponent(me._removeHtml(selectedItem.title)) + '&artist='
                + encodeURIComponent(me._removeHtml(selectedItem.author)) + '&extra='
                + encodeURIComponent(me._removeHtml(selectedItem.album_title))
                + '&autoPlay=' + isTryListen + '' + '&loop=true';
            return me.playerUrl + "?" + param;
        },
        _getTryingElem: function () {
            var s = $G('J_listPanel').getElementsByTagName('span');

            for (var i = 0; i < s.length; i++) {
                if (s[i].className == 'm-trying')
                    return s[i];
            }
            return null;
        },
        _buildMusicHtml: function (playerUrl) {
            var html = '<embed class="BDE_try_Music" allowfullscreen="false" pluginspage="http://www.macromedia.com/go/getflashplayer"';
            html += ' src="' + playerUrl + '"';
            html += ' width="1" height="1" style="position:absolute;left:-2000px;"';
            html += ' type="application/x-shockwave-flash" wmode="transparent" play="true" loop="false"';
            html += ' menu="false" allowscriptaccess="never" scale="noborder">';
            return html;
        },
        _byteLength: function (str) {
            return str.replace(/[^\u0000-\u007f]/g, "\u0061\u0061").length;
        },
        _getMaxText: function (s) {
            var me = this;
            s = me._removeHtml(s);
            if (me._byteLength(s) > 12)
                return s.substring(0, 5) + '...';
            if (!s) s = "&nbsp;";
            return s;
        },
        _rebuildData: function (data) {
            var me = this,
                newData = [],
                d = me.pageSize,
                itembox;
            for (var i = 0; i < data.length; i++) {
                if ((i + d) % d == 0) {
                    itembox = [];
                    newData.push(itembox)
                }
                itembox.push(data[i]);
            }
            return newData;
        },
        _renderTemplate: function (data) {
            var me = this;
            if (data.length == 0)return '<div class="empty">' + lang.emptyTxt + '</div>';
            data = me._rebuildData(data);
            var s = [], p = [], t = [];
            s.push('<div id="J_listPanel" class="listPanel">');
            p.push('<div class="page">');
            for (var i = 0, tmpList; tmpList = data[i++];) {
                panels.push('panel' + i);
                pages.push('page' + i);
                if (i == 1) {
                    s.push('<div id="panel' + i + '" class="panelon">');
                    if (data.length != 1) {
                        t.push('<div id="page' + i + '" onclick="music.onpageclick(' + i + ')" class="pageon">' + (i ) + '</div>');
                    }
                } else {
                    s.push('<div id="panel' + i + '" class="paneloff">');
                    t.push('<div id="page' + i + '" onclick="music.onpageclick(' + i + ')" class="pageoff">' + (i ) + '</div>');
                }
                s.push('<div class="m-box">');
                s.push('<div class="m-h"><span class="m-t">' + lang.chapter + '</span><span class="m-s">' + lang.singer
                    + '</span><span class="m-z">' + lang.special + '</span><span class="m-try-t">' + lang.listenTest + '</span></div>');
                for (var j = 0, tmpObj; tmpObj = tmpList[j++];) {
                    s.push('<label for="radio-' + i + '-' + j + '" class="m-m">');
                    s.push('<input type="radio" id="radio-' + i + '-' + j + '" name="musicId" class="m-l" onclick="music.doselect(' + (me.pageSize * (i - 1) + (j - 1)) + ')"/>');
                    s.push('<span class="m-t">' + me._getMaxText(tmpObj.title) + '</span>');
                    s.push('<span class="m-s">' + me._getMaxText(tmpObj.author) + '</span>');
                    s.push('<span class="m-z">' + me._getMaxText(tmpObj.album_title) + '</span>');
                    s.push('<span class="m-try" onclick="music.doselect(' + (me.pageSize * (i - 1) + (j - 1)) + ');music.listenTest(this)"></span>');
                    s.push('</label>');
                }
                s.push('</div>');
                s.push('</div>');
            }
            t.reverse();
            p.push(t.join(''));
            s.push('</div>');
            p.push('</div>');
            return s.join('') + p.join('');
        },
        exec: function () {
            var me = this;
            //暂时禁用下句
            // if (selectedItem == null)   return;
            //没有地址时不插入图片
            if (me._getAudioUrl() == '')   return;
            //地址错误时也不插入
            if(!me.isURL(me._getAudioUrl()))   return;

            $G('J_preview').innerHTML = "";
            editor.execCommand('music', {
                // url:me._getUrl(false),
                url: me._getAudioUrl(),
                width: 400,
                height: 95
            });
        },
        // 自定义获取MP3地址
        _getAudioUrl: function () {
            return $G('J_onlineMusicUrl').value;
        },
        // 增加上传MP3
        upload: function () {

            var oFiles = $('#J_uploadBtn')[0].files;

            if (oFiles[0].type != 'audio/mp3') {
                alert('请上传MP3格式的音乐文件！');
                return null;
            }

            if (oFiles[0].size > 1048576) {
                alert('MP3文件大小超出1M限制');
                return null;
            }

            var data = new FormData();
            data.append("media", oFiles[0]);

            $.ajax({
                url: editor.getOpt('imageActionUrl'),
                type: 'post',
                data: data,
                xhrFields: {
                    withCredentials: editor.getOpt('withCredentials')
                },
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                success: function (result) {
                    $G('J_onlineMusicUrl').value = (editor.getOpt('audioDataUrl') + result.data);
                }
            });


        },
        /**
         * 监听url改变事件
         * @param url
         */
        addUrlChangeListener: function (url) {
            var me = this;
            if (browser.ie) {
                url.onpropertychange = function () {
                    me.createPreviewMusic(this.value);
                }
            } else {
                url.addEventListener("input", function () {
                    me.createPreviewMusic(this.value);
                }, false);
            }
        },
        /**
         * 根据url生成视频预览
         * @param url
         */
        createPreviewMusic: function (url) {

            var me = this;

            if (me.isURL(url) || url == '') {
                $('#urlError').hide();
            } else {
                $('#urlError').show();
            }


        },
        // 建议的正则
        isURL: function (str) {
            return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
        }
    };
})();



