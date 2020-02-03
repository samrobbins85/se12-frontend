const STOCK_API_URL = "/stockTake/"

// REMEMBER: When calling async function you must add await before

// TODO: Parameter checking in functions. EG. all attributes, etc.
// TODO: Return values from fetch

// API call to add tray
/*
	Inputs:
		tray: JSON Object of tray and all attributes
	Returns:
		code: Either "OK" or "FAIL" ("OK" on 2XX response code)
*/
async function addTray(tray) {
    let res = await fetch(STOCK_API_URL + "addTray", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tray)
    });

    if (res.ok) {
        return "OK";
    }
    return "FAIL";
}

// API call to remove tray
/*
	Inputs:
		pos: JSON Object containing target zone, bay and tray
	Returns:
		code: Either "OK" or "FAIL" ("OK" on 2XX response code)
*/
async function removeTray(pos) {
    let res = await fetch(STOCK_API_URL + "removeTray", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pos)
    });

    if (res.ok) {
        return "OK";
    }
    return "FAIL";
}

// API call to get all trays in the bay
/*
	Inputs:
		pos: JSON Object containing target zone, bay
*/
async function getTraysInBay(pos) {
    let res = await fetch(STOCK_API_URL + "getTraysInBay", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pos)
    })
        .then(res => res.json());
    return res;
}

// TODO: Implement this endpoint
// API call to get all bays in the zone
/*
	Inputs:
		pos: JSON Object containing target zone
*/
async function getBaysInZone(pos) {
    console.log("Endpoint getBays not implemented yet!");
    return;

    fetch(STOCK_API_URL + "getZone", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    });
}

// API call to move a tray
/*
	Inputs:
		start: JSON Object containing start position
		target: JSON Object containing target position
	Returns:
		code: Either "OK" or "FAIL" ("OK" on 2XX response code)
*/
async function moveTray(start, target) {
    // Move is still broken. Stopping it running!
		//console.log("moveTray is not working!");
		//return;
		let res = await fetch(STOCK_API_URL + "moveTray", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({posStart: start, posTarget: target})
    });

    if (res.ok) {
        return "OK";
    }
    return "FAIL";
}

// TODO: Implement this end point
// API call to swap two trays
/*
	Inputs:
		first: JSON Object containing first tray position
		second: JSON Object containing second tray position
*/
async function switchTray(firstTray, secondTray) {

    const response = await fetch(STOCK_API_URL + "switchTray", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            first: firstTray,
            second: secondTray
        })
    });

    if (response.ok) {
        console.log("All good in the neighbourhood");
    } else {
        alert(`There was an error code: ${response.status}, ${response.statusText}`);
    }
}

// API call to add a new zone
/*
	Inputs:
		zone: JSON Object containing name, height and width
	Returns:
		code: Either "OK" or "FAIL" ("OK" on 2XX response code)
*/
async function addZone(zone) {
    let res = await fetch(STOCK_API_URL + "addZone", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(zone)
    });

    if (res.ok) {
        return "OK";
    }
    return "FAIL";
}

// TODO: Implement this call
// API call to add a new bay
/*
	Inputs:
		
*/
async function addBay() {
    console.log("This call has not been implemented yet!");
    return;
}

// API call to edit an exisiting tray
/*
	Inputs:
		tray: A JSON Object representing a tray. Position must match existing tray
	Returns:
		code: Either "OK" or "FAIL" ("OK" on 2XX response code)
*/
async function editTray(tray) {
    let res = await fetch(STOCK_API_URL + "editTray", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tray)
    });

    if (res.ok) {
        return "OK";
    }
    return "FAIL";
}

// TODO: Implement this call
// API call to edit an existing bay
/*
	Inputs:
		
*/
async function editBay() {
    console.log("This call has not been implemented yet!");
    return;
}

// TODO: Implement this call
// API call to edit an exisiting zone
/*
	Inputs:
		
*/
async function editZone() {
    console.log("This call has not been implemented yet!");
    return;
}

// API call to get all zones
/*
	Inputs:
		None
	Outputs:
		zones: array of zone objects
*/
async function getZones() {
    let res = await fetch(STOCK_API_URL + "getZones", {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json());
    return res;
}

// swapTray({
//         zone: "Orangehhhhhhhhhhhhh",
//         bay: "orange235555555",
//         tray: "a1234jjjjjjjjjjjjjjjjjj"
//     }, {
//         zone: "Orange",
//         bay: "orange",
//         tray: "a1337"
//     }
// )
