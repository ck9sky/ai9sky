// noinspection ES6ConvertVarToLetConst,LocalVariableNamingConventionJS
//
/* NOTE: Unlike app 'chaptgpt_api_js', this app uses Python openai library. Thus we probably can avoid the
   complications of securely "sending" the api key to Javascript (local variable, etc.)  11/11/23
 */
const prompt_form = document.querySelector('#prompt-form');  // ############ don't use "document." NO NO NO
const prompt_input = document.querySelector('#id_prompt');
var chatLog = document.querySelector('.chat-log');  // ######### no ?! "document." needed here?
var prompt, message;

$(function(){
    /* NOTE: $(function()) is the jQuery ready function, equivalent to addEventListener("DOMContentLoaded").
     */
});

(function(){
    // This runs faster than calling in ready function / $(function)...
    createMessageInstance();
})();

// addEventListener('load',(event) => {
// });


function createMessageInstance(){
    /* Replace inner html of our chatlog container
       In video, he renames local var from 'value' to 'prompt'...
       noinspection HtmlUnknownTarget
     */
    chatLog.innerHTML +=
    `
    <div class="message-instance-container">
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
    </div>    
    `
}


prompt_form.addEventListener('submit', e => {

    prompt_value = prompt_input.value;
    // if (prompt_value !== "" && !fresh_page) {  // ####### var fresh_page not needed? ##########
    if (prompt_value !== "") {
        createMessageInstance();
    }

})