<?php

/**
 * Controlador de fachada que recibe mensajes de la capa de presentación,
 * Instancia la base de datos,
 * Delega a otras clases las peticiones recibidas y en algunas ocasiones
 * Envía las respuestas recibidas a la capa de presentación.
 * Basado en el patron GoF "Facade", ver Larman
 * @author Carlos Cuesta Iglesias
 */
header('Content-Type: text/html; charset=UTF-8');
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");  // disable IE caching
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$errores = '';
error_reporting(E_ERROR); // Para PHP 6 E_STRICT es parte de E_ALL -- ¿ --- error_reporting(E_ALL | E_STRICT); para verificación exhaustivo --- ?
ini_set('display_errors', 'Off');
ini_set('log_errors', 'On');
ini_set('error_log', 'Ver errores.log');

define('PHPEXCEL_ROOT', '../../includes/PHPExcel/');
define('DOCUMENT_ROOT', substr($_SERVER['DOCUMENT_ROOT'], -1) == '/' ? $_SERVER['DOCUMENT_ROOT'] : $_SERVER['DOCUMENT_ROOT'] . '/');

try {
    spl_autoload_register('__autoload');
    $args = $_REQUEST;                   // Cambiar a $_POST para producción, por ahora dejarlo así vulnerable
    error_log(print_r($args, TRUE));   // Quite el comentario para guardar en ERRORES.LOG lo que llega de la capa de presentación
    UtilConexion::getInstance();
    if (isset($args['clase'])) {
        $clase = $args['clase'];
        if (isset($args['oper'])) {
            $metodo = $args["oper"];
            $args['error'] = $errores;
            if (substr($clase, 0, 4) === 'Util') {  // Llamado a métodos de clase
                $clase::$metodo($args);
            } else {                                // Llamado a metodos de instancia
                $obj = new $clase();
                $obj->$metodo($args);
            }
        } else {
            throw new Exception('El controlador no ha recibido un mensaje válido.');
        }
    } else {
        throw new Exception('El controlador no sabe a quien enviar el mensaje.');
    }
} catch (Exception $e) {
    echo json_encode(array("ok" => 0, "mensaje" => $e->getMessage()));
}

/**
 * Intenta cargar aquellas clases que no se incluyen explícitamente.
 * @param <type> $nombreClase el nombre de la clase que se intentará cargar
 * desde la ruta ../modelo/
 * IMPORTANTE: include_once no lanza excepciones
 */
function __autoload($nombreClase) {
    if (substr($nombreClase, 0, 4) == 'Util') {
        $nombreClase = "../serviciosTecnicos/utilidades/$nombreClase.php";
        error_log($nombreClase);
    } else if (substr($nombreClase, 0, 8) == 'PHPExcel') {
        $nombreClase = PHPEXCEL_ROOT . str_replace('_', '/', $nombreClase) . '.php';
    } else {
        $nombreClase = "../modelo/$nombreClase.php";
        error_log($nombreClase);
    }
    include_once($nombreClase);
}

?>
