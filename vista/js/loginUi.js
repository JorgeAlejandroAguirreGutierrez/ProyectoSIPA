/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(function () {
    var button = $('#loginButton');
    var box = $('#loginBox');
    var form = $('#loginForm');
    button.removeAttr('href');
    button.mouseup(function (login) {
        box.toggle();
        button.toggleClass('active');
    });
    
    
//    $(this).mouseup(function (login) {
//        if (!($(login.target).parent('#loginButton').length > 0)) {
//            button.removeClass('active');
//            box.hide();
//        }
//    });
});