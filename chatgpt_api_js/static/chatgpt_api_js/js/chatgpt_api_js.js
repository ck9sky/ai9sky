

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






// ############### NOT GOOD SOLUTION 11/5/23 ###################################################
// $("#prompt").on("click", function(event){
//     if (typeof(api)==="undefined") {
//         $.get("/chatgpt_api_js/test1redirect/", function (data) {
//             if (JSON.stringify(data) !== '{}') {
//                 if (typeof (data['chatgpt_api_key']) !== "undefined" && data['chatgpt_api_key'] !== '') {
//                     // DANGER: api must be a local variable to prevent security hole!
//                     api = data['chatgpt_api_key']; // From Django
//
//                     alert(`api = ${api}`);   // ################## test, remove !!!
//
//                 }  // if (typeof(data['chatgpt_api_key']...)
//             }
//         });  // $.get()
//     }
// });
// ############### NOT GOOD SOLUTION 11/5/23 ###################################################
