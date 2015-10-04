<?php

/**
 * Description of Conexion:
 * Implementación del patrón Singleton para proporcionar una única instancia de esta clase
 * que será la encargada de proporcionar la conexión a la base de datos.
 * Como puede verse, uno de los métodos públicos es:
 *    getInstance: que devuelve un objeto de tipo Conexión y
 * El constructor y el método __clone() son privados para evitar su uso fuera de la clase.
 * @author Carlos Cuesta Iglesias
 */
class UtilConexion {

    public static $pdo;                     // Una referencia a un objeto de tipo PDO (PHP Data Object)
    public static $propiedadesConexion;
    public static $conexion;
    private static $comspec;                // Procesador de comandos (En Win7 C:\Windows\system32\cmd.exe)
    private static $rutaAplicacion;
    private static $rutaRaiz;

    /**
     * La función construct es privada para evitar que el objeto pueda ser creado mediante new.
     * Cuando este método se llama, crea una conexión a una base de datos.
     */
    private function __construct() {
        date_default_timezone_set('America/Bogota');
        self::$comspec = $_SERVER['COMSPEC'];
        self::$rutaRaiz = $_SERVER['DOCUMENT_ROOT']; // "C:/wamp/www/";
        self::$rutaAplicacion = self::$rutaRaiz . "ProyectoSIPA/"; // "C:/wamp/www/demoCRUD/";
    }

    /**
     * Es posible que un script envié varios mensajes getInstance(...) a un objeto de tipo Conexion,
     * sinembargo siempre se retornará la misma instancia de Conexión, garantizando así la
     * implementacion del Patrón Singleton
     * @param <type> $driver El tipo de driver: postgres, mysql, etc.
     * @param <type> $servidor El host: localhost o cualquier IP válida
     * @param <type> $usuario El usuario que tiene privilegios de acceso a la base de datos
     * @param <type> $clave La clave del usuario
     * @return <type> Una instancia de tipo Conexion
     */
    public static function getInstance() {
        // la siguiente condición garantiza que sólo se crea una instancia
        if (!isset(self::$conexion)) {
            self::$conexion = new self();  // llamado al constructor
            $baseDeDatos = 'software2';
            $servidor = 'localhost';  // 127.0.0.1:80
            $puerto = '5432';  // puerto postgres
            $usuario = 'administrador';
            $contrasena = 'jojoJOJO10';
            // ver http://www.phpro.org/tutorials/Introduction-to-PHP-PDO.html
            self::$pdo = new PDO("pgsql:host=$servidor port=$puerto dbname=$baseDeDatos", $usuario, $contrasena);
        }
        return self::$conexion;
    }

    /**
     * Se sobreescribe este 'método mágico' para evitar que se creen clones de esta clase
     */
    private function __clone() { /* ... */
    }

    /* ---------------------------  Inicio de las funciones para construir la cláusula WHERE  ---------------------------- */

    /**
     * Construye una cláusula WHERE a partir de los argumentos enviados por un jqGrid.
     * Ver el original en los demos de http://www.trirand.com/blog/
     * @param type $argumentos Un array asociativo que contiene los parámetros enviados por jqGrid 
     * @return string Una cláusula WHERE
     */
    public static function getWhere($argumentos) {
        $where = "";
        $searchOn = self::strip($argumentos['_search']);
        if ($searchOn == 'true') {
            $searchstr = self::strip($argumentos['filters']);
            $jsona = json_decode($searchstr, true);
            $where = 'WHERE ' . self::getStringForGroup($jsona);
        }
        return $where;
    }

    private static function getStringForGroup($group) {
        $i_ = '';
        // Cambié el LIKE original por ILIKE
        $sopt = array('eq' => "=", 'ne' => "<>", 'lt' => "<", 'le' => "<=", 'gt' => ">", 'ge' => ">=", 'bw' => " {$i_}ILIKE ", 'bn' => " NOT {$i_}ILIKE ", 'in' => ' IN ', 'ni' => ' NOT IN', 'ew' => " {$i_}ILIKE ", 'en' => " NOT {$i_}ILIKE ", 'cn' => " {$i_}ILIKE ", 'nc' => " NOT {$i_}ILIKE ", 'nu' => 'IS NULL', 'nn' => 'IS NOT NULL');
        $s = "(";
        if (isset($group['groups']) && is_array($group['groups']) && count($group['groups']) > 0) {
            for ($j = 0; $j < count($group['groups']); $j++) {
                if (strlen($s) > 1) {
                    $s .= " " . $group['groupOp'] . " ";
                }
                try {
                    $dat = self::getStringForGroup($group['groups'][$j]);
                    $s .= $dat;
                } catch (Exception $e) {
                    // Para facilitar la revisión de algún comportamiento inesperado
                    file_put_contents('log where.txt', "Excepción 1 en UtilConexion::getStringForGroup(...)\r\n" . $e->getMessage() . "\r\n", FILE_APPEND);
                }
            }
        }
        if (isset($group['rules']) && count($group['rules']) > 0) {
            try {
                foreach ($group['rules'] as $key => $val) {
                    if (strlen($s) > 1) {
                        $s .= " " . $group['groupOp'] . " ";
                    }
                    $field = $val['field'];
                    $op = $val['op'];
                    $v = $val['data'];
                    if ($op) {
                        switch ($op) {
                            case 'bw':
                            case 'bn':
                                $s .= $field . ' ' . $sopt[$op] . "'$v%'";
                                break;
                            case 'ew':
                            case 'en':
                                $s .= $field . ' ' . $sopt[$op] . "'%$v'";
                                break;
                            case 'cn':
                            case 'nc':
                                $s .= $field . ' ' . $sopt[$op] . "'%$v%'";
                                break;
                            case 'in':
                            case 'ni':
                                $s .= $field . ' ' . $sopt[$op] . "( '$v' )";
                                break;
                            case 'nu':
                            case 'nn':
                                $s .= $field . ' ' . $sopt[$op] . " ";
                                break;
                            default :
                                $s .= $field . ' ' . $sopt[$op] . " '$v' ";
                                break;
                        }
                    }
                }
            } catch (Exception $e) {
                // Para facilitar la revisión de algún comportamiento inesperado
                file_put_contents('log where.txt', "Excepción 2 en UtilConexion::getStringForGroup(...)\r\n" . $e->getMessage() . "\r\n", FILE_APPEND);
            }
        }
        $s .= ")";
        if ($s == "()") {
            return " 1=1 ";
        } else {
            return $s;
        }
    }

    private static function strip($value) {
        if (get_magic_quotes_gpc() != 0) {
            if (is_array($value))
                if (self::array_is_associative($value)) {
                    foreach ($value as $k => $v)
                        $tmp_val[$k] = stripslashes($v);
                    $value = $tmp_val;
                }
                else
                    for ($j = 0; $j < sizeof($value); $j++)
                        $value[$j] = stripslashes($value[$j]);
            else
                $value = stripslashes($value);
        }
        return $value;
    }

    private static function array_is_associative($array) {
        if (is_array($array) && !empty($array)) {
            for ($iterator = count($array) - 1; $iterator; $iterator--) {
                if (!array_key_exists($iterator, $array)) {
                    return true;
                }
            }
            return !array_key_exists(0, $array);
        }
        return false;
    }

    /* ---------------------------  Fin de las funciones para construir la cláusula WHERE  ---------------------------- */
//
//    public static function getEstado() {
//        //error_log('¡Pilas! ' . print_r(self::$pdo->errorInfo(), TRUE));
//        if (!($ok = !(self::$pdo->errorInfo()[1]))) {
//            error_log('¡Pilas! ' . print_r(self::$pdo->errorInfo(), TRUE));
//        }
//        $mensaje = '';
//        if (count($errorInfo = explode("\n", self::$pdo->errorInfo()[2])) > 1) {
//            $mensaje = substr($errorInfo[1], 9);
//        }
//        return json_encode(['ok' => $ok, 'mensaje' => $mensaje]);
//    }
}

?>
