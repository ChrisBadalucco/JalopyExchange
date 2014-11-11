Ext.define('Jalopy.view.account.Accounts', {
    extend : 'Jalopy.common.view.Container',
    xtype : 'accountscreen',
    requires : [ 'Jalopy.view.account.AccountViewController' ],
    controller : 'accountViewController',

    initComponent : function() {
        this.subTitle = 'My Account',
        this.content = this.buildAccountCt();
        this.callParent();
    },

    buildAccountCt : function() {
        var left = {
            xtype : 'form',
            title : 'User Details',
            flex :.5,
            layout : 'anchor',
            defaults : { anchor : '100%', padding : 10 },
            items : [ {
                xtype : 'displayfield',
                fieldLabel : 'Username',
                value : '',
                name : 'username'
            }, {
                xtype : 'textfield',
                fieldLabel : 'Email',
                vtype : 'email',
                name : 'email'
            } ]
        };

        var center = {
            xtype : 'grid',
            title : 'My Listings',
            columns : [ {
                text : 'ID',
                dataIndex : 'id'
            }, {
                text : 'Asking Price',
                dataIndex : 'askingPrice',
                formatter : 'usMoney'
            }, {
                xtype: 'datecolumn',
                text : 'Start Date',
                dataIndex : 'startDate',
                format: 'm/d/Y'
            }, {
                xtype: 'datecolumn',
                text : 'End Date',
                dataIndex : 'endDate',
                format: 'm/d/Y'
            }, {
                xtype: 'datecolumn',
                text : 'Last Updated',
                dataIndex : 'lastUpdated',
                format: 'm/d/Y'
            }, {
                text : 'Active?',
                dataIndex : 'isActive'
            } ],
            store : 'UserListing'
        };

        var right = {
            xtype : 'grid',
            title : 'My Automobiles',
            columns : [ {
                text : 'VIN',
                dataIndex : 'vin'
            }, {
                text : 'Year',
                dataIndex : 'year'
            }, {
                text : 'Make',
                dataIndex : 'make'
            }, {
                text : 'Model',
                dataIndex : 'model'
            } ],
            store : 'UserAutomobile'
        };

        return {
            xtype : 'container',
            layout : {
                type : 'hbox',
                align : 'stretch'
            },
            defaults : { flex : 1 },
            items : [ left, center, right ]
        }
    }
});