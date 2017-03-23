import React, {Component} from 'react';
import {DatePicker} from 'antd';
import './index.less';
import _ from 'lodash';

class DatePickerGroup extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        startValue: {
            data: null,
            dateString: ''
        },
        endValue: {
            data: null,
            dateString: ''
        },
        endOpen: false,
    };

    componentDidMount(){
        const {value} = this.props;
        this.updatePropsValue(value);
    }

    componentWillReceiveProps(nextProps) {
        const {value} = nextProps;
        this.updatePropsValue(value);
    }

    updatePropsValue(value){
        if (value) {
            this.setState({
                startValue: {
                    data:value[0]
                },
                endValue: {
                    data:value[1]
                }
            });
        }
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue.data;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue.data;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    handelChange = (type, data, dateString) => {
        let key = type === 'start' ? 'startValue' : 'endValue';
        this.setState({
            [key]: {
                data: data,
                dateString: dateString
            }
        }, () => {
            const {startValue, endValue} = this.state;
            if ((!endValue.dateString && !startValue.dateString) || (endValue.dateString && startValue.dateString)) {
                this.props.onChange([startValue.data, endValue.data],[startValue.dateString, endValue.dateString]);
            }
        });
    }

    render() {
        const {endOpen, startValue, endValue} = this.state;
        const {defaultValue, placeholder} = this.props;
        let resprops = _.omit(this.props, ['placeholder', 'onChange', 'value', 'defaultValue']);

        return (
            <div className="datepicker-group">
                <DatePicker
                    {...resprops}
                    value={startValue.data}
                    disabledDate={this.disabledStartDate}
                    defaultValue={defaultValue[0]}
                    style={{width:'150px', marginRight: '5px'}}
                    className="datepicker-group-start"
                    placeholder={placeholder[0]}
                    onChange={(data, dateString) => this.handelChange('start', data, dateString)}
                    onOpenChange={this.handleStartOpenChange}/>

                <DatePicker
                    {...resprops}
                    value={endValue.data}
                    style={{width:'150px'}}
                    defaultValue={defaultValue[1]}
                    disabledDate={this.disabledEndDate}
                    className="datepicker-group-end"
                    placeholder={placeholder[1]}
                    open={endOpen}
                    onChange={(data, dateString) => this.handelChange('end', data, dateString)}
                    onOpenChange={this.handleEndOpenChange}/>
            </div>
        );
    }
}

DatePickerGroup.defaultProps = {
    disabledStartDate: function () {},
    disabledEndDate: function () {},
    placeholder: ['开始日期', '结束日期'],
    defaultValue: [null,null],
};

export default DatePickerGroup;


