Ext.define('Jalopy.common.model.Base', {
    extend : 'Ext.data.Model',
    //identifier : 'sequential',

    fields : [ {
        name : 'id',
        type : 'int'
    } ],

    schema : {
        namespace : 'Jalopy.model',
        proxy : {
            type : 'rest',
            url : '/JalopyExchange/main/{entityName:lowercase}',
            reader : {
                type : 'json',
                rootProperty : 'data'
            }
            //writer : {}
        }
    }
});