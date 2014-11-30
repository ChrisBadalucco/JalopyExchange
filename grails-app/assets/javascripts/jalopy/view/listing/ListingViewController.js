Ext.define('Jalopy.view.listing.ListingViewController', {
    extend: 'Ext.app.ViewController',
    alias : 'controller.listingViewController',

    onSelectionChange : function(thisSelModel, selected, eOpts ) {
        var btn = this.lookupReference('purchaseBtn');
        if (selected.length > 0 && selected[0].get('isActive')) {
            if (selected[0].get('seller') === JE.USERNAME) {
                btn.setTooltip('Cannot purchase your own automobile');
                btn.disable();
                return
            } else {
                btn.setTooltip('Click to purchase selected');
                btn.enable();
                return
            }
        }
        btn.setTooltip('Select an active listing');
        btn.disable();
    },

    onClickSearch : function(btn) {
        var form = this.lookupReference('filterForm');

        if (form.isValid()) {
            this.getView().down('grid').getStore().load({
                params : form.getValues()
            });
        }
    },

    onAdminClickManageListing : function(btn) {
        var grid = this.lookupReference('listingGrid');
        var rec = btn.getWidgetRecord();
        var isActive = rec.get('isActive');
        var title = isActive ? 'Close' : 'Open';
        var msg = isActive ? 'This listing is currently open. Are you sure you want to close it?' :
                'This listing is currently closed. Are you sure you want to open it?';
        Ext.Msg.confirm('Confirm ' + title, msg, function(confirmBtn) {
            if (confirmBtn === 'yes') {
                var store = grid.getStore();

                rec.set('isActive', !isActive);
                store.sync({
                    success : function() {
                        var alertMsg = !isActive ? 'opened.' : 'closed.';
                        Ext.Msg.alert('Success', 'Listing successully ' + alertMsg);
                    },
                    failure : function() {
                        store.rejectChanges();
                    }
                });
            }
        });
    },

    onClickPurchaseBtn : function(btn) {
        var grid = this.lookupReference('listingGrid');
        var rec = grid.getSelection()[0];

        if (rec.get('seller') === JE.USERNAME) {
            Ext.Msg.alert('Error', 'You cannot purchase your own automobile.');
        } else {
            Ext.widget('purchasedlg', { record : rec });
        }
    },

    onClickPurchase : function(btn) {
        var rec = btn.up('window').record;
        rec.set('isActive', false);
        rec.set('buyer', JE.USERNAME);
        var store = Ext.ComponentQuery.query('#listingGrid')[0].getStore();
        store.sync({
            success : function() {
                btn.up('window').destroy();
                Ext.Msg.alert('Congratulations!', 'You are the proud new owner of a ' + rec.get('autoDescription') + '!');
                store.reload();
            },
            failure : function() {
                btn.up('window').destroy();
                Ext.Msg.alert('Error', 'We were unable to confirm your purchase. Please try again.');
                store.rejectChanges();
            }
        });

    }
});