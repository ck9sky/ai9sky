


$("#id_prompt").on("click", function(event){

    alert("Clicked #id_prompt");  // ######### tewst

    $.ajax({
        // type: "POST",  ######### old?
        type: "GET",  // ############# test?
        url: '/chatgpt_api_js/test1/',
        dataType: "json",
        data: {},
    })  // ajax()
    .done(function(data){
        alert("done");  // ############## test
        if (typeof (data['chatgpt_api_key']) !== "undefined"){
            let api = data['chatgpt_api_key'];
            alert(`api = ${api}`);
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
