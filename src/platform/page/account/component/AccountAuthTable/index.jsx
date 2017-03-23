import React from 'react';
import TableListBase from 'common/base/TableListBase';
import {Radio,Table} from 'antd';
const RadioGroup = Radio.Group;

export default class AccountAuthTable extends TableListBase {

    constructor(props) {
        super(props);

        this.state = {
            formData: props.formData
        };
    }

    /*handleSubmit = ()=> {

     const {form, addVersionAuth, param} = this.props;

     const {formData} = this.state;

     // e.preventDefault();

     form.validateFields((errors, values) => {
     if (errors) {
     return;
     } else {

     // console.dir(formData);

     addVersionAuth({
     id:param,
     data:formData
     });

     }
     });
     };*/

    onChange = (value, record)=> {

        const data = {
            moduleId: record.tagId ? record.tagId : record.id,
            key: record.key,
            status: value
        };

        let {formData} = this.state;

        let tmp = {};

        if (formData.modules.length > 0) {
            formData.modules.map((item)=> {
                tmp[item.moduleId] = item;
            });

            if (tmp[data.moduleId]) {
                formData.modules.splice(formData.modules.indexOf(tmp[data.moduleId]), 1, data);
            } else {
                formData.modules.push(data);
            }


        } else {
            formData.modules.push(data);
        }

        /*formData.roles = formData.roles.concat(record.roles);

         let newList = [];

         formData.roles.map((item)=>{
         if(newList.indexOf(item) == -1){
         newList.push(item);
         }
         });

         formData.roles = newList;*/

        // console.dir(formData);

        // debug
        this.setState({
            formData: formData
        }/*,()=>this.handleSubmit()*/);
    };

    render() {

        let {platModuleInfo, loading} = this.props;

        let dataSource = this.convertTree(platModuleInfo.tags, 'tagId', ['tags', 'modules']);

        let {formData} = this.state;

        let columns = [
            {
                title: '名称',
                dataIndex: 'name'
            },{
                title: 'Key',
                dataIndex: 'key'
            }, {
                title: '状态',
                dataIndex: 'status',
                width: 100,
                render: (text, record)=> {

                    let status = {
                        'none': '未设置',
                        'visible_enable': '可见可用',
                        'visible_disabled': '可见不可用',
                        'hidden': '不可见',
                    };

                    record.status = 'none';

                    formData.modules.map((item)=> {
                        if (record.tagId) {
                            if (item.moduleId == record.tagId) {
                                record.status = item.status;
                            }
                        } else {
                            if (item.moduleId == record.id) {
                                record.status = item.status;
                            }
                        }

                    });

                    // console.dir(record);

                    return (
                        status[record.status]
                    );
                }

            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record)=> {

                    return (
                        <div>
                            <RadioGroup
                                defaultValue={record.status}
                                onChange={(e)=>this.onChange(e.target.value, record)}>
                                <Radio value='visible_enable'>可见可用</Radio>
                                <Radio value='visible_disabled'>可见不可用</Radio>
                                <Radio value='hidden'>不可见</Radio>
                            </RadioGroup>
                        </div>
                    );
                }
            }
        ];

        return (
            <Table columns={columns}
                   defaultExpandAllRows
                   loading={loading}
                   rowKey={record=>record.id}
                   dataSource={dataSource}
            />
        );
    }
}
