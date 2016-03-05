<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UtilReportes
 *
 * @author Jorge Alejandro
 */
include_once './UtilConexion.php';

class UtilReportes {

    protected static $objPHPExcel;
    protected static $archivo;

    public function __construct() {
        
    }

    public static function crearLibro($param) {
        extract($param);
        self::$archivo = $archivo;
        self::$objPHPExcel = new PHPExcel();
    }

    public static function guardarLibro() {
        $objWriter = PHPExcel_IOFactory::createWriter(self::$objPHPExcel, 'Excel2007');
        $objWriter->save(self::$archivo);
        self::$objPHPExcel->disconnectWorksheets();
//        unset(self::$objPHPExcel);
    }

    public static function generarReporteDepartamento($param) {
        self::crearLibro($param);
        $objWorksheet = self::$objPHPExcel->getSheetByName('Worksheet');
        $sql = "SELECT * FROM departamento";
        $objWorksheet->setCellValueByColumnAndRow(0, 1, 'CODIGO');
        $objWorksheet->setCellValueByColumnAndRow(1, 1, 'NOMBRE');
        $i = 2;
        foreach (UtilConexion::$pdo->query($sql) as $fila) {
            error_log("Entre al metodo 3");

            $objWorksheet->setCellValueByColumnAndRow(0, $i, $fila['codigo']);
            $objWorksheet->setCellValueByColumnAndRow(1, $i, $fila['nombre']);
            $i = $i + 1;
        }
        self::guardarLibro();
        echo json_encode("Exito");
    }

    public static function generarReporteEmpresaExterna($param) {
        self::crearLibro($param);
        $objWorksheet = self::$objPHPExcel->getSheetByName('Worksheet');

        $objWorksheet->setCellValueByColumnAndRow(0, 1, 'CODIGO');
        $objWorksheet->setCellValueByColumnAndRow(1, 1, 'NOMBRE');
        $objWorksheet->setCellValueByColumnAndRow(2, 1, 'NIT');
        $objWorksheet->setCellValueByColumnAndRow(3, 1, 'TIPO');
        $objWorksheet->setCellValueByColumnAndRow(4, 1, 'DIRECCION');
        $objWorksheet->setCellValueByColumnAndRow(5, 1, 'CODIGO REPRESENTANTE LEGAL EMPRESA');

        $sql = "SELECT * FROM empresa_externa";
        $i = 2;
        foreach (UtilConexion::$pdo->query($sql) as $fila) {
            error_log("Entre al metodo 3");

            $objWorksheet->setCellValueByColumnAndRow(0, $i, $fila['codigo']);
            $objWorksheet->setCellValueByColumnAndRow(1, $i, $fila['nombre']);
            $objWorksheet->setCellValueByColumnAndRow(2, $i, $fila['nit']);
            $objWorksheet->setCellValueByColumnAndRow(3, $i, $fila['tipo']);
            $objWorksheet->setCellValueByColumnAndRow(4, $i, $fila['direccion']);
            $objWorksheet->setCellValueByColumnAndRow(5, $i, $fila['codigo_representante_legal_empresa']);
            $i = $i + 1;
        }
        self::guardarLibro();
        echo json_encode("EXITO");
    }
    
    public static function generarReporteConvenio($param) {
        self::crearLibro($param);
        $objWorksheet = self::$objPHPExcel->getSheetByName('Worksheet');

        $objWorksheet->setCellValueByColumnAndRow(0, 1, 'CODIGO');
        $objWorksheet->setCellValueByColumnAndRow(1, 1, 'TITULO');
        $objWorksheet->setCellValueByColumnAndRow(2, 1, 'RAZON');
        $objWorksheet->setCellValueByColumnAndRow(3, 1, 'FECHA INICIO');
        $objWorksheet->setCellValueByColumnAndRow(4, 1, 'FECHA FIN');
        $objWorksheet->setCellValueByColumnAndRow(5, 1, 'CODIGO EMPRESA EXTERNA');

        $sql = "SELECT * FROM convenio";
        $i = 2;
        foreach (UtilConexion::$pdo->query($sql) as $fila) {

            $objWorksheet->setCellValueByColumnAndRow(0, $i, $fila['codigo']);
            $objWorksheet->setCellValueByColumnAndRow(1, $i, $fila['titulo']);
            $objWorksheet->setCellValueByColumnAndRow(2, $i, $fila['razon']);
            $objWorksheet->setCellValueByColumnAndRow(3, $i, $fila['fecha_inicio']);
            $objWorksheet->setCellValueByColumnAndRow(4, $i, $fila['fecha_fin']);
            $objWorksheet->setCellValueByColumnAndRow(5, $i, $fila['codigo_empesa_externa']);
            $i = $i + 1;
        }
        self::guardarLibro();
        echo json_encode("EXITO");
    }
    
    public static function generarReportePractica($param) {
        self::crearLibro($param);
        $objWorksheet = self::$objPHPExcel->getSheetByName('Worksheet');

        $objWorksheet->setCellValueByColumnAndRow(0, 1, 'CODIGO');
        $objWorksheet->setCellValueByColumnAndRow(1, 1, 'FECHA INICIO');
        $objWorksheet->setCellValueByColumnAndRow(2, 1, 'FECHA FIN');
        $objWorksheet->setCellValueByColumnAndRow(3, 1, 'SALARIO');
        $objWorksheet->setCellValueByColumnAndRow(4, 1, 'ESTADO');
        $objWorksheet->setCellValueByColumnAndRow(5, 1, 'OBSERVACION');
        $objWorksheet->setCellValueByColumnAndRow(6, 1, 'CODIGO ESTUDIANTE');
        $objWorksheet->setCellValueByColumnAndRow(7, 1, 'CODIGO DOCENTE COORDINADOR');
        $objWorksheet->setCellValueByColumnAndRow(8, 1, 'CODIGO RESPONSABLE DE LA PRACTICA');

        $sql = "SELECT * FROM practica";
        $i = 2;
        foreach (UtilConexion::$pdo->query($sql) as $fila) {

            $objWorksheet->setCellValueByColumnAndRow(0, $i, $fila['codigo']);
            $objWorksheet->setCellValueByColumnAndRow(1, $i, $fila['fecha_inicio']);
            $objWorksheet->setCellValueByColumnAndRow(2, $i, $fila['fecha_fin']);
            $objWorksheet->setCellValueByColumnAndRow(3, $i, $fila['salario']);
            $objWorksheet->setCellValueByColumnAndRow(4, $i, $fila['estado']);
            $objWorksheet->setCellValueByColumnAndRow(5, $i, $fila['observacion']);
            $objWorksheet->setCellValueByColumnAndRow(6, $i, $fila['codigo_estudiante']);
            $objWorksheet->setCellValueByColumnAndRow(7, $i, $fila['codigo_docente_coordinador']);
            $objWorksheet->setCellValueByColumnAndRow(8, $i, $fila['codigo_responsable_practica']);
            $i = $i + 1;
        }
        self::guardarLibro();
        echo json_encode("EXITO");
    }
    
    public static function generarReporteUsuario($param) {
        self::crearLibro($param);
        $objWorksheet = self::$objPHPExcel->getSheetByName('Worksheet');

        $objWorksheet->setCellValueByColumnAndRow(0, 1, 'CODIGO');
        $objWorksheet->setCellValueByColumnAndRow(1, 1, 'NOMBRE DE USUARIO');
        $objWorksheet->setCellValueByColumnAndRow(2, 1, 'CONTRASENA');
        $objWorksheet->setCellValueByColumnAndRow(3, 1, 'NOMBRE');
        $objWorksheet->setCellValueByColumnAndRow(4, 1, 'APELLIDO');
        $objWorksheet->setCellValueByColumnAndRow(5, 1, 'CEDULA');
        $objWorksheet->setCellValueByColumnAndRow(6, 1, 'DIRECCION');
        $objWorksheet->setCellValueByColumnAndRow(7, 1, 'TELEFONO');
        $objWorksheet->setCellValueByColumnAndRow(8, 1, 'CORREO');
        $objWorksheet->setCellValueByColumnAndRow(9, 1, 'CODIGO ROL');

        $sql = "SELECT * FROM usuario";
        $i = 2;
        foreach (UtilConexion::$pdo->query($sql) as $fila) {

            $objWorksheet->setCellValueByColumnAndRow(0, $i, $fila['codigo']);
            $objWorksheet->setCellValueByColumnAndRow(1, $i, $fila['nombreusuario']);
            $objWorksheet->setCellValueByColumnAndRow(2, $i, $fila['contrasena']);
            $objWorksheet->setCellValueByColumnAndRow(3, $i, $fila['nombre']);
            $objWorksheet->setCellValueByColumnAndRow(4, $i, $fila['apellido']);
            $objWorksheet->setCellValueByColumnAndRow(5, $i, $fila['cedula']);
            $objWorksheet->setCellValueByColumnAndRow(6, $i, $fila['direccion']);
            $objWorksheet->setCellValueByColumnAndRow(7, $i, $fila['telefono']);
            $objWorksheet->setCellValueByColumnAndRow(8, $i, $fila['correo']);
            $objWorksheet->setCellValueByColumnAndRow(9, $i, $fila['codigo_rol']);
            $i = $i + 1;
        }
        self::guardarLibro();
        echo json_encode("EXITO");
    }

}
