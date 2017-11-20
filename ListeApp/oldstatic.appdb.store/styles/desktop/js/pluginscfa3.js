// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }

    $(document).ready(function() {
        if($('.index-items_slider li').length > 1) {
            $('.index-items_slider').bxSlider({
                controls:false,
                auto:true
            });
        }

    });

    $(function() {
        $( ".tabs" ).tabs();
    });

    function liColumn(list) {
        var maxHt=150;/* may need to adjust based on css*/
        var cols = 0;
        var $list=list;
        var $container=$list.parent();

        var $li=$list.find('li');

        var totHt=0;
        var totItems=$li.length;
        $li.each(function( idx){

            if ( idx != 0 && idx % 11 == 0) {
                $('<ul class="header-center_menu__ul-ul-new">').append( $(this).prevAll().andSelf() ).appendTo( $container );
                cols += 1;
            }

        });

        $list.remove();
        $container.css('width', 110*cols);
    }
    /*$('.header-center_menu__ul-ul ul').each(function(){

        liColumn($(this));
    });*/
}());

// Place any jQuery/helper plugins in here.
