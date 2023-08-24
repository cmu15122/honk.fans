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
// Copyright (C) 2021, Sol Boucher <sol@vanguardcampaign.org>
// Copyright (C) 2021, The Vanguard Campaign Corps Mods (vanguardcampaign.org)

async function handler(request: Request) {
	const url = new URL(request.url);
	const redir = await fetch(BACKEND + '?link=' + url.pathname + '&plaintext=true');
	return Response.redirect(await redir.text(), 302);
}

const BACKEND = Deno.env.get('BACKEND');
if(BACKEND)
	addEventListener('fetch', function(event: any) {
		event.respondWith(handler(event.request));
	});
else
	console.log('Environment is missing $BACKEND');
