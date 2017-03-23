import React, {Component} from 'react';
import './index.less';
import Img from 'common/component/Img';
import * as media from 'common/util/media';
export default class CommunityList extends Component {
    constructor(props) {
        super(props);
    }

    state = {};

    socialCategoryList = () => {
        const contents = this.props.data;
        return ( <div>{
            contents && contents.map((items, key) => (
                <div key={key}>
                    <p className="social-title">
                        <i>{items.title}</i>
                        <em>{items.desc}</em>
                    </p>
                    {
                        this.socialCardList(items)
                    }
                </div>
            ))
        }
        </div>);
    }
    //"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png
    socialCardList = (data) => {
        return ( <div>{
            data && data.items && data.items.map((item, index) => (
                <div key={index} className="social-card">
                    <div style={{width: 200, height: 233, 'marginBottom': 30}}>
                        <div className="social-image">
                            <Img alt={item.name} width="100%" src={media.getMediaUrl(item.qrcode, 100)}/>
                        </div>
                        <div className="social-desc">
                            <p>{item.name}</p>
                        </div>
                    </div>
                </div>
            ))
        }
        </div>);
    }

    render() {
        return (
            <div className="help-community-component">
                <div className="social-container">
                    {this.socialCategoryList()}
                </div>
            </div>
        );
    }
}
