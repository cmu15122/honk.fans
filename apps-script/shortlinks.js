// @OnlyCurrentDoc

function doGet(request) {
	var link = request.parameter.link;
	if(!link)
		return;
	if(link.startsWith('/'))
		link = link.substring(1);

	var redirect = lookup('Links', link);
	if(!redirect)
		// Attempt to fall back to the "default" entry whose key is a single space.
		redirect = lookup('Links', ' ');
	if(!redirect)
		return;
	return HtmlService.createHtmlOutput('<script>window.top.location = \'' + redirect + '\'</script>');
}

function lookup(table, key, fallback = null) {
	if(!key)
		return fallback;

	var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(table);
	if(sheet.getLastRow() <= 2)
		return fallback;

	var cell = sheet.getRange(2, 1, sheet.getLastRow() - 1)
		.createTextFinder(key)
		.matchEntireCell(true)
		.findNext();
	if(!cell)
		return fallback;
	return sheet.getRange(cell.getRow(), 2).getValue();
}
