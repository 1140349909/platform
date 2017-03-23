(function () {
    function isIE() { //ie?
        return (!!window.ActiveXObject || "ActiveXObject" in window);
    }

    if (isIE()) {
        location.href = 'browser.html';
    }
})();
