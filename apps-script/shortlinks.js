// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
//
// Copyright (C) 2020, Sol Boucher <sol@vanguardcampaign.org>
// Copyright (C) 2020, The Vanguard Campaign Corps Mods (vanguardcampaign.org)

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

	if(request.parameter.plaintext)
		return ContentService.createTextOutput(redirect);
	else
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
