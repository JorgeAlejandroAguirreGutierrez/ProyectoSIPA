<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PracticaCRUD
 *
 * @author Jorge Alejandro
 */
session_start();

class PracticaCRUD {

    public function __construct() {
        
    }

    function add($argumentos) {
        extract($argumentos);
        $sql = "INSERT INTO practica VALUES($codigo, '$fecha_inicio','$fecha_fin',$salario,'$estado','$observacion',$codigo_estudiante,$codigo_docente_coordinador,$codigo_responsable_practica)";
        $ok = UtilConexion::$pdo->exec($sql);
        echo json_encode($ok ? array('ok' => $ok, "mensaje" => "") : array('ok' => $ok, "mensaje" => "No se pudo agregar la Practica"));
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
        $sql = "UPDATE practica set fecha_inicio='$fecha_inicio',fecha_fin='$fecha_fin',salario=$salario,estado='$estado',observacion='$observacion',codigo_estudiante=$codigo_estudiante, codigo_docente_coordinador=$codigo_docente_coordinador,codigo_responsable_practica=$codigo_responsable_practica WHERE codigo=$codigo";
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
        $datos = $argumentos['id'];
        //        extract($argumentos);
        $ok = UtilConexion::$pdo->exec("DELETE FROM practica WHERE codigo=$datos");
        echo json_encode($ok ? array('ok' => $ok, "mensaje" => "") : array('ok' => $ok, "mensaje" => "Falló la eliminación"));
    }

    /**
     * Devuelve los datos necesarios para construir una tabla dinámica.
     * @param <type> $argumentos los argumentos enviados por:
     * Ciudad.js.crearTablaCiudades()
     */
    function select($argumentos) {
        extract($argumentos);
        if ($_SESSION["rol"] == 5) {
            $count = UtilConexion::$pdo->query("SELECT codigo FROM practica")->rowCount();
        } elseif ($_SESSION["rol"] != 5) {
            $codigo = $_SESSION["codigo"];
            $count = UtilConexion::$pdo->query("SELECT codigo FROM practica WHERE codigo_estudiante=$codigo")->rowCount();
        }

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
        if ($_SESSION["rol"] == 5) {
            $sql = "SELECT * FROM practica ORDER BY $sidx $sord LIMIT $rows OFFSET $start";
            foreach (UtilConexion::$pdo->query($sql) as $fila) {
                $respuesta['rows'][] = [
                    'codigo' => $fila['codigo'],
                    'cell' => [$fila['codigo'], $fila['fecha_inicio'], $fila['fecha_fin'], $fila['salario'], $fila['estado'], $fila['observacion'], $fila['codigo_estudiante'], $fila['codigo_docente_coordinador'], $fila['codigo_responsable_practica']]
                ];
            }
            echo json_encode($respuesta);
        } else {
            $codigo = $_SESSION["codigo"];
            $sql = "SELECT * FROM practica WHERE codigo_estudiante=$codigo ORDER BY $sidx $sord LIMIT $rows OFFSET $start";
            foreach (UtilConexion::$pdo->query($sql) as $fila) {
                $respuesta['rows'][] = [
                    'codigo' => $fila['codigo'],
                    'cell' => [$fila['codigo'], $fila['fecha_inicio'], $fila['fecha_fin'], $fila['salario'], $fila['estado'], $fila['observacion'], $fila['codigo_estudiante'], $fila['codigo_docente_coordinador'], $fila['codigo_responsable_practica']]
                ];
            }
            echo json_encode($respuesta);
        }
    }

    function selectConsulta1($argumentos) {
        extract($argumentos);
        $codigo = $_SESSION["codigo"];
        error_log($codigo);
        $count = UtilConexion::$pdo->query("SELECT codigo FROM practica WHERE codigo_docente_coordinador=$codigo")->rowCount();
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
        $sql = "SELECT * FROM practica WHERE codigo_docente_coordinador=$codigo ORDER BY $sidx $sord LIMIT $rows OFFSET $start";
        foreach (UtilConexion::$pdo->query($sql) as $fila) {
            $respuesta['rows'][] = [
                'codigo' => $fila['codigo'],
                'cell' => [$fila['codigo'], $fila['fecha_inicio'], $fila['fecha_fin'], $fila['salario'], $fila['estado'], $fila['observacion'], $fila['codigo_estudiante'], $fila['codigo_docente_coordinador'], $fila['codigo_responsable_practica']]
            ];
        }
        echo json_encode($respuesta);
    }

}
