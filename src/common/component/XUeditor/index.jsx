import React, {Component} from 'react';
import {loadJS, loadCSS} from 'common/util';
import classNames from 'classnames';
import _ from 'lodash';
import config from 'common/config';

const eventOptionsProps = [
    'contentChange',
    'onEditLinkto',
    'onChangeColor',
    'onClickEditor',
    'onEditLinkto',
    'onEditImg',
    'onToolBar',
    'isImage'
];

export default class XUeditor extends Component {

    constructor(props){
        super(props);

        this.editor = null;

        this.fileConfig = {
            css: 'http://common.vveshow.com/ueditor/themes/content.css',
            jquery: 'http://common.vveshow.com/ueditor/third-party/jquery-1.10.2.min.js',
            all:'http://common.vveshow.com/ueditor/ueditor.all.js',
            allPlugins: 'http://common.vveshow.com/ueditor/allPlugins.js',
            lang:' http://common.vveshow.com/ueditor/lang/zh-cn/zh-cn.js',
            region: 'http://common.vveshow.com/ueditor/region.json'
        };

        this.editorConfig = {
            UEDITOR_WRANK_URL: 'http://common.vveshow.com/ueditor/ueditor.config.wrank.js',
            UEDITOR_BS_URL: 'http://common.vveshow.com/ueditor/ueditor.config.bs.js',
            UEDITOR_PLATFORM_URL: 'http://common.vveshow.com/ueditor/ueditor.config.platform.js',
            UEDITOR_TOUTIAO_URL: 'http://common.vveshow.com/ueditor/ueditor.config.toutiao.js'
        };
    }

    state = {
        load: false
    };

    static defaultProps = {
        type: 'wrank',
        plugins: {},
        id: 'editor'
    };

    componentDidMount(){
        this.init();
    }

    /**
     * 组件初始化
     *
     * @memberOf Ueditor
     */
    init = () => {

        // 加载样式
        loadCSS(this.fileConfig.css);

        // 加载jquery
        loadJS(this.fileConfig.jquery, () => {

            // 加载ediotr配置文件
            const {id, url} = this.getEditorConfig();
            loadJS({id, url}, () => {

                // 加载editor源文件
                loadJS(this.fileConfig.all, () => {

                    // 加载拓展的eidotr插件
                    loadJS(this.fileConfig.allPlugins, () => {

                        // 加载语言
                        loadJS(this.fileConfig.lang, () => {
                            this.setState({
                                load: true
                            }, () => {
                                this.editorInit();
                            })
                        })
                    })
                })
            })
        })
    };

    /**
     * 编辑器初始化
     *
     * @memberOf Ueditor
     */
    editorInit = () => {
        const { id , plugins} = this.props;

        this.editor = UE.getEditor(id, plugins);

        const options = _.keys(this.props)
            .filter(propKey => eventOptionsProps.indexOf(propKey) !== -1);

        _.map(options, (key) => {
            this.editor.addListener(key, this.props[key]);
        });

        this.props.ready(this.editor)
    };


    /**
     * 获取编辑器配置文件url
     *
     * @memberOf Ueditor
     */
    getEditorConfig = () => {
        let type = this.props.type;
        let url = '';
        let id = '';

        switch (type) {
            case 'bs':
                id = 'scriptBs';
                url = this.editorConfig.UEDITOR_BS_URL;
                break;

            case 'platform':
                id = 'scriptPlatform';
                url = this.editorConfig.UEDITOR_PLATFORM_URL;
                break;

            case 'toutiao':
                id = 'scriptToutiao';
                url = this.editorConfig.UEDITOR_TOUTIAO_URL;
                break;

            default:
                id = 'scriptWrank';
                url = this.editorConfig.UEDITOR_WRANK_URL;
                break;

        }

        return {
            id,
            url
        }
    };


    render() {
        const {id, width = '100%', height = '600px', type, className = ''} = this.props;
        const {load} = this.state;

        const classString = classNames({
            [className]: true
        });

        if (!load) {
            return null;
        }

        return (
            <textarea id={id} className={classString} style={{width: width, height: height}}></textarea>
        );
    }
}
