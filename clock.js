var overlay_div = document.createElement('div');

overlay_div.id = 'dialog';
overlay_div.className = 'dialog';
overlay_div.style.borderRadius = '6px';
overlay_div.style.display = 'block';
overlay_div.style.padding = '6px';
overlay_div.style.position = 'fixed';
overlay_div.style.top='0px';
overlay_div.style.left='0px';
overlay_div.style.height = '20px';
overlay_div.style.width = '70px'; // Added width for demonstration
overlay_div.style.backgroundColor = 'black'; // Added background color for visibility
overlay_div.style.border = "2px solid white";
// Global variables for dragging
var isDragging = false;
var isWindow=false;
var startX, startY, offsetX, offsetY;

var resizeHandle = document.createElement('div');
resizeHandle.id="resizeHandle"
resizeHandle.style.width = '10px';
resizeHandle.style.height = '10px';
resizeHandle.style.background = 'black';
resizeHandle.style.position = 'absolute';
resizeHandle.style.right = '0';
resizeHandle.style.bottom = '0';
resizeHandle.style.cursor = 'nwse-resize';
var clickcount=0;
var x=0;
var y=0;
// Function to make the div draggable
function makeDraggable(element) {
    element.addEventListener('mousedown', function(e) {
        isWindow = true;
		isDragging=true;
        startX = e.clientX;
        startY = e.clientY;
        offsetX = element.offsetLeft;
        offsetY = element.offsetTop;
		clickcount++;
		// if(clickcount%2===1)
		// 	{
				
			// }
		// else{

		// 	element.style.border = "none";
		// 	clickcount=0;
		// }
    });

    document.addEventListener('mousemove', function(e) {
        if ( isWindow && isDragging) {
           	x = offsetX + e.clientX - startX;
            y = offsetY + e.clientY - startY;
            element.style.left = x + 'px';
            element.style.top = y + 'px';
			element.style.border = "2px solid white";
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
}

// Make the overlay_div draggable
makeDraggable(overlay_div);

// var resizeHandleHTML = '<div id="resizeHandle" style="width: 10px; height: 10px; background: #000; position: absolute; right: 0; bottom: 0; cursor: nwse-resize;"></div>';


// Global variables for resizing
var isResizing = false;
var startX, startY, startWidth, startHeight, startTop, startLeft;

// Function to make the div resizable
function makeResizable(element) {
    // var handle = document.getElementById(handleId);
    resizeHandle.addEventListener('mousedown', function(e) {
        e.preventDefault()
		isWindow=false;
		isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
		element.style.border = "2px solid white";

        startWidth = element.offsetWidth;
        startHeight = element.offsetHeight;
		startTop = element.offsetTop;
        startLeft = element.offsetLeft;
    });

    document.addEventListener('mousemove', function(e) {
        if (isResizing) {
            var width = startWidth + e.clientX - startX;
            var height = startHeight + e.clientY - startY;
            element.style.width = width + 'px';
            element.style.height = height + 'px';
			element.style.top = startTop + 'px';
            element.style.left = startLeft + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isResizing = false;
    });
}

// Make the overlay_div resizable

// Append the overlay_div to the body
window.addEventListener('load', function() {
    document.body.appendChild(overlay_div);
}, false);

// Additional event listeners for window resize and click
window.addEventListener('resize', change_clock_appearance_on_resize, false);

// overlay_div.onclick = function() {
//     overlay_div.style.display = 'none';
//     setTimeout(function() {
//         overlay_div.style.display = 'block';
//     }, 10000);
// };

function new_time() {
	var now = new Date();
	var hh = ( '0' + now.getHours() ).slice( -2 );
	var mm = ( '0' + now.getMinutes() ).slice( -2 );
	var apm = '';

	if( !my_overlay_div_mil_time ) {
		if( hh < 12 ) {
			apm = ' am'
		}
		else {
			hh -= 12;
			apm = ' pm';
		}
	    hh = ( '0' + hh ).slice( -2 );
	    if (hh == '00') {
		hh = '12';
	    }
	}
	return hh + ':' + mm + apm + '\n' + x.toString() + '\n' + y.toString();
}

function new_date() {
    var now = new Date();
    var d = now.toLocaleDateString();
    return d;
}

function is_full_screen() {
	return ( ( screen.width == window.outerWidth )
		&& ( screen.height == window.outerHeight ) );
}

// has hardcoded 'padding' and 'borderRadius' values
function change_clock_appearance_on_resize() {
	// or browser.tabs.getZoom()
	dpr = window.devicePixelRatio
	if     ( dpr <= 1.25 ) {
		overlay_div.style.padding = '6px';
		overlay_div.style.borderRadius = '6px';
		overlay_div.style.fontSize = default_font_size_of_overlay_div;
	}
	else if( dpr <= 1.50 ) {
		overlay_div.style.padding = '5px';
		overlay_div.style.borderRadius = '5px';
		overlay_div.style.fontSize = subtract_from_font_size( 1 ) + 'px';
	}
	else if( dpr <= 1.75 ) {
		overlay_div.style.padding = '3px';
		overlay_div.style.borderRadius = '4px';
		overlay_div.style.fontSize = subtract_from_font_size( 4 ) + 'px';
	}
	else if( dpr >  1.75 ) {
		overlay_div.style.padding = '2px';
		overlay_div.style.borderRadius = '2px';
		overlay_div.style.fontSize = subtract_from_font_size( 4 ) + 'px';
	}
}

function subtract_from_font_size(how_much_subtract) {
	// delete 'px' from value
	font_size =	default_font_size_of_overlay_div.slice(0, -2);
	if( font_size - how_much_subtract >= 6 ) {
		font_size -= how_much_subtract;
	}
	else {
		font_size = 6;
	}
	return font_size
}


function create_clock( values ) {
	// use global variable to use it in new_time()
	window.my_overlay_div_mil_time = values[ 'mil_time' ];
	window.my_overlay_div_full_screen_only = values[ 'full_screen_only' ];

	my_overlay_div_fg_color = values[ 'fg_color' ];
	my_overlay_div_bg_color = values[ 'bg_color' ];
	my_overlay_div_opacity = values[ 'bg_opacity' ];
	my_overlay_div_font_family = values[ 'font_family' ];
	my_overlay_div_font_size = values[ 'font_size' ];
	my_overlay_div_style_right = values[ 'style_right' ];
	my_overlay_div_style_top = values[ 'style_top' ];
	// yeah, will be only one z-index for every page, sorry
	let my_overlay_div_z_index = values[ 'z_index' ];
	let my_overlay_div_domains = values[ 'domains_array' ];
	// console.log( "create_clock: domains[0] = " + my_overlay_div_domains[0] );
	check_is_page_in_domains_list( my_overlay_div_domains );


        overlay_div.textContent = new_time();
		// overlay_div.innerHTML += resizeHandleHTML;
		makeResizable(overlay_div);
		overlay_div.appendChild(resizeHandle);
        overlay_div.title = new_date();
	overlay_div.style.color = my_overlay_div_fg_color;
	overlay_div.style.backgroundColor = my_overlay_div_bg_color;
	overlay_div.style.opacity = my_overlay_div_opacity;
	overlay_div.style.fontFamily = my_overlay_div_font_family;
	overlay_div.style.fontSize = my_overlay_div_font_size;
	overlay_div.style.right = my_overlay_div_style_right;
	overlay_div.style.top = my_overlay_div_style_top;
	overlay_div.style.zIndex = my_overlay_div_z_index;

	// global variable for change_clock_appearance_on_resize()
	default_font_size_of_overlay_div = overlay_div.style.fontSize;

	if( my_overlay_div_full_screen_only && !is_full_screen() ) {
			overlay_div.style.display = 'none';
	}
}

function update_time_on_clock() {
	if( my_overlay_div_full_screen_only && !is_full_screen() ) {
		if( overlay_div.style.display != 'none' ) {
			overlay_div.style.display = 'none';
		}
	}
	else {
		if( overlay_div.style.display != 'block' ) {
			overlay_div.style.display = 'block';
		}
	    overlay_div.textContent = new_time();
		overlay_div.appendChild(resizeHandle);
		makeResizable(overlay_div);
	    overlay_div.title = new_date();
	}
}

setInterval( update_time_on_clock, 20000 );

// load defaults values and transfer them to function create_clock()
chrome.storage.sync.get( document.clock_defaults, create_clock );

chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
	if( request.visibility == "show" ) {
		overlay_div.style.display = 'block';
	}
	if( request.visibility == "hide" ) {
		overlay_div.style.display = 'none';
	}
	// chrome can't promises here
	if( request.visibility == "what" ) {
		if( overlay_div.style.display == 'none' ) {
			sendResponse( { response: "hidden" } );
		}
		if( overlay_div.style.display == 'block' ) {
			sendResponse( { response: "shown" } );
		}
	}
	if( request.recreate == "true" ) {
		chrome.storage.sync.get(document.clock_defaults, create_clock);
	}
	return true;
} );

function check_is_page_in_domains_list( domains ) {
	// if( domains == "undefined" ) {
	// 	console.log( "check_is_page_in_domains_list: domains are undefined" );
	// 	return;
	// }
	// console.log( "check_is_page_in_domains_list: " +
	// "doc.loc.host = " + document.location.hostname );
	if (domains.length > 0 ) {
		let host = document.location.hostname;
		// yeah, no check for values
		for( let index = 0; index < domains.length; index++ ) {
			if( domains[ index ] == host ) {
				// not deleting it
				overlay_div.style.display = 'none';
				break;
			}
		}
	}
}
