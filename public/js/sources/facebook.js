// $("#clearBTN").on("click", function() {});

$(document).ready(function(){
    $('#facebook_person_table').DataTable( {
        "paging": true,
        "dataSrc": "Data",
        "pageLength": 10,
        "processing": true,
        "pagingType":'full_numbers',
        "serverSide": true,
        "stateSave": true,
        fixedHeader: true,
        responsive: true,
        lengthChange: false,
      //  "order": [[ 3, "desc" ]], //order by column number statrting from zero 
        //scrollY: 400,
        
        select: true,
        "autoWidth": true,
        "select": true,
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print','colvis'
        ],
        'ajax': {
            'type': 'POST',
            'url': 'http://localhost:3001/sources/add/facebook/populateFacebookPersonTargets'
        },
        'columns':
            [
                { 'data': '', "defaultContent": "", '': '' },
            { 'data': 'author_type', "defaultContent": "", 'name': 'Author Type' },
            { 'data': 'author_id', "defaultContent": "", 'name': 'Author ID' },
            { 'data': 'author_name', "defaultContent": "", 'name': 'Author Name' },
            { 'data': 'author_account', "defaultContent": "", 'name': 'Author Account' },
            { 'data': 'author_url', "defaultContent": "", 'name': 'Author URL' },
            { 'data': 'expired_on', "defaultContent": "", 'name': 'Expired On' },
            { 'data': 'need_screenshots', "defaultContent": "", 'name': 'Screenshots' },
            { 'data': 'created_at', "defaultContent": "", 'name': 'Created at' },
            { 'data': 'updated_at', "defaultContent": "", 'name': 'Updated at' }  
            ],
            // "select":[ {
            //     style: 'os',
            //     selector: 'td:first-child'
            //     },
            // ],
        

        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            defaultContent: '',
            targets:   0,
            "searchable": false,
        } ],
        
       
        select: {
            style: 'multi',
            selector: 'td:first-child'
        },
        order: [[ 1, 'asc' ]]







        
    });
});
   



// //start settings for app

$("#person_load_icon").hide();
$("#smart_search_err").hide();
$("#author_id_err").hide();
$("#author_name_err").hide();
$("#author_url_err").hide();
$("#author_account_err").hide();


$("#group_load_icon").hide();
$("#group_smart_search_err").hide();
$("#group_author_id_err").hide();
$("#group_author_name_err").hide();
$("#group_author_url_err").hide();
$("#group_author_account_err").hide();



$(document).ready(function(){
    $('#facebook_group_table').DataTable( {
        "paging": true,
        "dataSrc": "Data",
        "pageLength": 10,
        "processing": true,
        "pagingType":'full_numbers',
        "serverSide": true,
        "stateSave": true,
        fixedHeader: true,
        responsive: true,
        lengthChange: false,
      //  "order": [[ 3, "desc" ]], //order by column number statrting from zero 
        //scrollY: 400,
        
        select: true,
        "autoWidth": true,
        "select": true,
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print','colvis'
        ],
        'ajax': {
            'type': 'POST',
            'url': 'http://localhost:3001/sources/add/facebook/populateFacebookGroupTargets'
        },
        'columns':
            [
                { 'data': '', "defaultContent": "", '': '' },
            { 'data': 'author_type', "defaultContent": "", 'name': 'Author Type' },
            { 'data': 'author_id', "defaultContent": "", 'name': 'Author ID' },
            { 'data': 'author_name', "defaultContent": "", 'name': 'Author Name' },
            { 'data': 'author_account', "defaultContent": "", 'name': 'Author Account' },
            { 'data': 'author_url', "defaultContent": "", 'name': 'Author URL' },
            { 'data': 'expired_on', "defaultContent": "", 'name': 'Expired On' },
            { 'data': 'need_screenshots', "defaultContent": "", 'name': 'Screenshots' },
            { 'data': 'created_at', "defaultContent": "", 'name': 'Created at' },
            { 'data': 'updated_at', "defaultContent": "", 'name': 'Updated at' }  
            ],
            // "select":[ {
            //     style: 'os',
            //     selector: 'td:first-child'
            //     },
            // ],
        

        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            defaultContent: '',
            targets:   0,
            "searchable": false,
        } ],
        
       
        select: {
            style: 'multi',
            selector: 'td:first-child'
        },
        order: [[ 1, 'asc' ]]







        
    });
});



$("#page_load_icon").hide();
$("#page_smart_search_err").hide();
$("#page_author_id_err").hide();
$("#page_author_name_err").hide();
$("#page_author_url_err").hide();
$("#page_author_account_err").hide();

// clearForm();

// //end start settings

// //function change border coolors after submission
// function chnageBorderColorsGreen() {
//   $("#author_type").removeClass(" has-error");
//   $("#author_type").addClass("has-success");

//   $("#author_id").removeClass(" has-error");
//   $("#author_id").addClass("has-success");

//   $("#author_name").removeClass(" has-error");
//   $("#author_name").addClass("has-success");

//   $("#author_account").removeClass(" has-error");
//   $("#author_account").addClass("has-success");

//   $("#author_url").removeClass(" has-error");
//   $("#author_url").addClass("has-success");

//   $("#expired_on").removeClass(" has-error");
//   $("#expired_on").addClass("has-success");

//   $("#interval").removeClass(" has-error");
//   $("#interval").addClass("has-success");
// }

// function chnageBorderColorsRed() {
//   $("#author_type").addClass(" has-error");
//   $("#author_type").removeClass("has-success");

//   $("#author_id").addClass(" has-error");
//   $("#author_id").removeClass("has-success");

//   $("#author_name").addClass(" has-error");
//   $("#author_name").removeClass("has-success");

//   $("#author_account").addClass(" has-error");
//   $("#author_account").removeClass("has-success");

//   $("#author_url").addClass(" has-error");
//   $("#author_url").removeClass("has-success");

//   $("#expired_on").addClass(" has-error");
//   $("#expired_on").removeClass("has-success");

//   $("#interval").addClass(" has-error");
//   $("#interval").removeClass("has-success");
// }

// //end

// //form validation function
// function validateForm() {
//   let isvalid = true;
//   let author_type = $("#author_type").val();
//   let author_name = $("#author_name").val();
//   let author_id = $("#author_id").val();
//   let author_account = $("#author_account").val();
//   let author_url = $("#author_url").val();
//   let expired_on = $("#datepicker-13").val();
//   let interval = $("#interval").val();
//   let need_screenshots = $("#need_screenshots").is(":checked");

//   if (author_id == "") {
//     isvalid = false;
//     $("#author_id").removeClass("has-success");
//     $("#author_id").addClass("has-error");
//     console.log("author_id is null");
//     $("#author_id_err").show();
//     $("#author_id_err")
//       .empty()
//       .append("Author id is required ");
//     $("#author_id_err").fadeOut(5000);
//   }
//   if (author_name == "") {
//     isvalid = false;
//     $("#author_name").removeClass("has-success");
//     $("#author_name").addClass("has-error");
//     console.log("author_name is null");
//     $("#author_name_err").show();
//     $("#author_name_err")
//       .empty()
//       .append("Author name is required ");
//     $("#author_name_err").fadeOut(5000);
//   }
//   if (author_url == "") {
//     isvalid = false;
//     $("#author_url").removeClass("has-success");
//     $("#author_url").addClass("has-error");
//     console.log("author_url is null");
//     $("#author_url_err").show();
//     $("#author_url_err")
//       .empty()
//       .append("Author URL is required ");
//     $("#author_url_err").fadeOut(5000);
//   }

//   if (author_account == "") {
//     isvalid = false;
//     $("#author_account").removeClass("has-success");
//     $("#author_account").addClass("has-error");
//     console.log("author_account is null");
//     $("#author_account_err").show();
//     $("#author_account_err")
//       .empty()
//       .append("Author account is required ");
//     $("#author_account_err").fadeOut(5000);
//   }
//   if (expired_on == "") {
//     isvalid = false;
//     $("#expired_one").removeClass("has-success");
//     $("#expired_one").addClass("has-error");
//     console.log("expired_on is null");
//   }

//   return isvalid;
// }
// //end form validation fucntion

// //clear form data function code
// function clearForm() {
//   $("#author_name").val("");
//   $("#author_id").val("");
//   $("#author_account").val("");
//   $("#author_url").val("");
//   // $('#expired_on').val('01/01/2020');
//   $("#need_screenshots").prop("checked", false);
//   $("#interval").val("0");
//   $("#profile_image").attr("src", "/images/instagram_profile_avatar.jpg");
//   console.log("form cleaned ");
// }

// //clear form data
// $("#clearBTN").on("click", function() {
//   clearForm();
// });

// //end clear form data function code

// //populate table function

// function populateTable() {
//   $.get("http://127.0.0.1:3001/core/get_facebook_targets", function(data) {
//     $.each(data, function(key, value) {
//       $("#isntagram_author_table").append(
//         '<tr><th scope="row">' +
//           key +
//           '</th><th scope="row">' +
//           value.id +
//           "</th>" +
//           '</th><th scope="row">' +
//           value.global_target_reff_id +
//           '</th><th scope="row">' +
//           value.author_id +
//           '</th><th scope="row">' +
//           value.author_account +
//           '</th><th scope="row">' +
//           value.author_name +
//           '</th><th scope="row">' +
//           value.author_url +
//           '</th><th scope="row">' +
//           value.expired_on +
//           '</th><th scope="row">' +
//           value.is_enabled +
//           '</th><th scope="row">' +
//           value.is_expired +
//           '</th><th scope="row">' +
//           value.need_screenshots +
//           '</th><th scope="row">' +
//           value.created_on +
//           '</th><th scope="row">' +
//           value.periodic_interval +
//           "</th></tr>"
//       );
//     });
//   });
// }

// //end poopulate table

// $(document).ready(function() {
//   $("#is_expired").on("click", function() {
//     var status = $("#is_expired").is(":checked");
//     if (status == true) {
//       $("#is_expired_label").css("background-color", "green");
//     } else {
//       $("#is_expired_label").css("background-color", "#006390");
//     }
//   });

//   $("#need_screenshots").on("click", function() {
//     var status = $("#need_screenshots").is(":checked");
//     if (status == true) {
//       $("#need_screenshots_label").css("background-color", "green");
//     } else {
//       $("#need_screenshots_label").css("background-color", "#006390");
//     }
//   });

//   //start search code
//   $("#smart_serach").on("click", function() {
//     var author_account_name = $("#author_account").val();
//     if (author_account_name == "") {
//       console.log("author_account has no value ");
//       $("#author_account_err").show();
//       $("#author_account_err")
//         .empty()
//         .append("Author account is required ");
//       $("#author_account_err").fadeOut(5000);
//     } else {
//       console.log("smart search request made  ");
//       $("#load_icon").show();
//       $.ajax({
//         type: "GET",
//         dataType: "json",
//         url:
//           "http://127.0.0.1:3001/core/smart_search/" +
//           author_account_name +
//           "/facebook/",
//         success: function(data) {
//           console.log("smart_search_submission_data = " + data);
//           $("#author_name").val(data.profile.full_name);
//           $("#author_id").val(data.profile.id);
//           var id = $("#author_account").val();
//           $("#profile_image").attr("src", data.profile.profile_image_url);
//           var base_url = "https://www.facebook.com/" + id;
//           $("#author_url").val(base_url);
//           $("#load_icon").hide();
//           $("#smart_search_err").show();
//           $("#smart_search_err")
//             .empty()
//             .append("Smart search is Successfull ");
//           $("#smart_search_err").fadeOut(3000);
//         },

//         error: function() {
//           clearForm();
//           $("#load_icon").hide();
//           $("#smart_search_err").show();
//           $("#smart_search_err")
//             .empty()
//             .append("Smart search Failed ...try Again ");
//           $("#smart_search_err").fadeOut(3000);
//         }
//       });
//     }
//   });
//   //end smart search

//   //submit form

//   $("#submitBTN").on("click", function(e) {
//     var author_account_name = $("#author_account").val();
//     const valid = validateForm();
//     console.log(valid);
//     if (valid == false) {
//       console.log("form not validated  ");
//     } else {
//       chnageBorderColorsGreen();
//       let author_type = $("#author_type").val();
//       let author_name = $("#author_name").val();
//       let author_id = $("#author_id").val();
//       let author_account = $("#author_account").val();
//       let author_url = $("#author_url").val();
//       let expired_on = $("#datepicker-13").val();
//       let interval = $("#interval").val();
//       //   let is_expired = $('#is_expired').is(':checked')
//       let need_screenshots = $("#need_screenshots").is(":checked");

//       console.log(`author type : ${author_type} author name : ${author_name} author id : ${author_id} author account : ${author_account} author url : ${author_url}
//                   expired on : ${expired_on}  interval : ${interval}`); 
//       fetch("http://localhost:3001/sources/add/facebook_person/target/", {
//         method: "POST",
//         cache: "no-cache",
//         headers: {
//           "Content-type": "application/json"
//         },
//         body: JSON.stringify({
//           author_type: author_type,
//           name: author_name,
//           id: author_id,
//           account: author_account,
//           url: author_url,
//           expired_on: expired_on,
//           need_screenshots: need_screenshots,
//           periodic_interval: interval
//         })
//       }).then(info => {
//         console.log(info.status);
//         if (info.status == "200") {
//           clearForm();
//           populateTable();
//           $("#smart_search_err").show();
//           $("#smart_search_err")
//             .empty()
//             .append("New Facebook Author Target  Successfull Added ");
//           $("#smart_search_err").fadeOut(3000);
//         } else {
//           $("#smart_search_err").show();
//           $("#smart_search_err")
//             .empty()
//             .append("Submission Failed .....Try Again  ");
//           $("#smart_search_err").fadeOut(3000);
//         }
//       });
//     }
//   });
// });

// $(document).ready(function() {
//   $.get("http://127.0.0.1:3001/core/add_facebook_target/", function(data) {
//     var array = data.facebook_target_form.intervals;
//     //  console.log(array)
//     $.each(array, function(key, value) {
//       $("#interval").append(
//         $("<option></option>")
//           .attr("value", value[0])
//           .text(value[1])
//       );
//     });
//   });
// });

// $(document).ready(function() {
//   $.get("http://127.0.0.1:3001/core/get_facebook_targets", function(data) {
//     $.each(data, function(key, value) {
//       $("#isntagram_author_table").append(
//         '<tr><th scope="row">' +
//           key +
//           '</th><th scope="row">' +
//           value.id +
//           "</th>" +
//           '</th><th scope="row">' +
//           value.global_target_reff_id +
//           '</th><th scope="row">' +
//           value.author_id +
//           '</th><th scope="row">' +
//           value.author_account +
//           '</th><th scope="row">' +
//           value.author_name +
//           '</th><th scope="row">' +
//           value.author_url +
//           '</th><th scope="row">' +
//           value.expired_on +
//           '</th><th scope="row">' +
//           value.is_enabled +
//           '</th><th scope="row">' +
//           value.is_expired +
//           '</th><th scope="row">' +
//           value.need_screenshots +
//           '</th><th scope="row">' +
//           value.created_on +
//           '</th><th scope="row">' +
//           value.periodic_interval +
//           "</th></tr>"
//       );
//     });
//   });
// });

// var dt = new Date();
// //document.getElementById("table_last_sync").innerHTML = dt.toLocaleString();
