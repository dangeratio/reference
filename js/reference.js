
/****************************/
/*  Default Details
/****************************/

var debug_messages = true;
var load_left = true;
var load_right = true;

var local_array = [];
var new_source_array = [];
var current_source = [];
var source_item = struct("friendly_name local_name url file");
var loaded_sources = 0;
var right = "";
var left = "";
// var item = new source_item(friendly_name, url);	// usage of source_item

/********************************************************/
/*  PROCESSES
/********************************************************/


function add_to_array(source_item) {
  // iterate array to identify if it exists
  var i;
  var replaced=false;
  for (var i=0; i<new_source_array.length; i++){
    if(new_source_array[i]==source_item){
      new_source_array.splice(i,1);
      replaced=true;
    }
    if (replaced) break;
  }
  new_source_array.push(source_item);
}


function load_sources() {

	for (var i=0; i<current_source.length; i++) {
		// load source locally into iframe
		load_source(current_source[i]);
	}

}

function load_source(url) {
	// LOAD INTO IFRAME, RETURN NAME OF IFRAME

  // log("Loading: "+url);
	$.ajax({
	    url: url,
	    success: function(xml) {
	      //  console.log('Success:' + file);
				var file = url.split('/').pop();
				file.split(".").pop();
				var pattern = "%20";
				file = file.replace(/%20/g, " ");
				file = file.replace(/'/g, "");
				var friendly_name = local_name = file;
				var i = new source_item(friendly_name, local_name, url, xml);
				add_to_array(i);
				add_new_source(i.friendly_name);
        loaded_sources++;
	    },
	    error: function(e) {
				console.log('Error querying source: ', e);
			}
	});

	return url;		// this is a version of the file name
}

function get_xmls(url) {
	// GET XMLS FROM PULLED IFRAME, ADD SOURCE NAME TO ARRAY

}

function display_local_sources() {
	// ADD XML NAME TO LEFT AS POSSIBLE SOURCE
}

function add_new_source(friendly_name) {
	// ADD XML NAME TO LEFT AS POSSIBLE SOURCE
	if (load_left) {
		load_left = false;
		clear_left();
	}
}

function refresh_left_view() {
	// iterate sources > Items
  log("Loading "+new_source_array.length+" sources into navigation.");

  // iterate sources
  for(var i=0; i<new_source_array.length; i++) {
    // log("out:"+new_source_array[i]["file"].toString());
    var xml = new_source_array[i]["file"];

    get_items(xml);
  }
}

function get_items(xml) {

  for (var i=0; i<source_types.length; i++) {
    log(source_types[i]);
    var items = xml.getElementsByTagName(source_types[i]);
    log("items: "+items.length);
    for (var i = 0; i < items.length; i++) {
      elm = items[0].getElementsByTagName("name")[i];
      if(elm){
        // add item to left nav
        name = elm.innerHTML
        add_left("<div class='left_item'>"+name+"</div>");

      }
    }
  }
}

function get_source() {
  // log($('.selected_source').attr('id'));
  return sources[$('.selected_source').attr('id')];
}

function refresh_right_view() {
	// iterate local_array and display in right view
	clear_right();

	// display item selected
}

function check_local_storage() {
	if (typeof(Storage) !== "undefined") {
	    // Has webstorage support
	} else {
	    // No webstorage support
			right("Sorry your browser doesnt support local storage. Upgrade or switch to a different browser to use this tool.");
	}
}

/********************************************************/
/*  FUNCTIONS
/********************************************************/

function clear_right() {
	$("#right").empty();
}

function clear_left() {
	$("#left").empty();
}

function add_right(msg) {
  right = right + msg;
  $("#right").html(right);
}

function add_left(msg) {
  left = left + msg;
  $("#left").html(left);
}

function random_int(min,max) {
	var random_int = Math.floor(Math.random()*(max-min+1)+min);
  return random_int;
}

function log(msg) {
	if (debug_messages) {console.log(msg);}
}

function struct(names) {
  var names = names.split(' ');
  var count = names.length;
  function constructor() {
    for (var i = 0; i < count; i++) {
      this[names[i]] = arguments[i];
    }
  }
  return constructor;
}
/****************************/
/*  Init / Runtime
/****************************/

function toggle_key(e) {
  if ($('#key').filter(":visible").length) {
    $('#key').hide();
  } else {
		$('#key').css({top: e.pageY, left: e.pageX-27})
    $('#key').show();
		$('body').one('click',function() { hide_key(); });
  }
}

function hide_key() {
	$('#key').hide();
}

function hide_menu() {
	$('#index-menu').hide();
}

function toggle_menu(e) {
  if ($('#index-menu').filter(":visible").length) {
    $('#index-menu').hide();
  } else {
		$('#index-menu').css({top: e.pageY, left: e.pageX-27})
    $('#index-menu').show();
		$('body').one('click',function() { hide_menu(); });
  }
}



$(function() {

	/****************************/
	/*  Events
	/****************************/

	$('body').on('click', '#show_key_button', function(e) { toggle_key(e); });
	$('body').on('click', '#key', function(e) { toggle_key(e); });
	$('body').on('click', '#configure', function(e) { window.location.replace("configure.html"); });

	// top menu
	$('body').on('click', '.menu-button', function(e) { toggle_menu(e); } );
	$('body').on('click', '#menu-auto-roll-tables', function() { window.location.replace("../index.html"); } );
	$('body').on('click', '#menu-region-map-generator', function() { window.location.replace("../hex_map_generator/hex_map_generator.html"); } );

	/****************************/
	/*  Init
	/****************************/

	process_sources();
  current_source = get_source();
	load_sources();

  // check every 1/10th second for sources to be loaded, when loaded, refresh left and right views
  var timerId = setInterval(function() {
    if (loaded_sources == current_source.length) {
      loaded_sources = 0;
      clearInterval(timerId);
      refresh_left_view();
      refresh_right_view();
    }
  }, 100);

});
