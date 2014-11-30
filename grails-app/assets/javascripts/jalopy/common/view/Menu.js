Ext.define('Jalopy.common.view.Menu', {
    extend : 'Ext.toolbar.Toolbar',
    xtype : 'jalopymenu',

    cls : 'je_menu',
    itemId : 'menu',
    defaults : {
        xtype : 'button',
        cls : 'je_menuItem',
        margin : '0 15 0 0',
        hrefTarget : '_self'
    },
    items : [ {
        text : ' Listings',
        iconCls : 'icon-form',
        href : JE.CONTEXT + '/listings'
    } ],

    initComponent : function() {
        if (!JE.ADMIN) {
            this.items.push({
                text : 'My Account',
                    iconCls : 'icon-user',
                href : JE.CONTEXT + '/myaccount'
            });
        }

        if (JE.ADMIN) {
            this.items.push( '->', {
                text : 'Manage Users',
                iconCls : 'icon-group',
                margin : '0 8',
                href : JE.CONTEXT + '/users'
            });
        }
        this.callParent();
    }
});