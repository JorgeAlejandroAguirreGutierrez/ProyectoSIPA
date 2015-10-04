<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UsuarioCRUD
 *
 * @author Jorge Alejandro
 */
include_once '../serviciosTecnicos/utilidades/UtilConexion.php';

class UsuarioCRUD implements Persistible {
    //put your code here
    
    public function __construct() {
        
    }
    function add($argumentos) {
        extract($argumentos);
        $sql="INSERT INTO tipo_dependencia VALUES($codigo, '$nombreusuario','$contrasena','$nombre','$apellido',$cedula,'$direccion',$telefono,'$correo','$codigo_rol')";
        $ok = UtilConexion::$pdo->exec($sql);
        echo json_encode($ok ? array('ok' => $ok, "mensaje" => "") : array('ok' => $ok, "mensaje" => "No se pudo agregar la ciudad"));
    }

    /**
     * Actualiza una fila de Ciudads.
     * @param <type> $argumentos Un array con el id a buscar y los otros nuevos datos,
     * estos datos se proporcionan de la siguiente manera:
     * $argumentos[0]: Id de la Ciudad a buscar y actualizar, los demás datos
     * corresponden a las columnas que se van a actualizar
     */
    function edit($argumentos) {
        extract($argumentos);
        $sql="UPDATE usuario set nombreusuario='$nombreusuario',contrasena='$contrasena',nombre='$nombre',apellido='$apellido',cedula=$cedula,direccion='$direccion',telefono=$telefono,correo='$correo',codigo_rol='$codigo_rol' WHERE codigo='$codigo'";
        $ok = UtilConexion::$pdo->exec($sql);
        echo json_encode($ok ? array('ok' => $ok, "mensaje" => "") : array('ok' => $ok, "mensaje" => "Falló la actualización de los datos"));
    }

    /**
     * Elimina las Ciudads cuyos IDs se pasen como argumentos.
     * @param <type> $argumentos los IDs de las Ciudads a ser eliminadas.
     * $argumentos es un cadena que contiene uno o varios números separados por
     * comas, que corresponden a los IDs de las filas a eliminar.
     */
    function del($argumentos) {
//        $datos =$argumentos['id'];
        extract($argumentos);
        $ok = UtilConexion::$pdo->exec("DELETE FROM usuario WHERE codigo=$codigo");
        echo json_encode($ok ? array('ok' => $ok, "mensaje" => "") : array('ok' => $ok, "mensaje" => "Falló la eliminación"));
    }

    /**
     * Devuelve los datos necesarios para construir una tabla dinámica.
     * @param <type> $argumentos los argumentos enviados por:
     * Ciudad.js.crearTablaCiudades()
     */
    function select($argumentos) {
        $where = UtilConexion::getWhere($argumentos); // Se construye la clausula WHERE
        extract($argumentos);
//        if (isset($id)) {
//            $where = "WHERE tipo_dependencia_id = '$id'";
//        } else {
//            $where = "WHERE tipo_dependencia_id = 'ninguno'";
//        }
        $count = UtilConexion::$pdo->query("SELECT id FROM tipo_dependencia $where")->rowCount();
        // Calcula el total de páginas por consulta
        if ($count > 0) {
            $total_pages = ceil($count / $rows);
        } else {
            $total_pages = 0;
        }

        // Si por alguna razón página solicitada es mayor que total de páginas
        // Establecer a página solicitada total paginas  (¿por qué no al contrario?)
        if ($page > $total_pages)
            $page = $total_pages;

        // Calcular la posición de la fila inicial
        $start = $rows * $page - $rows;
        //  Si por alguna razón la posición inicial es negativo ponerlo a cero
        // Caso típico es que el usuario escriba cero para la página solicitada
        if ($start < 0)
            $start = 0;

        $respuesta = [
            'total' => $total_pages,
            'page' => $page,
            'records' => $count
        ];

        $sql = "SELECT * FROM tipo_dependencia $where ORDER BY $sidx $sord LIMIT $rows OFFSET $start";
        foreach (UtilConexion::$pdo->query($sql) as $fila) {
            $respuesta['rows'][] = [
                'id' => $fila['id'],
                'cell' => [$fila['id'], $fila['nombre']]
            ];
        }
        echo json_encode($respuesta);
    }

    function getSelect($argumentos) {
        extract($argumentos);
        $where = "";
        if ($departamento != "") {
            $where = "WHERE id = '$departamento'";
        }
        $rs = UtilConexion::$pdo->exec("SELECT nombre, id FROM tipo_dependencia $where");
        $lista = $rs->GetMenu('lstTipoDependencia', "", false, false, 1, 'id="lstTipoDependencia"');
        echo $lista;
    }

    /**
     * Devuelve un array asociativo de la forma: {"id1":"Dato1", "id2":"Dato2", ...,"idN":"DatoN"}
     * Util para crear combos en la capa de presentación
     * @param <type> $argumentos
     */
    public function getLista($argumentos) {
        $where = "";
        extract($argumentos);
        if (isset($departamento)) {
            $where = "WHERE id = '$departamento'";
        }
        $filas[''] = 'Seleccione una dependencia';
        $filas += UtilConexion::$pdo->query("SELECT id, nombre FROM tipo_dependencia $where ORDER BY nombre")->fetchAll(PDO::FETCH_KEY_PAIR);
        echo json_encode($filas);
    }

    /**
     * Devuelve el código de una ciudad y un departamento dado el nombre de la ciudad y el departamento
     * @param string $argumentos un array que tiene el nombre de la ciudad y del departamento separados sólo por espacio
     */
    public function getLocalidad($argumentos) {
        extract($argumentos);
        $localidad = explode(' ', $localidad);
        if (count($localidad) == 2) {
            $ciudad = ucfirst($localidad[0]);
            $departamento = strtoupper($localidad[1]);
            if (($fila = UtilConexion::$pdo->query("SELECT * FROM tipo_dependencia")->fetch(PDO::FETCH_ASSOC))) {
                return array('idDependencia' => $fila['id'], 'nombreDependencia' => $fila['nombre']);
            }
        } else {
            return array('idDependencia' => 0, 'nombreDependencia' => '');
        }
    }
}
