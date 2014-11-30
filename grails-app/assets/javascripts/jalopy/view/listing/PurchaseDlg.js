Ext.define('Jalopy.view.listing.PurchaseDlg', {
    extend: 'Ext.window.Window',
    xtype : 'purchasedlg',
    controller: 'listingViewController',

    record : null,
//    title: 'Confirm Purchase',
    modal : true,
    autoShow : true,
    layout : 'anchor',

    initComponent : function() {
        this.items = [ {
            xtype : 'form',
            bodyPadding: 5,
            anchor : '100%',
//            layout : 'anchor',
            reference : 'purchaseForm',
            buttonAlign : 'center',
            buttons : [ {
                text: 'Make Purchase',
                iconCls : 'icon-accept',
                reference : 'makePurchaseBtn',
                formBind : true,
                handler : 'onClickPurchase'
            }, {
                text : 'Cancel',
                iconCls : 'icon-cancel',
                handler : function(btn) {
                    btn.up('window').close();
                }
            } ],
            items : [ {
                xtype : 'container',
//                anchor : '100%',
                layout : { type : 'vbox', align : 'center', pack : 'center' },
                defaults : { xtype : 'displayfield' },
                items : [ {
                    xtype : 'container',
                    html : '<h1>PURCHASES ARE FINAL!</h1>'
                },{
                    xtype : 'container',
                    html : '<h3>By clicking the "Make Purchase" button you are entering into a binding agreement to buy:</h3>'
                }, {
                    fieldLabel : 'Automobile',
                    value : this.record.get('autoDescription')
                }, {
                    fieldLabel : 'Asking Price',
                    value : Ext.util.Format.currency(this.record.get('price'))
                }, {
                    fieldLabel : 'Seller',
                    value : Ext.String.capitalize(this.record.get('seller'))
                } ]
            } ]
        }];
        this.callParent();
    }
});