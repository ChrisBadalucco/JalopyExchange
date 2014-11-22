Ext.define('Jalopy.view.account.AddListingDlg', {
    extend: 'Ext.window.Window',
    xtype : 'addlistingdlg',

    controller: 'accountViewController',

    title: 'Add New Listing',
    modal : true,
    autoShow : true,
    layout : 'anchor',
    listeners : {
        show : 'loadCombos'
    },
    items: [ {
        xtype : 'form',
        bodyPadding: 5,
        anchor : '100%',
        layout : 'anchor',
        reference : 'addform',
        buttons : [ {
            text: 'Submit New Listing',
            iconCls : 'icon-accept',
            reference : 'submitListingBtn',
            formBind : true,
            listeners: {
                click: 'onClickAddListing'
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
        defaults : { anchor : '100%', allowBlank : false },
        items : [ {
            xtype : 'displayfield',
            fieldLabel : 'Seller',
            value : Ext.String.capitalize(JE.USERNAME),
            name : 'seller'
        }, {
            xtype : 'combo',
            fieldLabel : 'Automobile',
            store : 'UserAutomobile',
            queryMode : 'local',
            emptyText : 'Select an automobile...',
            valueField : 'vin',
            displayField : 'description',
            typeAhead : true,
            forceSelection : true,
            blankText : 'This field is required. Please add an ' +
                'automobile in "My Account" if there are none in the dropdown',
            name : 'autoVin'
        }, {
            xtype : 'numberfield',
            fieldLabel : 'Asking Price ($)',
            step : 100,
            minValue: 1000,
            maxValue: 100000,
            emptyText : 'Enter a dollar amount...',
            name : 'askingPrice'
        }, {
            xtype : 'datefield',
            fieldLabel : 'End Date',
            minValue : new Date(),
            emptyText : 'Select a date...',
            name : 'endDate'
        } ]
     } ]
});