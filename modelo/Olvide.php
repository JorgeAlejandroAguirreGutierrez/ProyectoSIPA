<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Olvide
 *
 * @author Jorge Alejandro
 */
class Olvide {

    public function __construct() {
        
    }

    public function olvideContrasena($argumentos) {
        extract($argumentos);
        $menu = file_get_contents("../vista/html/Olvidecontrasena.html");
        echo json_encode($menu);
    }

    public function validarUsuario($argumentos) {
        extract($argumentos);
        $count = UtilConexion::$pdo->query("SELECT codigo FROM usuario WHERE nombreusuario = '$nombreusuario'")->rowCount();
        if ($count > 0) {
            $sql = "UPDATE usuario set contrasena='$contrasenanueva' WHERE nombreusuario='$nombreusuario'";
            $ok = UtilConexion::$pdo->exec($sql);
            echo json_encode($ok ? array('ok' => $ok, "mensaje" => "EXITO EN LA ACTUALIZACION DE DATOS") : array('ok' => $ok, "mensaje" => "Falló la actualización de los datos"));
        } else {
            echo json_encode("No se realizo con exito el cambio de contrasena");
        }
    }

}
