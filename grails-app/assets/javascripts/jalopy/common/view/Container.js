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
        this.items = [ {
            xtype : 'container',
            region : 'north',
            items : [ {
                xtype : 'container',
                html : Ext.create('Ext.XTemplate', this.headerTmp).apply( {
                    subTitle : this.subTitle,
                    username : Ext.String.capitalize(JE.USERNAME)
                } )
//            }, {
//                xtype : 'jemenu',
//                cls : 'je-menu'
            } ]
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