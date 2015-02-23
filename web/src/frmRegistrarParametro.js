/*
    **NOMENCLATURA**
    frp - formulario registro parametros
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
    Dtp - datos del parametro
    Fds - fieldset
    Nrf - Norma de referencia
*/

/*INICIO COMBOBOX UNIDADES*/
Ext.define('frp_CmbMdlUni', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'glocodc', type: 'int'},
        {name:'glovalc', type: 'string'}
    ]
});

pars = new Object();
pars.tabla='Unidades';        
pars.combo='%';
var frp_CmbStrUni = Ext.create('Ext.data.Store', {
    model:'frp_CmbMdlUni',
    autoload: true,
    
    proxy: {        
        type: 'ajax',
        url: 'app/src/ejecutarProcedimiento.php',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,
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

var frp_CmbUni=Ext.create('Ext.form.ComboBox', {
    fieldLabel: 'Unidades',
    name:'frp_DtpUni',
    id:'frp_DtpUni',
    store: frp_CmbStrUni,
    mode: 'local',
    displayField: 'glovalc',
    valueField: 'glovalc'
});
/*FIN COMBOBOX UNIDADES*/

/*INICIO COMBOBOX AREAS*/
Ext.define('frp_CmbMdlAre', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'glocodc', type: 'string'},
        {name:'glovalc', type: 'string'}
    ]
});
pars = new Object();
pars.tabla='Areas';
pars.combo='%';
var frp_CmbStrAre = Ext.create('Ext.data.Store', {
    model:'frp_CmbMdlAre',
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
var frp_CmbAre=Ext.create('Ext.form.ComboBox', {
    fieldLabel: 'Area',
    name:'frp_DtpAre',
    id:'frp_DtpAre',
    store: frp_CmbStrAre,
    mode: 'local',
    displayField: 'glovalc',
    valueField: 'glovalc'
});
/*FIN COMBOBOX AREAS*/

/*INICIO COMBOBOX HOJA RESULTADOS*/
Ext.define('frp_CmbMdlHoj', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'fmtkeyi', type: 'int'},
        {name:'fmtcodc', type: 'string'},
        {name:'fmtentc', type: 'string'},
        {name:'fmtnamc', type: 'string'},
        {name:'fmtpatc', type: 'string'}
    ]
});

pars = new Object();
pars.tabla='Parametro';
var frp_CmbStrHoj = Ext.create('Ext.data.Store', {
    model:'frp_CmbMdlHoj',
    autoload: true,
    proxy: {        
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,
        url: 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarFormato',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }
    }
});

var frp_CmbHoj=Ext.create('Ext.form.ComboBox', {
    fieldLabel: 'Hoja Resultados',
    name:'frp_DtnHoj',
    id:'frp_DtnHoj',
    store: frp_CmbStrHoj,
    mode: 'local',
    displayField: 'fmtcodc',
    valueField: 'fmtcodc'
});
/*FIN COMBOBOX HOJA RESULTADOS*/


/*INICIO COMBOBOX ESTADOS*/
Ext.define('frp_CmbMdlEst', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'glocodc', type: 'string'},
        {name:'glovalc', type: 'string'}
    ]
});
pars = new Object();
pars.tabla='Estado Parametro';        
pars.combo='%';
var frp_CmbStrEst = Ext.create('Ext.data.Store', {
    model:'frp_CmbMdlEst',
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
var frp_CmbEst=Ext.create('Ext.form.ComboBox', {
    fieldLabel: 'Estado',
    name:'frp_DtpEst',
    id:'frp_DtpEst',
    store: frp_CmbStrEst,
    mode: 'local',
    displayField: 'glovalc',
    valueField: 'glocodc'
});
/*FIN COMBO ESTADOS*/

/*INICIO COMBOBOX PRODUCTO*/
Ext.define('frp_CmbMdlTpa', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'glocodc', type: 'string'},
        {name:'glovalc', type: 'string'}
    ]
});
pars = new Object();
pars.tabla='Producto Parametro';        
pars.combo='%';
var frp_CmbStrTpa = Ext.create('Ext.data.Store', {
    model:'frp_CmbMdlTpa',
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
var frp_DtpTpa = new Ext.form.ComboBox({
    fieldLabel: 'Producto',
    name:'frp_DtpTpa',
    id:'frp_DtpTpa',
    store: frp_CmbStrTpa,
    mode: 'local',
    displayField: 'glovalc',
    valueField: 'glocodc',
    listeners: {
        select: function(combo, record, index) {
            var pars = new Object();
            pars.p_producto = Ext.getCmp('frp_DtpTpa').getValue();
            if (isempty(pars.p_producto)) {
                Ext.Msg.alert('Mensaje de EQUAS:', 'Primero debe seleccionar el Producto.');
                return false;                
            } else {
                pars.p_filtro = '%';
                Ext.getCmp('frp_DtnTmz').setValue('(Ninguno)');
                Ext.getCmp('frp_DtnTmz').getStore().getProxy().extraParams = {
                    'procedimiento': 'consultarTipoMatriz',
                    'parametros': Ext.encode(pars)
                };
                Ext.getCmp('frp_DtnTmz').getStore().load();
            }
        }
    }
});
/*FIN COMBOBOX PRODUCTO*/

/*INICIO COMBOBOX TIPO DE MATRIZ*/
var frp_MdlTmz = Ext.regModel('frp_MdlTmz', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'glocodc'},
        {name: 'glovalc'}
    ]
});


var pars = new Object();
pars.p_producto = '%';
pars.p_filtro = '%';

var frp_CmbStrTmz = null;
frp_CmbStrTmz = new Ext.data.Store({
    id:'frp_CmbStrTmz',
    storeId: 'frp_CmbStrTmz',
    model: frp_MdlTmz,
    autoLoad: true,
    pageSize: 100,    
    proxy: {
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,        
        url : 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarTipoMatriz',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }
    }
});

var frp_DtnTmz = new Ext.form.ComboBox({
    fieldLabel: 'Tipo de matriz',
    name:'frp_DtnTmz',
    id:'frp_DtnTmz',
    store: frp_CmbStrTmz,
    mode: 'local',
    displayField: 'glovalc',
    valueField: 'glocodc',
    value: '(Ninguno)'
});
/*FIN COMBOBOX TIPO DE MATRIZ*/

var frp_DtpFds = {
    xtype:'fieldset',
    autoHeight: true,    
    title: 'Datos del Parametro',
    defaultType: 'combobox',
    padding: 10,
    defaults: {
        border: false
    },
    fieldDefaults: {
        labelAlign: 'left'
    },        
    layout: 'form',
    items :[{   
            fieldLabel: 'Id',
            name: 'frp_DtpId',
            id: 'frp_DtpId',
            xtype: 'textfield',
            editable:false,
            hidden:true,
            labelWidth: 120
        },{   
            fieldLabel: 'Nombre',
            name: 'frp_DtpNom',
            id: 'frp_DtpNom',
            xtype: 'textfield',
            editable:false,
            labelWidth: 120
        },{   
            fieldLabel: 'Abreviatura',
            name: 'frp_DtpAra',
            id: 'frp_DtpAra',
            xtype: 'textfield',
            editable:false,
            labelWidth: 120
        },
            frp_DtpTpa
        ,
            frp_CmbAre
        ,
            frp_CmbUni
        ,
            frp_CmbEst
    ] 
};

var frp_MdlNmr = Ext.regModel('frp_MdlNmr', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'nmrkeyi'},
        {name: 'nmrcodc'},
        {name: 'nmranoc'},
        {name: 'nmrtitc'},
        {name: 'nmrabrc'},
        {name: 'nmrhojc'},
        {name: 'nmrtmzc'},
        {name: 'nmrlimf'},
        {name: 'nmrparkeyi'}
    ]
});

var pars = new Object();
pars.parkeyi = '0';
var frp_StrTpm = null;
frp_StrNmr = new Ext.data.Store({
    id:'frp_StrNmr',
    storeId: 'frp_StrNmr',
    model: frp_MdlNmr,
    autoLoad: true,
    pageSize: 100,    
    proxy: {
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,        
        url : 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarNormaReferencia',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }
    }
});

var frp_GrdNrm = new Ext.grid.GridPanel({
    id:'frp_GrdNrm',
    header: false,
    padding: '0 10 10 10',
    store: frp_StrNmr, 
    columns: [
        { xtype: 'rownumberer', width:30 },
        { text: "Id nor.", dataIndex: "nmrkeyi", width:60, hidden:true },
        { text: "Id par.", dataIndex: "nmrparkeyi", width:60, hidden:true },
        { text: "Codigo", dataIndex: "nmrcodc", width:60, flex:1 },
        { text: "Año", dataIndex: "nmranoc" },
        { text: "Titulo", dataIndex: "nmrtitc", flex:2 },
        { text: "Abreviatura", dataIndex: "nmrabrc" },
        { text: "Hoja de resultados", dataIndex: "nmrhojc" },
        { text: "Tipo de matriz", dataIndex: "nmrtmzc" },
        { text: "L.D.", dataIndex: "nmrlimf" }
    ],
    viewConfig: {
        forceFit: true,
        emptyText: 'No se encontraron registros.',
        stripeRows: false
    },
    iconCls: 'icon-grid',
    listeners: {
        beforeitemcontextmenu:  function(view,record,item, index, e){
          e.stopEvent();
        },
        beforeitemclick: function(dv, record, item, index, e) {
        },
        beforeitemdblclick: function(dv, record, item, index, e) {
            frp_RegPnl.show(); 
            Ext.getCmp('frp_DtnKey').setValue(record.get('nmrkeyi'));
            Ext.getCmp('frp_DtnCod').setValue(record.get('nmrcodc'));
            Ext.getCmp('frp_DtnAno').setValue(record.get('nmranoc'));
            Ext.getCmp('frp_DtnTit').setValue(record.get('nmrtitc'));
            Ext.getCmp('frp_DtnAbr').setValue(record.get('nmrabrc'));
            Ext.getCmp('frp_DtnHoj').setValue(record.get('nmrhojc'));
            Ext.getCmp('frp_DtnLim').setValue(record.get('nmrlimf'));
            Ext.getCmp('frp_DtnTmz').setValue(record.get('nmrtmzc'));
            
        }
    }
});


var frp_RtmPnl = Ext.create('Ext.form.Panel',{
    id: 'frp_RtmPnl',
    name: 'frp_RtmPnl',
    padding: 10,
    border: false,
    items: [{
            xtype:'fieldset',            
            title: 'Datos de la Norma',
            layout: 'form',
            padding: 10,
            items: [{
                fieldLabel: 'KeyNrm',
                hidden:true,
                name: 'frp_DtnKey',
                id: 'frp_DtnKey',
                xtype: 'textfield',
                labelWidth: 120
            },{
                fieldLabel: 'Código',
                name: 'frp_DtnCod',
                id: 'frp_DtnCod',
                xtype: 'textfield',
                labelWidth: 120
            },
            {
                fieldLabel: 'Año',
                name: 'frp_DtnAno',
                id: 'frp_DtnAno',
                xtype: 'textfield',
                labelWidth: 120
            },
            {
                fieldLabel: 'Título',
                name: 'frp_DtnTit',
                id: 'frp_DtnTit',
                xtype: 'textfield',
                labelWidth: 120
            },
            {
                fieldLabel: 'Abreviatura',
                name: 'frp_DtnAbr',
                id: 'frp_DtnAbr',
                xtype: 'textfield',
                labelWidth: 120
            },        
            frp_CmbHoj,
            frp_DtnTmz,
            {
                fieldLabel: 'Límite detección',
                name: 'frp_DtnLim',
                id: 'frp_DtnLim',
                xtype: 'textfield',
                labelWidth: 120
            }]
        }]
});

var frp_DmpFds = Ext.create('Ext.panel.Panel',{
    id:'frp_DmpFds',
    name:'frp_DmpFds',
    autoHeight: true,
    title: 'Normas de referencia',
    padding: 10,
    layout: 'anchor',
    tbar: [{
            id: 'frp_nr_nuev',
            text: 'Nuevo',
            handler: function() {     
                frp_RtmPnl.getForm().reset();
                Ext.getCmp('frp_DtnCod').focus();
            }
        },'-',{
            id:'frp_nr_guar',
            text: 'Guardar',
            handler: function() { 
                pars = new Object();
                var frp_proguanrm = null;
                var frp_keynrm    = Ext.getCmp('frp_DtnKey').getValue();

                if (isempty(frp_keynrm)) {
                    frp_proguanrm ='guardarNormaReferencia';
                } else {
                    pars.keynrm   = frp_keynrm;
                    frp_proguanrm = 'actualizarNormaReferencia';
                };

                pars.keypar       = Ext.getCmp('frp_DtpId').getValue();
                if (isempty(pars.keypar)) {
                    Ext.Msg.alert('Mensaje de EQUAS:', 'Se debe seleccionar un parámetro para registrar una nueva Norma de referencia.');
                    return false;
                }

                pars.codigo       = Ext.getCmp('frp_DtnCod').getValue();
                pars.ano          = Ext.getCmp('frp_DtnAno').getValue();
                pars.titulo       = Ext.getCmp('frp_DtnTit').getValue();
                pars.abreviatura  = Ext.getCmp('frp_DtnAbr').getValue();
                pars.hojres       = Ext.getCmp('frp_DtnHoj').getValue();
                pars.tipmat       = Ext.getCmp('frp_DtnTmz').getValue();
                pars.limdet       = Ext.getCmp('frp_DtnLim').getValue();
                pars.user         = 'admin';
                
                Ext.Ajax.request({
                    url: 'app/src/ejecutarProcedimiento.php',
                    method: 'GET',
                    async: false,
                    params : {
                        'procedimiento': frp_proguanrm,
                        'parametros': Ext.encode(pars)
                    },            
                    success: function(response, request){
                        frp_RtmPnl.getForm().reset();

                        var pars = new Object();
                        pars.parkeyi = Ext.getCmp('frp_DtpId').getValue();
                        frp_StrNmr.load({
                            params:{
                                'procedimiento': 'consultarNormaReferencia',
                                'parametros'   : Ext.encode(pars)
                            }
                        });
                        Ext.Msg.alert('Mensaje de EQUAS.', 'Se actualizó correctamente.');
                    },
                    failure : function(response, request){
                        Ext.Msg.alert("Mensaje de EQUAS.", "Hubo algún error en el proceso.");
                        return false;
                    }
                });
            }
        },'-',{
            id:'frp_nr_modi',
            text: 'Modificar',
            handler: function() { 
                var s = frp_GrdNrm.getSelectionModel().getSelection();
                if (isempty(s)) {
                    Ext.Msg.alert("Mensaje de EQUAS.", "Debe seleccionar una Norma de referencia.");
                    return false;                
                }
                Ext.each(s, function (item) {
                    Ext.getCmp('frp_DtnKey').setValue(item.data.nmrkeyi);
                    Ext.getCmp('frp_DtnCod').setValue(item.data.nmrcodc);
                    Ext.getCmp('frp_DtnAno').setValue(item.data.nmranoc);
                    Ext.getCmp('frp_DtnTit').setValue(item.data.nmrtitc);  
                    Ext.getCmp('frp_DtnAbr').setValue(item.data.nmrabrc);
                    Ext.getCmp('frp_DtnHoj').setValue(item.data.nmrhojc);
                    Ext.getCmp('frp_DtnTmz').setValue(item.data.nmrtmzc);
                    Ext.getCmp('frp_DtnLim').setValue(item.data.nmrlimf);
                });                     
            }
        }
        ,'-',{
            id:'frp_nr_elim',
            text: 'Eliminar',
            handler: function() {
                pars = new Object();
                var s = frp_GrdNrm.getSelectionModel().getSelection();
                if (isempty(s)) {
                    Ext.Msg.alert("Mensaje de EQUAS.", "Debe seleccionar una Norma de referencia.");
                    return false;
                }

                Ext.each(s, function (item) {      
                    pars.nmrkeyi = item.data.nmrkeyi;
                    pars.nmrparkeyi = item.data.nmrparkeyi;
                    l_nmrcodc = item.data.nmrcodc;
                });

                Ext.Msg.confirm('Mensaje de EQUAS.', 'Esta seguro de elimiar la Norma de referencia: ' + l_nmrcodc + '?', function (id, value) {
                    if (id === 'yes') {
                        frp_StrNmr.load({
                            params:{
                                'procedimiento': 'eliminarNormaReferencia',
                                'parametros': Ext.encode(pars)
                            }
                        });
                    }
                }, this);

            }
        },{ xtype: 'tbfill' },{
            text: 'Actualizar',
            handler: function() {       
                var pars = new Object();
                pars.parkeyi = Ext.getCmp('frp_DtpId').getValue();
                frp_StrNmr.load({
                    params:{
                        'procedimiento': 'consultarNormaReferencia',
                        'parametros'   : Ext.encode(pars)
                    }
                });
            }
    }],
    items :[ 
            
        frp_RtmPnl
    ,
        frp_GrdNrm
        
    ] 
});

var frp_RegPnl = Ext.create('Ext.form.Panel',{
    region: 'north',
    hidden: true,
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
    items: [ frp_DtpFds, frp_DmpFds ],
    buttons: [{
        text: 'Ocultar',
        handler: function () {
            Ext.getCmp('frp_id_nuev').enable();
            frp_RegPnl.hide();
            frp_RegPnl.getForm().reset();
        }
    }]
});
/*FIN PANEL REGISTRO*/

/*INICIO GRID PANEL*/
var frp_MdlPrm = Ext.regModel('frp_MdlPrm', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'parkeyi'},
        {name: 'parnamc'},
        {name: 'parabrc'},
        {name: 'parproc'},
        {name: 'pararec'},
        {name: 'parundc'},
        {name: 'parestc'}
    ]
});

var pars = new Object();
pars.nombre = '%';
var frp_StrPrm = null;
frp_StrPrm = new Ext.data.Store({
    id:'frp_StrPrm',
    storeId: 'frp_StrPrm',
    model: frp_MdlPrm,
    autoLoad:true,
    pageSize: 100,    
    proxy: {
        type: 'ajax',
        url : 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarParametro',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }
    }
});

var frp_GrdPrm = Ext.create('Ext.grid.Panel', {
    id:'frp_GrdPrm',         
    header: false,
    store: frp_StrPrm,
    columns: [
        {xtype: "rownumberer", width:30},
        {text: "IDparam", dataIndex: "parkeyi",width:60,hidden:true},
        {text: "Nombre", dataIndex: "parnamc", flex:1},
        {text: "Abreviatura", dataIndex: "parabrc"},
        {text: "Producto", dataIndex: "parproc"},
        {text: "Area", dataIndex: "pararec"},
        {text: "Unidades", dataIndex: "parundc", flex:2},
        {text: "Estado", dataIndex: "parestc", flex:3}
    ],
    viewConfig: {
        forceFit: true,
        emptyText: 'No se encontraron registros.',
        stripeRows: false
    },
    iconCls: 'icon-grid',
    listeners:     {
        beforeitemcontextmenu :  function(view,record,item, index, e){
          e.stopEvent();
        },
        beforeitemclick: function(dv, record, item, index, e) {
        },
        beforeitemdblclick: function(dv, record, item, index, e) {
            frp_RegPnl.show(); 
            Ext.getCmp('frp_DtpId').setValue(record.get('parkeyi'));
            Ext.getCmp('frp_DtpNom').setValue(record.get('parnamc'));       
            Ext.getCmp('frp_DtpAra').setValue(record.get('parabrc'));  
            Ext.getCmp('frp_DtpTpa').setValue(record.get('parproc'));
            Ext.getCmp('frp_DtpAre').setValue(record.get('pararec'));
            Ext.getCmp('frp_DtpUni').setValue(record.get('parundc'));
            Ext.getCmp('frp_DtpEst').setValue(record.get('parestc'));
            var pars = new Object();
            pars.parkeyi = record.get('parkeyi');
            frp_StrNmr.load({
                params:{
                    'procedimiento': 'consultarNormaReferencia',
                    'parametros': Ext.encode(pars)
                }
            });
            Ext.getCmp('frp_DtnCod').setValue('');
            Ext.getCmp('frp_DtnAno').setValue('');
            Ext.getCmp('frp_DtnTit').setValue('');
            Ext.getCmp('frp_DtnAbr').setValue('');
            Ext.getCmp('frp_DtnLim').setValue('');
            Ext.getCmp('frp_DtnHoj').setValue('(Ninguno)');

            Ext.getCmp('frp_DtnTmz').setValue('(Ninguno)');
            var pars = new Object();
            pars.p_producto = record.get('parproc');
            pars.p_filtro = '%';
            Ext.getCmp('frp_DtnTmz').getStore().getProxy().extraParams = {
                'procedimiento': 'consultarTipoMatriz',
                'parametros': Ext.encode(pars)
            };
            Ext.getCmp('frp_DtnTmz').getStore().load();
            
            Ext.getCmp('frp_DmpFds').setTitle('Normas de referencia / ' + record.get('parnamc'));

        }
    }
});

var frp_GrdPnl = Ext.create('Ext.panel.Panel',{ 
    header: false,
    id: 'frp_PnlGrdParam',   
    region: 'center',    
    layout: 'fit',       
    items: [frp_GrdPrm]
});
/* 	FIN DE GRID PANEL*/

/*PANEL PRINCIPAL*/
var frp_txtBusPar = Ext.create('Ext.form.TextField',{
    fieldLabel:'   Buscar Parametros',
    name:'frp_txtBusPar',
    id: 'frp_txtBusPar',
    labelWidth: 100,
    width: 300,
    margins: '0 0 0 10'
});

var frp_BtnFlt = Ext.create('Ext.Action', {
    id: 'frp_BtnFlt',
    text: '',
    iconCls: 'filtro',
    handler: function(){
        pars = new Object();
        pars.nombre=Ext.getCmp('frp_txtBusPar').getValue();
        frp_StrPrm.load({
            params:{
                'procedimiento': 'consultarParametro',
                'parametros': Ext.encode(pars)
            }
        });
    }
});

var frp_BtnCanFlt = Ext.create('Ext.Action', {
    id: 'frp_BtnCanFlt',
    text: '',
    iconCls: 'filtro_quitar',
    handler: function(){
        Ext.getCmp('frp_txtBusPar').reset();
        pars = new Object();        
        pars.nombre='%';
        frp_StrPrm.load({
            params:{
                'procedimiento': 'consultarParametro',
                'parametros': Ext.encode(pars)
            }
        });
    }
});

Ext.create('Ext.form.Panel', {
    title: 'Registrar parámetro',    
    name: 'frmRegistrarParametro',
    id: 'frmRegistrarParametro',
    itemId: 'frmRegistrarParametro',
    layout: 'border',
    closable: true,
    frame: true,
    items: [
            frp_RegPnl
        ,
            frp_GrdPnl           
    ],
    tbar:[{
    id: 'frp_id_nuev',
        text: 'Nuevo',
        handler: function() {
            frp_RegPnl.getForm().reset();
            frp_RegPnl.show();
            Ext.getCmp('frp_DtpNom').focus();
        }
    },'-',{
	id: 'frp_id_guar',
        text: 'Guardar',
        handler: function() {
            pars = new Object();
            var frp_procedimiento=null;
            var frp_valCmp=Ext.getCmp('frp_DtpId').getValue();

            if (isempty(frp_valCmp)) {                
                frp_procedimiento='guardarParametro';
            } else{
                pars.ide=Ext.getCmp('frp_DtpId').getValue();                
                frp_procedimiento='actualizarParametro';
            };
            pars.nombre=Ext.getCmp('frp_DtpNom').getValue();
            pars.abreviatura=Ext.getCmp('frp_DtpAra').getValue();
            pars.producto=Ext.getCmp('frp_DtpTpa').getValue();
            pars.disciplina=Ext.getCmp('frp_DtpAre').getValue();
            pars.unidades=Ext.getCmp('frp_DtpUni').getValue();
            pars.estado=Ext.getCmp('frp_DtpEst').getValue();
            pars.user='admin';            
            Ext.Ajax.request({
                url: 'app/src/ejecutarProcedimiento.php',
                method: 'GET',
                async:false,
                params : {
                    'procedimiento': frp_procedimiento,
                    'parametros': Ext.encode(pars)
                },            
                success: function(response, request){
                    frp_RegPnl.hide();
                    frp_RegPnl.getForm().reset();
                    frp_StrPrm.load();
                    Ext.Msg.alert('Mensaje de EQUAS:', 'Se actualizó correctamente.');
            
                },
                failure : function(response, request){
                    Ext.Msg.alert("Mensaje de EQUAS.", "Hubo algún error en el proceso.");
                    return false;
                }
            });
        }
    }
    ,'-',{
        id:'frp_id_modi',
        text: 'Modificar',
        handler: function() { 
            frp_RegPnl.show();
            var s=frp_GrdPrm.getSelectionModel().getSelection();
            if (isempty(s)) {
                Ext.Msg.alert("Mensaje de EQUAS.", "Debe seleccionar un parámetro.");
                return false;                
            }
            Ext.each(s, function (item) {                 
                Ext.getCmp('frp_DtpId').setValue(item.data.parkeyi);
                Ext.getCmp('frp_DtpNom').setValue(item.data.parnamc);
                Ext.getCmp('frp_DtpAra').setValue(item.data.parabrc);
                Ext.getCmp('frp_DtpTpa').setValue(item.data.parproc);
                Ext.getCmp('frp_DtpUni').setValue(item.data.parundc);
                Ext.getCmp('frp_DtpEst').setValue(item.data.parestc);
            });
        }
    }
    ,'-',frp_txtBusPar
    ,'-',frp_BtnFlt
    ,'-',frp_BtnCanFlt,{ xtype: 'tbfill' },
    ,'-',{
        text: 'Exportar',
        handler: function() {

            var hiddenForm = Ext.create('Ext.form.Panel', {
              title:'hiddenForm',
              standardSubmit: true,
              url: '/equas/app/src/generarReporte.php',
              timeout: 120000,
              height:0,
              width: 0,
              hidden:true,
              items:[
                {xtype:'hiddenField', name:'field1', value:'field1Value'}
              ]
            });
            hiddenForm.getForm().submit();
        }
    }
    ,'-',{
        text: 'Actualizar',
        handler: function() {       
            frp_StrPrm.load();    
            frp_RegPnl.hide();
        }
    }],
    dockedItems: [{    
        xtype: 'pagingtoolbar',
        store: frp_StrPrm,
        dock: 'bottom',
        displayInfo: true
    }]
});
