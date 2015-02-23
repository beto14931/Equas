
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

//alert(MyHenData.ghenid+'/'+MyHenData.gparnamc+'/'+MyHenData.gnmrcodc);

Ext.create('Ext.form.Panel', {
    title: 'Llenar Hoja de Ensayo(frmPlantilla1)',    
    name:'frmPlantilla1',
    id:'frmPlantilla1',
    itemId:'frmPlantilla1',
    layout: 'border',
    closable: false,
    frame: false,
    border: false,
    //autoScroll:true,
    tbar:[{
        id:'fpl1_id_gua',
        text: 'Guardar',
        //iconCls: 'cargar_archivo',
        handler: function() { 
        }
    },'-',    
    {
        id:'fpl1_id_eli',
        text: 'Eliminar',
        //iconCls: 'cargar_archivo',
        handler: function() {
            //fac_StrPrm.load();
        }
    },'-',
    {
        id:'fpl1_id_fin',
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
