(function () {
    var ENV = '@ENV@';
    var domain = '';
    if (ENV === 'prd') {
        domain = 'iloka.me';
    } else {
        domain = 'vveshow.com';
    }
    document.domain = domain;
})();
