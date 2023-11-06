api = undefined;


$("#prompt").on("click", function(event){
    $.get("/chatgpt_api_js/test1redirect/", function (data){
        if (JSON.stringify(data)!=='{}'){
            if (typeof(data['chatgpt_api_key'])!=="undefined" && data['chatgpt_api_key']!==''){
                // DANGER: api must be a local variable to prevent security hole!
                api = data['chatgpt_api_key']; // From Django

                alert(`api = ${api}`);   // ################## test, remove !!!

            }  // if (typeof(data['chatgpt_api_key']...)
        }
    });  // $.get()
});
