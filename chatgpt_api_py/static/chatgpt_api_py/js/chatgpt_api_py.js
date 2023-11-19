// noinspection ES6ConvertVarToLetConst,LocalVariableNamingConventionJS
//
/* NOTE: Unlike app 'chaptgpt_api_js', this app uses Python openai library. Thus we probably can avoid the
   complications of securely "sending" the api key to Javascript (local variable, etc.)  11/11/23
 */
const prompt_form = document.querySelector('#prompt-form');
const prompt_input = document.querySelector('#id_prompt');
var chatLog = document.querySelector('.chat-log');
var prompt, message; /* App 'chatgpt_api_py' requires prompt/message to be global JavaScript variables so we can use
template (chatgpt_api_py.html) to obtain their values from context variables returned by Django framework. 11/18/23 */

/* NOTE: $(function()) is the jQuery ready function, equivalent to addEventListener("DOMContentLoaded"). */
/* $(function(){}); */

(function(){
    /* PLEASE DO NOT "INITIALIZE" (CALL) createMessageInstance() IN $(function(){}). We want "SIAF" (function(){})()
       to call it even before page load is completed! Calling in SIAF is faster for user. 11/18/23
    */
    createMessageInstance();
})();

prompt_form.addEventListener('submit', () => {
    /* DANGER: To use Python openai Library in Django code, DO NOT use preventDefault(). We need the form submission to
       fully complete, the Django template to receive its "refreshed" prompt_value and message context variables. ############## new comment

    Best I can do with using database. Each prompt/message overwrites the previous prompt/image request,
       does not look good (the app 'dalle_api_j' can do it, I think because it never "submits" form
       to backend server. 11/18/23
     */
    let prompt_value = prompt_input.value;
    if (prompt_value !== "") {
        prompt_form.disabled = true;   // Disable form    ################# NEW
        createMessageInstance();
        prompt_form.disabled = false;   // Enable form again    ################# NEW
    }
})

function createMessageInstance(){
    /* Replace inner html of our chatlog container--THE "ADD ON" TRICK "+=" DOES NOT WORK (due to page loads).
       Unlike app 'chatgpt_api_js', this app currently has problem with "+=" such that I cannot create a running
       chatlog--instead, for now, we just replace the old prompt/message with the latest prompt/message. 11/11/23
     */
 // chatLog.innerHTML +=   // ************ What I want to do... 11/11/23
    chatLog.innerHTML =    // ************ What my Django app is stuck with for the moment. 11/11/23
        `<div class="message-instance-container">
            <div class="message user-message">
                <div class="content">
                    <div class="message-image"></div>
                    <p>${prompt}</p>
                </div>
            </div>
            <div class="message ai-message">
                <div class="content">
                    <div class="message-image">
                        <img src="${iconStr}" alt="">
                    </div>
                    <p>${message}</p>
                </div>
            </div>
         </div>`;
}
