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