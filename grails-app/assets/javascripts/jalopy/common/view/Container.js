Ext.define('Jalopy.common.view.Container', {
    extend : 'Ext.container.Viewport',
    xtype : 'jalopy-container',

    requires : [ 'Jalopy.common.view.Menu' ],

    layout : 'border',
    subTitle : null,
    username : null,

    headerTmp : '<div id="header">' +
                    '<div class="headerTitles left">' +
                        '<div class="mainTitle">Jalopy Exchange</div>' +
                        '<div class="subTitle right">{subTitle}</div>' +
                    '</div>' +
                    '<div class="logout right">Welcome {username} | <a href="j_spring_security_logout">Logout</a></div>' +
                '</div>',

    footerTmp : '<div id="footer">' +
                    '<div class="right">&nbsp;&copy;{year}. Jalopy Exchange. All Rights Reserved.</div>' +
                '</div>',

    initComponent : function() {
        Ext.applyIf(this.content, {region : 'center'});

        this.items = [ {
            xtype : 'container',
            region : 'north',
//            style : 'backgroundColor : #157fcc',
            items : [ {
                xtype : 'container',
                html : Ext.create('Ext.XTemplate', this.headerTmp).apply( {
                    subTitle : this.subTitle,
                    username : Ext.String.capitalize(JE.USERNAME)
                } )
            }, {
                xtype : 'jalopymenu'
            } ]
        }, {
            xtype : 'container',
            region : 'center',
            layout : 'border',
//            margin : '5 0 0 0',
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