/* DANGER: Do not assign api key to a GLOBAL VARIABLE! Js global vars easily read in browser inspector! 11/5/23 */
const url = 'https://api.openai.com/v1/chat/completions';

const form = document.querySelector('#prompt-form');
const promptInput = document.querySelector('#id_prompt');
const chatLog = document.querySelector('.chat-log');
var iconStr;
var value;    // Must be global variable for my logic.

$(function(){
   $("#id_prompt").unbind("click");
});

form.addEventListener('submit', e => {
    // Prevent prompt-form from submitting anything (stop page refresh).
    e.preventDefault();
    value = promptInput.value;  // Global var ######## needed?

    console.log(`value: ${value}`);  // ############################# 11/5/23

    $("#id_prompt").on("click", function(e){

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
                console.log(`api: ${api}\nvalue: ${value}`);  // ########### test

                if (value !== '') {
                    createMessageInstance();
                    askChatGPT(api);
                    handleScroll();
                    promptInput.value = '';
                }
            }
        });  // .done()
    });
    $("#id_prompt").click();

    // // ########## no, not here (deviate from video) ######
    // if (value !== ''){
    //     createMessageInstance();
    //     askChatGPT();
    //     handleScroll();
    //     promptInput.value = '';
    // }
    // // ########## no, not here (deviate from video) ######
})

// $("#id_prompt").on("click", function(e){
// // $("#id_prompt").on("submit", function(e){
//
//     // https://stackoverflow.com/questions/5651933/what-is-the-opposite-of-evt-preventdefault
//     // form.unbind('submit');  // ########### ???
//     // $(this).submit();
//
//     // // Prevent hidden-form from submitting anything (stop page refresh).
//     // e.preventDefault();   // ############ ??
//     // e.stopPropagation();  // ###########??
//
//     $.ajax({
//         // type: "POST",  ######### old?
//         /* I don't believe I have ever used type "GET" for the jQuery ajax(). BUT I need to avoid error 403 problems,
//            and I only need to "get" the OpenAI ChatGPT API key and assign to a LOCAL(!) javascipt variable. So using
//            type "POST" is (luckily) unnecessary. 11/5/23 */
//         type: "GET",  // ############# test?
//         url: '/chatgpt_api_js/test1/',
//         dataType: "json",
//         data: {},
//     })  // ajax()
//     .done(function(data){
//         if (typeof (data['chatgpt_api_key']) !== "undefined"){
//             /* HERE! Assign api key to a LOCAL javascript variable. This is the best security I can provide, but it
//                still may not be enough? Picking off GLOBAL JS VARS is EASY in a browser inspector, but I suspect there
//                are sophisticated tools that can read LOCAL vs vars too? Hopefully not, BUT THIS IS ANOTHER GOOD REASON
//                TO USE PYTHON openai MODULE/PIP INSTEAD OF A "PURE" JAVASCRIPT SOLUTION. 11/5/23 */
//
//             let api = data['chatgpt_api_key'];
//             console.log(`api: ${api}\nvalue: ${value}`);  // ########### test
//
//             if (value !== '') {
//
//
//                 createMessageInstance();
//                 askChatGPT(api);
//                 handleScroll();
//                 promptInput.value = '';
//             }
//         }
//     });  // .done()
// });

function askChatGPT(api){
    // Ping the API and get a response
    // fetch() is promised-based, so we can chain a dot-then method on this...

    // https://openai.com/blog/gpt-4-api-general-availability
    // https://www.reddit.com/r/ChatGPTCoding/comments/11wq2mq/chatgpt_35_turbo_is_still_available_if_you_have/?rdt=55962

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
    // // The data we get back from our response
    const p = document.querySelector('.thinking');
    console.log(message);
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
