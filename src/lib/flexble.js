(function (win, doc) {
            win.isMobile = ! ! /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|MicroMessenger/i.test(navigator.userAgent);
            win.isIOS = ! ! /iPhone|iPad|iPod/i.test(navigator.userAgent);
            win.isIOS7 = ! ! /(iPhone|iPad|iPod) OS 7/i.test(navigator.userAgent);
            win.isAndroid = ! ! /Android/i.test(navigator.userAgent);
            win.isWechat = ! ! /MicroMessenger/i.test(navigator.userAgent);
            win.isIE = ! ! /Trident|Edge/i.test(navigator.userAgent);
            var baseWidth = 750;
            var documentHTML = doc.documentElement;
            function setRootFont () {
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