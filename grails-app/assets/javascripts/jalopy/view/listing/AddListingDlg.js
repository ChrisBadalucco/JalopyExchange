Ext.define('Jalopy.view.listing.AddListingDlg', {
    extend: 'Ext.window.Window',
    xtype : 'addlistingdlg',

    controller: 'listingViewController',

    title: 'Add New Listing',
    modal : true,
    autoShow : true,
    listeners : {
        show : 'loadCombos'
    },
//    bbar : {
//        xtype: 'button',
//        reference : 'submitListingBtn',
//        text: 'Submit New Listing',
//        listeners: {
//            click: 'onClickAdd'
//        }
//    },
    items: [ {
        xtype : 'form',
        bodyPadding: 5,
        layout : 'anchor',
        reference : 'addform',
        buttons : [ {
            text: 'Submit New Listing',
            reference : 'submitListingBtn',
            formBind : true,
            listeners: {
                click: 'onClickAdd'
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
            store : 'Automobile',
            queryMode : 'local',
            emptyText : 'Select an automobile...',
            valueField : 'vin',
            displayField : 'vin',
            forceSelection : true,
            name : 'autoVin'
        }, {
            xtype : 'numberfield',
            fieldLabel : 'Asking Price ($)',
            step : 100,
            minValue: 1000,
            maxValue: 100000,
            emptyText : 'Enter a dollar amount...',
            name : 'askingPrice'
            // Add change handler to force user-entered numbers to hundreds
//            listeners: {
//                change: function(field, value) {
//                    value = parseInt(value, 10);
//                    field.setValue(value + value % 100);
//                }
//            }
        }, {
            xtype : 'displayfield',
            fieldLabel : 'Start Date',
            value : Ext.util.Format.date(new Date(), 'm/d/Y')
        }, {
            xtype : 'datefield',
            fieldLabel : 'End Date',
            emptyText : 'Select a date...',
            name : 'endDate'
        } ]
     } ]
});