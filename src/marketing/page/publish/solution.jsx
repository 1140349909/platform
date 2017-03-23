import React from 'react';
import {message, Card, Row, Col} from 'antd';
import PageBase from 'common/base/PageBase';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as distributeAction from 'common/store/distribute/action';
import * as hrddAction from 'common/store/hrdd/action';
import * as ApiHrdd from 'common/api/hrdd';
import {PublishImgList} from 'common/component/PublishSelectShow';
import PublishSelectMoreShow from 'common/component/PublishSelectMoreShow';
import './solution.less';
import Img from 'common/component/Img';

@connect(
    state => ({
        operation: state.operation,
        distribute: state.distribute.toJS(),
        hrdd: state.hrdd.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...distributeAction,
            ...hrddAction
        }, dispatch)
    })
)

export default class PublishIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        resType: 'content'
    };

    componentDidMount() {

    }

    // 异步请求回调
    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            case distributeAction.GET_CONTENT_LIST_PENDING:
                this.setState({
                    status: 'pending'
                });
                break;
            case distributeAction.GET_CONTENT_LIST_SUCCESS:
                this.setState({
                    show: true,
                    status: 'success'
                });
                break;
            case hrddAction.LOGIN_HONGREN_SUCCESS:
                this.setState({
                    loginInfo: nextProps.hrdd.loginInfo
                });
                break;
            case hrddAction.SPREAD_HONGREN_SUCCESS:
                this.setState({
                    spreadInfo: nextProps.hrdd.spreadInfo
                });
                break;
            default:
                break;
        }
    }

    // 获取资讯图文
    getContentList = (params) => {
        this.props.actions.getContentList(params);
    };

    // 获取资讯图文
    getAppDataList = (params) => {
        this.props.actions.getAppDataList(params);
    };

    showSelect = () => {
        switch (this.state.resType) {
            case 'content':
                this.getContentList({
                    page: 0,
                    size: 10,
                    resType: 'content',
                    status: 'published',
                    // idChannel: 'vsite'
                });
                break;
            case 'h5':
                this.getAppDataList({
                    page: 0,
                    size: 10,
                    categorytype: 'my',
                    resType: 'content',
                    status: 'published',
                    // idChannel: 'vsite'
                });
                break;
        }
    };

    hideSelect = () => {
        this.setState({
            show: false
        });
    };

    onClick = (type) => {

        switch (type) {
            case 'coming':
                message.info('正在准备中，敬请期待！');
                break;
            case 'ready':
                //调出modal
                // message.info('已经准备好，可以跳转！');
                this.showSelect();
                break;
        }

    };

    loginHongrendd = () => {
        this.props.actions.loginHongrendd();
    };

    spreadHongrendd = (params) => {
        this.props.actions.spreadHongrendd(params);
    };

    sendHongrenddLoginForm = (params) => {
        ApiHrdd.sendHongrenddLoginForm(params);
    };

    render() {

        let {show} = this.state;

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

        // let number = 24 / (content.length);
        let contentList = [];

        content.map((item, index) => {

            contentList.push(
                <Col span={6} key={index}>
                    <a href="javascript:void(0)" onClick={() => this.onClick(item.status)}>
                        <div style={{'padding': '24px', 'textAlign': 'center'}}>
                            <Img src={item.img} alt="测试" style={{'height': 'auto'}}/>
                            <p style={{'margin': '15px auto 10px'}} className="publish-service-title">{item.title}</p>
                            <p className="publish-service-content">{item.content}</p>
                        </div>
                    </a>
                </Col>
            );
        });

        let resType = 'conetnt';

        return (
            <div style={{'background': '#eff2f7', 'padding': '20px', 'height': '100%'}}>

                <Card title="选择推广方案" style={{'height': '100%'}}>
                    <Row gutter={16}>
                        {contentList}
                    </Row>
                </Card>
                {show && <PublishSelectMoreShow visible={show}
                                                resType={resType}
                                                status={this.state.status}
                                                getContentList={this.getContentList}
                                                getAppDataList={this.getAppDataList}
                                                distribute={this.props.distribute}
                                                loginHongrendd={this.loginHongrendd}
                                                sendHongrenddLoginForm={this.sendHongrenddLoginForm}
                                                spreadHongrendd={this.spreadHongrendd}
                                                spreadInfo={this.state.spreadInfo}
                                                reset={this.hideSelect}/>}
            </div>
        );
    }
}


