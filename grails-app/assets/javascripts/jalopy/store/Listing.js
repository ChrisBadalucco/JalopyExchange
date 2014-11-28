Ext.define('Jalopy.store.Listing', {
    extend : 'Jalopy.store.BaseStore',
    autoLoad : true,
    sorters : 'status',
    model : Ext.define('Jalopy.model.Listing', {
        extend : 'Jalopy.common.model.Base',

        fields : [ {
            name : 'isActive',
            type : 'boolean'
        }, {
            name : 'status',
            calculate : function(data) {
                return data.isActive ? 'Active' : 'Closed';
            }
        } ]
    })
});