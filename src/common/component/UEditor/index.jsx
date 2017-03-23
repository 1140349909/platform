import React, {Component} from 'react';
import config from 'common/config';
import './index.less';
import classNames from 'classnames';

// TODO:
export function getEditor(editorId) {
    return document.getElementById(editorId).contentWindow['Editor'] || {};
}

// 设置UEditor值
export function setEditorValue(editorId, val) {
    var iframeEditor = document.getElementById(editorId);

    if (!iframeEditor) {
        return;
    }

    function setVal() {
        setTimeout(function () {
            try {
                getEditor(editorId).setContent(val);
            } catch (ex) {
                //
            }
        }, 500);
    }

    if (iframeEditor.readyState) {
        iframeEditor.onreadystatechange = function () {
            if (iframeEditor.readyState && iframeEditor.readyState == 'complete') {
                setVal();
            }
        };
    } else {
        iframeEditor.onload = function () {
            setVal();
        };
    }

    setVal();
}

// 获取UEditor值
export function getEditorValue(editorId) {
    return getEditor(editorId).getContent();
}

export class Editor extends Component {

    render() {

        const {id, width = '100%', height = '600px', type, className = ''} = this.props;

        const classString = classNames({
            iframeUEditorWrap: true,
            [className]: true,
        });

        /*const src = type == 'bs' ? config.UEDITOR_BS_URL : config.UEDITOR_URL;*/
        const src = getUeditorType(type);
        return (
            <div className={classString} style={{width: width, height: height}}>
                <iframe id={id} name={id} src={src} width="100%" height="100%" frameBorder="0"></iframe>
            </div>
        );
    }
}

function getUeditorType(type) {
    let configUrl = '';
    switch (type) {
        case 'bs':
            configUrl = config.UEDITOR_BS_URL;
            break;
        case 'platform':
            configUrl = config.UEDITOR_PLATFORM_URL;
            break;
        default:
            configUrl = config.UEDITOR_URL;
            break;

    }
    return configUrl + '?v=' + config.VERSION;
}
