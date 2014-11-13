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
        var west = {
            xtype : 'form',
            region : 'west',
            collapsible : true,
            title : 'User Details',
            layout : 'anchor',
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

        var myListings = {
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

        var myAutos = {
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

        var centerCt = {
            xtype : 'container',
            region : 'center',
            defaults : { flex : 1 },
            layout : {
                type : 'vbox',
                align : 'stretch'
            },
            items : [ myListings, myAutos ]
        };

        return {
            xtype : 'container',
            layout : 'border',
            defaults : { split : true },
            items : [ west, centerCt ]
        }
    }
});