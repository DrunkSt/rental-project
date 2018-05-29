'use strict';
$(document).ready(function() {
    // get page name
    var PAGE_NAME = window.location.pathname.split("/").pop();

    // --------------------------------------------------------dashboard page-------------------------------------------------------
     if (PAGE_NAME === 'dashboard' || PAGE_NAME === '') {

        /*
        * Top Viewed Properties Table
        */
        $('#top-viewed-table').DataTable( {
            "paging" : true,
            "lengthChange" : false,
            "searching" : false,
            "ordering" : false,
            "info" : false,
            "autoWidth" : false,
            'dom' : 'rtip',
            "processing" : true,
            ajax: {
                url: './api/properties/top/viewed/50',
                dataSrc: ''
            },
            columns: [{ data: 'name' },
                    {
                    data : "viewed",
                    width : "20px"
                    }]
        } );


        /*
        * Top Shared Properties Table
        */
        $('#top-shared-table').DataTable( {
            "paging" : true,
            "lengthChange" : false,
            "searching" : false,
            "ordering" : false,
            "info" : false,
            "autoWidth" : false,
            'dom' : 'rtip',
            "processing" : true,
            ajax: {
                url: './api/properties/top/shared/50',
                dataSrc: ''
            },
            columns: [{ data: 'name' },
                    {
                    data : "shared",
                    width : "20px"
                    }]
        } );


        /*
        * Top Favored Properties Table
        */
        $('#top-favorited-table').DataTable( {
            "paging" : true,
            "lengthChange" : false,
            "searching" : false,
            "ordering" : false,
            "info" : false,
            "autoWidth" : false,
            'dom' : 'rtip',
            "processing" : true,
            ajax: {
                url: './api/properties/top/favorited/50',
                dataSrc: ''
            },
            columns: [{ data: 'name' },
                    {
                    data : "favorited",
                    width : "20px"
                    }]
        } );

        
    // --------------------------------------------------------Properties page-------------------------------------------------------
    } else if (PAGE_NAME === 'properties' || PAGE_NAME === '') {

        var current = 0;
        var loadMore = true;

        /*
        * Initially load 100 items
        */
        loadMoreContent(0, 100, $('#search-property').val());


        /*
        * load 20 more on scroll
        */
        $(window).scroll(function(){
            if ($(window).scrollTop() + $(window).height() >= $(document).height() - 300){
               if(loadMore)
                    loadMoreContent(current, 20, $('#search-property').val());
            }
        });


        /*
        * load more items
        */
        function loadMoreContent(pos, limit, search) {

            loadMore=false;
            console.log("loading content");
                  $.ajax({
                  url : "./api/properties/"+pos+"/"+limit+"?search="+search,
                  type : "GET",
                  processData: false,
                  contentType: false,
                  success : function(data, status) {
                    //add new items to page
                    var json = $.parseJSON(data);
                    for (var row in json) {
                        var firstImage ="./images/loading.png";
                        try
                        {
                            var image = jQuery.parseJSON( json[row].image );
                            firstImage = './uploads/'+image[0];
                        }catch(err){
                        }
                        var property = '<div data-id="'+json[row].id+'" class="open-modal item col-sm-12 col-md-4 col-lg-2">'+
                        '<img src="'+firstImage+'">'+
                        '<div class="overlay"></div>'+
                        '<h4>'+json[row].name+'</h4>'+
                        '</div>';
                         $('#property-container').append(property).fadeIn(999);
                         console.log(pos);
                    }
                    if(json.length>0)
                        loadMore=true;
                    current += limit;

                    if ( $(document).height()-300 > $('#property-container').height()){
                        if(loadMore)
                            loadMoreContent(current, 20, search);
                    }
                  },
                  error : function(jqXHR) {
                     console.log(jqXHR);
                  }
              });
        }


        /*
        * Something typed in search box
        */
        $('#search-property').keyup(function() {
            $('#property-container').html("");
             loadMore=true;
            loadMoreContent(0, 100, $(this).val());
        });


        /*
        * Get categories and create modal to edit properties
        */
        getCatagories(function(catagories){
             getPropertyEfficiencies(function(propertyefficiencies){
                 getPropertyStatus(function(propertystatues){
                     getPropertyTypes(function(propertytypes){
                        ModalMaker.init( {
                            title : "Edit Property",
                            name : "property-modal_name",
                            serverUrl: "./api/property"
                        });

                        ModalMaker.addTextInput("name", "Property Title*", "Enter your property title");
                        ModalMaker.addTextHtmlEditor("description", "Property Description", "");

                        ModalMaker.startGroup("Details");
                        ModalMaker.addSelect("status", "Status",propertystatues , 0).addClasses("col-xs-12 col-md-4");
                        ModalMaker.addSelect("type", "Type",propertytypes , 0).addClasses("col-xs-12 col-md-4");
                        ModalMaker.addSelect("energy", "Energy Rating",propertyefficiencies , 0).addClasses("col-xs-12 col-md-4");
                        ModalMaker.addNumericInput("saleprice", "Sale Price ($)*", 0, 100000000, 1, 0).addClasses("col-xs-12 col-md-6");
                        ModalMaker.addNumericInput("rentprice", "Rent Price ($)*", 0, 100000000, 1, 0).addClasses("col-xs-12 col-md-6");
                        ModalMaker.addNumericInput("bedrooms", "Bedrooms", 0, 1000, 1, 0).addClasses("col-xs-12 col-md-4");
                        ModalMaker.addNumericInput("bathrooms", "Bathrooms", 0, 1000, 1, 0).addClasses("col-xs-12 col-md-4");
                        ModalMaker.addNumericInput("rooms", "Rooms", 0, 1000, 1, 0).addClasses("col-xs-12 col-md-4");
                        ModalMaker.addNumericInput("area", "Area Size (m^2)", 0, 100000000, 1, 0).addClasses("col-xs-12 col-md-6");
                        ModalMaker.addTextInput("yearbuilt", "Date Built*", "").addClasses("col-xs-12 col-md-6");
                        ModalMaker.endGroup();

                        ModalMaker.startGroup("Location");
                        ModalMaker.addTextInput("address", "Address*", "Enter your property address");
                        ModalMaker.addTextInput("county", "County:", "Enter County").addClasses("col-xs-12 col-md-4");
                        ModalMaker.addTextInput("city", "City:", "Enter City").addClasses("col-xs-12 col-md-4");
                        ModalMaker.addTextInput("zipcode", "Postal Code / Zip", "Enter your property zip code").addClasses("col-xs-12 col-md-4");
                        ModalMaker.addLocationMap("gpslat", "gpslng", "Map Location", "Latitude", "Longitude", "./images/pin.png");
                        ModalMaker.endGroup();


                        ModalMaker.startGroup("Media");
                        ModalMaker.addImageInput("image", "Property Images (600*300)", 1);
                        ModalMaker.endGroup();

                        ModalMaker.startGroup("Category");
                        ModalMaker.addSelect("category", "(Ctrl-click to deselect item)",catagories ,true, 2);
                        ModalMaker.endGroup();

                        ModalMaker.startGroup("Agent Info");
                        ModalMaker.addTextInput("ownername", "Owner/Agent Name", "Enter owner or agent name.");
                        ModalMaker.addTextInput("tel", "Telephone", "Enter owner/agent tel/mobile number.");
                        ModalMaker.addTextInput("email", "Email", "Enter your owner/agent wmail.");
                        ModalMaker.endGroup();
                        

                        ModalMaker.renderContent($("#modal-placeholder"));
                        ModalMaker.setOpener(".open-modal");
                       
                     });
                 });
             });
        });

    // --------------------------------------------------------catagories page-------------------------------------------------------
    } else if (PAGE_NAME === 'categories' || PAGE_NAME === '') {

        /*
        * Categories table
        */
        $('#categories-table').DataTable( {
            "paging" : true,
            "lengthChange" : true,
            "searching" : true,
            "ordering" : true,
            "info" : false,
            "autoWidth" : false,
            'dom' : 'rtip',
            "processing" : true,
            ajax: {
                url: './api/categories',
                dataSrc: ''
            },
            columns: [{
                    data : "id",
                    width : "20px"
                },
                {
                    data: "image",
                    render: function(data, type, row) {
                        var firstImage ="./images/loading.png";
                        try{
                            firstImage = './uploads/'+jQuery.parseJSON( data )[0];
                        }catch(err){
                        }
                        return '<img width="120px" height="60px" src="'+firstImage+'" />';
                    },
                    width : "130px"
                },
                {
                    data: "icon",
                    render: function(data, type, row) {
                        return '<i class="fa '+data+'"></i>';
                    }
                },
                { data: 'name' },
                { data: 'description' }
            ],
            createdRow: function (row, data, index) {
                    $(row).addClass('open-modal');
                    $(row).attr("data-id", data['id']);
            }
        } );


        /*
        * search Categories table
        */
        $('#search-catagories').keyup(function() {
            $('#categories-table').DataTable().search($(this).val()).draw();
        });

        // length of users table changed
        $('#length-catagories-table').change(function() {
            $('#categories-table').DataTable().page.len($(this).val()).draw();
        });


        /*
        * Create modal to edit categories
        */
        ModalMaker.init( {
            title : "Edit Category",
            name : "category-modal_name",
            serverUrl: "./api/category"
        });
        ModalMaker.addTextInput("name", "Category Name", "eg: New Houses");
        ModalMaker.addImageInput("image", "Category Image");
        ModalMaker.addIconInput("icon", "Category Icon");
        ModalMaker.addTextAreaInput("description", "Category Description", "");
        ModalMaker.renderContent($("#modal-placeholder"));
        ModalMaker.setOpener(".open-modal");


    // --------------------------------------------------------agents page-------------------------------------------------------
    } else if (PAGE_NAME === 'agents' || PAGE_NAME === '') {
        var tag=".agents"

        /*
        * Agents table
        */
        $(tag).find('.table').DataTable( {
            "paging" : true,
            "lengthChange" : true,
            "searching" : true,
            "ordering" : true,
            "info" : false,
            "autoWidth" : false,
            'dom' : 'rtip',
            "processing" : true,
            ajax: {
                url: './api/agent',
                dataSrc: ''
            },
            columns: [{
                    data : "id",
                    width : "20px"
                },
                {
                    data: "image",
                    render: function(data, type, row) {
                         var firstImage ="./images/loading_agents.png";
                        try{
                            firstImage = './uploads/'+jQuery.parseJSON( data )[0];
                        }catch(err){
                        }
                        return '<img width="100px" height="100px" src="'+firstImage+'" />';
                    }
                },
                { data: 'name' },
                { data: 'email' }
            ],
            createdRow: function (row, data, index) {
                    $(row).addClass('open-modal');
                    $(row).attr("data-id", data['id']);
            }
        } );


        /*
        * search agent table
        */
        $(tag).find('.search').keyup(function() {
            $(tag).find('.table').DataTable().search($(this).val()).draw();
        });

        // length of users table changed
        $(tag).find('.length').change(function() {
            $(tag).find('.table').DataTable().page.len($(this).val()).draw();
        });


        /*
        * Create modal to edit agent
        */
        ModalMaker.init( {
            title : "Edit Agent",
            name : "agents-modal_name",
            serverUrl: "./api/agent"
        });
        ModalMaker.addImageInput("image", "Agent Avatar (100x100)");
        ModalMaker.addTextInput("name", "Agent Name", "eg: John Doe");
        ModalMaker.addTextInput("tel", "Telephone", "Enter owner/agent tel/mobile number.");
        ModalMaker.addTextInput("email", "Email", "Enter your owner/agent wmail.");
        ModalMaker.renderContent($("#modal-placeholder"));
        ModalMaker.setOpener(".open-modal");

        

    // --------------------------------------------------------property types page-------------------------------------------------------
    } else if (PAGE_NAME === 'propertytypes' || PAGE_NAME === '') {

        /*
        * Categories table
        */
        $('#propertytypes-table').DataTable( {
            "paging" : true,
            "lengthChange" : true,
            "searching" : true,
            "ordering" : true,
            "info" : false,
            "autoWidth" : false,
            'dom' : 'rtip',
            "processing" : true,
            ajax: {
                url: './api/propertytypes',
                dataSrc: ''
            },
            columns: [{
                    data : "id",
                    width : "20px"
                },
                { data: 'name' }
            ],
            createdRow: function (row, data, index) {
                    $(row).addClass('open-modal');
                    $(row).attr("data-id", data['id']);
            }
        } );


        /*
        * search Categories table
        */
        $('#search-propertytypes').keyup(function() {
            $('#propertytypes-table').DataTable().search($(this).val()).draw();
        });

        // length of users table changed
        $('#length-propertytypes-table').change(function() {
            $('#propertytypes-table').DataTable().page.len($(this).val()).draw();
        });


        /*
        * Create modal to edit Property Type
        */
        ModalMaker.init( {
            title : "Edit Property Type",
            name : "propertytypes-modal_name",
            serverUrl: "./api/propertytype"
        });
        ModalMaker.addTextInput("name", "Property Type", "eg: Apartment");
        ModalMaker.renderContent($("#modal-placeholder"));
        ModalMaker.setOpener(".open-modal");

        
    // --------------------------------------------------------propertyefficiency page-------------------------------------------------------
    } else if (PAGE_NAME === 'propertyefficiency' || PAGE_NAME === '') {

        /*
        * propertyefficiency table
        */
        $('#propertyefficiency-table').DataTable( {
            "paging" : true,
            "lengthChange" : true,
            "searching" : true,
            "ordering" : true,
            "info" : false,
            "autoWidth" : false,
            'dom' : 'rtip',
            "processing" : true,
            ajax: {
                url: './api/propertyefficiencies',
                dataSrc: ''
            },
            columns: [{
                    data : "id",
                    width : "20px"
                },
                { data: 'name' }
            ],
            createdRow: function (row, data, index) {
                    $(row).addClass('open-modal');
                    $(row).attr("data-id", data['id']);
            }
        } );


        /*
        * search propertyefficiency table
        */
        $('#search-propertyefficiency').keyup(function() {
            $('#propertytypes-table').DataTable().search($(this).val()).draw();
        });

        // length of users table changed
        $('#length-propertyefficiency-table').change(function() {
            $('#propertytypes-table').DataTable().page.len($(this).val()).draw();
        });


        /*
        * Create modal to edit Property Energy Efficiency Rating
        */
        ModalMaker.init( {
            title : "Edit Property Energy Efficiency Rating",
            name : "propertyefficiency-modal_name",
            serverUrl: "./api/propertyefficiency"
        });
        ModalMaker.addTextInput("name", "Property Energy Efficiency Rating", "eg: A++");
        ModalMaker.renderContent($("#modal-placeholder"));
        ModalMaker.setOpener(".open-modal");

        
    // --------------------------------------------------------info page-------------------------------------------------------
    } else if (PAGE_NAME === 'propertystatus' || PAGE_NAME === '') {

        /*
        * propertystatus table
        */
        $('#propertystatus-table').DataTable( {
            "paging" : true,
            "lengthChange" : true,
            "searching" : true,
            "ordering" : true,
            "info" : false,
            "autoWidth" : false,
            'dom' : 'rtip',
            "processing" : true,
            ajax: {
                url: './api/propertystatuses',
                dataSrc: ''
            },
            columns: [{
                    data : "id",
                    width : "20px"
                },
                { data: 'name' }
            ],
            createdRow: function (row, data, index) {
                    $(row).addClass('open-modal');
                    $(row).attr("data-id", data['id']);
            }
        } );


        /*
        * search propertystatus table
        */
        $('#search-propertystatus').keyup(function() {
            $('#propertystatus-table').DataTable().search($(this).val()).draw();
        });

        // length of users table changed
        $('#length-propertystatus-table').change(function() {
            $('#propertystatus-table').DataTable().page.len($(this).val()).draw();
        });


        /*
        * Create modal to edit Property Energy Efficiency Rating
        */
        ModalMaker.init( {
            title : "Edit Property Status",
            name : "propertystatus-modal_name",
            serverUrl: "./api/propertystatus"
        });
        ModalMaker.addTextInput("name", "Property Status", "eg: To Rent");
        ModalMaker.renderContent($("#modal-placeholder"));
        ModalMaker.setOpener(".open-modal");

        
    // --------------------------------------------------------info page-------------------------------------------------------
    } else if (PAGE_NAME === 'info' || PAGE_NAME === '') {

        /*
        * set summernote HTML Editor
        */
        $(".summernote").summernote({
          callbacks: {
            onChange: function(contents, $editable) {
                $(this).parent().find('textarea').val(contents);
            }
          },
          height: "40em"
        });
    }else{

        ShareModal.init( {
            title : "Share Property",
            name : "item-modal-share",
            serverUrl: "../api/video",
            url:"wdwd",
            modalPlaceholder: $("#sharemodal-placeholder")
        });
        ShareModal.setOpener(".open-share-modal");
    }


    /*
    * Toggle side navigation menu
    */
    $('[data-toggle=collapse]').click(function() {
        $('.row-offcanvas').toggleClass('active');
    });


    /*
    * Get Categories
    */
    function getCatagories(callback){
           $.ajax({
              url : "./api/categories",
              type : "GET",
              processData: false,
              contentType: false,
              success : function(data, status) {
                  var catagories = $.parseJSON(data);
                  callback(catagories);
              },
              error : function(jqXHR) {
                 console.log(jqXHR);
              }
          });
    }

    /*
    * Get Property Types
    */
    function getPropertyTypes(callback){
           $.ajax({
              url : "./api/propertytypes",
              type : "GET",
              processData: false,
              contentType: false,
              success : function(data, status) {
                  var propertytypes = $.parseJSON(data);
                  callback(propertytypes);
              },
              error : function(jqXHR) {
                 console.log(jqXHR);
              }
          });
    }

    /*
    * Get Property Status
    */
    function getPropertyStatus(callback){
           $.ajax({
              url : "./api/propertystatuses",
              type : "GET",
              processData: false,
              contentType: false,
              success : function(data, status) {
                  var propertystatus = $.parseJSON(data);
                  callback(propertystatus);
              },
              error : function(jqXHR) {
                 console.log(jqXHR);
              }
          });
    }

    /*
    * Get Property Energy Efficiency
    */
    function getPropertyEfficiencies(callback){
           $.ajax({
              url : "./api/propertyefficiencies",
              type : "GET",
              processData: false,
              contentType: false,
              success : function(data, status) {
                  var propertyefficiencies = $.parseJSON(data);
                  callback(propertyefficiencies);
              },
              error : function(jqXHR) {
                 console.log(jqXHR);
              }
          });
    }

});