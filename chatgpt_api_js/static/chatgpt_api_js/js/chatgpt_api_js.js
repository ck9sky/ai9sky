// noinspection ES6ConvertVarToLetConst
//
/* DANGER: Do not assign api key to a GLOBAL VARIABLE! Js global vars easily read in browser inspector! 11/5/23
 */
const url = 'https://api.openai.com/v1/chat/completions';
const prompt_form = document.querySelector('#prompt-form');
const promptInput = document.querySelector('#id_prompt');
const chatLog = document.querySelector('.chat-log');
var iconStr, value; // Must be global variable for my logic.

$(function(){
    /* Trick #1: unbind click event from id_prompt! User can click id_prompt box and nothing happens yet.
     */
    $("#id_prompt").unbind("click");
});

prompt_form.addEventListener('submit', e => {
    // Prevent prompt_form from submitting anything (stop page refresh w/ so user can see results!).
    e.preventDefault();
    value = promptInput.value;  // Global var ######## needed?
    // noinspection LocalVariableNamingConventionJS
    let $id_prompt = $("#id_prompt");
    // Trick #2: Effectively "rebind" the id_prompt click event SO THAT YOU CAN FORCE A CLICK EVENT.
    $id_prompt.on("click", function(){
        $.ajax({
            /* I don't believe I have ever used type "GET" for the jQuery ajax(). BUT I need to avoid error 403 problems,
               and I only need to "get" the OpenAI ChatGPT API key and assign to a LOCAL(!) javascipt variable. So using
               type "POST" is (luckily) unnecessary. 11/5/23
             */
            type: "GET",  // ############# test?
            url: '/chatgpt_api_js/test1/',
            dataType: "json",
            data: {},
        })  // ajax()
        .done(function(data){
            if (typeof (data['chatgpt_api_key']) !== "undefined"){
                /* HERE! Assign api key to a LOCAL javascript variable!!! This is the best security I can provide, but
                   it still may not be enough? Picking off GLOBAL JS VARS is EASY in a browser inspector, but I suspect
                   there are sophisticated tools that can read LOCAL vs vars too? Hopefully not, BUT THIS IS ANOTHER
                   GOOD REASON TO USE PYTHON openai MODULE/PIP INSTEAD OF A "PURE" JAVASCRIPT SOLUTION. 11/5/23
                 */
                let api = data['chatgpt_api_key'];
                if (value !== '') {
                    createMessageInstance();
                    askChatGPT(api);
                    handleScroll();
                    promptInput.value = '';
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

function askChatGPT(api){
    // Ping the API and get a response with fetch(), use promise .then() to format and update ChatGPT message. 11/8/23
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${api}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: value
                }
            ],
            max_tokens: 200,
        })
    })
    .then(res => res.json())
    .then(data => updateMessage(data))
}

function updateMessage(message){
    /* TRICK: You can study structure of response w/ console.log(message):
       Object | choices Array: 1st index = object "message", content prop of this obj holds response.
    */
    const p = document.querySelector('.thinking');
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
                <p>${value}</p>
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
