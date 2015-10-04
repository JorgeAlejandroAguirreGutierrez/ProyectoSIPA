
$(document).ready(function () {

    $('#simple-menu').sidr({
        side: 'right'
    });
});
$('.responsive-menu-button').sidr({
    name: 'sidr-main',
    source: '#navigation',
    side: 'right'

});
$(document).ready(
        function () {
            $("html").niceScroll({cursorborder: "0px solid #fff", cursorwidth: "5px", scrollspeed: "70"});
        }
);

function reponsive(){
    
    
    $('#simple-menu').sidr({
        side: 'right'
    });

    $('.responsive-menu-button').sidr({
    name: 'sidr-main',
    source: '#navigation',
    side: 'right'

    });
        
    $("html").niceScroll({cursorborder: "0px solid #fff", cursorwidth: "5px", scrollspeed: "70"});
       
}