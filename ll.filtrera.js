// Extend jQuery with a case-insensitive :contains filter
jQuery.extend(jQuery.expr[":"], { "contains-ci": function(elem, i, match, array) { return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0; } });


$(function() {
        
    // Attributes
    var outer = 'table';        
    var inner = 'tr';
    var select = 'li.active';
    var none = '.none';
    var exclusive = false; // 'true' for exclusive filtering
    
    
    // No need to edit below
    var minChar = 1;
    var str,array,target,x,y,z,clone,suggestion;
    
    function findSelected() {
        array = new Array();
        $(select).each(function(index) {
            str = $(this).text();
            array[index]=str;
            if (jQuery.isFunction(jQuery.fn.highlight)) {
                $(inner).highlight(str);
            }
        });
        
        if ( exclusive ) {            
            target = inner;            
            y = array.length;          
            $.each(strings, function(index, value) {
                if ( index != (y-1) ) {
                    target += ':contains-ci("'+value+'"), ';
                } else {
                    target += ':contains-ci("'+value+'")';                    
                }
            });            
            x = $(target);
        } else {            
            target = inner;            
            $.each(array, function(index, value) {
                target += ':contains-ci("'+value+'")';
            });            
            x = $(target);
        }
        
        if (x.length) {
            x.show();
            $(none).hide();
        } else {
            $(none).show();   
        }
    }
    
    $(document).delegate(".sort li", "click", function() {
        
        if (jQuery.isFunction(jQuery.fn.highlight)) {
            $(outer).removeHighlight();
        }
        $(inner).hide();
        $(none).hide();
        
        if ( exclusive ) {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');            
        } else {
            $(this).toggleClass('active');
        }
        
        findSelected();
        
    });
    $('.sort li').click(function(){});
    
    $(document).delegate(".suggestions li", "click", function() {
        
        $(this).hide().siblings().hide();
        str = $(this).text();
        $('.input input').val('');
        $('.suggestions').hide();
        
        z = $('.sort li:contains-ci("'+str+'")');
        
        if (!z.length) {
            $('.sort').append('<li class="active">'+str+'</li>');
        } else {
            z.addClass('active');
        }
        
        // Init
        if (jQuery.isFunction(jQuery.fn.highlight)) {
            $(inner).removeHighlight();
        }
        $(inner).hide();
        
        findSelected();

    });
    $('.suggestions li').click(function(){});
    
    $(document).delegate("input", "keyup", function() {
        if (jQuery.isFunction(jQuery.fn.highlight)) {
            $(outer).removeHighlight();
        }
        var str = $(this).val();  
        if ( str.length >= minChar ) {
            $('.suggestions li').hide();
            suggestion = $('.suggestions li:contains-ci("'+str+'")');
            if ( suggestion.length ) {
                $('.suggestions').show();
            } else {
                $('.suggestions').hide();            
            }
            suggestion.show();
            $(inner).hide();    
            target = inner;
            target += ':contains-ci("'+str+'")';
            x = $(target);
            if (x.length) {
                x.show();
                $(none).hide();
            } else {
                $(none).show(); 
            }
            if (jQuery.isFunction(jQuery.fn.highlight)) {
                $(inner).highlight(str);  
            }      
        } else {
            $('.suggestions').hide();
            $('.suggestions li').hide();
            $(inner).show();
            $(none).hide();            
        }
    });
    
    $(document).delegate("body", "click", function(event) {
        if( !$(event.target).is(".suggestions li") ) {
            if ( $('#search').val() != '' ) {
                if (jQuery.isFunction(jQuery.fn.highlight)) {
                    $(outer).removeHighlight(); 
                } 
                $('#search').val('');
                $('.suggestions').hide();
                $('.suggestions li').hide();
                $(inner).hide();
                $(none).hide();  
                findSelected();            
            }
        }        
    });
    
});