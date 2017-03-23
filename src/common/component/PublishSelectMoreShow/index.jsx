import React, {Component} from 'react';
import {Modal, Radio, Button, message} from 'antd';
import './index.less';
import {getContentShowUrl, getIlokaContentUrl} from 'common/util/url';
// import {dateFormat} from 'common/util';
import {transformArray} from 'common/util/index';
import {getMediaUrl} from 'common/util/media';
import Img from 'common/component/Img';
import PullLoad from '../PullLoad';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

{/*<ContentSelectMoreShow visible={wxShow}
 id={data.id}
 resType={resType}
 content={content}
 status={this.state.status}
 getContentList={this.getContentList}
 getAppDataList={this.getAppDataList}
 distribute={this.props.distribute}
 saveContentInfo={this.saveContentInfo}
 reset={this.wxHide}*/
}


// 选择资讯图文或活动H5
export default class PublishSelectMoreShow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            resType: 'content',
            page: 0,
            content: [],
            idList: []
        };
    }

    onSelect = (data) => {

        //是否在select阶段就构造数据？

        /*let disableWX = (data.wx ? (
         (!data.wx.imgId || data.wx.imgId == '') ||
         (!data.wx.title || data.wx.title == '') ||
         (!data.wx.author || data.wx.author == '') ||
         (!data.wx.desc || data.wx.desc == '')) : true);*/

        /*if (disableWX) {
         message.error('不可勾选信息不完整的图文或活动！');
         return null;
         }*/

        let {content, idList} = this.state;

        if (idList.indexOf(data.id) != -1) {
            content.splice(content.indexOf(data), 1);
            idList.splice(idList.indexOf(data.id), 1);
        } else {
            content.push(data);
            idList.push(data.id);
        }

        if (content.length < 2) {

            this.setState({
                content: content
            },()=>this.beforeSubmit(this.state.content));
        } else {
            if (idList.indexOf(data.id) != -1) {
                content.splice(content.indexOf(data), 1);
                idList.splice(idList.indexOf(data.id), 1);
            }
            message.error('最多允许选择1条图文或活动');
        }
    };

    handleScroll = () => {

        this.setState({
            page: this.state.page + 1,
        }, () => {

            switch (this.state.resType) {
                case 'content':
                    this.props.getContentList({
                        page: this.state.page,
                        size: 10,
                        resType: 'content',
                        status: 'published',
                        // idChannel: 'vsite'
                    });
                    break;
                case 'h5':
                    this.props.getAppDataList({
                        page: this.state.page,
                        size: 10,
                        categorytype: 'my',
                        resType: 'h5',
                        status: 'published',
                        // idChannel: 'vsite'
                    });
                    break;
            }

        });
    };

    onChange = (e) => {
        this.setState({
            resType: e.target.value
        }, () => {
            switch (this.state.resType) {
                case 'content':
                    this.props.getContentList({
                        page: 0,
                        size: 10,
                        resType: 'content',
                        status: 'published',
                        // idChannel: 'vsite'
                    });
                    break;
                case 'h5':
                    this.props.getAppDataList({
                        page: 0,
                        size: 10,
                        categorytype: 'my',
                        resType: 'h5',
                        status: 'published',
                        // idChannel: 'vsite'
                    });
                    break;
            }
        });
    };

    getItem = (item, style) => {
        // 获取逻辑：微信>微站>微博
        let submitData = {};

        if (item.distributeChannels.indexOf('wx') != -1) {
            submitData = item.wx;
        } else if (item.distributeChannels.indexOf('vsite') != -1) {
            submitData = item.vsite;
        } else if (item.distributeChannels.indexOf('wb') != -1) {
            submitData = item.wb;
            submitData.title = '艾乐卡推广';
        } else {
            submitData.ImgUrl = './img/default.png';
            submitData.title = '艾乐卡推广';
        }

        // console.log(submitData.ImgUrl)

        return {
            img: <Img src={submitData.ImgUrl ? submitData.ImgUrl :
                (submitData.ImgId ? submitData.ImgId : require('./img/default.png'))} alt=""
                      style={style}/>,
            title: submitData.title
        };
    };

    beforeSubmit = (content)=>{

        if (content.length == 0) {
            return null;
        }

        let {spreadHongrendd} = this.props;
        let {resType} = this.state;

        let data = content[0];
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
                // data.tplId : data.id
                contentSourceUrl = getIlokaContentUrl(data.id ? data.id : data.tplId);
                break;
        }

        // 获取逻辑：微信>微站>微博
        let submitData = {};

        if (data.distributeChannels.indexOf('wx') != -1) {
            submitData = data.wx;
        } else if (data.distributeChannels.indexOf('vsite') != -1) {
            submitData = data.vsite;
        } else if (data.distributeChannels.indexOf('wb') != -1) {
            submitData = data.wb;
            submitData.title = '艾乐卡推广';
        }else if(data.distributeChannels.indexOf('toutiao') != -1){
            submitData = data.toutiao;
        }

        spreadHongrendd({
            resId: data.resId ? data.resId : data.id,
            data: {
                share: {
                    author: submitData.author ? submitData.author : '艾乐卡推广',
                    contentSourceUrl: contentSourceUrl+'?channel=hongrendd',
                    desc: submitData.desc ? submitData.desc : '艾乐卡推广',
                    imgId: submitData.imgId,
                    imgUrl: submitData.imgUrl ? submitData.imgUrl : getMediaUrl(submitData.imgId),
                    title: submitData.title ? submitData.title : '艾乐卡推广',
                }
            }
        });
    }

    handleSubmit = (content) => {

        let {sendHongrenddLoginForm,spreadInfo} = this.props;

        if (content.length == 0) {
            message.error('请勾选1篇图文或活动！');
            return null;
        }

        // 唤起表单
        sendHongrenddLoginForm(spreadInfo);

        // console.log(content);
        Modal.info({
            title: '跳转中',
            content: (
                <div>
                    <p>如果没反应，请允许浏览器弹出新页面，并重试</p>
                </div>
            ),
            onOk() {
            },
        });
    };

    render = () => {

        let {visible, reset, distribute, status} = this.props;

        // console.dir(distribute)

        let {content, idList, resType} = this.state;

        let {contentList, contentMineList} = distribute;

        let contents = transformArray(contentMineList);

        let contentsList = [];

        contents.map((data, index1) => {

            contentsList.push(
                <div key={index1}>
                    <p style={{'lineHeight': ' 16px', 'marginBottom': '16px'}}><span
                        className="content-select-label">{data.time}</span></p>
                    {
                        data.response.map((item, index2) => (
                            <div key={index2} className="content-release-select"
                                 onClick={() => this.onSelect(item)}>
                                {idList.indexOf(item.id) != -1 && <div
                                    style={{
                                        'width': '160px',
                                        'height': '210px',
                                        'position': 'absolute',
                                        'background': 'rgba(0,0,0,0.5)',
                                        'zIndex': '1'
                                    }}>
                                    <div className="content-icon-background">
                                        <i className="iconfont icon-xuanzhong content-icon-select"/>
                                    </div>
                                </div>}
                                <div style={{
                                    'width': '100%',
                                    'height': '160px',
                                    'position': 'relative'
                                }}>
                                    {/*{this.getItem(item, {'width': '100%', 'height': '160px'}).img}*/}
                                    {item.vsite && item.vsite.imgId && <Img src={item.vsite.imgId} alt="" style={{
                                        'width': '100%',
                                        'height': '160px',
                                    }}/>}
                                    {(!item.vsite || !item.vsite.imgId) && <Img src='./img/default.png' alt="" style={{
                                        'width': '100%',
                                        'height': '160px',
                                    }}/>}
                                </div>
                                <div style={{'padding': '6px'}}>
                                    <p style={{
                                        'fontSize': '13px',
                                        'color': '#39404a',
                                        'lineHeight': '18px',
                                        'textOverflow': 'ellipsis',
                                        'overflow': 'hidden',
                                        'height': '18px'
                                    }}>
                                        {/*{this.getItem(item, {'width': '100%', 'height': '160px'}).title}*/}
                                        {item.vsite ? (item.vsite.title ? item.vsite.title : '标题未编辑') : '标题未编辑'}
                                    </p>
                                    <p style={{'fontSize': '12px', 'color': '#999999', 'lineHeight': '18px'}}>
                                        创建于{item.dateArray.createdDate}</p>
                                </div>

                            </div>
                        ))
                    }
                </div>
            );
        });

        let footer = (
            <div style={{'textAlign': 'center'}}>
                <Button className="content-button-cancel" onClick={reset}>取消</Button>
                <Button className="content-button-confirm" type="primary"
                        onClick={() => this.handleSubmit(content)}>确定</Button>
            </div>
        );

        // 提供用户获取资讯列表数据服务
        //resType:content
        //status:edit
        //idChannel:wx

        let RadioButtonList = [
            {
                name: '资讯图文',
                value: 'content',
            }, {
                name: '活动H5',
                value: 'h5',
            }
        ];

        let RadioList = [];

        RadioButtonList.map((item) => {
            let RadioButtonItem = (
                <RadioButton key={item.value}
                             disabled={item.disabled}
                             value={item.value}>
                    {item.name}
                </RadioButton>
            );

            RadioList.push(RadioButtonItem);

        });

        return (
            <div>
                <Modal
                    title="选择作品"
                    width={836}
                    style={{top: 50}}
                    footer={footer}
                    onCancel={reset}
                    visible={visible}>
                    <div className="ant-radio-group-grey" style={{'marginBottom': '14px', 'textAlign': 'center'}}>
                        <RadioGroup defaultValue={resType} onChange={this.onChange}>
                            {RadioList}
                        </RadioGroup>
                    </div>
                    <div style={{'position': 'relative', 'height': '510px', 'marginLeft': '24px'}}>
                        {contentList.totalElements != 0 && <PullLoad
                            id="pullload2"
                            first={false}
                            status={status}
                            last={contentList.last}
                            onLoadMore={this.handleScroll}>
                            {contentsList}
                        </PullLoad>}
                        {
                            contentList.totalElements == 0 &&
                            <div style={{'lineHeight': 25, 'textAlign': 'center', 'color': '#999999', 'fontSize': 18}}>
                                暂无数据
                            </div>
                        }
                    </div>
                </Modal>
            </div>

        );
    }
}


