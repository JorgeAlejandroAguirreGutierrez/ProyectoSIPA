<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Usuario
 *
 * @author Jorge Alejandro
 */
include_once '../serviciosTecnicos/utilidades/UtilConexion.php';

class Autenticacion {

    public function __construct() {
    }

    public function autenticarUsuario($argumentos) {
        extract($argumentos);
        $sql = "SELECT codigo_rol FROM usuario WHERE nombreusuario='$nombreusuario' AND contrasena='$contrasena'";
        $menu=null;
        if (($fila = UtilConexion::$pdo->query($sql)->fetch(PDO::FETCH_ASSOC))) {
            
            $rol = $fila['codigo_rol'];
            switch ($rol) {
                case 1:
                    $menu = file_get_contents("../vista/html/AdmDocenteCoordinador.html");
                    break;
                case 2:
                    $menu = file_get_contents("../vista/html/AdmEstudiante.html");
                    break;
                case 3:
                    $menu = file_get_contents("../vista/html/AdmResponsablePractica.html");
                    break;
                case 4:
                    $menu = file_get_contents("../vista/html/AdmRepresentanteLegal.html");
                    break;
                case 5:
                    $menu = file_get_contents("../vista/html/AdmAdministradorSipa.html");
                    break;
            }
        }
        else
        {
            $menu="Error de usuario o contrasena";
        }
        echo json_encode($menu);
            
    }
}
