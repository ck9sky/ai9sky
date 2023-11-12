// noinspection ES6ConvertVarToLetConst,LocalVariableNamingConventionJS
//
/* DANGER: api_key MUST BE a LOCAL VAR, NOT A GLOBAL VAR !!! A global var is easy to see in a browser!
   This is a very IMPORTANT security feature.  11/8/23
 */
const chatgpt_api_url = 'https://api.openai.com/v1/chat/completions';

const prompt_form = document.querySelector('#prompt-form');  // ######### must use "document." here?
const prompt_input = document.querySelector('#id_prompt');
const chatLog = document.querySelector('.chat-log');

// const prompt_form = querySelector('#prompt-form');  // ########### no no no
// const prompt_input = querySelector('#id_prompt');  // ########### no no no
// const chatLog = querySelector('.chat-log');  // ########### no no no

var iconStr, prompt_value, $id_prompt; // Must be global variable for my logic.

$(function(){
    /* NOTE: $(function()) is the jQuery ready function, equivalent to addEventListener("DOMContentLoaded").
       Trick #1: unbind click event from id_prompt! User can click id_prompt box and nothing happens yet.
     */
    $id_prompt = $("#id_prompt");
    $id_prompt.unbind("click");
});

prompt_form.addEventListener('submit', e => {
    // Prevent prompt_form from submitting anything (stop page refresh w/ so user can see results!).
    e.preventDefault();
    prompt_value = prompt_input.value;

    // Trick #2: Effectively "rebind" the id_prompt click event SO THAT YOU CAN FORCE A CLICK EVENT.
    $id_prompt.on("click", function(){
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
                    createMessageInstance();
                    askChatGPT(api_key);
                    handleScroll();
                    prompt_input.value = '';  // Reset prompt back to blank
                    $id_prompt.unbind("click");  // Unbind click event again! (Trick #1)
                }
            }
        });  // .done()
    });
    /* Trick #3: Force a click event on id_prompt: THIS ALLOWS ABOVE CLICK EVENT TO RUN SUCH THAT API AND THE PROMPT
       ARE AVAILABLE AND READY TO SEND TO API. Yes, this is not professional code practice. I just want to learn how
        Django can implement "pure" js solution and STILL hide the api key. 11/25/23
     */
    $id_prompt.click();
})

function askChatGPT(api_key){
    /* Ping the API and get a response with fetch(). Since fetch() is promise-based, we use .then() to format the
       response message, and then call

    use promise .then() to format and update ChatGPT message. 11/8/23
       IMPORTANT: api_key is still a LOCAL javascript variable! Still hides api key from bad guys. 11/8/23
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
    })
    /* res and data and variables returned by fetch()
       res = response of fetch()
       data = data obj returned by fetch()
     */
    .then(res => res.json())  // convert response back into json format
    .then(data => updateMessage(data))  // data "message" obj contains response message--update our UI
}

function updateMessage(message){
    /* TRICK: You can study structure of response w/ console.log(message):
       Object | choices Array: 1st index = object "message", content prop of this obj holds response.
    */
    // ************* Study the data "message" obj *****************************************
    // console.log(message);  // *** Excellent study of data "message" object returned by OpenAI ChatGPT API ***
    // ************************************************************************************

    const p = document.querySelector('.thinking');  // ########## must use "document." here?
    // const p = querySelector('.thinking');  // ######### no no no

    // noinspection JSUnresolvedVariable
    p.textContent = message.choices[0].message.content;
    p.classList.remove('thinking');
    handleScroll();
}

function createMessageInstance(){
    // Replace inner html of our chatlog container
    // In video, he renames local var from 'value' to 'prompt'...
    // noinspection HtmlUnknownTarget
    chatLog.innerHTML +=
    `
    <div class="message-instance-container">
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
    </div>    
    `
}

// Scrolls the chatlog to the bottom
function handleScroll(){
    chatLog.scrollTop = chatLog.scrollHeight;
}
