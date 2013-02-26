
 
 $(document).ready(function(){
   //hide address bar if content is long (safari)
   //MBP.hideUrlBarOnLoad();
     
      var myScroll;
      
      var runFlexsliders = function(){
          
          //run sliders if they're not run already
          var winWidth = $('#container').outerWidth();
          var paddingPercent = (winWidth *2)/100;
          var marginPercent = (winWidth*22)/100;
          var availableWidth = winWidth - marginPercent;
          var perItemWidth = (availableWidth / 3);// - paddingPercent;
          $('.flexslider').each(function(){
               if ($(this).hasClass('pagesMenu')){
                    
                 $(this, ':not(.flexslidered)').addClass("flexslidered").flexslider({
                      animation: "slide",
                      controlNav: false,
                      directionNav: true,
                      slideshow: false,
                      animationLoop: false,
                      itemWidth: perItemWidth
                 });
                 
               } else{
                    $(this, ':not(.flexslidered)').addClass("flexslidered").flexslider({
                         animation: "slide",
                         controlNav: false,
                         directionNav: true
                    });
               }
            });
      }
      

   
         var App = {
            init: function() {
               this.ENTER_KEY = 13;
               this.$duration = 700;
               
               //hide splash
               setTimeout(function(){
                    $('#splash').fadeOut('1000');
               }, 2000);
             
               
               runFlexsliders();
               
                         
               if ($('#pivotTabs').length> 0) {
                  myScroll = new iScroll('pivotTabs', {
                     snap: 'li',
                     momentum: true,
                     hScrollbar: false,
                     vScrollbar: false
                  });
               }
               
               
               
               this.Forms.bind();

               this.createAndCacheElements();
               this.bindEvents();
               
               $('li:last-child').addClass('last');
               $('li:first-child').addClass('first');
               
            
               var tabs = this.$tabs;
               $(tabs).find('li:first-child a').trigger('click');
                 
                 
               //portfolio - instruction - tap to change 
               if ($('#pagePortfolio').length > 0){
                     $('.instruction').fadeIn(App.duration);
                  
                  var options = {};
                  
                  
		  $('.portfolioProjects a.thumb:not(.photoswiped)').addClass('photoswiped').photoSwipe(options);
                  
                  $('#pagePortfolio .tab').hide();
                  $('#pagePortfolio .tabsPortfolio li:nth-child(2) a').trigger('click');
                  
               }
               
               
               
               //run the map
               App.refreshMaps();
               
            },
            
            createAndCacheElements:function(){
               this.$tabs = $('#pivotTabs');
               
              
            },
            
            bindEvents: function(){
               var me = this;
               
               $('.page').each(function(){
                    if($(this).hasClass('bound')){
                         return;
                    }
                    $('.page').addClass('bound');
                    
                    
                    var tabs = me.$tabs;
                    tabs.on('click', 'li a', me.enablePivotTab);
                    
                    $('.tabsPortfolio').on('click', 'li a', me.portfolioTabChange)
                    
                    
                    //if has website link, don't show the gallery
                    $('.portfolioProjects').on('click', 'li', function(){
                       if ($(this).find('a.website').length == 0){
                          $(this).find('a.thumb').trigger('click');
                       }
                    });
                    
                    
                    $('.menuButton').click(function(e){
                         e.preventDefault();
                         
                         if ($(this).hasClass('open')){
                              $(this).removeClass('open');
                              
                              $('.upperMenu .pagesMenu').animate({
                                   opacity: 0
                              }, function(){
                                   $('.upperMenu').removeClass('opened');
                              });
                                 
                         } else{
                              $(this).addClass('open');
                              //we give a delay of 300 because our CSS3 transitions are timed at 0.3s for the menu button (the up arrow) to rotate.
                              setTimeout(function(){
                                   $('.upperMenu').addClass('opened');
                                   $('.upperMenu .pagesMenu').animate({
                                        opacity: 1
                                   });
                              }, 300);
                              
                                               
                         }
                         
                    });

               });

               
            },
            
            portfolioTabChange: function(e){
               e.preventDefault();
               
               if ($(this).hasClass('active')){
                  return;
               }
               
               $('.tabsPortfolio li a').removeClass('active');
               $(this).addClass('active');
               
               var classToAdd = $(this).attr('data-value');
               
               $('.portfolioProjects').show().animate({
                  'opacity': 0
               }, 200, function(){
                  var me = $(this);
                  if (classToAdd == "grid"){
                     $('.instruction').addClass('lefter');
                  } else{
                     $('.instruction').removeClass('lefter');                     
                  }
                  $(me).removeClass('list grid').addClass(classToAdd).animate({
                     'opacity': 1
                  }, 200);
               });
               
            },
            
            enablePivotTab: function(e){
               e.preventDefault();
               if ($(this).hasClass('active')){
                  return;
               }
               var me = $(this);
               if ($(this).hasClass('goToFirst')){
                  $(this).parents('ul').find('li:first-child a').trigger('click');
                  return false;
               }
               var myLi = $(this).parent();
               var myLiIndex = $(myLi).index() + 1;
               var activeIndex = $('#pivotTabs a.active').parent().index() + 1;
               var direction1 = "left";
               var direction2 = "right";
               
               if (myLiIndex > activeIndex){
                  direction1 = "left";
                  direction2 = "right";
               } else{
                  direction1 = "right";
                  direction2 = "left";
               }
               
               
               $(this).parents('ul').find('a').removeClass('active');
               $(this).addClass('active');
               
               
               //scroll all tabs and contents
               myScroll.scrollToElement('li:nth-child(' + myLiIndex + ')', 200);
               $('.pivotTab').slideUp(App.duration);
               var targetDiv = $(me).attr('data-value');
               $(targetDiv).slideDown(App.duration, function(){
                    if ($(targetDiv).find('.map').length > 0){
                         App.refreshMaps();
                    }
               });
               
            },
            
               
               
          refreshMaps: function(){
               
               $('.map').each(function(){
                    var me = $(this);
                    var locationTitle = $(this).attr('data-location');
                    var myId = $(me).attr('id');
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                         address: locationTitle
                     }, function(locResult) {
                         var latVal = locResult[0].geometry.location.lat();
                         var longVal = locResult[0].geometry.location.lng();
                         App.initializeMap(myId, locationTitle, latVal, longVal);
                     });
               });
          },
          
          
          initializeMap: function(locationVal, titleVal, latVal, longVal) {
                     var latlng = new google.maps.LatLng(latVal, longVal);
                     var settings = {
                             zoom: 13,
                             center: latlng,
                             mapTypeControl: false,
                             mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
                             navigationControl: false,
                             navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                             streetViewControl: false,
                             zoomControl: true,
                             mapTypeId: google.maps.MapTypeId.ROADMAP 
                     };
                     var map = new google.maps.Map(document.getElementById(locationVal), settings);
                     
                     
                     var nibrasPos= new google.maps.LatLng(latVal, longVal);
                     var nibrasMarker = new google.maps.Marker({
                               position: nibrasPos,
                               map: map,
                               title:titleVal
                     });
                       
               
           },
           
           
                
                
            
            
            Forms: {
               bind: function() {
                  // Add required class to inputs
                  $(':input[required]').addClass('required');
                  
                  // Block submit if there are invalid classes found
                  $('form:not(.html5enhanced)').addClass("html5enhanced").submit(function() {
                        var formEl = this;
                          $('input,textarea').each(function() {
                                  App.Forms.validate(this);
                          });
                          
                          if(($(this).find(".invalid").length) == 0){
                                  // Delete all placeholder text
                                  $('input,textarea').each(function() {
                                          if($(this).val() == $(this).attr('placeholder')) $(this).val('');
                                  });
                                  
                                  //now submit form via ajax
                                  $.ajax({
                                    url: $(formEl).attr("action"),
                                    type: $(formEl).attr("method"),
                                    data: $(formEl).serialize(),
                                    success: function(r) {
                                       $(".successMessage").slideDown('fast');
                                       $('html,body').stop().animate({
                                          scrollTop: $(".successMessage").offset().top - 30
                                       }, 300);
                                       
                                       $(formEl).find('input[type="text"], input[type="email"], input[type="tel"], select').val('');
                                       $(formEl).find('textarea').val('');
                                       setTimeout(function(){
                                          $(".successMessage").slideUp('fast');
                                       }, 4000);
                                    }
                                  })
                                  return false;
                          }else{
                                  return false;
                          }
                  });
         
               },
               is_email: function(value){
                 return (/^([a-z0-9])(([-a-z0-9._])*([a-z0-9]))*\@([a-z0-9])(([a-z0-9-])*([a-z0-9]))+(\.([a-z0-9])([-a-z0-9_-])?([a-z0-9])+)+$/).test(value);
               },
               is_url: function(value){
                       return (/^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i).test(value);
               },
               is_number: function(value){
                       return (typeof(value) === 'number' || typeof(value) === 'string') && value !== '' && !isNaN(value);
               },
               validate: function(element) {
                  var $$ = $(element);
                  var validator = element.getAttribute('type'); // Using pure javascript because jQuery always returns text in none HTML5 browsers
                  var valid = true;
                  var apply_class_to = $$;
                  
                  var required = element.getAttribute('required') == null ? false : true;
                  switch(validator){
                          case 'email': valid = App.Forms.is_email($$.val()); break;
                          case 'url': valid = App.Forms.is_url($$.val()); break;
                          case 'number': valid = App.Forms.is_number($$.val()); break;
                  }
                  
                  // Extra required validation
                  if(valid && required && $$.val().replace($$.attr('placeholder'), '') == ''){
                          valid = false;
                  }
                  
                  // Set input to valid of invalid
                  if(valid || (!required && $$.val() == '')){
                          apply_class_to.removeClass('invalid');
                          apply_class_to.addClass('valid');
                          return true;
                  }else{
                          apply_class_to.removeClass('valid');
                          apply_class_to.addClass('invalid');
                          return false;
                  }
               }
            }
            
         };
         App.init();

   
   
   
   var pageChange = function(){
      App.init();
   }
   
   //this is needed because we are enabling navigation via jQuery Mobile.
   //for each time a new page is loaded, the javascript is not run on itself.
   //Hence, we call the application initialize method assuming that all javascript has to be run, since the entire page content is changed.
   
   //to disable the jquery ajax navigation system, please refer to the footer area where the $.mobile.xyz default parameters are set.
   $(document).bind('pagechange', pageChange);
                                 
   
});