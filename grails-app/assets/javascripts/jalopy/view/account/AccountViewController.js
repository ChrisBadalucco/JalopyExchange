Ext.define('Jalopy.view.account.AccountViewController', {
    extend: 'Ext.app.ViewController',
    alias : 'controller.accountViewController',

//    config : {
//        listen : {
//            store : {
//                '#User' : {
//                    load : 'onLoadUsers'
//                }
//            }
//        }
//    },
//
//    onLoadUsers : function(thisStore, records, successful, eOpts) {
//        if (successful) {
//            Ext.ComponentQuery.query('userDetailsForm')[0].loadRecord(records[0]);
//        }
//    },

    onAfterRenderUserDetails : function(thisPanel, eOpts) {
        var store = Ext.StoreMgr.lookup('User');
        if(store.count() === 0) {
            store.load({
                callback: function(records, operation, success) {
                    thisPanel.loadRecord(records[0]);
                }
            });
        } else {
            thisPanel.loadRecord(store.getAt(0));
        }
    },

    onClickSaveUserChanges : function(btn) {
        var store = Ext.StoreMgr.lookup('User');
        var form = btn.up('form');
        var rec = store.getAt(0);

        Ext.Msg.confirm('Confirm', 'Are you sure you want to save the changes to your user account?', function(confirm) {
            if (confirm === 'yes') {

                rec.set('firstName', form.down('[name=firstName]').getValue());
                rec.set('lastName', form.down('[name=lastName]').getValue());
                rec.set('email', form.down('[name=email]').getValue());
                rec.set('age', form.down('[name=age]').getValue());
                rec.set('bio', form.down('[name=bio]').getValue());

                store.sync({
                    success : function() {
                        Ext.Msg.alert('Success', 'Your account has been updated.');
                    },
                    failure : function() {
                        store.rejectChanges();
                        form.loadRecord(store.getAt(0));
                        // TODO alert user if error not caught by default override
                    }
                });
            }
        }, this);
    },

    onClickAddAuto : function(btn) {
        var form = this.lookupReference('addform');
        var grid = Ext.ComponentQuery.query('#automobileGrid')[0];
        var store = grid.getStore();
        var me = this;

        if (form.isValid()) {
            form.getForm().submit({
                clientValidation: true,
                success: function(form, action) {
                    Ext.Msg.alert('Success', 'Your automobile has been added.');
                    store.reload();
                    me.getView().close();
                },
                failure: function(form, action) {
//                    Ext.Msg.alert('Failure', 'Submission failed');
                    store.rejectChanges();
                }
            });

        }
    },

    loadCombos : function(thisWin, eOpts) {
        var store = thisWin.down("combo[name='autoId']").getStore();
        store.load({
            callback: function(records, operation, success) {
                if (success) {
                    if (records.length > 0) {
                        Ext.Array.forEach(records, function(item, idx, allItems){
                            if (Ext.isEmpty(item.get('listing')) === false || item.get('owner') !== JE.USERNAME) {
                                store.remove(item);
                            }
                        });
                    }
                    if (store.getCount() === 0) {
                        thisWin.destroy();
                        Ext.Msg.alert('Action Required', 'Please add a new automobile before trying to create a listing.');
                    }
                } else {
                        thisWin.destroy();
                        Ext.Msg.alert('Error', 'Failed to load your available automobiles. Please try again.');
                    }
            }
        });

    },

    onClickAddListing: function(btn) {
        var form = this.lookupReference('addListingForm');
        var grid = Ext.ComponentQuery.query('grid[title="My Listings"]')[0];
        var store = grid.getStore();
        if (form.isValid()) {

            store.add(form.getValues());
            store.sync({
                success : function() {
                    Ext.Msg.alert('Success', 'Your listing has been added.');
                    store.load();
                },
                failure : function() {
                    store.rejectChanges();
                }
            });
            this.getView().close();
        }
    },

    onClickManageListing : function(btn) {
        var grid = this.lookupReference('myListingsGrid');
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