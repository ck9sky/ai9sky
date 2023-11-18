// noinspection ES6ConvertVarToLetConst,LocalVariableNamingConventionJS
//
/* NOTE: Unlike app 'chaptgpt_api_js', this app uses Python openai library. Thus we probably can avoid the
   complications of securely "sending" the api key to Javascript (local variable, etc.)  11/11/23
 */

const dalle_api_url = 'https://api.openai.com/v1/images/generations';
const prompt_form = document.querySelector('#prompt-form'), $prompt_input = $("#id_prompt");
const prompt_input = document.querySelector('#id_prompt');
const recents = document.querySelector('section.recents');
const recentsUL = recents.querySelector('ul');
const main = document.querySelector('main');
const recentImages = [];
var iconStr;
var prompt, image_url;

$(function(){
    /* NOTE: $(function()) is the jQuery ready function, equivalent to addEventListener("DOMContentLoaded").
     */
});

(function(){
    /* Runs once on page load. This runs faster than calling in ready function (runs immediately when page
       starts to load, no waiting) */
    createMessageInstance();
})();

prompt_form.addEventListener('submit', () => {
    /* Best I can do with using database. Each prompt/message overwrites the previous prompt/message,
       does not look good (the app 'chatgpt_api_j' can do it, I think because it never "submits" form
       to backend server. 11/11/23
     */
    let prompt_value = prompt_input.value;
    if (prompt_value !== "") {
        createMessageInstance();
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
