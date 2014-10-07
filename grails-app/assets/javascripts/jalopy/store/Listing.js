Ext.define('Jalopy.store.Listing', {
    extend : 'Ext.data.Store',
    autoLoad : true,
    model : Ext.define('Jalopy.model.Listing', {
        extend : 'Jalopy.model.Base'
    })
});