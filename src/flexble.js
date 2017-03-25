(function (win, doc) {
    var baseWidth = 750;
    var documentHTML = doc.documentElement;
    function setRootFont() {
        var docWidth = documentHTML.getBoundingClientRect().width;
        var scale = docWidth / baseWidth;
        if (docWidth > baseWidth) {
            scale = 0.5;
        }
        documentHTML.style.fontSize = scale * 100 + 'px';
    }
    setRootFont();
    win.addEventListener('resize', setRootFont, false);
})(window, document);