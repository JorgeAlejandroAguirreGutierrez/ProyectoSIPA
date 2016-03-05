
$(function () {

    $('#login').on('click', login);

    $('#olvide').on('click', olvide);

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
            //console.log(data);
            if (data == 'Error de usuario o contrasena') {
                $("#titleLogin").html('ERRROR');
            } else {
                $("#navigation").html('');
                $("#navigation").html("<ul><li>" + nombreusuario + " </li><li><a id = \"cerrar\" href= \"\">Cerrar sesion</a></li></ul>");
                console.log(data);
                $("#Practicas").remove();
            }
            $("#contenido").html('');
            $("#contenido").html(data);
        }, 'json');

    }

    function olvide()
    {
        $.post("controlador/fachada.php", {
            clase: 'Olvide',
            oper: 'olvideContrasena',
            uno:1
        }, function (data) {
            $("#navigation").html('');
            $("#navigation").html("<h2>Olvide mi contrasena</h2>");
            $("#Practicas").remove();
            $("#contenido").html('');
            $("#contenido").html(data);
        }, 'json');
    }
});


