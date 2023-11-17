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
            if (typeof (data['chatgpt_api_key']) !== "undefined"){
                /* DANGER! Assign api key to a LOCAL javascript variable!!! The "api_key" local variable will only
                   exist for a few milliseconds, then be deleted SUCH THAT ITS VALUE CANNOT BE EASILY FOUND, unlike
                   the case if api_key was a javascript global variable. 11/5/23, 11/8/23
                 */
                let api_key = data['chatgpt_api_key'];
                if (prompt_value !== '') {

                    // createMessageInstance();  // ############## ?
                    // askChatGPT(api_key);  // ############## ?
                    // handleScroll();  // ############## ?

                    generateImage(prompt_input.value);  // prompt_input = inputPrompt (video) ############

                    prompt_input.value = '';  // Reset prompt back to blank
                    $prompt_input.unbind("click");  // Unbind click event again! (Trick #1)
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

function generateImage(prompt){
    console.log(prompt);
}