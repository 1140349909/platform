import React ,{Component} from 'react';
import { Spin } from 'antd';
import classnames from 'classnames';
import Img from 'common/component/Img';
import './index.less';


export default class UploadFrame extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        const style = {
            width: this.props.width || 130,
            height: this.props.height || 130,
        };

        const classString = classnames({
            ['uploadframe']: true,
            ['uploadframe-error']: this.props.error
        });

        const {
            icon = 'icon-tianjia',
            status = 'not',
            tip = '请上传图片',
            mediaUrl = ''
        } = this.props;
        return (
            <div style={style} className={classString}>
                { (status == 'not') &&
                    <div className="uploadframe-init">
                        <i className={'iconfont ' + icon}></i>
                        <span className="uploadframe-text">{tip}</span>
                    </div>
                }

                { (status == 'error') &&
                    <div className="uploadframe-init">
                        <span className="uploadframe-text">上传失败，请重新上传</span>
                    </div>
                }

                { status == 'pending' &&
                    <Spin tip="图片上传中..." className="uploadframe-spin"></Spin>
                }

                { (status == 'done' ) &&
                    <div style={style} className="uploadframe-img">
                        <Img src={mediaUrl}/>
                        <div className="uploadframe-tip">重新上传</div>
                    </div>
                }
            </div>
        );
    }

}
