// noinspection ES6ConvertVarToLetConst,LocalVariableNamingConventionJS
//
/* DANGER: api_key MUST BE a LOCAL VAR, NOT A GLOBAL VAR !!! A global var is easy to see in a browser!
   This is a very IMPORTANT security feature.  11/16/23
 */
const dalle_api_url = 'https://api.openai.com/v1/images/generations';

// prompt_form = form (video) ##########
const prompt_form = document.querySelector('#prompt-form'), $prompt_input = $("#id_prompt");

// prompt_input = inputPrompt (video) ############
const prompt_input = document.querySelector('#id_prompt');

const recents = document.querySelector('section.recents');
const recentsUL = recents.querySelector('ul');
const main = document.querySelector('main');
const recentImages = [];
var iconStr, prompt_value; // Must be global variable for my logic.

$(function(){
    /* NOTE: $(function()) is the jQuery ready function, equivalent to addEventListener("DOMContentLoaded").
       Trick #1: unbind click event from id_prompt! User can click id_prompt box and nothing happens yet.
     */
    $prompt_input.unbind("click");
});

prompt_form.addEventListener('submit', e => {
    // Prevent prompt_form from submitting anything (stop page refresh w/ so user can see results!).
    e.preventDefault();
    prompt_value = prompt_input.value;

    // Trick #2: Effectively "rebind" the id_prompt click event SO THAT YOU CAN FORCE A CLICK EVENT.
    $prompt_input.on("click", function(){
        $.ajax({
            /* I don't believe I have ever used type "GET" for the jQuery ajax(). BUT I need to avoid error 403 problems,
               and I only need to "get" the OpenAI ChatGPT API key and assign to a LOCAL(!) javascipt variable. So using
               type "POST" is (luckily) unnecessary. 11/16/23
             */
            type: "GET",  // Not POST! Much less common in my code work. 11/8/23
            url: '/dalle_api_js/test1/',
            dataType: "json",
            data: {},
        })  // ajax()
        .done(function(data){
            if (typeof (data['dalle_api_key']) !== "undefined"){
                /* DANGER! Assign api key to a LOCAL javascript variable!!! The "api_key" local variable will only
                   exist for a few milliseconds, then be deleted SUCH THAT ITS VALUE CANNOT BE EASILY FOUND, unlike
                   the case if api_key was a javascript global variable. 11/5/23, 11/8/23
                 */
                let api_key = data['dalle_api_key'];
                if (prompt_value !== '') {

                    // // createMessageInstance();  // ############## ?
                    // // askChatGPT(api_key);  // ############## ?
                    // // handleScroll();  // ############## ?

                    generateImage(api_key);  // prompt_input = inputPrompt (video) ############

                    // prompt_input.value = '';  // Reset prompt back to blank  ######### probably required later???
                    // $prompt_input.unbind("click");  // Unbind click event again! (Trick #1)  ######### probably required later???
                }
            }
        });  // .done()
    });
    /* Trick #3: Force a click event on id_prompt: THIS ALLOWS ABOVE CLICK EVENT TO RUN SUCH THAT API AND THE PROMPT
       ARE AVAILABLE AND READY TO SEND TO API. Yes, this is not professional code practice. I just want to learn how
        Django can implement "pure" js solution and STILL hide the api key. 11/25/23
     */
    $prompt_input.click();
})

function generateImage(api_key){
    /* Add 'disabled' class to form. Disable our form from working once 1st prompt is sent: Do not allow a 2nd prompt
       to be sent until getting a response back from our 1st prompt (when 'disabled' class is removed).
       ------------------------------------------------------------------------------------------------------------
       OPENAI DOCS FOR DALLE / IMAGE GENERATION:
       -- openai.com (may need to login, browse back to openai.com)
       -- API | Docs (menu)
       -- API reference (tab)
       -- ENDPOINTS | Images (side bar)
       -- Create image ... etc.
     */
    prompt_form.classList.add('disabled');
    /* Add css display 'block' to main element so it's no longer hidden (w/ display none).
     */
    main.style.display = 'block';
    /* Echo prompt back by adding html to main element */
    main.innerHTML = `<p>Generating image for <span>${prompt_value}</span>...</p>`;

    fetch(dalle_api_url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api_key}`
        },
        body: JSON.stringify({ // convert to json string
            /*
                Buggy API? As of Nov 2023 (11/17/23), it seems you must NOT include the model argument, even if you may
                be specifying the correct/allowed value. Literally had Safari inspector say "model argument must be left
                blank". Odd. 11/17/23
             */
            // No! // model: 'image-alpha-001',  // Deprecated? At any rate, DO NOT USE MODEL ARGUMENT (as of Nov 2023?)
            // No! // model: 'dalle-e-2',        // Not allowed? Like above, DO NOT USE MODEL ARGUMENT (as of Nov 2023?)
            // No! // model: 'dalle-e-3',        // Not allowed? Like above, DO NOT USE MODEL ARGUMENT (as of Nov 2023?)
            prompt: prompt_value,
            n: 1,  // In video, this was 'num_images', but dalle-2 (?) uses 'n' instead.
            size: '512x512',
            response_format: 'url',
        })
    })  /* fetch() is promised-based, we "chain-on" 2 .then() methods.
           Note per fetch() documentation:
              res = response: The response of fetch() (either spelling res/response)
              data = data obj: The data obj returned by fetch()
        */
    .then(res => res.json())  // convert response back into json format (a json obj)
    .then(data => handleImage(data.data[0].url, prompt_value))  // data "message" obj contains response image--update our UI
    .catch(error => handleError(error))
}

function handleImage(img, prmt){
    /* Replace innerHTML of main tag with the image. 11/17/23 */
    main.style.display = 'block';
    main.innerHTML =
        `<p><span>${prmt}</span></p>
         <img src="${img}" alt="Generated image of ${prmt}">`;

    // // // ------------------------------------------------------------------------------------------------
    // // // During debug, I found this jquery also worked, but above innerHTML logic much simpler. 11/17/23
    // // $(main).remove();
    // // $(`<main style="display: block;">
    // //        <p><span>${pval}</span></p>
    // //        <img src="${img}" alt="Generated image of ${pval}">
    // //    </main>`).insertAfter(".recents");
}

function handleError(msg){
    main.style.display = 'block';
    main.innerHTML = `<p class="error">There was an error with your request: <br><span>${msg}</span></p>`;
}
