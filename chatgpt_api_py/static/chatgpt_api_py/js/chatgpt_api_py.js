// noinspection ES6ConvertVarToLetConst,LocalVariableNamingConventionJS
//
/* NOTE: Unlike app 'chaptgpt_api_js', this app uses Python openai library. Thus we probably can avoid the
   complications of securely "sending" the api key to Javascript (local variable, etc.)  11/11/23
 */
const prompt_form = document.querySelector('#prompt-form');
const prompt_input = document.querySelector('#id_prompt');
const chatLog = document.querySelector('.chat-log');


$(function(){
    /* NOTE: $(function()) is the jQuery ready function, equivalent to addEventListener("DOMContentLoaded").
     */
    createMessageInstance();
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
                <p>{{ prompt }}</p>
            </div>
        </div>
        <div class="message ai-message">
            <div class="content">
                <div class="message-image">
                    <img src="${iconStr}" alt="">
                </div>
                <p class="thinking">{{ message }}</p>
            </div>
        </div>
    </div>    
    `
}


prompt_form.addEventListener('submit', e => {

    prompt_value = prompt_input.value;
    if (prompt_value !== "") {
        createMessageInstance();
    }

})