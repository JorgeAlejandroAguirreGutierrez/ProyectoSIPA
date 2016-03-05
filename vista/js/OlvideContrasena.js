/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function () {

    $('#restaurarcontrasena').on('click', restaurarContrasena);

    function restaurarContrasena()
    {
        var nombreusuario = $('#nombreusuario').val();
        var contrasenanueva = $('#contrasenanueva').val();
        var repetircontrasena = $('#repetircontrasena').val();
        if (contrasenanueva == repetircontrasena)
        {
            $.post("controlador/fachada.php", {
                clase: 'Olvide',
                oper: 'validarUsuario',
                nombreusuario: nombreusuario,
                contrasenanueva: contrasenanueva
            })
                    .done(function (data) {
                        alert(data);
                    }, 'json');
        }
        else
        {
            alert("Error en las nuevas contraseñas");
        }

    }

});
