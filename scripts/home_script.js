document.addEventListener('blur', function(e) {
    if (!e.target.matches('.food_input')) return;

    // which input field was clicked out of?
    var target_input_elem = e.target;
    // get the text content so we can search API
    var query_phrase = target_input_elem.value;
    console.log("Input: " + query_phrase);

    // API fetch based on content of text-input
    const url = "https://nutritionix-api.p.rapidapi.com/v1_1/search/cheddar%2520cheese?fields=item_name%252Citem_id%252Cbrand_name%252Cnf_calories%252Cnf_total_fat";
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": config.api_host,
            "x-rapidapi-key": config.api_key
        }
    })
    .then(response => {
        // parse the response and output
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
}, true);

document.addEventListener('click', function(event) {
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
}, false); // should this be true? true=capturing
