document.addEventListener('click', function (e) {
    // If the clicked element doesn't have the right selector, bail
	if (!e.target.matches('.calc_button')) return;

    // which button was clicked?
    var target_elem = e.target;
    console.log(target_elem);
    
    // get the amount of calories for each item 
    var cal_list = document.getElementsByClassName("item_cal");
    var counter;

    for (let elem of cal_list) {
        /*if (elem.id.startsWith()) {
            console.log(parseInt(elem.textContent));
        }
        */
    }
    // in the box with this button
    //
    // add this amount to a running total
    //
    // display the running total nicely
}, false);