Ext.Loader.setConfig({
    enabled : true,
    disableCaching : true,
    disableCachingParam : 'dc'
});

Ext.override(Ext.data.Connection, {
//    timeout : 900000,
    disableCaching : true,
    disableCachingParam : 'dc'
});

Ext.override(Ext.data.proxy.Ajax, {
//    timeout : 900000,
    disableCaching : true,
    disableCachingParam : 'dc'
});