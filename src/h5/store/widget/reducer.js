import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

const initialState = fromJS({

    // 常用图形列表
    shapeList: getShapeList(),

    // 常用文字列表
    textList: getTextList(),

    // 常用表单列表
    formList: getFormList()
});

// 常用图形列表
function getShapeList() {
    return [
        {
            type: 'widget-shape-rectangle',
            src: __uri('./img/widget-shape-rectangle.png')
        },
        {
            type: 'widget-shape-round-rectangle',
            src: __uri('./img/widget-shape-round-rectangle.png')
        },
        {
            type: 'widget-shape-circle',
            src: __uri('./img/widget-shape-circle.png')
        },
        {
            type: 'widget-shape-triangle',
            src: __uri('./img/widget-shape-triangle.png')
        },
        {
            type: 'widget-shape-h-line',
            src: __uri('./img/widget-shape-h-line.png')
        },
        {
            type: 'widget-shape-polygon',
            src: __uri('./img/widget-shape-polygon.png')
        },
        {
            type: 'widget-shape-ellipse',
            src: __uri('./img/widget-shape-ellipse.png')
        },
        {
            type: 'widget-shape-star',
            src: __uri('./img/widget-shape-star.png')
        },
        {
            type: 'widget-shape-heart',
            src: __uri('./img/widget-shape-heart.png')
        }
    ];
}

// 常用文字列表
function getTextList() {
    return [
        {
            type: 'maxTitle',
            src: __uri('./img/h5-text1.jpg'),
            config: {
                fontSize: 48,
                textLineHeight: 48,
                size: {
                    width: 288,
                    height: 50
                },
                text: '请输入大标题'
            }
        },
        {
            type: 'title',
            src: __uri('./img/h5-text2.jpg'),
            config: {
                fontSize: 32,
                textLineHeight: 32,
                size: {
                    width: 160,
                    height: 34
                },
                text: '请输入标题'
            }
        },
        {
            type: 'subtitleTitle',
            src: __uri('./img/h5-text3.jpg'),
            config: {
                fontSize: 24,
                textLineHeight: 24,
                size: {
                    width: 144,
                    height: 26
                },
                text: '请输入副标题'
            }
        },
        {
            type: 'minTitle',
            src: __uri('./img/h5-text4.jpg'),
            config: {
                fontSize: 18,
                textLineHeight: 18,
                size: {
                    width: 108,
                    height: 20
                },
                text: '请输入小标题'
            }
        },
        {
            type: 'contentText',
            src: __uri('./img/h5-text5.jpg'),
            config: {
                fontSize: 14,
                textLineHeight: 14,
                size: {
                    width: 70,
                    height: 16
                },
                text: '请输入正文'
            }
        },
    ];
}

// 常用表单列表
function getFormList() {
    return [
        {
            type: 'form1',
            src: __uri('./img/h5-form1.png'),
            config: {
                fileds: ['name', 'mobile', 'address']
            }
        },
        {
            type: 'form2',
            src: __uri('./img/h5-form2.png'),
            config: {
                fileds: ['message']
            }
        },
    ];
}

export default createReducer(initialState, {});


