/* DANGER: Do not assign api key to a GLOBAL VARIABLE! Js global vars easily read in browser inspector! 11/5/23 */
const url = 'https://api.openai.com/v1/chat/completions';

const form = document.querySelector('#prompt-form');
const promptInput = document.querySelector('#id_prompt');
const chatLog = document.querySelector('.chat-log');
var value;    // Must be global variable for my logic.

form.addEventListener('submit', e => {
    // Prevent prompt-form from submitting anything (stop page refresh).
    e.preventDefault();
    value = promptInput.value;  // Global var ######## needed?
    if (value !== ''){
        createMessageInstance();
        askChatGPT();
        handleScroll();
        promptInput.value = '';
    }
})

$("#id_prompt").on("click", function(event){
    $.ajax({
        // type: "POST",  ######### old?
        /* I don't believe I have ever used type "GET" for the jQuery ajax(). BUT I need to avoid error 403 problems,
           and I only need to "get" the OpenAI ChatGPT API key and assign to a LOCAL(!) javascipt variable. So using
           type "POST" is (luckily) unnecessary. 11/5/23 */
        type: "GET",  // ############# test?
        url: '/chatgpt_api_js/test1/',
        dataType: "json",
        data: {},
    })  // ajax()
    .done(function(data){
        if (typeof (data['chatgpt_api_key']) !== "undefined"){
            /* HERE! Assign api key to a LOCAL javascript variable. This is the best security I can provide, but it
               still may not be enough? Picking off GLOBAL JS VARS is EASY in a browser inspector, but I suspect there
               are sophisticated tools that can read LOCAL vs vars too? Hopefully not, BUT THIS IS ANOTHER GOOD REASON
               TO USE PYTHON openai MODULE/PIP INSTEAD OF A "PURE" JAVASCRIPT SOLUTION. 11/5/23 */
            let api = data['chatgpt_api_key'];

        }
    });  // .done()
});

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
                    <img src="{% static 'img/icon/chatgpt-icon-150x150.png' %}{{ QM }}{{ VERSION_CACHE_BUST }}" alt="">
                </div>
                <p class="thinking">Thinking</p>
            </div>
        </div>
    </div>    
    `
}
function askChatGPT(){}

// Scrolls the chatlog to the bottom
function handleScroll(){
    chatLog.scrollTop = chatLog.scrollHeight;
}
