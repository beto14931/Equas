<?php

include('../inc/siteConfig.php');
include('../inc/conectorDatos.php');
require_once '../lib/PHPExcel.php';

$oData = new conectorDatos();
$oData->conectar($siteConfig);

$sProc = 'reportarParametro';
$sPars = null;

$result = $oData->ejecutarProcedimiento($sProc, $sPars, 0 ,0);
$data   = $result['results'];

$rowCount = 1;
$headerow = 5;

$objPHPExcel = new PHPExcel();
$objPHPExcel->setActiveSheetIndex(0);
$objPHPExcel->getProperties()->setCreator("Plataforma EQUAS")
							 ->setLastModifiedBy("Operador del sistema")
							 ->setTitle("Documento generado desde la Plataforma EQUAS")
							 ->setSubject("Reporte de parametros")
							 ->setDescription("Listado de parametros registrada en la base de datos.")
							 ->setCategory("Reporte");


$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
$objDrawing->setName('EQUAS');
$objDrawing->setDescription('Logotipo EQUAS');
$objDrawing->setPath('/var/www/equas/app/static/img/logoHead1.png');
$objDrawing->setCoordinates('B1');
$objDrawing->setOffsetX(2);

$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);

$objPHPExcel->getActiveSheet()->setTitle('Parametros');

$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(2);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(4);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(30);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(24);
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(14);
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(15);
$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(20);
$objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(17);

$objPHPExcel->getActiveSheet()->getStyle('B'.$headerow.':H'.$headerow)->getFont()->setName('Arial Narrow');
$objPHPExcel->getActiveSheet()->getStyle('B'.$headerow.':H'.$headerow)->getFont()->setSize(10);
$objPHPExcel->getActiveSheet()->getStyle('B'.$headerow.':H'.$headerow)->getFont()->setBold(true);

$objPHPExcel->getActiveSheet()->SetCellValue('B'.$headerow, 'Nro.');
$objPHPExcel->getActiveSheet()->SetCellValue('C'.$headerow, 'Nombre');
$objPHPExcel->getActiveSheet()->SetCellValue('D'.$headerow, 'Abreviatura');
$objPHPExcel->getActiveSheet()->SetCellValue('E'.$headerow, 'Producto');
$objPHPExcel->getActiveSheet()->SetCellValue('F'.$headerow, 'Área');
$objPHPExcel->getActiveSheet()->SetCellValue('G'.$headerow, 'Unidades');
$objPHPExcel->getActiveSheet()->SetCellValue('H'.$headerow, 'Estado');

foreach ($data as $item) {
	$cellrow = $rowCount + 5;

	$objPHPExcel->getActiveSheet()->getStyle('B'.$cellrow.':H'.$cellrow)->getFont()->setName('Arial Narrow');
	$objPHPExcel->getActiveSheet()->getStyle('B'.$cellrow.':H'.$cellrow)->getFont()->setSize(10);

    $objPHPExcel->getActiveSheet()->SetCellValue('B'.$cellrow, $rowCount);
    $objPHPExcel->getActiveSheet()->SetCellValue('C'.$cellrow, $item['parnamc']);
    $objPHPExcel->getActiveSheet()->SetCellValue('D'.$cellrow, $item['parabrc']);
    $objPHPExcel->getActiveSheet()->SetCellValue('E'.$cellrow, $item['parproc']);
    $objPHPExcel->getActiveSheet()->SetCellValue('F'.$cellrow, $item['pararec']);
    $objPHPExcel->getActiveSheet()->SetCellValue('G'.$cellrow, $item['parundc']);
    $objPHPExcel->getActiveSheet()->SetCellValue('H'.$cellrow, $item['parestc']);
    $rowCount++;
}

$filename = '/var/www/equas/app/static/xls/reporteParametros.xlsx';
ob_end_clean();
ob_start();
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="reporteParametros.xlsx"');
header('Cache-Control: max-age=0');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save("php://output");
exit;
?>