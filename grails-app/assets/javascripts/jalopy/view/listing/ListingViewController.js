Ext.define('Jalopy.view.listing.ListingViewController', {
    extend: 'Ext.app.ViewController',
    alias : 'controller.listingViewController',

    loadCombos : function(thisWin, eOpts) {
        thisWin.down("combo[name='autoVin']").getStore().load();
    },

    onClickAdd: function(btn) {
        var form = this.lookupReference('addform');
        var grid = Ext.ComponentQuery.query('#listingGrid')[0];
        var store = grid.getStore();
        if (form.isValid()) {

            store.add(form.getValues());
            store.sync({
                success : function() {
                    Ext.Msg.alert('Success', 'Your listing has been added.');
                    store.reload();
                },
                failure : function() {
                    store.rejectChanges();
                }
            });
            this.getView().close();
        }
    }
});