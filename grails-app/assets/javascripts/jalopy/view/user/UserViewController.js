Ext.define('Jalopy.view.user.UserViewController', {
    extend: 'Ext.app.ViewController',
    alias : 'controller.userViewController',

    onEditUserGrid : function(editor, context, eOpts) {
        var rec = context.record;
        var newVals = context.newValues;

        if (Ext.isEmpty(newVals.firstName) == false) {
            rec.set('firstName', newVals.firstName);
        }
        if (Ext.isEmpty(newVals.lastName) == false) {
            rec.set('lastName', newVals.lastName);
        }
        if (Ext.isEmpty(newVals.email) == false) {
            rec.set('email', newVals.email);
        }
        if (Ext.isEmpty(newVals.age) == false) {
            rec.set('age', newVals.age);
        }
        if (Ext.isEmpty(newVals.bio) == false) {
            rec.set('bio', newVals.bio);
        }

        var store = context.grid.getStore();
        store.sync({
            success : function() {
                Ext.Msg.alert('Success', rec.get("username") + ' was updated.');
                store.reload();
            },
            failure : function() {
                store.rejectChanges();
            }
        });
    }
});