
$(document).ready(function () {
	reponsive();
});

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


};


