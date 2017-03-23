import React, {Component} from 'react';
import * as media from 'common/util/media';
import Img from 'common/component/Img';
import './index.less';

export default class CardStyle extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { cardStyle }= this.props;

        let bgColor = {};

        if (cardStyle.bgRadio == 'img') {
            bgColor = {
                style: {
                    backgroundImage: 'url(' + media.getMediaUrl(cardStyle.bgImg) + ')',
                }
            };
        } else {
            bgColor = {
                style: {
                    backgroundColor: cardStyle.bgColor,
                }
            };
        }

        const fontColor = {
            style: {
                color: cardStyle.fontColor
            }
        };

        return (
            <div className="card-style" {...bgColor}>
                <div className="card-style-hd">
                    <div className="card-style-hdimg">
                        <Img src="./img/page1.png"/>
                    </div>
                    <div className="card-style-name" {...fontColor}>
                        姓名
                </div>
                </div>
                <div className="card-style-ft">
                    <div className="card-style-title" {...fontColor}>
                        {cardStyle.title}
                    </div>
                <div className="card-style-number" {...fontColor}>2089 1234 3213</div>
                </div>
            </div>
        );
    }
}

