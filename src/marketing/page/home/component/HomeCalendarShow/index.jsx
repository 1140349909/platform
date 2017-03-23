import React, {Component} from 'react';
import {Modal} from 'antd';
import Img from 'common/component/Img';
import './index.less';

export default class CalendarModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: parseInt(props.month)
        };
    }

    selectItem = (direction)=> {

        let {index} = this.state;

        let value = {
            left: index > 1 ? index - 1 : 1,
            right: index < 12 ? index + 1 : 12
        };

        this.setState({
            index: value[direction]
        });

    };

    render() {

        let {handleCancel, visible} = this.props;

        let {index} = this.state;

        let imgList = {
            1:require('./img/1.png'),
            2:require('./img/2.png'),
            3:require('./img/3.png'),
            4:require('./img/4.png'),
            5:require('./img/5.png'),
            6:require('./img/6.png'),
            7:require('./img/7.png'),
            8:require('./img/8.png'),
            9:require('./img/9.png'),
            10:require('./img/10.png'),
            11:require('./img/11.png'),
            12:require('./img/12.png'),
        };

        return (
            <Modal title='查看营销日'
                   width="940px"
                   style={{top: 50}}
                   wrapClassName="home-calendar-modal"
                   onCancel={handleCancel}
                   maskClosable={false}
                   footer={null}
                   visible={visible}>
                <div style={{'textAlign': 'center','height':'594px'}}>
                    <p >
                        <a href="javascript:void(0)" onClick={()=>this.selectItem('left')}>
                            <Img src={require('./img/left.png')} alt=""
                                 style={{'height': 'auto', 'verticalAlign': 'text-bottom'}}/>
                        </a>
                        <span className="home-calendar-title">{index}月</span>
                        <a href="javascript:void(0)" onClick={()=>this.selectItem('right')}>
                            <Img src={require('./img/right.png')} alt=""
                                 style={{'height': 'auto', 'verticalAlign': 'text-bottom'}}/>
                        </a>
                    </p>
                    <br/>
                    <Img src={imgList[index]} alt="" style={{'width': '100%', 'height': 'auto','padding':'0 50px'}}/>
                </div>

                {/*<Calendar defaultValue={moment().locale('zh_CN')}
                 locale={zhCN}
                 fullscreen={false} onPanelChange={onPanelChange}/>*/}
            </Modal>
        );
    }
}
