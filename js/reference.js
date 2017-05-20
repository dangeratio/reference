
/****************************/
/*  Default Details
/****************************/

var debug_messages = true;
var load_left = true;
var load_right = true;

var local_array = [];
var new_source_array = [];
var source_item = struct("friendly_name local_name url file");
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
  // add new item
	// log("adding new item");
  new_source_array.push(source_item);
}

function add_to_local_array(source_item) {
  // iterate array to identify if it exists
  var i;
  var replaced=false;
  for (var i=0; i<local_array.length; i++){
    if(local_array[i]==source_item){
      local_array.splice(i,1);
      replaced=true;
    }
    if (replaced) break;
  }
  // add new item
  local_array.push(source_item);
}

function remove_from_local_array(source_item) {
  // iterate array to identify if it exists
  var i;
  var replaced=false;
  for (var i=0; i<local_array.length; i++){
    if(local_array[i]==source_item){
      local_array.splice(i,1);
      replaced=true;
    }
    if (replaced) break;
  }
}


function clear_right() {
	$("#right").empty();
}

function clear_left() {
	$("#left").empty();
}

function load_sources() {

	// iterate sources
	for (var i=0; i<sources.length; i++) {
		// load source locally into iframe
		load_source(sources[i]);
	}

}

function load_source(url) {
	// LOAD INTO IFRAME, RETURN NAME OF IFRAME

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

function add_all_sources() {
	for (var z=0; z<new_source_array.length; z++) {
		add_to_local_array(new_source_array[z]);
	}

	// store
	localStorage.setItem("new_source_array", new_source_array);
	localStorage.setItem("local_array", local_array);

	refresh_right_view();
}

function add_source(object) {
	var done = false;

	// add to array
	for (var z=0; z<new_source_array.length; z++) {
		log("["+object.id+"|"+new_source_array[z].friendly_name+"]");
		if(new_source_array[z].friendly_name==object.id) {
			add_to_local_array(new_source_array[z]);
			done = true;
    }
    if (done) break;
	}

	// store
	localStorage.setItem("new_source_array", new_source_array);
	localStorage.setItem("local_array", local_array);

	refresh_right_view();

}


function remove_source(object) {
	var done = false;

	// add to array
	for (var z=0; z<new_source_array.length; z++) {
		log("["+object.id+"|"+new_source_array[z].friendly_name+"]");
		if(new_source_array[z].friendly_name==object.id) {
			remove_from_local_array(new_source_array[z]);
			done = true;
    }
    if (done) break;
	}

	// store
	localStorage.setItem("new_source_array", new_source_array);
	localStorage.setItem("local_array", local_array);

	refresh_right_view();
}

function refresh_left_view() {
	// iterate sources > Items
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

function random_int(min,max) {
	var random_int = Math.floor(Math.random()*(max-min+1)+min);
	//log("Random:["+random_int+"]")
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
	load_sources();
	refresh_left_view();

});
