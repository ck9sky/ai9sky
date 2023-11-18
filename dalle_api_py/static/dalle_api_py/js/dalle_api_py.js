// noinspection ES6ConvertVarToLetConst,LocalVariableNamingConventionJS
//
/* NOTE: Unlike app 'chaptgpt_api_js', this app uses Python openai library. Thus we probably can avoid the
   complications of securely "sending" the api key to Javascript (local variable, etc.)  11/11/23
 */
const prompt_form = document.querySelector('#prompt-form');
const prompt_input = document.querySelector('#id_prompt'), $prompt_input = $("#id_prompt");;
const recents = document.querySelector('section.recents');
const recentsUL = recents.querySelector('ul');
const main = document.querySelector('main');
const recentImages = [];
var prompt_value, img_url; /* App 'dalle_api_py' requires prompt/image_url to be global JavaScript variables so we
can use template (chatgpt_api_py.html) to obtain their values from context variables returned by Django framework.
11/18/23 */

$(function(){
    /* NOTE: $(function()) is the jQuery ready function, equivalent to addEventListener("DOMContentLoaded").
     */
});

// // ################## unnecessary? remove!
// (function(){
//     /* Runs once on page load. This runs faster than calling in ready function (runs immediately when page
//        starts to load, no waiting) */
//     handleImage();
// })();

prompt_form.addEventListener('submit', () => {
    /* Best I can do with using database. Each prompt/message overwrites the previous prompt/message,
       does not look good (the app 'chatgpt_api_j' can do it, I think because it never "submits" form
       to backend server. 11/11/23
     */
    let prompt_value = prompt_input.value;
    if (prompt_value !== "") {
        handleImage();   // ############### DEBUG, TEMP REMOVAL
    }
})

function handleImage(){
    /* Replace innerHTML of main tag with the image. Changing opacity of prompt_form 0/1 is like hide/show, but it
       seems smoother than css display none/block. 11/17/23
     */

    // console.log(`handleImage() ...`);  // ############### test
    alert(`handleImage() ...`);  // ############### test

    prompt_form.style.opacity = 1.0;
    main.style.display = 'block';
    main.innerHTML =
        `<p><span>${prompt_value}</span></p>
         <img src="${img_url}" alt="Generated image of ${prompt_value}">`;

    prompt_input.value = '';  // Reset prompt back to blank
    prompt_form.classList.remove('disabled');  // Allow form to send another image request
    $prompt_input.unbind("click");              // Unbind click event again! (Trick #1)
    // // handleScroll();  // Unnecessary? Not used. 11/18/23
    handleRecents(img_url, prompt_value);

    // // // ------------------------------------------------------------------------------------------------
    // // // During debug, I found this jquery also worked, but above innerHTML logic much simpler. 11/17/23
    // // $(main).remove();
    // // $(`<main style="display: block;">
    // //        <p><span>${pval}</span></p>
    // //        <img src="${img}" alt="Generated image of ${pval}">
    // //    </main>`).insertAfter(".recents");
}

function handleRecents(img_url, prompt_value){
    /* Recents section: Save user's latest image to RECENTS array. We will show the user a <ul> list of their most
       "recent" images (thumb sized), <ul> left-to-right, the leftmost is most recent. User can click one of the
       thumb sized images and it opens in a new browser tab (target=_blank). 11/17/23
     */
    recents.style.display = 'block';  // Default of recents is hidden, here make visible (display 'block')
    recentImages.reverse();           // Before push, reverse array, newest will be first (after 2nd reverse below)
    recentImages.push({IMG_URL: img_url, PROMPT_VALUE: prompt_value});  // Store each image/prompt pair for RECENTs
    recentsUL.innerHTML = "";
    recentImages.reverse().forEach(RECENT => {
       recentsUL.innerHTML +=
            `<li>
                 <a href="${RECENT.IMG_URL}" target="_blank" title="${RECENT.PROMPT_VALUE}">
                     <img src="${RECENT.IMG_URL}" alt="Generated image for ${RECENT.PROMPT_VALUE}">
                 </a>
             </li>`;
    });

}

function handleError(message){
    main.style.display = 'block';
    main.innerHTML = `<p class="error">There was an error with your request: <br><span>${message}</span></p>`;
}