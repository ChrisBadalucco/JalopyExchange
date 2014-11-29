Ext.define('Jalopy.view.account.AddListingDlg', {
    extend: 'Ext.window.Window',
    xtype : 'addlistingdlg',
    controller: 'accountViewController',
//    requires : [ 'Jalopy.store.Automobile' ],

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
        reference : 'addListingForm',
        buttons : [ {
            text: 'Submit New Listing',
            iconCls : 'icon-accept',
            reference : 'submitListingBtn',
            formBind : true,
            handler : 'onClickAddListing'
        }, {
            text : 'Cancel',
            iconCls : 'icon-cancel',
            handler : function(btn) {
                btn.up('window').close();
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
            store : 'AutomobileFiltered',
            queryMode : 'local',
            emptyText : 'Select an automobile...',
            valueField : 'id',
            displayField : 'description',
            typeAhead : true,
            forceSelection : true,
            name : 'autoId'
        }, {
            xtype : 'numberfield',
            fieldLabel : 'Asking Price ($)',
            step : 100,
            minValue: 1000,
            maxValue: 100000,
            allowDecimals : true,
            emptyText : 'Enter a dollar amount...',
            name : 'price'
        }, {
            xtype : 'textfield',
            value : 'true',
            hidden : true,
            name : 'isActive'
        } ]
     } ]
});