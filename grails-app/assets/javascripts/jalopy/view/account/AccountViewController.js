Ext.define('Jalopy.view.account.AccountViewController', {
    extend: 'Ext.app.ViewController',
    alias : 'controller.accountViewController',

    config : {
        listen : {
            store : {
                '#users-autos' : {
                    load : 'onLoadAutomobiles'
                }
            }
        }
    },

    onLoadAutomobiles : function(thisStore, records, successful, eOpts) {
        if (successful) {
            this.lookupReference('myListingsGrid').getStore().load();
        }
    },

    onDeleteAutomobile : function(grid, rowIdx, colIdx) {
        var store = grid.getStore();
        var rec = store.getAt(rowIdx);

        Ext.Msg.confirm('Confirm Delete', 'Are you sure you want to delete the selected automobile?', function(btn){
            if(btn === 'yes') {
                store.remove(rec);
                store.sync({
                    success : function() {
                        Ext.Msg.alert('Success', 'Automobile successfully deleted.');
                        store.reload();
                    },
                    failure : function() {
//                        Ext.Msg.alert('Failure', 'Delete has failed. Please try again.');
                        store.rejectChanges();
                    }
                });
            }
        });
    },

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

    onClickCloseListing : function(btn) {
        var grid = this.lookupReference('myListingsGrid');
        var rec = btn.getWidgetRecord();
        var isActive = rec.get('isActive');
        if (rec.get('isActive') === false) {
            Ext.Msg.alert('Error', 'Listing already closed.');
        } else {
            Ext.Msg.confirm('Confirm Close', 'Are you sure you want to close this listing?', function(confirmBtn) {
                if (confirmBtn === 'yes') {
                    var store = grid.getStore();

                    rec.set('isActive', !isActive);
                    store.sync({
                        success : function() {
                            Ext.Msg.alert('Success', 'Listing successfully closed.');
                        },
                        failure : function() {
                            store.rejectChanges();
                        }
                    });
                }
            });
        }
    }
});