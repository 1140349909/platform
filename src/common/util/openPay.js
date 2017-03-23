// 兼容打开新页面被浏览器阻止
function OpenPay() {
    this.payWin = null;
    this.tipEle = null;
}

OpenPay.prototype.open = function () {
    this.payWin = window.open();
    this.payWin.document.body.style.backgroundColor = '#eff2f7';
    this.payWin.document.title = '支付宝 - 网上支付 安全快速！';
    this.tipEle = this.payWin.document.createElement('div');
    initTip.call(this);
    this.loading();
    this.payWin.document.body.appendChild(this.tipEle);
};

OpenPay.prototype.error = function () {
    this.tipEle.innerHTML = '创建支付失败,请回到充值页重试';
};

OpenPay.prototype.loading = function () {
    this.tipEle.innerHTML = '创建支付中...';
};

OpenPay.prototype.location = function (url) {
    this.payWin.location.href = url;
};

OpenPay.prototype.setTip = function (style) {
    for (var key in style) {
        this.tipEle.style[key] = style[key];
    }
};

var initTip = function() {
    var style = {
        backgroundColor: '#fff',
        position: 'fixed',
        textAlign: 'center',
        top: '35%',
        left: '50%',
        marginLeft:'-65px',
        paddingLeft: '15px',
        paddingRight: '15px',
        lineHeight: '50px',
        fontSize: '16px',
        border: '1px solid #D1D1D1',
        borderColor: 'rgba(0,0,0,.14)',
        borderRadius: '8px',
        boxShadow: '0 3px 8px -6px rgba(0,0,0,.2)'
    };

    this.setTip(style);
};

export default new OpenPay();
