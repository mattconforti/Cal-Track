document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('.calc_button')) return;

    // which button # was clicked?
    var target_elem = event.target;
    var target_num = target_elem.id.split('_')[2];
    
    // get the amount of calories for each item 
    var cal_list = document.getElementsByClassName("item_cal");
    var counter;

    for (let elem of cal_list) {
        console.log(elem); // need to make each one 
        // have an ID so we can check to make sure
        // the we are getting the correct numbers
        // (associated with the correct button click)
    }
    // in the box with this button
    //
    // add this amount to a running total
    //
    // display the running total nicely
}, false);