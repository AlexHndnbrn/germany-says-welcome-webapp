require.config(
    {
        baseURL: "js",
        paths: {
            'handlebars': "../third-party/handlebars",
            'hoverboard': "../third-party/hoverboard",
            'html2hscript': '../third-party/html2hscript',
            'i18next': "../third-party/i18next",
            'underscore': "../third-party/underscore",
            'virtual-dom': '../third-party/virtual-dom',

            'Router': "../lib/Router",

            'Component': "../lib/Component",

            'domReady': ['../third-party/requirejs-domReady']
        },
        shim: {
            'hoverboard': {exports: 'Hoverboard'}
        }
    }
);

require(['domReady!',
        'model/BrowserLanguage',
        'model/AsylumStatus',
        'Router', 'data/Routes',
        'view/MainView',
        'view/SideNavView',
        'view/SettingsView'],
    function (domReady,
              BrowserLanguage,
              AsylumStatus,
              Router,
              routes,
              MainView,
              SideNavView,
              SettingsView) {

        addCollapsibleToggle();

        // Setup model.
        var router = new Router(routes);
        var browserLanguage = new BrowserLanguage();
        var asylumStatus = new AsylumStatus();

        // Setup views.
        var mainView = new MainView();
        mainView.subscribe(router, "router");

        var sideNav = new SideNavView("#slide-out");
        sideNav.subscribe(router, 'router');
        sideNav.subscribe(browserLanguage, 'language');

        var settingsView = new SettingsView('#settings', browserLanguage, asylumStatus);
        settingsView.subscribe(router, 'router');
        settingsView.subscribe(browserLanguage, 'language');
        settingsView.subscribe(asylumStatus, 'status');

        // Start the app.
        router.update();
        browserLanguage.init();
        asylumStatus.init();

    });

function addCollapsibleToggle() {
    window.$.fn.extend({
        collapsible: (function() {
            _collapsible = jQuery.fn.collapsible;

            return function(action) {
                if (typeof action !== 'string') {
                    return _collapsible.apply(this, arguments);
                }

                var $collapsible = $(this);
                var $header = $collapsible.find('.collapsible-header');
                var $body = $collapsible.find('.collapsible-body');

                action = action || 'toggle';
                if (action === 'toggle') {
                    action = $collapsible.hasClass('active') ? 'close' : 'open';
                }

                var classHandler = (action === 'open') ? 'addClass' : 'removeClass';
                var animationHandler = (action === 'open') ? 'slideDown' : 'slideUp';

                $([$header[0], $collapsible[0]])[classHandler]('active');

                $body.stop(true, false)[animationHandler]({
                    duration: 350,
                    easing: "easeOutQuart",
                    queue: false,
                    complete: function() {
                        $body.css('height', '');
                    }
                });
            };
        }())
    });

};