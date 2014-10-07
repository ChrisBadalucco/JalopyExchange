Ext.define('Jalopy.view.Listings', {
    extend : 'Ext.grid.Panel',

    title : 'Listings',
    store : 'Listing',
    columns : [ {
        text : 'ID',
        dataIndex : 'id'
    }, {
        text : 'Seller',
        dataIndex : 'seller'
    }, {
        text : 'Asking Price',
        dataIndex : 'askingPrice'
    }, {
        text : 'Start Date',
        dataIndex : 'dateCreated'
    }, {
        text : 'End Date',
        dataIndex : 'endDate'
    } ]
});