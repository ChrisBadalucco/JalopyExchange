Ext.define('Jalopy.store.filters.AutomobileFilter', {
    extend : 'Jalopy.store.Automobile',
    autoLoad : true,
    sorters: 'make',
    listeners : {
        load : function(thisStore, records, successful, eOpts) {
            if (successful) {
                thisStore.removeAll();
                thisStore.add( { make : 'All' } );

                var temp = [];
                Ext.Array.forEach(records, function(item, index, allItems){
                   temp.push(item.get('make'));
                });

                var unique = Ext.Array.unique(temp);
                Ext.Array.forEach(unique, function(item, index, allItems) {
                    thisStore.add( { make : item } );
                });
            }
        }
    }
});