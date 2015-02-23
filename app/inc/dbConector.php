<?php
/*** 
**** @file		: dbConector.php
**** @desc 		: Clase de conexión a BD (optimizada para MySQL).
**** @project	: SisCitas
**** @version	: 1.0 
**** @author	: R&R 
**** @date		: Viernes, 14 de Agosto del 2009. 
**** @license	: Copyright © 2009 BlackPrince Consulting. Todos los derechos reservados. 
***/ 

class dbConector
{
	private $cnx = NULL;
	
    function dbConector($siteConfig)
    {
		$this->cnx = $this->connect($siteConfig);		
    }

    function connect($siteConfig)
    {
    	$cnx = NULL;	
		if (!($cnx = new mysqli($siteConfig["server"], $siteConfig["user"], $siteConfig["pass"])))
            trigger_error("No es posible conectarse al servidor de base de datos.");
        if (!($cnx->select_db($siteConfig['db'])))
            trigger_error("La base de datos (".$siteConfig['db'].") no está disponible actualmente.");
		$cnx->set_charset("utf-8");
        $cnx->query("SET NAMES 'utf-8';");
        return $cnx;
    }
	
	function format($result)
	{
		$rs = array();
		$rs["&error"] = $this->cnx->error; 
		if ($rs["&error"] == '')
		{
			$rs["&status"]		= true;
			$rs["&cols"]		= $result->field_count;
			$rs["&rows"]		= $result->num_rows;
			$rs["&total"]		= $rs["&cols"] * $rs["&rows"];
			$rs["&fieldname"]	= array();
			$fields				= $result->fetch_fields();
			for ($j = 0; $j < $rs["&cols"]; $j++)
				$rs["&fieldname"][] = $fields[$j]->name;
			while ($row = $result->fetch_array())
			{
				$rs[] = $row;
				for ($j = 0; $j < $rs["&cols"]; $j++)
					$rs[$rs["&fieldname"][$j]][] = $row[$j];
			}
			if ($rs["&cols"] == 1 && $rs["&rows"] == 1)
				$rs["&val"] = $rs[0][0];
			$result->close();
		}
		else
		{
			$rs["&status"]		= false;
//			echo "QUERY: ".$query."<br />";
//			trigger_error("ERROR: ".$rs["&error"]);
		}
		return $rs;
	}

	function sp_exec($sp)
	{
		$result = NULL;
		if ($this->cnx->multi_query($sp)) {
			$result = $this->cnx->store_result();
			while ($this->cnx->more_results() && $this->cnx->next_result()) {
				// Procesar los siguientes conjuntos de datos.
			}			
		}
		return $this->format($result);
	}
	
	function sp_exec_only($sp)
	{
		$result = NULL;
		if ($this->cnx->multi_query($sp)) {
			$result = $this->cnx->store_result();
		}
		return $result;
	}
	
	function close() 
	{
		$this->cnx->close();
	}
}
?>