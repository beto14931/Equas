<?php
/**
 * Created by PhpStorm.
 * User: Randiel
 * Date: 13/04/14
 * Time: 10:27 AM
 */

class conectorDatos {
    public $conexion;

    function __contruct(){
        $this->conexion = NULL;
    }

    public function conectar($siteConfig) {
        $this->conexion = new mysqli($siteConfig['server'], $siteConfig['user'], $siteConfig['pass'])
        or die($this->conexion->error);

        if (!($this->conexion)) {
            trigger_error("ERROR: Se ha generado un error al intentar conectarse a la base de datos.");
        }

        if (!($this->conexion->select_db($siteConfig['db']))) {
            trigger_error("La base de datos (".$siteConfig['db'].") no está disponible actualmente.");
        }

        $this->conexion->set_charset("utf-8");
        $this->conexion->query("SET NAMES 'utf-8';");
	$this->conexion->query("SET character_set_results = 'utf-8', character_set_client = 'utf-8', character_set_connection = 'utf-8', character_set_database = 'utf-8', character_set_server = 'utf-8';");

    }

    private function format($result, $totalrows)
    {
        $rs = array();
        if ( $result === FALSE ) {
            $l_resrow = 0;
        } else {
            $l_resrow = $result->num_rows;
        }

        $rs["&error"] = $this->conexion->error;
        if ($rs["&error"] == '' and $l_resrow > 0)
        {
            $rs["status"]		= true;
            $rs["&cols"]		= $result->field_count;
            $rs["&rows"]		= $result->num_rows;
            $rs["rows"]         = $totalrows;
            $rs["&total"]		= $rs["&cols"] * $rs["&rows"];
            $rs["&fieldname"]	= array();
            $fields			    = $result->fetch_fields();
            for ($j = 0; $j < $rs["&cols"]; $j++) {
                $rs["&fieldname"][] = $fields[$j]->name;
            }
                
            while ($row = $result->fetch_array()) {
		      $rs['results'][] = array_map('utf8_encode', $row);
            }

            if ($rs["&cols"] == 1 && $rs["&rows"] == 1) {
                $rs["&val"] = $rs[0][0];
            }
                
            $result->close();
        }
        else
        {
            $rs["status"]		= false;
        }
        return $rs;
    }

    public function ejecutarProcedimiento($sProc, $aPars, $start, $limit)
    {
        $result    = NULL;
        $callPar   = NULL;
        $separator = " , ";
        $acnt      = 0;

        if (!is_null($aPars)) {
            foreach ($aPars as $par) {
                $acnt++;
                if ($acnt > 1) {
                    $callPar = $callPar . $separator . "'". $par . "'";
                } else {
                    $callPar = $callPar . "'". $par . "'";
                }
            }

            if ( !is_null($start) and !is_null($limit) ) {
                    $callPar = $callPar . ", ". $start . ", ". $limit . ", @p_cntrow";
            }

        } else {
            $callPar   = '';
        }

        $strCall = " CALL " . $sProc . "(".$callPar.");";
    	//echo "strCall :".$strCall;
        file_put_contents('php://stderr', print_r($strCall, TRUE));

    	$totalrows = 0;	
        if ($this->conexion->multi_query($strCall)) {
            if ($result = $this->conexion->store_result()) {
                while ($this->conexion->more_results() && $this->conexion->next_result()) {
                    
                }
            }
        }

        if ( !is_null($start) and !is_null($limit) ) {
        	$rs = $this->conexion->query("SELECT @p_cntrow;");
            while ($rvar = $rs->fetch_object()) 
        	{
        	    $totalrows = $rvar->{"@p_cntrow"};
        	}
        }

	
        return $this->format($result, $totalrows);
	
    }

    function __destroy()
    {
        $this->conexion->close();
        $this->conexion = NULL;
    }


} 
