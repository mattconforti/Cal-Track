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
    var output_heading = document.getElementById(output_heading_id);
    output_heading.textContent = daily_cal_count + " Calories";
    // animate this going onto the screen
    // (grows big then small or red circle around)

    // ^^ quickfix - red circle around using boxShadow
    // NEED BOX-SHADOW TO HAVE MORE PADDING BTW TEXT

    setTimeout(function() {
        output_heading.style.boxShadow = "0 0 0 2pt red";
    }, 1250);

    setTimeout(function() {
        output_heading.style.boxShadow = "initial";
    }, 3000);
}, false);
