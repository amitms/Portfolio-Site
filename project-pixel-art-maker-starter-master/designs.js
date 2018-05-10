// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

function makeGrid(event) {
// Your code goes here!  
	$('table tr').remove();                          // Clears previously created grid.
	const rows=$('#inputHeight').val();                 
	const cells=$('#inputWeight').val();                 
	//alert("rows:"+ rows+ "\n cells:"+ cells);
	for (let i=1;i<=rows;i++) {
	$('table').append("<tr></tr>");
		for (let j=1;j<=cells;j++) {
		$('tr:last').append("<td></td>");         // last makes sure that the cells are added only to the last created table row and not for all.
		$('td').attr('class','pixel');
		}
	}
	event.preventDefault();                       //avoids the page to be refreshed after clicking on submit button and retains the table/grid.
}
	
$('form').submit(makeGrid);
//$( "form" ).on( "click", makeGrid() );

$('#pixelCanvas').on('click','.pixel',function(){  //checks for any changes in table with id pixel_canvas and makes changes to element with class .pixel
  var pen=$('#colorPicker').val();
  $(this).css('background-color',pen);
});

