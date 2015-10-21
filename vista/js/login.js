
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
            //console.log(data);
            if (data =='Error de usuario o contrasena'){
                 $("#loginForm").css("background", "#F80505 none repeat scroll 0% 0%");     
           
            }else{
            $("#navigation").html('');
            $("#navigation").html(data);
            $("#sidr-main").remove();
            reponsive();
            $("#big-text").html('');
            $("#big-text").html('Bienvenido ' + nombreusuario +' al Sistema de Informacion de practicas de la U de Caldas');
             $("#Practicas").remove();
            }
        }, 'json');

    }
});

       
