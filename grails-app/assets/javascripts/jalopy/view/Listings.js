Ext.define('Jalopy.view.Listings', {
    extend : 'Ext.grid.Panel',

    title : 'Listings',
    width : 800,
    height : 300,
    columns : [ {
        text : 'VIN',
        dataIndex : 'vin'
    }, {
        text : 'Asking Price',
        dataIndex : 'askingPrice'
    } ]
});