import React from 'react';
import {Tabs, Button, Spin, DatePicker} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PageBase from 'common/base/PageBase';
import TabHeader from '../../component/TabHeader';
import ContentList from './component/ContentList';
import JuHeList from './component/JuHeList';
import AuthModule from 'common/component/AuthModule';
import InformationList from './component/InformationList';
import * as module from 'common/config/module';
import * as contentHotAction from '../../store/contentHot/action';
import * as tagAction from '../../store/tag/action';
import * as juheAction from '../../store/juhe/action';
import {redirect} from 'common/util';
import moment from 'moment';
import {TEMPLATE} from 'common/config/constants';
// import {SIZE, PAGE} from 'common/config';
const TabPane = Tabs.TabPane;
import _ from 'lodash';
@connect(
    state => ({
        operation: state.operation,
        contentHot: state.contentHot.toJS(),
        tag: state.tag.toJS(),
        juhe: state.juhe.toJS(),
        activeKey: '/content/tpl/',
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...contentHotAction,
            ...tagAction,
            ...juheAction
        }, dispatch)
    })
)
export default class TplIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        size: 20,
        type: TEMPLATE.HOTARTICLE,//文章类型 ：热点资讯hotArticle  深度观点depthView
        tags: '',
        date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        hotLoading: false,
        data: [],
        defaultSelectedKeys: []
    }

    componentDidMount() {
        let type = this.props.params.type;
        this.setState({
            type: type
        });
        if (type == TEMPLATE.HOTARTICLE) {
            this._filterContentHotList({
                type: TEMPLATE.HOTARTICLE,
                sort: 'opdata.pv,opdata.praise',
                order: 'desc',
                date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
                page: 0,
                size: this.state.size
            });
        } else if (type == TEMPLATE.DEPTHVIEW) {
            this._filterContentHotList({
                type: TEMPLATE.DEPTHVIEW,
                sort: 'createdDate',
                order: 'desc',
                page: 0,
                size: this.state.size
            });
        }
    }

    componentDidUpdate(prevProps) {
        // 路由切换后初始化数据
        if (!_.isEqual(this.props.data, prevProps.data)) {
            /*console.log(prevProps);
            console.log('路由切换后初始化数据');*/
            this.setState({
                defaultSelectedKeys: []
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case contentHotAction.GET_HOT_CONTENT_LIST_PENDING :
                this.setState({
                    hotLoading: true
                });
                break;
            case contentHotAction.GET_HOT_CONTENT_LIST_SUCCESS:
                this.setState({
                    hotLoading: false
                });
                break;
            case tagAction.GET_USER_TAG_LIST_SUCCESS:
                let tagData = this._renderTag();
                this.setState({
                    data: tagData[0],
                    defaultSelectedKeys: tagData[1]
                });
                break;
        }
    }

    //图文列表
    getContentHotList = (params) => {
        // let type = this.props.params.type;
        this.setState(params, () => {
            const {
                type, tags, date, page = 0, size = this.state.size,
                sort = type == TEMPLATE.HOTARTICLE ? 'opdata.pv,opdata.praise' : 'createdDate',
                order = 'desc'
            } = this.state;
            this.props.actions.getContentHotList({
                type, tags, date, page, size, sort, order
            });
        });
    }
    //创建资讯图文
    onCreateContent = () => {
        this.anyWhereModule(module.CONTENT_RICHTEXT_IMPORT).then(() => {
            this.anyWhereModule(module.CONTENT_RICHTEXT_CREATE).then(() => {
                redirect('content.html#/add', '_blank');
            });
        });
    }
    //收藏热点资讯
    collectionHotContent = (id, isFavored) => {
        this.anyWhereModule(module.CONTENT_RICHTEXT_FAV).then(() => {
            if (isFavored) {
                this.cancelFavContentHot(id);
            } else {
                this.props.actions.favContentHot(id);
            }
        });
    }
    //取消收藏
    cancelFavContentHot = (id) => {
        this.props.actions.cancelFavContentHot(id);
    }
    getTags = (type) => {
        this.setState({
            data: [],
            defaultSelectedKeys: []
        });
        this.props.actions.getUserTagsList(type);
    };
    //热点资讯筛选
    hotInfomationFilter = (date, time) => {
        const day = moment(time);
        this.getJuheHistoryTodayList(
            day.month() + 1,
            day.get('date')
        );
    }

    disabledEndDate = (current) => {
        return current && current.valueOf() > Date.now();
    }
    onChangeTab = (activeKey) => {
        this.props.router.push(this.props.activeKey + activeKey);
        if (activeKey == 'history') {
            this.getJuheHistoryTodayList();
        } else {
            this._filterContentHotList({type: activeKey});
        }
    }
    //获取聚合数据集合
    getJuheHistoryTodayList = (month, day) => {
        this.props.actions.getJuheHistoryTodayList({
            month, day
        });
    }

    createUserTagList = (tags) => {
        this.props.actions.createUserTagList(tags);
    }
    //筛选平台热门资讯
    _filterContentHotList = (params) => {
        if (params.type == TEMPLATE.DEPTHVIEW) {
            this.setState({
                tags: '',
                date: ''
            });
        } else {
            this.setState({
                tags: '',
                date: moment().subtract(1, 'days').format('YYYY-MM-DD')
            });
        }
        this.getTags(params.type);
        this.getContentHotList(params);
    }
    //渲染筛选标签
    _renderTag = () => {
        const {userTagList} =this.props.tag;
        let data = [];
        let defaultSelectedKeys = [];
        _.map(userTagList, (tag, index) => {
            let tagObj = {
                title: tag.name,
                key: tag.id,
                children: tag.id != 'hotArticle-timer' ? [{
                    title: '全部',
                    key: index.toString()
                }] : []
            };
            if (tag.id == 'hotArticle-timer') {
                defaultSelectedKeys.push('24');
            } else {
                defaultSelectedKeys.push(index.toString());
            }
            _.map(tag.tags, (item) => {
                let detailTag = {
                    title: item.name,
                    key: item.tagId,
                    type: item.type
                };
                tagObj.children.push(detailTag);
            });
            data.push(tagObj);
        });
        return [data, defaultSelectedKeys];
    }

    _renderContentView = () => {
        const {hotContentList} = this.props.contentHot;
        return (<div>
                {!_.isEmpty(this.state.defaultSelectedKeys) &&
                <InformationList tags={this.state.data}
                                 type={this.state.type}
                                 getContentHotList={this.getContentHotList}
                                 defaultSelectedKeys={this.state.defaultSelectedKeys}/>
                }
                <div className='spinLoading'>
                    <Spin spinning={this.state.hotLoading} size="large" tip="正在载入新的文章 "/>
                </div>
                <ContentList data={hotContentList}
                             page={this.state.page}
                             collectionHot={this.collectionHotContent}
                             cancelFavContentHot={this.cancelFavContentHot}
                             onList={this.getContentHotList}
                             favorInfo={this.state}
                />
            </div>
        );
    }

    render() {
        const {juHeHistoryList} = this.props.juhe;
        const {operation} = this.props;
        const juheLoading = operation.type === juheAction.GET_JUHE_HISTORY_TODAY_LIST_PENDING;
        return (
            <div className='app-page contentPage content-tpl'>
                <TabHeader activeKey={this.props.activeKey + this.props.params.type}
                           contentTplCheckKeys={this.props.params.type}
                           contentMineStatus='published'
                           tabKey='content'/>
                <div className='tpl-container'>
                    <AuthModule type={module.CONTENT_RICHTEXT_CREATE}>
                        <Button type='primary' size='large' onClick={this.onCreateContent} className='content-create'>
                            <i className='iconfont icon-jia'></i>创建资讯图文
                        </Button>
                    </AuthModule>
                    <Tabs defaultActiveKey={this.props.params.type}
                          className='hotContentTab'
                          onChange={this.onChangeTab}>
                        <TabPane tab='热门文章' key={TEMPLATE.HOTARTICLE}>
                            {this._renderContentView()}
                        </TabPane>
                        <TabPane tab='历史上的今天' key='history'>
                            <DatePicker format='MM-DD' allowClear={false}
                                        onChange={this.hotInfomationFilter}
                                        disabledDate={this.disabledEndDate}
                                        defaultValue={moment().locale('en').utcOffset(0)}/>
                            <Spin spinning={juheLoading} size="large">
                                <JuHeList data={juHeHistoryList}
                                          collectionHot={this.collectionHotContent}
                                          cancelFavContentHot={this.cancelFavContentHot}
                                          favorInfo={this.state}
                                />
                            </Spin>
                        </TabPane>
                        <TabPane tab='深度观点' key={TEMPLATE.DEPTHVIEW}>
                            {this._renderContentView()}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}


