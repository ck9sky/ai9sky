
$("#prompt").on("click", function(event){
    $.get("/user-accounts/refresh-session-key-browser-ajax/", function (data){
        if (JSON.stringify(data)!=='{}'){
            if (typeof(data['chatgpt_api_key'])!=="undefined" && data['chatgpt_api_key']!==''){
                // DANGER: api must be a local variable to prevent security hole!
                let api = data['chatgpt_api_key']; // From Django

                alert(`api = ${api}`);   // ################## test, remove !!!

            }  // if (typeof(data['chatgpt_api_key']...)
        }
    });  // $.get()
});
