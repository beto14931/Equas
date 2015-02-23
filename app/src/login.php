<?php
    session_start();
    $user   = utf8_decode($_POST['user']);
    $pass   = utf8_decode($_POST['pass']);
	
    include('siteConfig.php');
    include('dbConector.php');
    $data = array();
    $objDB = new dbConector($siteConfig);
    $data = $objDB->sp_exec("CALL spValidarUsuario('$user','$pass');");
    
    $objDB->close();
    $metaData['idProperty'] = 'idsesion';
    $metaData['root'] = 'rows';
    $metaData['totalProperty'] = 'results';
    $metaData['successProperty'] = 'success';
    for ($col = 0; $col < $data['&cols']; $col++){
         $metaData['fields'][] = array('name' => $data['&fieldname'][$col], 'mapping' => $data['&fieldname'][$col]);
    }
	
    if ($data[0]['result']=='false') {
        $jsonData['success'] = 'false';
		header('Location: index.php'); 
		exit();
    } else {
	    $jsonData['success'] = 'true';
        $jsonData['metaData'] = $metaData;    
        $jsonData['results'] = $data['&rows'];
		
		$_SESSION['ultimo_acceso'] = time();
		$_SESSION['idusuario']=$data[0]['idusuario'];
		$_SESSION['rol']=$data[0]['rol'];
		$_SESSION['nombrecompleto'] = $data[0]['apePaterno'].' '.$data[0]['apeMaterno'].', '.$data[0]['nombres'];
		$_SESSION['paterno'] = $data[0]['apePaterno'];
		$_SESSION['materno'] = $data[0]['apeMaterno'];
		$_SESSION['nombres'] = $data[0]['nombres'];
		$_SESSION['email'] = $data[0]['email'];
		$_SESSION['estado'] = $data[0]['estado'];
		header('Location: principal.php');
		exit();
	}
?>
