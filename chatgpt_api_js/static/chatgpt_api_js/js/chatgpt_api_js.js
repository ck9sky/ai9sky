// noinspection ES6ConvertVarToLetConst,LocalVariableNamingConventionJS
//
/* DANGER: api_key MUST NOT BE A GLOBAL VARIABLE !!! Security issue. When api_key is a local variable,
   it exists for a tiny fraction of a second, so it (I would hope!) cannot be viewed merely by using
   your browser inspector. 11/8/23, 11/18/23
 */
const chatgpt_api_url = 'https://api.openai.com/v1/chat/completions';
const prompt_form = document.querySelector('#prompt-form'), $prompt_input = $("#id_prompt");
const prompt_input = document.querySelector('#id_prompt');
const chatLog = document.querySelector('.chat-log');
var iconStr;

$(function(){
    /* NOTE: $(function()) is the jQuery ready function, equivalent to addEventListener("DOMContentLoaded").
       Trick #1: unbind click event from id_prompt! User can click id_prompt box and nothing happens yet.
     */
    $prompt_input.unbind("click");
});

prompt_form.addEventListener('submit', e => {
    /* STOP PAGE REFRESH: preventDefault() !!! This app's JavaScript approach to use of ChatGPT API requires that page
       refresh be suppressed, OR USER NEVER SEES THE RESPONSE (message reply from AI).
       TRICK A: preventDefault() does NOT suppress Django from receiving the GET request!
       TRICK B: preventDefault() shuts down page refresh so that AI response (message) can be seen.
       ------------------------------------------------------------------------------------------------------------
       TRICK C: prompt_form.disabled = false/true. Form is disabled/enabled right before/after ChatGPT API call.
       This is for stability, reduce API errors and allows each message to be shown under its respective prompt.
     */
    e.preventDefault();  // (TRICKS A,B)
    let prompt_value = prompt_input.value;

    // Trick #2: Effectively "rebind" the id_prompt click event SO THAT YOU CAN FORCE A CLICK EVENT.
    $prompt_input.on("click", function(){
        $.ajax({
            /* I don't believe I have ever used type "GET" for the jQuery ajax(). BUT I need to avoid error 403 problems,
               and I only need to "get" the OpenAI ChatGPT API key and assign to a LOCAL(!) javascipt variable. So using
               type "POST" is (luckily) unnecessary. 11/5/23
             */
            type: "GET",  // Not POST! Much less common in my code work. 11/8/23
            url: '/chatgpt_api_js/test1/',
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
                    prompt_form.disabled = true;   // Disable form (TRICK C), use disabled attrb, not bootstrap disabled class
                    createMessageInstance(prompt_value);
                    askChatGPT(api_key, prompt_value);
                    prompt_input.value = '';  // Reset prompt back to blank
                    $prompt_input.unbind("click");  // Unbind click event again! (Trick #1)
                    prompt_form.disabled = false;   // Enable form again
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

function askChatGPT(api_key, prompt_value){
    /* Ping the API and get a response with fetch(). Since fetch() is promise-based, we use .then() to format the
       response message, and then call

    use promise .then() to format and update ChatGPT message. 11/8/23
       IMPORTANT: api_key is still a LOCAL javascript variable! Still hides api key from bad guys. 11/8/23
       ------------------------------------------------------------------------------------------------------------
       OPENAI DOCS FOR CHATGPT:
       -- openai.com (may need to login, browse back to openai.com)
       -- API | Docs (menu)
       -- API reference (tab)
       -- ENDPOINTS | Chat (side bar)
       -- Create chat completion ... etc.
     */
    fetch(chatgpt_api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${api_key}`
        },
        body: JSON.stringify({ // convert to json string
            model: 'gpt-3.5-turbo',  // gpt-3.5-turbo deprecated 2024+
            messages: [
                {
                    role: 'user',
                    content: prompt_value
                }
            ],
            max_tokens: 200,  // How long of response from AI (from ChatGPT API)
        })
    })  /* fetch() is promised-based, we "chain-on" 2 .then() methods.
           Note per fetch() documentation:
              res = response: The response of fetch() (either spelling res/response)
              data = data obj: The data obj returned by fetch()
        */
    .then(res => res.json())  // convert response back into json format (a json obj)
    .then(data => updateMessage(data))  // data "message" obj contains response message--update our UI
}

function updateMessage(message){
    /* TRICK: You can study structure of response w/ console.log(message):
       Object | choices Array: 1st index = object "message", content prop of this obj holds response.
    */
    // ************* Study the data "message" obj *****************************************
    // console.log(message);  // *** Excellent study of data "message" object returned by OpenAI ChatGPT API ***
    // ************************************************************************************

    const p = document.querySelector('.thinking');

    // noinspection JSUnresolvedVariable
    p.textContent = message.choices[0].message.content;
    p.classList.remove('thinking');
    // // handleScroll();  // Unnecessary? Removed 11/18/23
}

function createMessageInstance(prompt_value){
    /* ADD ON to inner html of our chatlog container.
       THIS IS SOMETHING GOOD ABOUT "PURE" JAVASCRIPT: Never any page loads, so "+=" trick works.
       In video, he renames local var from 'value' to 'prompt'...
     */
    // noinspection HtmlUnknownTarget
    chatLog.innerHTML +=
        `<div class="message-instance-container">
            <div class="message user-message">
                <div class="content">
                    <div class="message-image"></div>
                    <p>${prompt_value}</p>
                </div>
            </div>
            <div class="message ai-message">
                <div class="content">
                    <div class="message-image">
                        <img src="${iconStr}" alt="">
                    </div>
                    <p class="thinking">Thinking</p>
                </div>
            </div>
         </div>`;
}

// // // Unnecessary? (Used in video) 11/18/23
// // function handleScroll(){
// //    // Scrolls the chatlog to the bottom
// //    chatLog.scrollTop = chatLog.scrollHeight;
// //}
