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
            if (successful) {
                Ext.Array.forEach(records, function(rec, idx, allItems) {
                    if (Ext.isEmpty(rec.get('listings'))) {
                        thisStore.remove(rec);
                    }
                });
                thisStore.add( { username : 'All', id : -1 } );
            }
       }
    }
});