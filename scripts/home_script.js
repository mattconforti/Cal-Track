// TEXT INPUT BLUR EVENT
document.addEventListener('blur', function(e) {
    if (!e.target.matches('.food_input')) return;

    // which input field was clicked out of?
    const target_input_elem = e.target;
    const target_id = target_input_elem.id;
    const id_match_list = target_id.split("in");

    // get the text content so we can search API
    const query_phrase = target_input_elem.value;
    console.log("Input: " + query_phrase);
    // TODO - check if the input is valid (not empty string, not malicious)

    // API fetch based on content of text-input
    const url = `https://nutritionix-api.p.rapidapi.com/v1_1/search/${query_phrase}?fields=item_name,nf_calories`;
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": config.api_host,
            "x-rapidapi-key": config.api_key
        }
    })
    // need .then() to get values of Promises returned
    // arrow functions to parse data
    .then(response => response.json())
    .then(responseJSON => {
        // save list of query matches
        const query_hits_arr = responseJSON['hits'];
        console.log(query_hits_arr);

        // see which match we want

        // open new window here to have user select correct item
        var new_window = window.open("html/search_results.html","Results","width=500,height=350,left=75,top=250,toolbar=0,status=0,");
        console.log(new_window.document.title);

        // TODO - close the window after selection is made and output

        // get results grid items
        let grid_items = document.getElementsByClassName('grid_item');
        // ERROR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // Cal-Track page still loaded into DOM!!!
        // even tho new page is loaded
        // POSSIBLE FIX - use window.onload = function() {}; to make sure the new DOM elements exist

        // get calorie amount and output
        let cal_amt = query_hits_arr[0]['fields']["nf_calories"];
        // round the decimal if necessary
        if (!Number.isInteger(cal_amt)) {
            cal_amt = Math.round(cal_amt);
        }
        console.log("Outputting: " + cal_amt + " Calories");
        // use id_match_list to get the correct id for output
        const output_id = id_match_list[1]+ "h3" + id_match_list[0];
        console.log("Outputting to: " + output_id);
        
        // TODO - green checkmark animation here if output is ready (valid input) and found search results
        // output to correct heading
        let calorie_amt_heading = document.getElementById(output_id);
        calorie_amt_heading.textContent = cal_amt + " Calories";
    })
    .catch(err => {
        console.log(err);
    });
}, true);

// ADD BUTTON CLICK EVENT
document.addEventListener('click', function(evnt) {
    if (!evnt.target.matches('.add_button')) return;
    console.log(evnt.target);
}, false);

// CLEAR BUTTON CLICK
document.addEventListener('click', function(ev) {
    if (!ev.target.matches('.clear_button')) return;

    const target_clear_button = ev.target;
    const target_clear_button_id = target_clear_button.id;
    const target_clear_num = target_clear_button_id.split('_')[2];

    // TODO - clear all calorie labels associated with button
    let input_field_list = document.getElementsByClassName('food_input');
    for (let el of input_field_list) {
        // if the element is associated with this specific clear button
        if (el.id.startsWith(target_clear_num)) {
            el.value = "";
        }
    }

    // get lists of calorie headings and set textContent to ""
    let item_cal_list = document.getElementsByClassName('item_cal');
    for (let h of item_cal_list) {
        // if the heading is associated with proper clear button
        if (h.id.endsWith(target_clear_num)) {
            h.textContent = "";
        }
    }

    let cal_totals_list = document.getElementsByClassName("cal_output");
    for (let h2 of cal_totals_list) {
        if (h2.id.endsWith(target_clear_num)) {
            h2.textContent = "";
        }
    }
}, false);

// CALC BUTTON CLICK
document.addEventListener('click', function(event) {
    // If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('.calc_button')) return;

    // which button # was clicked?
    const target_elem = event.target;
    const target_num = target_elem.id.split('_')[2];
    console.log("Button " + target_num + " clicked");
    
    // get the amount of calories for each item 
    const cal_list = document.getElementsByClassName("item_cal");
    let daily_cal_count = 0;

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
    const output_heading_id = "h2" + target_num;
    console.log("outputting to: " + output_heading_id);
    let output_heading = document.getElementById(output_heading_id);
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
