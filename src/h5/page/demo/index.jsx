import React from 'react';
import PageBase from 'common/base/PageBase';
import heditor from 'lk-heditor';
import 'lk-heditor/dist/heditor.css';
import './index.less';

var index = 0;
export default class extends PageBase {

    constructor(props) {
        super(props);
    }


    componentDidMount() {

        setTimeout(()=> {
            heditor.init('.edit-demo-container', {
                selectImage: function (action) {
                    !action || action({imgId: '5880b4260f93d51b7bb4bf8f'});
                },
                // 图片裁剪,返回图片
                cropImage: function (action) {
                    !action || action({imgId: '5880b4260f93d51b7bb4bf8f'});
                }
            });
        }, 400);
    }

    addText = ()=> {
        heditor.addText();
    }

    addImage = ()=> {
        heditor.addImage({imgId: '5880b4260f93d51b7bb4bf8f'});
    }

    undo = ()=> {
        heditor.undo();
    }

    redo = ()=> {
        heditor.redo();
    }

    addForm = ()=> {
        heditor.addForm();
    }

    addVideo = ()=> {
        heditor.addVideo();
    }

    toggleGrid = ()=> {
        heditor.toggleGrid();
    }

    addShape = ()=> {
        var shapes = [
            'widget-shape-rectangle',
            'widget-shape-round-rectangle',
            'widget-shape-circle',
            'widget-shape-triangle',
            'widget-shape-h-line',
            'widget-shape-polygon',
            'widget-shape-star',
            'widget-shape-ellipse',
            'widget-shape-heart'
        ];

        const s = shapes[(index++) % 9];
        // console.log('形状', s);
        heditor.addShape(s);



        // console.log("=== add shape button now");
    }

    render() {

        return (
            <div className="page-h5-editor">
                <div className="edit-toolbar">
                    <button onClick={this.undo}>撤销</button>
                    <button onClick={this.redo}>重做</button>
                    <button onClick={this.addText}>文本</button>
                    <button onClick={this.addImage}>图片</button>
                    <button onClick={this.addShape}>图形</button>
                    <button onClick={this.addForm}>表单</button>
                    <button onClick={this.addVideo}>视频</button>
                    <button onClick={this.toggleGrid}>网格</button>
                </div>
                <div className="edit-demo-container"></div>
            </div>
        );
    }
}
