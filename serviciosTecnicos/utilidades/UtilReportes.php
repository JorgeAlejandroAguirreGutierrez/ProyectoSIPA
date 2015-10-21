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
        echo json_encode(["mensaje" => "todo bien"]);
    }

    public static function guardarLibro() {
        $objWriter = PHPExcel_IOFactory::createWriter(self::$objPHPExcel, 'Excel2007');
        $objWriter->save(self::$archivo);
        self::$objPHPExcel->disconnectWorksheets();
//        unset(self::$objPHPExcel);
    }

    public static function generarReportePractica($param) {
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

    public static function generarReporteConvenio($param) {
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
        echo json_encode("Exito");
    }

}
