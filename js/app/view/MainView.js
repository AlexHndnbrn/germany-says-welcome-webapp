define(["underscore"], function(_) {

    var $ = window.$;

    MainView.prototype = {};

    MainView.prototype.subscribe = function(hoverboard, namespace) {
        var setter = _.bind(function (state) {
            this.setState(state, namespace);
        }, this);
        return hoverboard.getState(setter);
    };

    MainView.prototype.setState = function(state, namespace) {
        if ( !namespace || namespace != "router" ) { return; }
        var section = "dashboard";
        if ( state && state.parts && state.parts[0] ) {
            section = state.parts[0];
        }
        if ( section == this.section ) { return; }
        var el = $("main > div.main-container.active");
        el.removeClass("active");
        el = $("#" + section + "_container")
        el.addClass("active");
        return state;
    };


    function MainView() {
        this.section = "";

    }

    return MainView;


});