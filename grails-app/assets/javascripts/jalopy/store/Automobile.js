Ext.define('Jalopy.store.Automobile', {
    extend : 'Jalopy.store.BaseStore',
    autoLoad : true,
    model : Ext.define('Jalopy.model.Automobile', {
        extend : 'Jalopy.common.model.Base'
    }),

    fields : [ {
        name : 'description',
        type : 'string',
        mapping : function(data) {
            return data.year + data.make + data.model;
        }
    } ]
});