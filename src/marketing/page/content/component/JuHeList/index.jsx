import React from 'react';
import {withRouter} from 'react-router';
import './index.less';
import AuthComponentBase from 'common/base/AuthComponentBase';
import {redirect} from 'common/util';
import Img from 'common/component/Img';
@withRouter
export default class JuHeList extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    state = {
        favorNoText: '收藏',
        favorText: '已收藏',
    };
  
    getContentDetail = (id) => {
        redirect('marketing.html#/juHeDetail/' + id, '_blank');
        return false;
    };

    render() {
        let {result} = this.props.data;
        if (result) {
            result = result.reverse();
        }
        return (
            <div className='juContent-tpl'>
                {
                    result && result.map && result.map((item, i) =>
                        (
                            <div className="tpl-content" key={i}>
                                <div className="tpl-listImg" onClick={() => this.getContentDetail(item._id)}>
                                    {
                                        item.pic &&
                                        <Img src={item.pic}/>
                                    }
                                    {
                                        !item.pic &&
                                        <div className='juheDefaultImg'>
                                            <Img src={require('./img/default.png')}/>
                                            <span className='defaultYear'>{item.year}</span>
                                        </div>

                                    }
                                </div>
                                <div className="content-detail" onClick={() => this.getContentDetail(item._id)}>
                                    <p className="content-title">{item.title}</p>
                                    <p className="content-desc"> {item.des}</p>
                                    <div className="content-footer">
                                        <div className="footer-bread">
                                            <i className="author">{item.year ? item.year + '-' + item.month + '-' + item.day : '佚名'}</i>
                                            <i className="timer"> {item.lunar}</i>
                                        </div>
                                    </div>
                                    <div className="footer-handle"></div>
                                </div>
                            </div>
                        )
                    )
                }
                {result && result.length == 0 &&
                <div style={{
                    'marginTop': 150,
                    'textAlign': 'center',
                    'color': '#999999',
                    'fontSize': 18
                }}>
                    当前没有内容
                </div>
                }
                {(!result) &&
                <div style={{
                    'marginTop': 150,
                    'textAlign': 'center',
                    'color': '#999999',
                    'fontSize': 18
                }}>
                    当前没有内容
                </div>
                }
            </div>
        );
    }
}





