Ext.define('Jalopy.view.listing.AddListingDlg', {
    extend: 'Ext.window.Window',
    xtype : 'addlistingdlg',

    controller: 'listingViewController',

    title: 'Add New Listing',
    modal : true,
    autoShow : true,
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
            xtype : 'displayfield',
            fieldLabel : 'Seller',
            value : Ext.String.capitalize(JE.USERNAME),
            name : 'seller'
        }, {
            xtype : 'combo',
            fieldLabel : 'Automobile',
            store : [ 'Impreza', 'WRX', 'STi' ],
//            store : 'Automobiles',
            queryMode : 'local',
            valueField : 'vin',
            displayField : 'description',
            name : 'automobile'
        }, {
            xtype : 'numberfield',
            fieldLabel : 'Asking Price ($)',
            step : 100,
            value : 0,
            minValue: 1000,
            maxValue: 100000,
            emptyText : 'Type a price',
            submitEmptyText : false,
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
            value : Ext.util.Format.date(new Date(), 'm/d/Y'),
        }, {
            xtype : 'datefield',
            fieldLabel : 'End Date',
            value : new Date(),
            name : 'endDate'
        } ]
     } ]
});