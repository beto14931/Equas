
//var el = Ext.get('par1'); // get the LOG

//var valor;
//valor=<?php echo $_GET['par1']; ?>;
//alert(valor);
/*
function getVarsUrl(){
	alert('url:'+location);
    var url= location.search.replace("?", "");
    var arrUrl = url.split("&");
    var urlObj={}; 
    alert('len'+arrUrl.length);
    for(var i=0; i<arrUrl.length; i++){
        var x= arrUrl[i].split("=");
        alert('i:'+i);
        alert('x[0]'+x[0]);
        alert('x[1]'+x[1]);
        urlObj[x[0]]=x[1]
    }
    return urlObj;
}

*/
//var misVariablesGet = getVarsUrl();

//var el = $_GET("par1");
//alert(el);
//var el1 = $_GET("par2");
//alert(el1);
//alert(misVariablesGet.par1);
//alert(vardump(misVariablesGet.par1));
//var msgBox = Ext.get('par2');
//alert(msgBox);
/*INICIO OBTIENE CAMPOS*/
Ext.define('fr2_MdlCampos', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'plakeyi', type: 'int'},
        {name:'placodc', type: 'string'},
        {name:'plafldc', type: 'string'},
        {name:'plalblc', type: 'string'},
        {name:'plaplakeyi', type: 'int'},
        {name:'plaparid', type: 'int'},
        {name:'plavisible', type: 'int'}
    ]
});

var par2 = new Object();
par2.hen=MyHenData.ghenid;//Ext.getCmp('MyHenData.ghenid').getValue();

var fr2_Campos=Ext.Ajax.request({
            url: 'app/src/ejecutarProcedimiento.php',
            method: 'GET',
            async:false,
            params : {
                'procedimiento': 'cargaCamposHe',
                'parametros': Ext.encode(par2)
            },            
            success: function(response, request){
                var resobj = Ext.decode(response.responseText);
                if (resobj.status == false) {
                        return false;
                }                            
                Ext.Msg.alert('Mensaje de EQUAS:',resobj.results[0]);        
                return resobj.results[0];
            },
            failure : function(response, request){
                Ext.Msg.alert("Mensaje de EQUAS.", "Hubo algún error en el proceso.");
                return false;
            }
        });

//alert(fr2_Campos[0][0]);
//alert(fr2_Campos[2][2]);

/*
var fr2_Campos = Ext.create('Ext.data.Store', {
    model:'fr2_MdlCampos',
    autoload: true,
    proxy: {        
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,
        url: 'app/src/ejecutarProcedimiento.php',        
        extraParams: {
            'procedimiento': 'cargaCamposHe'
            ,'parametros': Ext.encode(par2)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }        
    }
});

alert(vardump(fr2_Campos));

var resobjcamp = Ext.decode(fr2_Campos.responseText);

/*
/*
if (resobjcamp.status == false) {
        return false;
}*/                            
//Ext.Msg.alert('Mensaje de EQUAS:',resobjcamp.results[0]);

/*FIN OBTIENE CAMPOS*/

/*INICIO PANEL REGISTRO*/

// Panel del Parametro
var fpl2_PnNomPar = Ext.create('Ext.form.Panel',{
    region: 'north',
    autoScroll: true,
    frame: false,
    margins: '5 5 5 5', 
    defaults: {
        border: true,
        xtype: 'panel',
        flex: 1,
        margins: '10 10 10 10'
    },        
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{fieldLabel: 'DUREZA TOTAL',
            name: 'fpl2_NomParc1',
            id: 'fpl2_NomParc1',
            xtype: 'textfield',            
            readOnly:true
        }]
});

// Panel de la Cabacera
var fpl2_PnCabecera = Ext.create('Ext.form.Panel',{
    region: 'north',
    autoScroll: true,
    frame: false,
    margins: '5 5 5 5', 
    defaults: {
        border: true,
        xtype: 'panel',
        flex: 1,
        margins: '10 10 10 10'
    },        
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{fieldLabel: 'Cabecera',
            name: 'fpl2_Cabecc1',
            id: 'fpl2_Cabecc1',
            xtype: 'textfield',            
            readOnly:true
        }]
});

// Panel de la Grilla
var fpl2_PnGrilla = Ext.create('Ext.form.Panel',{
    region: 'north',
    autoScroll: true,
    frame: false,
    margins: '5 5 5 5', 
    defaults: {
        border: true,
        xtype: 'panel',
        flex: 1,
        margins: '10 10 10 10'
    },        
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{fieldLabel: 'Grilla',
            name: 'fpl2_Gridc1',
            id: 'fpl2_Gridc1',
            xtype: 'textfield',            
            readOnly:true
        }]
});

// Panel del Pie
var fpl2_PnNPie = Ext.create('Ext.form.Panel',{
    region: 'north',
    autoScroll: true,
    frame: false,
    margins: '5 5 5 5', 
    defaults: {
        border: true,
        xtype: 'panel',
        flex: 1,
        margins: '10 10 10 10'
    },        
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{fieldLabel: 'Pie',
            name: 'fpl2_Pie',
            id: 'fpl2_Pie',
            xtype: 'textfield',            
            readOnly:true
        }]
});

// Panel del Estandar Control
var fpl2_PnEstCont = Ext.create('Ext.form.Panel',{
    region: 'north',
    autoScroll: true,
    frame: false,
    margins: '5 5 5 5', 
    defaults: {
        border: true,
        xtype: 'panel',
        flex: 1,
        margins: '10 10 10 10'
    },        
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{fieldLabel: 'Estandar Control',
            name: 'fpl2_EC',
            id: 'fpl2_EC',
            xtype: 'textfield',            
            readOnly:true
        }]
});

// Panel de Muestra Adicion
var fpl2_PnMuesAdic = Ext.create('Ext.form.Panel',{
    region: 'north',
    autoScroll: true,
    frame: false,
    margins: '5 5 5 5', 
    defaults: {
        border: true,
        xtype: 'panel',
        flex: 1,
        margins: '10 10 10 10'
    },        
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{fieldLabel: 'Muetsra Adicion',
            name: 'fpl2_MA',
            id: 'fpl2_MA',
            xtype: 'textfield',            
            readOnly:true
        }]
});


// Panel de Duplicado
var fpl2_PnDuplicado = Ext.create('Ext.form.Panel',{
    region: 'north',
    autoScroll: true,
    frame: false,
    margins: '5 5 5 5', 
    defaults: {
        border: true,
        xtype: 'panel',
        flex: 1,
        margins: '10 10 10 10'
    },        
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{fieldLabel: 'Duplicado',
            name: 'fpl2_dup',
            id: 'fpl2_dup',
            xtype: 'textfield',            
            readOnly:true
        }]
});


// Panel de la Leyenda
var fpl2_PnLeyenda = Ext.create('Ext.form.Panel',{
    region: 'north',
    autoScroll: true,
    frame: false,
    margins: '5 5 5 5', 
    defaults: {
        border: true,
        xtype: 'panel',
        flex: 1,
        margins: '10 10 10 10'
    },        
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{fieldLabel: 'Leyenda',
            name: 'fpl2_leyen',
            id: 'fpl2_leyen',
            xtype: 'textfield',            
            readOnly:true
        }]
});
/*FIN PANEL REGISTRO*/


//alert(MyHenData.ghenid+'/'+MyHenData.gparnamc+'/'+MyHenData.gnmrcodc);

Ext.create('Ext.form.Panel', {
    title: 'Llenar Hoja de Ensayo(frmPlantilla2)',    
    name:'frmPlantilla2',
    id:'frmPlantilla2',
    itemId:'frmPlantilla2',
    layout: 'border',
    closable: true,
    frame: true,
    border: false,
    items: [
            fpl2_PnNomPar,// Nombre Parametro
            fpl2_PnCabecera,// Cabecera
            fpl2_PnGrilla,// Grilla
            fpl2_PnNPie,// Pie
            fpl2_PnEstCont,// Estandar Control
            fpl2_PnMuesAdic,// Muestra Adicion
            fpl2_PnDuplicado,// Duplicado
            fpl2_PnLeyenda,// Leyenda
    ],
    //autoScroll:true,
    tbar:[{
        id:'fpl2_id_gua',
        text: 'Guardar',
        //iconCls: 'cargar_archivo',
        handler: function() { 
        }
    },'-',    
    {
        id:'fpl2_id_eli',
        text: 'Eliminar',
        //iconCls: 'cargar_archivo',
        handler: function() {
            //fac_StrPrm.load();
        }
    },'-',
    {
        id:'fpl2_id_fin',
        text: 'Finalizar',
        //iconCls: 'cargar_archivo',
        handler: function(btn, e) {
            /*
            var pars = new Object();
            pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
            frp_StrCodSel.load({
                params:{
                    'procedimiento': 'consultarCodigoLote',
                    'parametros'   : Ext.encode(pars)
                }
            });

            btn.up('.tabpanel').remove(btn.up('.panel'), false);
            */
        }
    },{ xtype: 'tbfill' } 
    
    ]
});
