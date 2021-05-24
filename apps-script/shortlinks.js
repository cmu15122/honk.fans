// @OnlyCurrentDoc

function doGet(request) {
	var short = request.parameter.link;
	if(!short)
		return;
	if(!(short = short.substring(1)))
		short = ' ';

	var table = SpreadsheetApp.getActiveSheet();
	var key = table.getRange(2, 1, table.getLastRow() - 1)
		.createTextFinder(short)
		.matchEntireCell(true)
		.findNext();
	if(!key)
		return;

	var value = table.getRange(key.getRow(), 2);
	var long = value.getValue();
	return HtmlService.createHtmlOutput('<script>window.top.location = \'' + long + '\'</script>');
}
