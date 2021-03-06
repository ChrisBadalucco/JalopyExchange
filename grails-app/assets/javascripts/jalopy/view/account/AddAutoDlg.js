Ext.define('Jalopy.view.account.AddAutoDlg', {
    extend: 'Ext.window.Window',
    xtype : 'addautodlg',

    controller: 'accountViewController',

    title: 'Add New Automobile',
    width : 350,
    autoShow : true,
    layout : 'anchor',
    items: [ {
        xtype : 'form',
        bodyPadding: 5,
        jsonSubmit : true,
        shrinkWrap : 3,
        url : JE.CONTEXT + '/main/automobile',
        anchor : '100%',
        layout : 'anchor',
        reference : 'addform',
        buttons : [ {
            text: 'Submit New Automobile',
            iconCls : 'icon-accept',
            reference : 'submitAutoBtn',
            formBind : true,
            listeners: {
                click: 'onClickAddAuto'
            }
        }, {
            text : 'Cancel',
            iconCls : 'icon-cancel',
            listeners : {
                click : function(btn) {
                    btn.up('window').close();
                }
            }
        } ],
        defaults : { anchor : '100%', allowBlank : false, labelWidth : 80 },
        items : [ {
            xtype : 'numberfield',
            fieldLabel : 'VIN',
            emptyText : 'Enter the vehicle identification #...',
            minValue : 10000000000000000,
            maxValue : 99999999999999999,
            allowDecimals : false,
            allowExponential : false,
            step : 1000,
            name : 'vin'
        }, {
            xtype : 'numberfield',
            fieldLabel : 'Year',
            emptyText : 'Enter the model year...',
            minValue : 1900,
            maxValue : new Date().getFullYear() + 1,
            name : 'year'
        }, {
            xtype : 'textfield',
            fieldLabel : 'Make',
            emptyText : 'Enter the make (e.g. Ford)...',
            name : 'make'
        }, {
            xtype : 'textfield',
            fieldLabel : 'Model',
            emptyText : 'Enter the model (e.g. Civic)...',
            name : 'model'
        } ]
     } ]
});