Ext.define('Jalopy.common.view.Container', {
    extend : 'Ext.container.Viewport',
    xtype : 'jalopy-container',

    layout : 'border',
    padding : '10 10 0 10',
    subTitle : null,
    username : null,

    headerTmp : '<div id="header">' +
                    '<div class="headerTitles left">' +
                        '<div class="mainTitle">Jalopy Exchange</div>' +
                        '<div class="subTitle">{subTitle}</div>' +
                    '</div>' +
                    '<div class="logout right">Welcome {username} | <a href="j_spring_security_logout">Logout</a></div>' +
                '</div>',

    footerTmp : '<div id="footer">' +
                    '<div class="left">&nbsp;&copy;{year}. Jalopy Exchange. All Rights Reserved.</div>' +
                '</div>',

    initComponent : function() {
        Ext.applyIf(this.content, {region : 'center'});

        var menu = {
            xtype : 'toolbar',
            cls : 'je_menu',
            itemId : 'menu',
            defaults : {
                cls : 'je_menuItem',
                margin : '1 5',
                hrefTarget : '_self'
            },
            items : [ {
                xtype : 'button',
                text : 'View Listings',
                href : '/JalopyExchange/listings'
            } ]
        };

        if (JE.ADMIN) {
            menu.items.push( {
                xtype : 'button',
                text : 'Manage Users',
                href : '/JalopyExchange/users'
            });
        }

        this.items = [ {
            xtype : 'container',
            region : 'north',
            items : [ {
                xtype : 'container',
                html : Ext.create('Ext.XTemplate', this.headerTmp).apply( {
                    subTitle : this.subTitle,
                    username : Ext.String.capitalize(JE.USERNAME)
                } )
            }, menu ]
        }, {
            xtype : 'container',
            region : 'center',
            layout : 'border',
            padding : '5 0 0 0',
            items : this.content
        }, {
            xtype : 'container',
            region : 'south',
            height : 25,
            html : Ext.create('Ext.XTemplate', this.footerTmp).apply( {
                year : new Date().getFullYear()
            } )
        } ];
        this.callParent();
    }
});