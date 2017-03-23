import React, {Component} from 'react';
import {Radio, Pagination, Upload, Modal, message, Spin} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getMediaUrl, addMedia} from 'common/util/media';
import * as mediaAction from '../../store/media/action';
import IconFont from 'common/component/IconFont';
import Img from 'common/component/Img';
import UploadFrame from 'common/component/UploadFrame';
import './index.less';

import {MEDIA_RES_TYPE, MEDIA_MIME_TYPE} from 'common/config/constants';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

@connect(
    state => ({
        operation: state.operation,
        commonMedia: state.commonMedia.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...mediaAction,
        }, dispatch)
    })
)

export default class StyleList extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        listLoading: true,
        data: null,
        owner: 'platform',
        size: 10,
        page: 1,
        mediaId: this.props.selected || '',
    }

    componentWillMount() {
        this.list();
    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {

            // 用户获取媒体资源 SUCCESS
            case mediaAction.GET_COMMON_MEDIA_LIST_SUCCESS:
                this.setState({
                    data: nextProps.commonMedia.mediaList,
                    listLoading: false,
                });
                break;

            // 用户获取媒体资源 FAILURE
            case mediaAction.GET_COMMON_MEDIA_LIST_FAILURE:
                this.setState({
                    listLoading: false,
                });
                break;

            // 用户获取媒体资源 FAILURE
            case mediaAction.DELETE_MEDIA_SUCCESS:
                this.list();
                break;
        }
    }


    // 选择项
    radioGroupChange = (e) => {
        const owner = e.target.value;
        if (this.state.owner == owner) {
            return;
        }
        this.setState({
            owner,
        }, () => this.list());
    }

    // 选中的图片
    handelSelect = (mediaId) => {
        if (this.state.mediaId == mediaId) {
            return;
        }

        this.setState({
            mediaId,
        });

        if (this.props.selectedCallback) {
            this.props.selectedCallback(mediaId);
        }
    }

    list = (page = 0) => {

        const size = this.state.owner == 'platform' ? 10 : 9;

        const params = {
            page,
            size,
            owner: this.state.owner,
            resType: MEDIA_RES_TYPE.REDENVELOPE,
            mimeType: MEDIA_MIME_TYPE.IMAGE
        };

        this.props.actions.getMediaList(params);

        this.setState({
            size,
            listLoading: true,
            page: page + 1,
        });
    }

    uploadChange = (e) => {
        if (e.file.status == 'done') {
            this.list();
        }
    }

    // 分页改变回调
    paginationChange = (page) => {
        this.list(page - 1);
    }

    handelDel = (id) => {
        confirm({
            title: '是否删除自定义的图片?',
            onOk: () => {
                this.props.actions.deleteMedia([id], MEDIA_RES_TYPE.REDENVELOPE);
            }
        });
    }

    beforeUpload = (file) => {
        if (file.size > 1548576) {
            message.warning('请选择1.5M以下的图片');
            return false;
        }

        if (file.type !== 'image/jpeg' && file.type !== 'image/gif' && file.type !== 'image/png' && file.type !== 'image/bmp') {
            message.warning('请选择正确的图片格式!');
            return false;
        }
    }

    render() {
        let styleItem = [];

        const props = {
            name: 'media',
            showUploadList: false,
            withCredentials: true,
            action: addMedia({
                owner: 'users',
                restype: 'redenvelope'
            }),
        };

        if (this.state.data) {
            this.state.data.content.map((item, index) => {
                const active = this.state.mediaId == item.mediaId ? 'packetshow-stylelist-active' : '';
                styleItem.push(
                    <div
                        key={index}
                        className={'packetshow-stylelist-item ' + active}>
                        <div className="packetshow-stylelist-img" onClick={() => this.handelSelect(item.mediaId)}>
                            <Img src={item.mediaId}/>
                        </div>
                        {this.state.owner == 'users' &&
                        <div className="packetshow-stylelist-delete" onClick={() => this.handelDel(item.id)}>
                            <IconFont type="shanchu"/>
                        </div>
                        }
                    </div>
                );
            });
        }
        return (
            <div className="packetshow-stylelist">
                <div className="content-tools-tabs ant-radio-group-dark">
                    <RadioGroup defaultValue={this.state.owner} onChange={this.radioGroupChange}>
                        <RadioButton value="platform">热门样式</RadioButton>
                        <RadioButton value="users">自定义</RadioButton>
                    </RadioGroup>
                </div>

                {/*红包数据是否拿到*/}
                {this.state.data &&
                <div>
                    <div className="packetshow-stylelist-box">
                        {!this.state.listLoading &&
                        <div>
                            {/*收藏选项时，显示上传图片*/}
                            {this.state.owner == 'users' &&
                            <div className="packetshow-stylelist-item packetshow-stylelist-add">
                                <Upload
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.uploadChange}
                                    {...props}>
                                    <UploadFrame
                                        tip="点击上传"
                                        status={'not'}/>
                                </Upload>
                            </div>
                            }
                            {styleItem}
                        </div>
                        }
                        {this.state.listLoading &&
                        <Spin/>
                        }
                    </div>
                    <Pagination
                        current={this.state.page}
                        className="packetshow-stylelist-pagination"
                        total={this.state.data.totalElements || 1}
                        pageSize={this.state.size}
                        onChange={this.paginationChange}/>
                </div>
                }
            </div>);
    }
}


