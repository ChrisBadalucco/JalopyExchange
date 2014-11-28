Ext.define('Jalopy.view.listing.ListingViewController', {
    extend: 'Ext.app.ViewController',
    alias : 'controller.listingViewController',

    onSelectionChange : function(thisSelModel, selected, eOpts ) {
        var btn = this.lookupReference('purchaseBtn');
        return selected.length > 0 && selected[0].get('isActive') ? btn.enable() : btn.disable();
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
    }
});