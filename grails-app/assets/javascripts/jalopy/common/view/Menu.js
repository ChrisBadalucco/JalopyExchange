Ext.define('Jalopy.common.view.Menu', {
    extend : 'Ext.toolbar.Toolbar',
    xtype : 'jalopymenu',

    cls : 'je_menu',
    itemId : 'menu',
    defaults : {
        xtype : 'button',
        cls : 'je_menuItem',
        margin : '1 5 1 0',
        hrefTarget : '_self'
    },
    items : [ {
        text : 'My Account',
//        tooltip : 'Manage your account details.',
        href : JE.CONTEXT + '/myaccount'
    }, {
        text : ' Listings',
//        tooltip : 'View .',
        href : JE.CONTEXT + '/listings'
    } ],

    initComponent : function() {
        if (JE.ADMIN) {
            this.items.push( '->', {
//                xtype : 'button',
                text : 'Manage Users',
                href : JE.CONTEXT + '/users'
            });
        }
        this.callParent();
    }
});