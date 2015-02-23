<?php
    //session_start();
    header('Content-Type: application/json; charset=utf-8'); 
        
    include('../inc/siteConfig.php');
    include('../inc/conectorDatos.php');
    //    include('../lib/json.php');

    //    $json = new Services_JSON();

    $oData = new conectorDatos();
    $oData->conectar($siteConfig);

    $sProc  = $_GET['procedimiento'];
    $start  = $_GET['start'];
    $limit  = $_GET['limit'];

	//echo $_GET['parametros'];
    if ($_GET['parametros']) {
    	$getpar = $_GET['parametros'];
    	$sPars = json_decode($getpar);

        if (!is_null($sPars)) {
        	foreach($sPars as &$value)
        	{
        	    $value = addslashes(mb_convert_encoding($value, "latin1", "UTF-8"));
        	}
    	   unset($value);
        }
	   //file_put_contents('php://stderr', print_r($sPars, TRUE));
    } else {
        $sPars = null;
    }
//echo $sPars;
    echo utf8_encode(json_encode($oData->ejecutarProcedimiento($sProc, $sPars, $start, $limit)));

?>
