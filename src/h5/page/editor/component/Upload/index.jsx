import React, {Component} from 'react';
import {message} from 'antd';
import AuthUpload from 'common/component/AuthUpload';
// import {addEvent} from 'common/util/index';
import {MEDIA_RES_TYPE,  OWNER} from 'common/config/constants';
import * as media from 'common/util/media';

class Upload extends Component {

    constructor(props) {
        super(props);
        this.callback = null;

    }

    onUpload = (callback) => {
        this.callback = callback;
        document.querySelector('.h5-upload input').click();
    }

    render() {
        const {style} = this.props;

        const uploadProps =  {
            action: media.addMedia({owner: OWNER.BIZ, restype: MEDIA_RES_TYPE.MATERIAL}),
            name: 'media',
            showUploadList: false,
            withCredentials: true,
            onChange: (info) => {
                if (info.file.status === 'done') {
                    if (info.file.response.errCode == 0) {
                        this.callback(info.file.response.data);
                    } else {
                        message.error(info.file.response.errMsg);
                    }
                    this.callback = null;
                    
                } else if (info.file.status === 'error') {
                    message.error('图片上传失败!');
                    this.callback = null;
                }
            }
        };
        
        return (
           <AuthUpload {...uploadProps} style={style} className="h5-upload"></AuthUpload>
        );
    }
}

Upload.defaultProps = {
    style: {}
};


export default Upload;
