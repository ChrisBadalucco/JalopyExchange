Ext.define('Jalopy.view.listing.ListingViewController', {
    extend: 'Ext.app.ViewController',
    alias : 'controller.listingViewController',

//    store : {
//        '#UserAutomobile' : {
//            load : 'onLoadUserAuto'
//        }
//    },
//
//    onLoadUserAuto : function(thisStore, operation, eOpts) {
//        if(thisStore.getCount() === 0) {
//            var btn = Ext.ComponentQuery.query('#createListingBtn')[0];
//            btn.disable();
//            btn.setTooltip('No automobiles available to list. Go to "My Account" to add a new automobile.');
//        }
//    },

    loadCombos : function(thisWin, eOpts) {
        var store = thisWin.down("combo[name='autoVin']").getStore();
        store.load();
        if(store.getCount() === 0) {
            thisWin.destroy();
            Ext.Msg.alert('No Available Automobiles', 'You have no automobiles to list. Please add an automobile to your account in "My Account"');
        }
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