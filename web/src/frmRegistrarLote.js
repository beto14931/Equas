/*
    **NOMENCLATURA**
    frl - formulario registrar lote
    Apl - Asignacion de parametros de lote
    Acp - Aceptar
    Can - Cancelar
    Btn - Boton
    Pnl - Panel
    Cmb - Combobox
    Rdb - Radio 
    Chk - Check option
    Clb - Codigod de laboratorio
    Grd - Grid panel
    Cbm - Check box model
*/

/*INICIO COMBOBOX ESTADO LOTE*/
var codLote = null;

Ext.define('frl_CmbMdlObs', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'glocodc', type: 'string'},
        {name:'glovalc', type: 'string'}
    ]
});

pars = new Object();
pars.tabla = 'Estado lote';
pars.combo = '%';
var frl_CmbStrObs = Ext.create('Ext.data.Store', {
    model:'frl_CmbMdlObs',
    autoload: true,
    proxy: {        
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,
        url: 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarGlosario',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'rows'
        }
    }
});

var frl_CmbObs = Ext.create('Ext.form.ComboBox', {
    fieldLabel: 'Observación',
    name:'frl_CmbObs',
    id:'frl_CmbObs',
    store: frl_CmbStrObs,
    mode: 'local',
    displayField: 'glovalc',
    value: '(Ninguno)',
    valueField: 'glovalc',
    labelWidth: 70,
    editable: false,
    listeners: {
        select: function(t) {
            var pars = new Object();
            pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();

            if (t.value != '(Ninguno)') {
                pars.lotchrc = t.value.substring(0,1) + codLote;

            } else {
                pars.lotchrc = codLote;
                Ext.getCmp('frl_DtlCod').setValue(codLote);

            }

            Ext.Ajax.request({
                url: 'app/src/ejecutarProcedimiento.php',
                method: 'GET',
                async: false,
                params : {
                    'procedimiento': 'actualizarCodigoLote',
                    'parametros'   : Ext.encode(pars)
                },            
                success: function(response, request){
                    var resobj = Ext.decode(response.responseText);
                    if (resobj.status == false) {
                        return false;
                    }
                    
                    var item = resobj.results[0];
                    Ext.getCmp('frl_DtlCod').setValue(item.lotcodc);

                },
                failure : function(response, request){
                    Ext.Msg.alert("Mensaje de WKBOOK.", "Hubo errores en el proceso.");
                    return false;
                }
            });

        }
    }
});
/*FIN COMBOBOX ESTADO LOTE*/

/*INICIO COMBOBOX CLIENTE*/
Ext.define('frl_CmbMdlCli', {
    extend: 'Ext.data.Model',
    idProperty: 'glocodc',
    fields: [
        {name:'glocodc', type: 'string'},
        {name:'glovalc', type: 'string'}
    ]
});

pars = new Object();
pars.filtro = '%';
var frl_CmbStrCli = Ext.create('Ext.data.Store', {
    model:'frl_CmbMdlCli',
    autoload: true,
    proxy: {        
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,
        url: 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarClienteValido',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'rows',
            idProperty: 'glocodc'
        }
    }
});

var frl_CmbCli = Ext.create('Ext.form.ComboBox', {
    fieldLabel: 'Cliente',
    name:'frl_CmbCli',
    id:'frl_CmbCli',
    store: frl_CmbStrCli,
    mode: 'local',
    displayField: 'glovalc',
    valueField: 'glocodc',
    width: '30%',
    labelWidth: 90,
    editable: false
});
/*FIN COMBOBOX CLIENTE*/

/*INICIO COMBOBOX PRODUCTO*/
Ext.define('frl_CmbMdlPro', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'glocodc', type: 'string'},
        {name:'glovalc', type: 'string'}
    ]
});
pars = new Object();
pars.tabla='Producto Parametro';        
pars.combo='%';
var frl_CmbStrPro = Ext.create('Ext.data.Store', {
    model:'frl_CmbMdlPro',
    autoload: true,
    proxy: {        
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,
        url: 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarGlosario',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }
    }
});
var frl_DtmPro = new Ext.form.ComboBox({
    fieldLabel: 'Producto',
    name:'frl_DtmPro',
    id:'frl_DtmPro',
    labelWidth: 140,
    editable: false,
    store: frl_CmbStrPro,
    mode: 'local',
    displayField: 'glovalc',
    valueField: 'glocodc',
    listeners: {
        select: function(combo, record, index) {
            Todoclass.Global.tipo_producto = Ext.getCmp('frl_DtmPro').getRawValue(); 
        }
    }
});
/*FIN COMBOBOX PRODUCTO*/

var frl_DtlFrs = {
    xtype:'fieldset',        
    title: 'Datos del Lote',
    padding: 10,
    defaults: {
        border: false,
        margins: '0 0 0 20'
    },
    layout: 'hbox',
    items :[{
            xtype: 'textfield',
            id: 'frl_DtlKey',
            hidden: true,
            name: 'frl_DtlKey',
            fieldLabel: 'Key Lote',
            margins: '0 0 0 10',
            labelWidth: 90,
            readOnly: true,
            fieldStyle: "background:none #C3D3DE;"
        },{
            xtype: 'textfield',
            id: 'frl_DtlCod',
            name: 'frl_DtlCod',
            fieldLabel: 'Codigo Lote',
            margins: '0 0 0 10',
            labelWidth: 90,
            readOnly: true,
            fieldStyle: "background:none #C3D3DE;"
        },{
            xtype: 'textfield',
            id: 'frl_DtlEtp',
            name: 'frl_DtlEtp',
            fieldLabel: 'Estado Proceso',
            margins: '0 0 0 20',
            labelWidth: 90,
            readOnly: true,
            value: 'Ingresado',
            fieldStyle: "background:none #C3D3DE;"
        },{
            xtype: 'textfield',
            id: 'frl_DtlEtl',
            name: 'frl_DtlEtl',
            fieldLabel: 'Estado Lote',
            margins: '0 0 0 20',
            labelWidth: 90,
            readOnly: true,
            value: 'Normal',
            fieldStyle: "background:none #C3D3DE;"
        },{
            items:[ frl_CmbObs ]
        }] 
};


var l_keycli = null;
var frl_DtcFrs = {
    xtype:'fieldset',
    title: 'Datos del Cliente',
    defaults: {
        border: false,
        margins: '0 0 0 10'
    },
    padding: 10,
    layout: 'hbox',
    items :[
        frl_CmbCli,
    {
        xtype: 'checkbox',
        id:'frl_DtcMrk',
        name : 'frl_DtcMrk',
        margins: '0 0 0 50',
        scope: this,
        handler: function (field, value) {
            var l_cmbcli = Ext.getCmp('frl_CmbCli');
            var l_dtcnom = Ext.getCmp('frl_DtcNom');

            if (value == true) {
                l_cmbcli.setValue('');
                l_cmbcli.setReadOnly(true);
                l_dtcnom.setReadOnly(false);
                l_dtcnom.setFieldStyle("background:none;");
                l_dtcnom.focus();
            }
            else if (value == false) {
                l_cmbcli.setReadOnly(false);
                l_dtcnom.setReadOnly(true);
                l_dtcnom.setFieldStyle("background:none #C3D3DE;");
            }
        }
    },{
        id: 'frl_DtcNom',
        name: 'frl_DtcNom',
        fieldLabel: 'Cliente',
        emptyText:'Ingrese el nombre del cliente...',
        width: '30%',
        labelWidth: 90,
        xtype: 'textfield',
        readOnly: true,
        fieldStyle: "background:none #C3D3DE;"
    }]
};

var frl_DtmFrs = {
    xtype:'fieldset',        
    title: 'Datos de las Muestras',        
    defaultType: 'textfield',
    defaults: {
        border: false,
        margins: '0 0 0 10',
        labelWidth: 140,
        anchor: '100%'
    },        
    padding: 10,        
    layout: 'anchor',
    //style:'background-color:#dfe8f6;',                
    items :[
        {
        //xtype: 'filefield',
        id: 'frl_Dtmprc',
        name: 'frl_Dtmprc',
        fieldLabel: 'Procedencia'
        //allowBlank: false,
        //buttonText: 'Seleccionar archivo...'
    },
        frl_DtmPro
    ,{
        //xtype: 'filefield',
        id: 'frl_Dtmres',
        name: 'frl_Dtmres',
        fieldLabel: 'Responsable Muestreo'
        //allowBlank: false,
    },{
        //xtype: 'filefield',
        id: 'frl_Dtmpry',
        name: 'frl_Dtmpry',
        fieldLabel: 'Nombre Proyecto'
        //allowBlank: false,
    },{
        //xtype: 'filefield',
        id: 'frl_Dtmpte',
        name: 'frl_Dtmpte',
        fieldLabel: 'Propuesta Técn. Econ.'
        //allowBlank: false,
    },{
        //xtype: 'textfield',
        id: 'frl_Dtmcmt',
        name: 'frl_Dtmcmt',
        fieldLabel: 'Comentarios',
        emptyText:'Ingrese Algun comentario...',
        xtype: 'textareafield',
        grow: true
        //margins: '0 0 0 20',                
        //allowBlank: false,
        //buttonText: 'Seleccionar archivo...'
    }] 
};

var l_date = new Date();
var l_hour = pad(l_date.getHours(),2) + ':' + pad(l_date.getMinutes(),2) + ':' + pad(l_date.getSeconds(),2);

var frl_RegSeg = Ext.create('Ext.panel.Panel',{
    xtype: 'panel',
    layout: 'form',
    border: false,
    defaults: {
        labelWidth: 105
    },
    items: [{
        id: 'frl_DtsRpc',
        name: 'frl_DtsRpc',
        fieldLabel: 'Recep. de cadena',
        xtype: 'datefield',
        format: 'd/m/Y',
        submitFormat: 'Y-m-d H:i:s'
    },{
        xtype: 'datefield',
        id: 'frl_DtsIng',
        name: 'frl_DtsIng',
        fieldLabel: 'Fecha de registro',
        readOnly: true,
        value: l_date,
        format: 'd/m/Y',
        submitFormat: 'Y-m-d H:i:s',
        fieldStyle: "background:none #C3D3DE;"
    },{
        id: 'frl_DtsLab',
        name: 'frl_DtsLab',
        fieldLabel: 'Ing. de laboratorio',
        xtype: 'datefield',
        format: 'd/m/Y',
        submitFormat: 'Y-m-d H:i:s'
    },{
        id: 'frl_DtsRlm',
        name: 'frl_DtsRlm',
        fieldLabel: 'Recep. La Molina',
        xtype: 'datefield',
        format: 'd/m/Y',
        submitFormat: 'Y-m-d H:i:s'
    },{
        id: 'frl_DtsFec',
        name: 'frl_DtsFec',
        fieldLabel: 'Fecha de entrega',
        xtype: 'datefield',
        format: 'd/m/Y',
        submitFormat: 'Y-m-d H:i:s'
    }]    
});

var frl_RegSegt = Ext.create('Ext.panel.Panel',{
    xtype: 'panel',
    layout: 'form',
    border: false,
    defaults: {
        labelWidth: 40,
        fieldStyle: 'width:90px !important;'
    },            
    items: [{
        xtype: 'textfield',
        id: 'frl_DtsRpct',
        name: 'frl_DtsRpct',
        fieldLabel: 'Hora'
    },{
        xtype: 'textfield',
        id: 'frl_DtsIngt',
        name: 'frl_DtsIngt',
        fieldLabel: 'Hora',
        //format: 'H:i:s',
        value: l_hour,
        readOnly: true,
        fieldStyle: "background:none #C3D3DE; width:90px !important;"
    },{
        id: 'frl_DtsLabt',
        name: 'frl_DtsLabt',
        fieldLabel: 'Hora',
        xtype: 'textfield'
    },{
        id: 'frl_DtsRlmt',
        name: 'frl_DtsRlmt',
        fieldLabel: 'Hora',
        xtype: 'textfield'
    },{
        id: 'frl_DtsFect',
        name: 'frl_DtsFect',
        fieldLabel: 'Hora',
        xtype: 'textfield'
    }]   
});

var frl_DtsFrs = {
    xtype:'fieldset',        
    title: 'Datos de Seguimiento',
    margins: '0 0 0 20',
    defaults: {
        border: false,
        margins: '0 0 0 10',
        flex: 1
    },        
    padding: 10,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items :[ frl_RegSeg, frl_RegSegt ]
};

var frl_RegPnl = Ext.create('Ext.panel.Panel',{
    layout: 'form',
    region: 'center',
    //autoScroll:true,
    frame: false,
    border: false,
    margins: '5 5 5 5',
    items: [
        frl_DtlFrs,
        frl_DtcFrs,
        {
            border: false,
            frame: false,
            defaults: {
                flex: 1
            },        
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [ frl_DtmFrs, frl_DtsFrs ]
        }
    ]
});

Ext.create('Ext.form.Panel', {
    title: 'Registrar Lote',
    //width: 400,
    //height:100,
    //padding: 10,       
    layout:'fit',
    //defaults: {bodyStyle: 'padding:15px'},
    id:'frmRegistrarLote',
    itemId:'frmRegistrarLote',
    //style:'background-color:#ffffff;',
    bodyStyle: 'padding:5px;',
    closable: true,
    //autoScroll:true,
    border: false,
    //renderTo: Ext.getBody(),
    items: [
        //frl_AplPnl,
        frl_RegPnl
    ],
    listeners: {
        close: function () {
            Ext.getCmp('frl_DtlKey').setValue('');
            Ext.getCmp('frl_DtlCod').setValue('');
            
            Ext.getCmp('frl_DtlEtp').setValue('Ingresado');
            Ext.getCmp('frl_DtlEtl').setValue('Normal');
            Ext.getCmp('frl_CmbObs').setValue('(Ninguno)');

            Ext.getCmp('frl_CmbCli').setValue('');
            Ext.getCmp('frl_DtcNom').setValue('');

            Ext.getCmp('frl_Dtmprc').setValue('');
            Ext.getCmp('frl_DtmPro').setValue('');
            Ext.getCmp('frl_Dtmres').setValue('');
            Ext.getCmp('frl_Dtmpry').setValue('');
            Ext.getCmp('frl_Dtmpte').setValue('');
            Ext.getCmp('frl_Dtmcmt').setValue('');
            Ext.getCmp('frl_DtsRpc').setValue('');
            Ext.getCmp('frl_DtsRpct').setValue('');

            var l_date = new Date();
            Ext.getCmp('frl_DtsIng').setValue(l_date);
            Ext.getCmp('frl_DtsIngt').setValue(l_date);
            Ext.getCmp('frl_DtsLab').setValue('');
            Ext.getCmp('frl_DtsLabt').setValue('');
            Ext.getCmp('frl_DtsRlm').setValue('');
            Ext.getCmp('frl_DtsRlmt').setValue('');
            Ext.getCmp('frl_DtsFec').setValue('');
            Ext.getCmp('frl_DtsFect').setValue('');

            Ext.getCmp('frl_gualot').setDisabled(false);
            Ext.getCmp('frl_genmat').setDisabled(true);
            Ext.getCmp('frl_canlot').setDisabled(true);
            Ext.getCmp('frl_liblot').setDisabled(true);
            Ext.getCmp('frl_genocm').setDisabled(true);
            Ext.getCmp('frl_conlot').setDisabled(true);

        },
        afterlayout: function(){

            if (!isempty(Todoclass.Global.lotkeyi)) {
                Ext.getCmp('frl_DtlKey').setValue(Todoclass.Global.lotkeyi);
                Ext.getCmp('frl_DtlCod').setValue(Todoclass.Global.lotcodc);
                Ext.getCmp('frl_DtlEtp').setValue(Todoclass.Global.lotespc);
                Ext.getCmp('frl_DtlEtl').setValue(Todoclass.Global.loteslc);
                Ext.getCmp('frl_CmbObs').setValue(Todoclass.Global.lotobsc);
                
                Ext.getCmp('frl_CmbCli').getStore().load({async:false});
                Ext.getCmp('frl_CmbCli').getStore().on('load', function(){
                    Ext.getCmp('frl_CmbCli').setValue(Todoclass.Global.clirucc);
                })

                Ext.getCmp('frl_Dtmprc').setValue(Todoclass.Global.lotprcc);
                Ext.getCmp('frl_Dtmres').setValue(Todoclass.Global.lotresc);
                Ext.getCmp('frl_Dtmpry').setValue(Todoclass.Global.lotpryc);
                Ext.getCmp('frl_DtmPro').setRawValue(Todoclass.Global.lotproc);
                Ext.getCmp('frl_Dtmpte').setValue(Todoclass.Global.lotptec);
                Ext.getCmp('frl_Dtmcmt').setValue(Todoclass.Global.lotcmtc);

                if (!isempty(Todoclass.Global.lotrdcd)) {
                    Ext.getCmp('frl_DtsRpc').setValue(Todoclass.Global.lotrdcd.substring(0,10));
                    Ext.getCmp('frl_DtsRpct').setValue(Todoclass.Global.lotrdcd.substring(11,19));
                }

                if (!isempty(Todoclass.Global.lotfecd)) {
                    Ext.getCmp('frl_DtsIng').setValue(Todoclass.Global.lotfecd.substring(0,10));
                    Ext.getCmp('frl_DtsIngt').setValue(Todoclass.Global.lotfecd.substring(11,19));
                }
                
                if (!isempty(Todoclass.Global.lotingd)) {
                    Ext.getCmp('frl_DtsLab').setValue(Todoclass.Global.lotingd.substring(0,10));
                    Ext.getCmp('frl_DtsLabt').setValue(Todoclass.Global.lotingd.substring(11,19));
                }
                
                if (!isempty(Todoclass.Global.lotrlmd)) {
                    Ext.getCmp('frl_DtsRlm').setValue(Todoclass.Global.lotrlmd.substring(0,10));
                    Ext.getCmp('frl_DtsRlmt').setValue(Todoclass.Global.lotrlmd.substring(11,19));
                }

                if (!isempty(Todoclass.Global.lotfded)) {
                    Ext.getCmp('frl_DtsFec').setValue(Todoclass.Global.lotfded.substring(0,10));
                    Ext.getCmp('frl_DtsFect').setValue(Todoclass.Global.lotfded.substring(11,19));
                }

                Ext.getCmp('frl_gualot').setDisabled(false);
                Ext.getCmp('frl_genmat').setDisabled(false);
                Ext.getCmp('frl_canlot').setDisabled(false);
                Ext.getCmp('frl_liblot').setDisabled(false);
                Ext.getCmp('frl_genocm').setDisabled(false);
                Ext.getCmp('frl_conlot').setDisabled(false);
            }

            if (isempty(Ext.getCmp('frl_DtlKey').getValue())) {
                Ext.Ajax.request({
                    url: 'app/src/ejecutarProcedimiento.php',
                    method: 'GET',
                    async: false,
                    params : {
                        'procedimiento': 'obtenerKeyLote'
                    },            
                    success: function(response, request){
                        var resobj = Ext.decode(response.responseText);
                        if (resobj.status == false) {
                            return false;
                        }
                        
                        var item = resobj.results[0];
                        
                        codLote = item.lotcodc;
                        Ext.getCmp('frl_DtlCod').setValue(item.lotcodc);
                        Ext.getCmp('frl_DtlKey').setValue(item.lotkeyi);

                        /* Despues del cambio en la libreria de funciones. */
                        /*var pars = new Object();
                        pars.parkeyi = item.lotkeyi;
                        frp_StrParSel.load({
                            params:{
                                'procedimiento': 'consultarParametroLote',
                                'parametros'   : Ext.encode(pars)
                            }
                        });

                        frp_StrCodSel.load({
                            params:{
                                'procedimiento': 'consultarCodlabLote',
                                'parametros'   : Ext.encode(pars)
                            }
                        });

                        frp_StrCodPar.load({
                            params:{
                                'procedimiento': 'consultarCodParLote',
                                'parametros'   : Ext.encode(pars)
                            }
                        });*/

                    },
                    failure : function(response, request){
                        Ext.Msg.alert("Mensaje de WKBOOK.", "Hubo errores en el proceso.");
                        return false;
                    }
                });
            }
        },
    },
    tbar:[{
            text: 'Nuevo',
            id: 'frl_nuelot',
            //iconCls: 'cargar_archivo',
            handler: function() {

                Ext.getCmp('frl_DtcMrk').setValue(false);

                Ext.Ajax.request({
                    url: 'app/src/ejecutarProcedimiento.php',
                    method: 'GET',
                    async: false,
                    params : {
                        'procedimiento': 'obtenerKeyLote'
                    },            
                    success: function(response, request){
                        var resobj = Ext.decode(response.responseText);
                        var item = resobj.results[0];
                        Ext.getCmp('frl_DtlCod').setValue(item.lotcodc);
                        Ext.getCmp('frl_DtlKey').setValue(item.lotkeyi);
                    },
                    failure : function(response, request){
                        Ext.Msg.alert("Mensaje de WKBOOK.", "Hubo errores en el proceso.");
                        return false;
                    }
                });                

                Ext.getCmp('frl_DtlEtp').setValue('Ingresado');
                Ext.getCmp('frl_DtlEtl').setValue('Normal');
                Ext.getCmp('frl_CmbObs').setValue('(Ninguno)');

                Ext.getCmp('frl_CmbCli').setValue('');
                Ext.getCmp('frl_DtcNom').setValue('');

                Ext.getCmp('frl_Dtmprc').setValue('');
                Ext.getCmp('frl_DtmPro').setValue('');
                Ext.getCmp('frl_Dtmres').setValue('');
                Ext.getCmp('frl_Dtmpry').setValue('');
                Ext.getCmp('frl_Dtmpte').setValue('');
                Ext.getCmp('frl_Dtmcmt').setValue('');
                Ext.getCmp('frl_DtsRpc').setValue('');
                Ext.getCmp('frl_DtsRpct').setValue('');

                var l_date = new Date();
                Ext.getCmp('frl_DtsIng').setValue(l_date);
                Ext.getCmp('frl_DtsIngt').setValue(l_date);
                Ext.getCmp('frl_DtsLab').setValue('');
                Ext.getCmp('frl_DtsLabt').setValue('');
                Ext.getCmp('frl_DtsRlm').setValue('');
                Ext.getCmp('frl_DtsRlmt').setValue('');
                Ext.getCmp('frl_DtsFec').setValue('');
                Ext.getCmp('frl_DtsFect').setValue('');

                Ext.getCmp('frl_gualot').setDisabled(false);
                Ext.getCmp('frl_genmat').setDisabled(true);
                Ext.getCmp('frl_canlot').setDisabled(true);
                Ext.getCmp('frl_liblot').setDisabled(true);
                Ext.getCmp('frl_genocm').setDisabled(true);
                Ext.getCmp('frl_conlot').setDisabled(true);                
            }
        },'-',{
        text: 'Guardar',
        id: 'frl_gualot',
        //iconCls: 'cargar_archivo',
        handler: function() {
            pars = new Object();
            var frl_procedimiento = null;
            frl_procedimiento = 'guardarLote';

            var l_keycli = null;
            if (Ext.getCmp('frl_DtcMrk').getValue()) {
                
                var in_procedimiento = null;
                in_procedimiento = 'registrarClienteNombre';
                in_pars = new Object();

                in_pars.p_nomcli = Ext.getCmp('frl_DtcNom').getValue();
                in_pars.s_user = 'admin';                

                Ext.Ajax.request({
                    url: 'app/src/ejecutarProcedimiento.php',
                    method: 'GET',
                    async: false,
                    params : {
                        'procedimiento': in_procedimiento,
                        'parametros': Ext.encode(in_pars)
                    },            
                    success: function(response, request){
                        var resobj = Ext.decode(response.responseText);
                        var item = resobj.results[0];
                        if (resobj.results[0].result === '0') {
                            window.keycli = resobj.results[0].keycli;
                        }
                        else {
                            Ext.Msg.alert("Mensaje de WKBOOK.", resobj.results[0].mensaje);
                        }
                        
                    },
                    failure : function(response, request){
                        Ext.Msg.alert("Mensaje de WKBOOK.", "No se pudo agregar el cliente.");
                        return false;
                    }
                });
                l_keycli = window.keycli;
            } else {
                l_keycli = Ext.getCmp('frl_CmbCli').getValue();
            }

            pars.p_cod = Ext.getCmp('frl_DtlCod').getValue();
            pars.p_esp = Ext.getCmp('frl_DtlEtp').getValue();
            pars.p_esl = Ext.getCmp('frl_DtlEtl').getValue();
            pars.p_obs = Ext.getCmp('frl_CmbObs').getValue();
            pars.p_cli = l_keycli;
            pars.p_prc = Ext.getCmp('frl_Dtmprc').getValue();
            pars.p_pro = Ext.getCmp('frl_DtmPro').getValue();
            pars.p_res = Ext.getCmp('frl_Dtmres').getValue();
            pars.p_pry = Ext.getCmp('frl_Dtmpry').getValue();
            pars.p_pte = Ext.getCmp('frl_Dtmpte').getValue();
            pars.p_cmt = Ext.getCmp('frl_Dtmcmt').getValue();
            pars.p_rdcd = Ext.getCmp('frl_DtsRpc').getValue();
            pars.p_rdct = Ext.getCmp('frl_DtsRpct').getValue();
            pars.p_fecd = Ext.getCmp('frl_DtsIng').getValue();
            pars.p_fect = Ext.getCmp('frl_DtsIngt').getValue();
            pars.p_ingd = Ext.getCmp('frl_DtsLab').getValue();
            pars.p_ingt = Ext.getCmp('frl_DtsLabt').getValue();
            pars.p_rlmd = Ext.getCmp('frl_DtsRlm').getValue();
            pars.p_rlmt = Ext.getCmp('frl_DtsRlmt').getValue();
            pars.p_fded = Ext.getCmp('frl_DtsFec').getValue();
            pars.p_fdet = Ext.getCmp('frl_DtsFect').getValue();
            pars.s_user = 'admin';

            if (isempty(l_keycli)) {
                Ext.Msg.alert("Mensaje de WKBOOK.", "Se debe elegir un cliente o registrar uno nuevo.");
                return false;
            }
            
            if (isempty(Ext.getCmp('frl_DtmPro').getValue())) {
                Ext.Msg.alert("Mensaje de WKBOOK.", "Se debe elegir un producto.");
                return false;
            }

            Ext.Ajax.request({
                url: 'app/src/ejecutarProcedimiento.php',
                method: 'GET',
                async: false,
                params : {
                    'procedimiento': frl_procedimiento,
                    'parametros': Ext.encode(pars)
                },            
                success: function(response, request){
                    Ext.Msg.alert('Mensaje de WKBOOK:', 'Se registro el lote correctamente.');
                    Ext.getCmp('frl_gualot').setDisabled(true);
                    Ext.getCmp('frl_genmat').setDisabled(false);
                    Ext.getCmp('frl_canlot').setDisabled(false);
                    Ext.getCmp('frl_liblot').setDisabled(false);
                    Ext.getCmp('frl_genocm').setDisabled(false);
                    Ext.getCmp('frl_conlot').setDisabled(false);

                },
                failure : function(response, request){
                    Ext.Msg.alert("Mensaje de WKBOOK.", "Hubo errores en el proceso.");
                    return false;
                }
            });

        }
    },'-',{
        text: 'Generar matriz',
        id: 'frl_genmat',
        disabled: true,
        //iconCls: 'cargar_archivo',
        handler: function(btn, pressed){
            addNewTab("todo-tab-panel", "frmGenerarMatriz", "Generar Matriz");
        }
    },'-',{
        text: 'Cancelar lote',
        id: 'frl_canlot',
        disabled: true,
        //iconCls: 'cargar_archivo',
        handler: function() {
            
        }
    },'-',{
        text: 'Liberar lote',
        id: 'frl_liblot',
        disabled: true,
        //iconCls: 'cargar_archivo',
        handler: function() {
            //addNewTab('todo-tab-panel', "frmReservarLote", "Generar Matriz");
            //frl_AplPnl.show();          
        }
    },'-',{
        text: 'Generar OCM',
        id: 'frl_genocm',
        disabled: true,
        //iconCls: 'cargar_archivo',
        handler: function() {           
        }
    },'-',{
        text: 'Conformidad de lote',
        id: 'frl_conlot',
        disabled: true,
        //iconCls: 'cargar_archivo',
        handler: function() {            
        }
    },'-',{
        text: 'Salir',
        id: 'frl_sal',
        //iconCls: 'cargar_archivo',
        handler: function() {           
        }
    }]
});