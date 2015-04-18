/**
 * Created by franklinwaller on 18/04/15.
 */
app.filter('groupBy', function() {
    return function(items, rows) {
        if (items) {
            var finalItems = [];
            var tempItems = [];
            var count = 1;

            for(var i = 0; i < items.length; i++){
                tempItems.push(items[i]);

                if (count == rows) {
                    finalItems.push(tempItems);
                    tempItems = [];
                    count = 1;
                } else {
                    count++;
                }


            }

            return finalItems;
        }
    };
});