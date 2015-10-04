
$(function () {

    $('#login').on('click', login);


    function login()
    {
        var nombreusuario = $('#nombreusuario').val();
        var contrasena = $('#contrasena').val();
        $.post("controlador/fachada.php", {
            clase: 'Autenticacion',
            oper: 'autenticarUsuario',
            nombreusuario: nombreusuario,
            contrasena: contrasena
        }, function (data) {
            console.log(data);
            
            $("#navigation").html('');

            $("#navigation").html(data);
            $("#sidr-main").remove();

//            resposive();
        }, 'json');




    }


});
//
//
////// Login Form
//
//$(function () {
//    var button = $('#loginButton');
//    var box = $('#loginBox');
//    var form = $('#loginForm');
//    button.removeAttr('href');
//    button.mouseup(function (login) {
//        box.toggle();
//        button.toggleClass('active');
//    });
//    form.mouseup(function () {
//        return false;
//    });
//    $(this).mouseup(function (login) {
//        if (!($(login.target).parent('#loginButton').length > 0)) {
//            button.removeClass('active');
//            box.hide();
//        }
//    });
//    $('#login').click(function ()
//    {
//        var nombreusuario = $('#usuario').val();
//        var contrasena = $('#contrasena').val();
//        alert(nombreusuario);
//        alert(contrasena);
//        $.post("controlador/fachada.php", {
//            clase: 'Usuario',
//            oper: 'autenticarUsuario',
//            nombreusuario: nombreusuario,
//            contrasena: contrasena
//        }, function (data) {
////            var respuesta = jQuery.parseJSON(data);
//            alert(data.nombreusuario);
//            console.log(data);
//        });
//    })
//});

//$('#login').click(function ()
//    {
//        var nombreusuario = $('#nombreusuario').val();
//        var contrasena = $('#contrasena').val();
//        alert(nombreusuario);
//        alert(contrasena);
//        $.post("controlador/fachada.php", {
//            clase: 'Usuario',
//            oper: 'autenticarUsuario',
//            nombreusuario: nombreusuario,
//            contrasena: contrasena
//        }, function (data) {
////            var respuesta = jQuery.parseJSON(data);
//            alert(data.nombreusuario);
//            console.log(data);
//        });
//    });

       