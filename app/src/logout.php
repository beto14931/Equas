<?php
    session_start();
    $iduser   = $_SESSION['idusuario'];
	
    include('siteConfig.php');
    include('dbConector.php');
    $objDB = new dbConector($siteConfig);
    $data = $objDB->sp_exec_only("CALL spCerrarSesion($iduser);");
        
	$_SESSION['ultimo_acceso'] = '';
	$_SESSION['idusuario'] = '';
	$_SESSION['rol']= '';
	$_SESSION['nombrecompleto'] = '';
	$_SESSION['paterno'] = '';
	$_SESSION['materno'] = '';
	$_SESSION['nombres'] = '';
	$_SESSION['email'] = '';
	$_SESSION['estado'] = '';
	session_destroy();
	header('Location: index.php');
	exit();
?>
