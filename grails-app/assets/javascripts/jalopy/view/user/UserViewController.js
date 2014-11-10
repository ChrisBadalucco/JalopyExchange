Ext.define('Jalopy.view.user.UserViewController', {
    extend: 'Ext.app.ViewController',
    alias : 'controller.userViewController',

    loadChris : function(btn) {
        var store = btn.up('grid').getStore();
        store.load({
            params : {
                id : 2,
                username : 'chris'
            }
        });
    }

});