$(window).load(function () {

    // Main nav handler for mobile
    var menuButton = $('a.menu-button');
    (function () {
        var mainNav = $('div.nav-wrap'),
			mainNavUl = mainNav.find('div.navigation > ul'),
			subnavMenu = $('div.subnav-menu'),
			subnavHeader = subnavMenu.find('h4.main-header'),
			subnavLink = mainNav.find('a.subnav'),
			headerWrap = $('div.header-wrap'),
			backMenu = mainNav.find('a.back-to-menu'),
			closeButton = mainNav.find('a.close-menu');

        var resetMenu = function () {
            backMenu.hide();
            subnavMenu.css('right', '-130%');
            mainNavUl.css('left', '0');
            subnavHeader.html('');
        };

        menuButton.on('click', function (e) {
            e.preventDefault();
            mainNav.css('max-height', '1000px');
        });

        closeButton.on('click', function (e) {
            e.preventDefault();
            mainNav.css('max-height', '0');
            resetMenu();
            mainNav.css('overflow', 'hidden');
        });

        backMenu.on('click', function (e) {
            e.preventDefault();
            resetMenu();
        });


        // Use CSS Watch to change things around when going in between large/small screen layouts
        (configureMenus = function (display) {
            switch (display) {
                case 'block':
                    // set up small screen menu
                    subnavMenu.css('right', '-130%');
                    // If small screen, add event listener to subnav
                    subnavLink.on('click', function (e) {
                        e.preventDefault();
                        mainNav.css('overflow', 'visible');
                        var b = $(this).attr("data-navitem");
						  var c = $(this).text();
                        $("#" + b).css('right', 0);
                        mainNavUl.css('left', '-130%');
                        subnavHeader.html(c);
                        backMenu.show();
                    });
                    mainNav.css('max-height', '0');
                    break;
                case 'none':
                    subnavLink.off('click');
                    // resets main nav so it shows up correctly
                    mainNav.css('max-height', '1000px');
                    subnavMenu.css('right', '0');
                    // set hover
                    // Main nav mega dropdown code from C+M
                    $(".navigation ul li a.subnav").hover(function (c) {
                        c.preventDefault();
                        var b = $(this).attr("data-navitem");
                        $("#" + b).addClass("active");
                    }, function (c) {
                        var b = $(this).attr("data-navitem");
                        $("#" + b).removeClass("active");
                    });
                    $(".subnav-menu").hover(function (a) {
                        a.preventDefault();
                        $(this).addClass("active");
                    }, function (a) {
                        $(this).removeClass("active");
                    });
                    break;
                default:
                    return;
            }
        })(menuButton.css('display'));
        menuButton.csswatch({
            props: 'display'
        }).on('css-change', function (event, change) {
            return configureMenus(change.display);
        });

    })();
	
});
