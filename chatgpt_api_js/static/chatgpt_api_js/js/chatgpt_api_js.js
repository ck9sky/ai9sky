
$("#id_btn").on("click", function(event){
    $.get("/user-accounts/refresh-session-key-browser-ajax/", function (data){
        if (JSON.stringify(data)!=='{}'){
            if (typeof(data['chatgpt_api_key'])!=="undefined" && data['chatgpt_api_key']!==''){
                // DANGER: api must be a local variable to prevent security hole!
                let api = data['session_key_now']; // From Django



            }  // if (typeof(data['session_key_now']...)
        }
    });  // $.get()
});