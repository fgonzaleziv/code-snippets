/*pulls the users on the watchlist when value changes. 
Compares current to previous to get the new users added. 
Triggers email notification to send to those new users as param1*/

if (current.watch_list.changes()) {
	//gs.log('Watchlist Changed for: ' + current.number);
	var newest = current.watch_list.split(',');
	var oldest = previous.watch_list.split(',');
	var difference = newest.filter(function (x) {
			return oldest.indexOf(x) == -1;
		});
	var stringD = '';
	stringD = difference.toString();
	gs.eventQueue("sc_req_item.watchlist", current, stringD, current.watch_list);
	//gs.log('Diff: ' + stringD);
}
