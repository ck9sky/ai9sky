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

/* NOTE: $(function()) is the jQuery ready function, equivalent to addEventListener("DOMContentLoaded"). */
/* $(function(){}); */

(function(){
    /* PLEASE DO NOT "INITIALIZE" (CALL) handleImage() IN $(function(){}). We want "SIAF" (function(){})()
       to call it even before page load is completed! Calling in SIAF is faster for user. 11/18/23
    */
    handleImage();
})();

prompt_form.addEventListener('submit', () => {
    /* DANGER: To use Python openai Library in Django code, DO NOT use preventDefault(). We need the form submission to
       fully complete, the Django template to receive its "refreshed" prompt_value and message context variables.
       ----------------------------------------------------------------------------------------------------------------
       OF COURSE not using preventDefault() IS THE REASON why this app is unable to show previous images of user's
       prompts/image replies. IT WOULD TAKE more Django/Python logic for this app (dalle_api_py) to replicate what
       dalle_api_js is able to do. 11/18/23
       ------------------------------------------------------------------------------------------------------------
       TRICK (dalle_api_py ONLY: prompt_form.disabled = false/true. Form is disabled/enabled right before/after DALLE
       API call. This is for stability, reduce API errors (and maybe would have allowed multiple images to be matched
       to their prompts, but as of Nov 2023 this app only shows most recent image/prompt,
       i.e. preventDefault() not used in this app). 11/18/23
     */
    let prompt_value = prompt_input.value;
    if (prompt_value !== "") {
        handleImage();
    }
})

// // document.querySelector('#id_prompt_btn').addEventListener('click', function (e) {
// //     /* THIS DOES NOT WORK CORRECTLY. A "GENERATING IMAGE" MESSAGE NEVER DISPLAYS.
// //        An aside: implicit form submission for prompt_input means when user hits Enter, this click event also fires. */
// //     if (prompt_value !=="" && img_url !== "") {
// //         main.style.display = 'block';
// //         main.innerHTML = `<p>Generating image for <span>${prompt_value}</span>...</p>`;
// //     }
// // });

function handleImage(){
    /* Replace innerHTML of main tag with the image. Changing opacity of prompt_form 0/1 is like hide/show, but it
       seems smoother than css display none/block. 11/17/23
     */
    if (img_url !== "") {
        /* Echo prompt back by adding html to main element */
        prompt_form.style.opacity = 1.0;
        prompt_form.classList.add('disabled');  // Add bootstrap class .disabled (form original Treehouse video)
        /* Add css display 'block' to main element so it's no longer hidden (w/ display none). */
        main.style.display = 'block';
        main.innerHTML =
            `<p><span>${prompt_value}</span></p>
            <img src="${img_url}" alt="Generated image of ${prompt_value}">`;
        handleRecents(img_url, prompt_value);
        prompt_form.classList.remove('disabled');  // Allow form to send another image request
    }
    else {
        /* Seen on page load (AT LEAST on very first page load, but previous image gets "cached" somehow? */
        main.style.display = 'block';
        main.innerHTML =
            `<p>Let's generate an AI image!</p>`;

    }
    // // // During debug, I found this jquery also worked, but above innerHTML logic much simpler. 11/17/23
    // // $(main).remove();
    // // $(`<main style="display: block;">
    // //        <p><span>${prompt_value}</span></p>
    // //        <img src="${img_url}" alt="Generated image of ${prompt_value}">
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
