Ext.define('Jalopy.view.account.AccountViewController', {
    extend: 'Ext.app.ViewController',
    alias : 'controller.accountViewController',

//    store : {
//        '#Automobile' : {
//            beforeload : 'onBeforeLoadAuto'
//        }
//    },
//
//    onBeforeLoadAuto : function(thisStore, operation, eOpts) {
//        Ext.applyIf(operation.params, {
//            username : JE.USERNAME
//        });
//    },

    onClickAddAuto : function(btn) {
        var form = this.lookupReference('addform');
        var grid = Ext.ComponentQuery.query('#automobileGrid')[0];
        var store = grid.getStore();
        if (form.isValid()) {

//            store.add(form.getValues());
//            store.sync({
//                success : function() {
//                    Ext.Msg.alert('Success', 'Your automobile has been added.');
//                    store.reload();
//                },
//                failure : function() {
//                    store.rejectChanges();
//                }
//            });
            form.getForm().submit({
                clientValidation: true,
    //            url: 'updateConsignment.php',
                success: function(form, action) {
                    Ext.Msg.alert('Success', 'Submission was successful');
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failure', 'Submission failed');
                }
            });
            this.getView().close();
        }
    }
});