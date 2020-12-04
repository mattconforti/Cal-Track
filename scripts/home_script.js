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
        const query_hits_count = query_hits_arr.length;
        console.log(query_hits_arr);

        // green checkmark animation here to show valid input and successful API query
        // TODO - fix these numbers... decimals mess up stroke before mid
        var start = 25; // 100
        var mid = 36;   // 145
        var end = 62;   // 250
        var width = 5;  // 22
        var leftX = start;
        var leftY = start;
        var rightX = mid - (width / 2.7);
        var rightY = mid + (width / 2.7);
        var animationSpeed = 35;

        const canvasId = id_match_list[0] + "c" + id_match_list[1];
        console.log("Drawing on canvas " + canvasId);
        var ctx = document.getElementById(canvasId).getContext('2d');
        ctx.lineWidth = width;
        ctx.strokeStyle = 'rgba(0, 150, 0, 1)';

        for (i = start; i < mid; i++) {
            var drawLeft = window.setTimeout(function () {
                ctx.beginPath();
                ctx.moveTo(start, start);
                ctx.lineTo(leftX, leftY);
                ctx.stroke();
                leftX++;
                leftY++;
            }, 1 + (i * animationSpeed) / 3);
        }

        for (i = mid; i < end; i++) {
            var drawRight = window.setTimeout(function () {
                ctx.beginPath();
                ctx.moveTo(leftX, leftY);
                ctx.lineTo(rightX, rightY);
                ctx.stroke();
                rightX++;
                rightY--;
            }, 1 + (i * animationSpeed) / 3);
        }

        // see which 'hit' we want

        // open new window here to have user select correct item
        setTimeout(function() {
            var new_window = window.open("html/search_results.html","Results","width=500,height=400,left=75,top=250,toolbar=0,status=0,");

            new_window.onload = function() {
                console.log(new_window.document.title);
    
                // get results-page grid items' contents and update it
                let grid_items_contents = new_window.document.getElementsByClassName('grid_item_content');
                counter = 0;
                for (let hit of query_hits_arr) {
                    grid_items_contents[counter].textContent = hit['fields']["item_name"];
                    grid_items_contents[counter+1].textContent = "Calories: " + hit['fields']["nf_calories"];
                    counter += 2; // every other grid_item_content is the item's name 
                }
    
                // GRID ITEM CLICK EVENT
                new_window.document.addEventListener('click', function(eventObj) {
                    if (!eventObj.target.matches('.grid_item')) return;
                    console.log("GRID ITEM CLICKED!!");
    
                    const target_grid_item = eventObj.target;
                    const target_grid_item_content = target_grid_item.textContent;
                    const calories_to_output = target_grid_item_content.split("Calories: ")[1].trim();
                    const int_calories_to_out = parseInt(calories_to_output);
    
                    // output calorie amount to correct heading
                    console.log("Outputting: " + int_calories_to_out + " Calories");
                    // use id_match_list to get the correct id for output
                    const output_id = id_match_list[1]+ "h3" + id_match_list[0];
                    console.log("Outputting to: " + output_id);
    
                    let calorie_amt_heading = document.getElementById(output_id);
                    calorie_amt_heading.textContent = int_calories_to_out + " Calories";

                    // TODO - replace user input with more specific item name?

                    new_window.close();
                }, false);
            };
        }, 1500);
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

    // clear all text and calorie labels associated with button
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
// TODO - FIX ISSUE WHERE TEXT-INPUT BLUR EVENT DOESNT TRIGGER AFTER CLEAR
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
    // TODO - NEED BOX-SHADOW TO HAVE MORE PADDING BTW TEXT

    setTimeout(function() {
        output_heading.style.boxShadow = "0 0 0 2pt red";
    }, 1250);

    setTimeout(function() {
        output_heading.style.boxShadow = "initial";
    }, 3000);
}, false); // should this be true? true=capturing
