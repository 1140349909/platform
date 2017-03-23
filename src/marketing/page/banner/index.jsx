import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as bannerAction from '../../store/banner/action';
import BannerForm from './component/BannerForm';
import './index.less';

@connect(
    state => ({
        banner: state.banner.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...bannerAction
        }, dispatch)
    })
)
export default class BannerIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        'buyType': this.props.params.type,
        'bannerItems':null
    };

    componentDidMount() {
        this.getManagerBanner(this.props.params.type);
    }

    componentDidUpdate(prevProps) {
        // respond to parameter change in scenario 3
        let oldType = prevProps.params.type;
        let newType = this.props.params.type;

        if (newType !== oldType) {
            this.setState({
                'buyType': newType
            });
            this.getManagerBanner(newType);
        }
    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            case bannerAction.UPDATE_MANAGER_BANNER_SUCCESS:
                message.success('保存成功！');
                this.getManagerBanner(this.state.buyType);
                break;
            case bannerAction.GET_MANAGER_BANNER_SUCCESS:
                this.setState({
                    bannerItems:nextProps.banner.bannerItems
                });
                break;
        }
    }

    getManagerBanner = (buyType)=> {

        this.props.actions.getManagerBanner(buyType);
    };

    updateManagerBanner = (buyType, data)=> {

        this.props.actions.updateManagerBanner(buyType, data);
    };


    render() {

        /*if (!this.props.banner.bannerItems.banners) {
            return null;
        }*/

        if (!this.state.bannerItems) {
            return null;
        }

        return (
            <div className="app-page" style={{'height':'100%'}}>
                <Card title="广告条设置" style={{'height':'100%','overflowY':'scroll'}} extra={'在此设置平台的广告条，最多支持上传5张图片，建议图片尺寸640*320'}>
                    <BannerForm
                        buyType={this.state.buyType}
                        data={this.state.bannerItems}
                        updateManagerBanner={this.updateManagerBanner}
                    />
                </Card>
            </div>
        );
    }
}
