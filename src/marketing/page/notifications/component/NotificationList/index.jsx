import React, {Component}from 'react';
import  './index.less';
import {Pagination} from 'antd';
import _ from 'lodash';
import Img from 'common/component/Img';
export default class NotificationList extends Component {
    constructor(props) {
        super(props);
    }

    state = {};

    getNoticeList = () => {
        const {content} = this.props.data;
        return (<div>{
            content && content.map((item, i) => (
                <div key={i} className='notification'>
                    <div className='notification-icon'>
                        <div className='middle-inner'>
                            <div className='img'><Img src='default.png'/></div>
                        </div>
                    </div>
                    <div className='detailInfo' onClick={() => this.props.getUserNotice(item.id)}>
                        <p className='noti-title'>
                            {item.title}
                            {
                                !item.hasRead &&
                                <span className='hasRead-flag'></span>
                            }
                        </p>
                        <div className='content' dangerouslySetInnerHTML={{__html: item.content}}></div>
                        <p className='noti-time'>{item.createdDate}</p>
                    </div>
                </div>
            ))
        }</div>);
    }

    render() {
        const {data} = this.props;
        return (
            <div>
                {
                    data && !_.isEmpty(data.content) &&
                    this.getNoticeList()
                }
                {
                    data && !_.isEmpty(data.content) &&
                    <div className='noti-pagination'>
                        <Pagination size='large' total={data.numberOfElements}
                                    onChange={this.props.onPaginationChange}/>
                    </div>
                }
                {
                    data && _.isEmpty(data.content) &&
                    <div className='desc'>
                        <i className='iconfont icon-ku' style={{'fontSize': '200px'}}></i>
                        {/* <p >没有匹配数据</p>*/}
                    </div>
                }
            </div>
        );
    }
}


