Ext.define('Jalopy.store.filters.Seller', {
    extend : 'Jalopy.store.BaseStore',
    autoLoad : true,
    sorters: 'id',
    model : Ext.define('Jalopy.model.Seller', {
        extend : 'Jalopy.common.model.Base',
        proxy : { url : 'main/user/sellers' }
    }),
    listeners : {
        load : function(thisStore, records, successful, eOpts) {
            thisStore.add( { username : 'All', id : -1 } );
       }
    }
});