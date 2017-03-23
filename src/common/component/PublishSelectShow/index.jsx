import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Row, Col, Modal,message} from 'antd';
import {connect} from 'react-redux';
import './index.less';
import {getContentShowUrl, getIlokaContentUrl} from 'common/util/url';
import {getMediaUrl} from 'common/util/media';
import Img from 'common/component/Img';
import * as ApiHrdd from 'common/api/hrdd';
import * as hrddAction from 'common/store/hrdd/action';

let PublishImgList = {
    people: require('./img/people.png'),
    mvp: require('./img/mvp.png')
};

@connect(
    state => ({
        operation: state.operation,
        hrdd:state.hrdd.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...hrddAction
        }, dispatch)
    })
)

class PublishSelectShow extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.beforeSubmit();
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case hrddAction.SPREAD_HONGREN_SUCCESS:
                this.setState({
                    spreadInfo: nextProps.hrdd.spreadInfo
                });
                break;
        }
    }

    spreadHongrendd = (params)=> {
        this.props.actions.spreadHongrendd(params);
    };

    sendHongrenddLoginForm = (params) => {
        ApiHrdd.sendHongrenddLoginForm(params);
    };

    onClick = (type) => {

        switch (type) {
            case 'coming':
                message.info('正在准备中，敬请期待！');
                break;
            case 'ready':
                this.handleSubmit(this.state.spreadInfo);
                break;
        }

    };

    beforeSubmit = ()=>{

        let {resType,data} = this.props;

        let contentSourceUrl = '';

        // 发布url生成
        switch (resType) {
            case 'content':
                // 图文资讯发布地址
                contentSourceUrl = getContentShowUrl(data.uin, data.id, true);
                break;
            case 'h5':
                // 艾乐卡预览地址
                // 对普通模板而言没有data.resId，只有data.id
                // 对活动H5而言有data.resId
                contentSourceUrl = getIlokaContentUrl(data.id ? data.id : data.tplId);
                break;

        }

        // 获取逻辑：微信>微站>微博>头条
        let submitData = {};

        if(data.distributeChannels.indexOf('wx') != -1){
            submitData = data.wx;
        }else if(data.distributeChannels.indexOf('vsite') != -1){
            submitData = data.vsite;
        }else if(data.distributeChannels.indexOf('wb') != -1){
            submitData = data.wb;
            submitData.title = '艾乐卡推广';
        }else if(data.distributeChannels.indexOf('toutiao') != -1){
            submitData = data.toutiao;
        }

        // console.dir(data);

        this.spreadHongrendd({
            resId: data.resId ? data.resId : data.id,
            data: {
                share:{
                    author: submitData.author?submitData.author:'艾乐卡推广',
                    contentSourceUrl: contentSourceUrl+'?channel=hongrendd',
                    desc: submitData.desc?submitData.desc:'艾乐卡推广',
                    imgId: submitData.imgId,
                    imgUrl: submitData.imgUrl?submitData.imgUrl:getMediaUrl(submitData.imgId),
                    title: submitData.title?submitData.title:'艾乐卡推广',
                }
            }
        });
    }

    handleSubmit = (params) => {

        this.sendHongrenddLoginForm(params);


        message.info('跳转中,如果没反应，请允许浏览器弹出新页面，并重试!');
        // console.log(content);
    };

    render() {

        let {visible, data, reset} = this.props;

        let content = [
            {
                img: PublishImgList.people,
                title: '按接单人数',
                content: '自设单价，全网覆盖，转的人越多，效果越佳',
                status: 'ready'
            }, {
                img: PublishImgList.mvp,
                title: '按指定红人',
                content: '多维筛选，精准投放，正在准备中，敬请期待',
                status: 'coming'
            },
        ];

        let number = 24 / (content.length);
        let contentList = [];

        content.map((item, index) => {

            contentList.push(
                <Col span={number} key={index}>
                    <a href="javascript:void(0)" onClick={() => this.onClick(item.status,data)}>
                        <div style={{'padding': '24px', 'textAlign': 'center'}}>
                            <Img src={item.img} alt="测试" style={{'height': 'auto'}}/>
                            <p style={{'margin': '15px auto 10px'}} className="publish-select-title">{item.title}</p>
                            <p className="publish-select-content">{item.content}</p>
                        </div>
                    </a>
                </Col>
            );
        });


        return (
            <Modal title={null}
                   visible={visible}
                   width={620}
                   style={{top: 200}}
                   footer={null}
                   maskClosable={false}
                   onCancel={reset}>
                <div style={{'width':'80%','margin':'34px auto 16px','textAlign':'center'}}>
                    <div className="publish-modal-title">
                        选择您的推广方式！
                    </div>
                    <Row gutter={16}>
                        {contentList}
                    </Row>
                </div>
            </Modal>
        );
    }
}

export {
    PublishImgList,
    PublishSelectShow
};
