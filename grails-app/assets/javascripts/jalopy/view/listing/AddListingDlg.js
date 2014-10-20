Ext.define('Jalopy.view.listing.AddListingDlg', {
    extend: 'Ext.window.Window',
    xtype : 'addlistingdlg',

    controller: 'listingViewController',

    title: 'Add New Listing',
    bbar : {
        xtype: 'button',
        reference : 'submitListingBtn',
        text: 'Submit New Listing',
        listeners: {
            click: 'onClickAdd'
        }
    },
    items: [ {
        xtype : 'form',
        bodyPadding: 5,
        layout : 'anchor',
        reference : 'addform',
        defaults : { anchor : '100%' },
        items : [ {
            xtype : 'textfield',
            fieldLabel : 'Seller',
            allowBlank : false,
            name : 'seller'
        }, {
            xtype : 'combo',
            fieldLabel : 'Automobile',
            store : [ 'Impreza', 'WRX', 'STi' ],
            queryMode : 'local',
            valueField : 'id',
            displayField : 'id',
            name : 'carModel'
        }, {
            xtype : 'numberfield',
            fieldLabel : 'Asking Price ($)',
            step : 100,
            value : 0,
            minLength : 4,
            maxLength : 6,
            name : 'askingPrice'
            // Add change handler to force user-entered numbers to hundreds
//            listeners: {
//                change: function(field, value) {
//                    value = parseInt(value, 10);
//                    field.setValue(value + value % 100);
//                }
//            }
        }, {
            xtype : 'datefield',
            disabled : true,
            fieldLabel : 'Start Date',
            value : new Date(),
            name : 'startDate'
        }, {
            xtype : 'datefield',
            fieldLabel : 'End Date',
            value : new Date(),
            name : 'endDate'
        } ]
     } ]
});