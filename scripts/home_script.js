document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('.calc_button')) return;

    // which button # was clicked?
    var target_elem = event.target;
    var target_num = target_elem.id.split('_')[2];
    console.log("Button " + target_num + " clicked");
    
    // get the amount of calories for each item 
    var cal_list = document.getElementsByClassName("item_cal");
    var daily_cal_count = 0;

    for (let elem of cal_list) {
        // if the element matches our target button
        if (elem.id.endsWith(target_num)) {
            // parse it to get the calorie amount
            // and add the amount to the running total
            daily_cal_count += parseInt(elem.textContent);
        }
    }
    console.log(daily_cal_count);
    // output the calorie amount for specific day
    output_heading_id = "h2" + target_num;
    console.log("outputting to: " + output_heading_id);
    document.getElementById(output_heading_id).textContent = daily_cal_count + " Calories";
    // animate this going onto the screen
    // (grows big then small or red circle around)

    // ^^ quickfix - make red underline appear

    setTimeout(function() {
        document.getElementById(output_heading_id).style.textDecoration = "underline";
        document.getElementById(output_heading_id).style.textDecorationColor = "red";
    }, 1250);
}, false);
