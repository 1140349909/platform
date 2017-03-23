import React, {Component} from 'react';
import {Modal, Form, Button, Input} from 'antd';
// import {getIlokaContentUrl} from 'common/util/url';
import './index.less';

class TemplatePurchaseShow extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    render = () => {

        // 收藏模板和使用模板方法继承
        let {visible, reset, type, handleSubmit} = this.props;

        let title = type == 'single' ? '生成单页模板' : '生成整套模板',
            width = type == 'single' ? 696 : 900,
            footer = (
                <div>
                    <Button onClick={reset}>取消</Button>
                    <Button type="primary"
                            onClick={() => handleSubmit()}>确定</Button>
                </div>
            ),
            maskClosable = false,

            // 单页模板
            singleContent = (
                <div>
                    <Form>
                        <p><span>选择分类：</span></p>
                        <p>同意作品生成整套模板（在“我的/我生成的模板”里查看或修改）</p>
                        <p>注：关于模板交易的详细规则&nbsp;<a href="javaScript:void(0)">点此查看</a></p>
                    </Form>
                </div>
            ),

            // 整套模板
            multipleContent = (
                <div>
                    <Form>
                        <p>模板名称：<Input type="text" style={{'width': '240px', 'padding': '5px 8px'}}/></p>
                        <p><span>选择分类：</span></p>
                        <p>同意作品生成整套模板（在“我的/我生成的模板”里查看或修改）</p>
                        <p>注：关于模板交易的详细规则&nbsp;<a href="javaScript:void(0)">点此查看</a></p>
                    </Form>
                </div>
            ),
            content = type == 'single' ? singleContent : multipleContent;

        return (
            <div>
                <Modal title={title}
                       className="template-preview-container"
                       visible={visible}
                       width={width}
                       footer={footer}
                       maskClosable={maskClosable}
                       onCancel={reset}>
                    {content}
                </Modal>
            </div>
        );
    };
}

export default Form.create({})(TemplatePurchaseShow);

