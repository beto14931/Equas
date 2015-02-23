
// Funcion para imprimir datos JSON, se usa para debuggear
function vardump(obj){
	var out = '';
	for (property in obj) {
		out = out + property +': '+ obj[property] + "\n";
	}
	return out;
}

// Funcion para agregar un nueevo tab en el entorno principal
function addNewTab(nPadre, nHijo, nTitulo){
  //alert(nPadre);
  //alert(nHijo);
  //alert(nTitulo);
    var tp = Ext.getCmp(nPadre);
    var th = Ext.ComponentQuery.query('panel[itemId=' + nHijo + ']')[0];

    if (tp.child("#"+nHijo)) {
        th.show();
        th.tab.show();
    }
    else {
        $.ajax({
            type: "GET",
            async: false,
            url: "web/src/" + nHijo + ".js", //JAPT	    
            dataType: "script"
        });
        th = Ext.ComponentQuery.query('panel[itemId=' + nHijo + ']')[0];
        tp.add(th).show();
    }
    tp.setActiveTab(th);
    tp.doLayout();
}


// Funcion para agregar un nueevo tab en el entorno principal
function addNewTabAux(nPadre, nHijo, nTitulo,pars){
  //alert(nPadre);
  //alert(nHijo);
  //alert(nTitulo);
    
    Ext.define('MyHenData', {
        singleton: true,
        ghenid  : pars.get('henkeyi'),
        gparnamc: pars.get('parnamc'),
        gnmrcodc: pars.get('nmrcodc'),
        gplantilla: '',
    }); 

    var vpars = new Object();
    vpars.filtro=pars.get('henkeyi');
    var params = {'procedimiento' : 'consultarPlantillaHe','parametros' : Ext.encode(vpars)};

    var plantilla='';
    var output=null;
    $.ajax({
            type: "GET",
            data: params,
            dataType: "json",
            async:false,
            url: 'app/src/ejecutarProcedimiento.php', 
            success: function (response) {
                output=response;
            }            
    });
    //alert('output:'+vardump(output));
    //alert('output1:'+output['results'][0][0]);
    nHijo=output['results'][0][0];
    //alert('nHijo:'+nHijo);

    var tp = Ext.getCmp(nPadre);
    var th = Ext.ComponentQuery.query('panel[itemId=' + nHijo + ']')[0];
    if (tp.child("#"+nHijo)) {
        th.show();
        th.tab.show();
    }
    else {
        $.ajax({
            type: "GET",
            async: false,
            url: "web/src/" + nHijo + ".js", //JAPT               
            //data : {par1: 'prueba'},
            dataType: "script"
        });
        th = Ext.ComponentQuery.query('panel[itemId=' + nHijo + ']')[0];
        tp.add(th).show();        
    }
    tp.setActiveTab(th);
    tp.doLayout();
}

// Funcion para evaluar si un dato es nulo
function isnull(dato){
    return (dato=='undefined' || dato == null) ? true : false;
}

// Funcion para evaluar si un dato no tiene valor
function isempty(dato) {
    return (isnull(dato) || (dato == '')) ? true : false;
}

// Funcion para pintar la celda entidad en la grilla
function fnRenderEntidad(val) {
	if(val == 'despacho'){
		return '<span style="color:red;">' + val + '</span>';
	}
	return val;	
}

// Funcion para llenar a la izquierda de caracteres '0' por defecto
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function setearCombo(comboBox, value) {
    var store = comboBox.store;
    var valueField = comboBox.valueField;
    var displayField = comboBox.displayField;
    
    var recordNumber = store.findExact(valueField, value, 0);
    
    if (recordNumber == -1)
        return -1;
    
    var displayValue = store.getAt(recordNumber).data[displayField];
    comboBox.setValue(value);
    comboBox.setRawValue(displayValue);
    comboBox.selectedIndex = recordNumber;
    return recordNumber;
}

/*  Función para generar un combobox tipo glosario
    Parametros

    label: Descriptivo del combobox
    name: Identificador y nombre del objeto
    procedure: Procedimiento MySql para obtener la data
    pars: Parametros para el procedimiento
    mode: 'homo', 'hetero'
*/
function generarCombobox(p_label, p_name, p_procedure, p_pars, p_mode, p_qmode, p_hijo, p_prochijo) {

    var l_modelname = 'snkCor_' + p_name;
    var l_fldcod = null;
    l_fldcod = (p_mode == 'homo') ? 'glovalc' : 'glocodc';
    // Sección de registro del modelo
    Ext.define(l_modelname, {
        extend: 'Ext.data.Model',
        idProperty: 'glocodc',
        fields: [
            {name:'glocodc', type: 'string'},
            {name:'glovalc', type: 'string'}
        ]
    });

    // Sección de obtención de datos
    var snkCorStrGlo = Ext.create('Ext.data.Store', {
        model: l_modelname,
        autoload: true,        
        proxy: {        
            type: 'ajax',
            url: 'app/src/ejecutarProcedimiento.php',
            startParam: false,
            limitParam: false,
            noCache: false,
            pageParam: false,
            extraParams: {
                'procedimiento': p_procedure,
                'parametros': Ext.encode(p_pars)
            }, 
            reader: {
                type: 'json', 
                root: 'results',
                totalProperty: 'rows',
                idProperty: 'glocodc'
            }        
        }
    });

    // Combobox resultante generado
    return Ext.create('Ext.form.ComboBox', {
        fieldLabel: p_label,
        name: p_name,
        id: p_name,
        store: snkCorStrGlo,
        queryMode: p_qmode,
        typeAhead: true,
        triggerAction: 'all',
        displayField: 'glovalc',
        valueField: l_fldcod,
        forceSelection: false,
        editable: false,
        listeners: {
            select: function(ele, reg, ind) {
                //var store = Ext.data.StoreManager.get(p_hijo);
                if (p_hijo != null) {
                    var store = Ext.getCmp(p_hijo).getStore();
                    if (store) { 
                        if (reg[0].internalId) {
                            var pars = { p_val: reg[0].internalId };
                            store.load({
                                params:{
                                    'procedimiento': p_prochijo,
                                    'parametros'   : Ext.encode(pars)
                                }
                            });
                        }
                    }
                }
            },
            afterrender: function (combo) {
                combo.setValue('(Ninguno)');
            }
        }        
    });

}
