document.addEventListener('click', function (e) {
    // If the clicked element doesn't have the right selector, bail
	if (!e.target.matches('.calc_button')) return;

    // which button was clicked?
    var target_elem = e.target;
    // get the amount of calories for each item 
    // in the box with this button
    //
    // add this amount to a running total
    //
    // display the running total nicely
}, false);