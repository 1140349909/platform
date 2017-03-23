import React from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'antd';
import _ from 'lodash';

// 单独弹出对话框,特殊情况使用
export default function showModal(config) {
    let {content, onOk, onCancel, ...props} = config;

    let wrapper = document.createElement('div');
    document.body.appendChild(wrapper);

    const closeModal = ()=> {
        const unmountResult = ReactDOM.unmountComponentAtNode(wrapper);
        if (unmountResult && wrapper.parentNode) {
            wrapper.parentNode.removeChild(wrapper);
        }
    };

    props.visible = true;

    props.onOk = function () {
        if (onOk) {
            let ret;
            if (onOk.length) {
                ret = onOk(closeModal);
            } else {
                ret = onOk();
                if (!ret) {
                    closeModal();
                }
            }
            if (ret && ret.then) {
                ret.then((...args) => {
                    closeModal(...args);
                });
            }
        } else {
            closeModal();
        }
    };

    props.onCancel = function () {
        if (_.isFunction(onCancel)) {
            onCancel();
        }
        closeModal();
    };

    ReactDOM.render(
        <Modal {...props}>
            {content}
        </Modal>, wrapper);

    return {
        destroy: closeModal,
    };
}


