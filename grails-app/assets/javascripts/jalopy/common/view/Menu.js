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
        text : ' Listings',
//        tooltip : 'View .',
        iconCls : 'icon-list',
        href : JE.CONTEXT + '/listings'
    }, {
        text : 'My Account',
        iconCls : 'icon-user',
//        tooltip : 'Manage your account details.',
        href : JE.CONTEXT + '/myaccount'
    } ],

    initComponent : function() {
        if (JE.ADMIN) {
            this.items.push( '->', {
                text : 'Manage Users',
                iconCls : 'icon-user-edit',
                href : JE.CONTEXT + '/users'
            });
        }
        this.callParent();
    }
});