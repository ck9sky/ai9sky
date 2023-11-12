


$("#id_chatgpt-api-py-app-btn").on("click", function(){
    $.ajax({
        /*
         */
        type: "GET",  // Not POST! Much less common in my code work. 11/11/23
        url: '/chatgpt_api_js/test1/',
        dataType: "json",
        data: {},
    })  // ajax()

});