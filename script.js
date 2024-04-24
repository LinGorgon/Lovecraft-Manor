const look = document.getElementById("look");
const take = document.getElementById("take");
const open = document.getElementById("open");
const use = document.getElementById("use");
const talk = document.getElementById("talk");
const read = document.getElementById("read");

const mainScreen = document.getElementById("main-screen");
const currentAction = document.getElementById("current-action");

let currentVerb = "";
let chosenVerb = "";
let currentObject = "";
let defaultVerb = look;

const inventory = document.getElementById("inventory");
let invSpaces = inventory.querySelectorAll('td.inv-obj');
let firstEmptySpace = "";
let inventoryList = [];
let selectedItem = {};
const previous = document.getElementById("previous");
const next = document.getElementById("next");

// Scenarios

const scenarios = document.getElementsByClassName("scenario");
let current = document.querySelector(".current");

// Verbs

look.addEventListener("click", () => {
	currentAction.innerText = look.value;
	currentVerb = look;
})

take.addEventListener("click", () => {
	currentAction.innerText = take.value;
	currentVerb = take;
})

open.addEventListener("click", () => {
	currentAction.innerText = open.value;
	currentVerb = open;
})

use.addEventListener("click", () => {
	currentAction.innerText = use.value;
	currentVerb = use;
})

talk.addEventListener("click", () => {
	currentAction.innerText = talk.value;
	currentVerb = talk;
})

read.addEventListener("click", () => {
	currentAction.innerText = read.value;
	currentVerb = read;
})


// Inventory

const items = {
	book1Inv: {
		look: () => {results.innerText = "El Ser, by Lin Carbajales.";},
		read: () => {results.innerText = "It's in Spanish.";},
		take: () => {results.innerText = "I already have it.";},
	},
	
	book2Inv: {
		look: () => {results.innerText = "Epiphany, by Jules V. Gachs.";},
		read: () => {results.innerText = "I hate that teacher.";},
		take: () => {results.innerText = "I already have it.";},
	},
	
	book3Inv: {
		look: () => {results.innerText = "Dagon, by H.P. Lovecraft.";},
		read: () => {results.innerText = "A classic short story from Lovecraft.";},
		take: () => {results.innerText = "I already have it.";},
	},
	
	book4Inv: {
		look: () => {results.innerText = "It, by Stephen King.";},
		read: () => {results.innerText = "It's a long one. Maybe later.";},
		take: () => {results.innerText = "I already have it.";},
	},
	
	book5Inv: {
		look: () => {results.innerText = "A book titled De Vermis Misteriis.";},
		read: () => {results.innerText = "I don't understand Latin.";},
		take: () => {results.innerText = "I already have it.";},
	},
	
	book6Inv: {
		look: () => {results.innerText = "Occultus, by Heiriarchus.";},
		read: () => {results.innerText = "It's too spooky for me.";},
		take: () => {results.innerText = "I already have it.";},
	},
	
	book7Inv: {
		look: () => {results.innerText = "The Dhol Chants.";},
		read: () => {results.innerText = "They look like ritual songs.";},
		take: () => {results.innerText = "I already have it.";},
	},
	
	letterInv: {
		look: () => {results.innerText = "A letter signed by H.P. Lovecraft.";},
		read: () => {results.innerText = '"Thanks for trying this demo of Lin\'s coding." - H.P. Lovecraft';},
		take: () => {results.innerText = "I already have it.";},
	},
	
	keyInv: {
		look: () => {results.innerText = "A very small, rusted key.";},
	},
	
	crowbarInv: {
		look: () => {results.innerText = "A short steel crowbar.";},
	},
}

// Function to check for inventory space

const checkForSpace =() => {
	let foundEmptySpace = false;
	for (var i = 0; i < invSpaces.length; i++) {
		if (invSpaces[i].textContent === '') {
			firstEmptySpace = invSpaces[i];
			foundEmptySpace = true;
			break;
		}
	}
	if (!foundEmptySpace) {
    firstEmptySpace = null;
  }
}


// Even listener for inventory cells

invSpaces.forEach(space => {
	space.addEventListener('mouseenter', () => {
		if (space.value) {
			if (currentVerb === "") {
				currentAction.innerText = defaultVerb.value + " " + space.value;
			} else {
				currentAction.innerText = currentVerb.value + " " + space.value;
		}} else {
			currentAction.innerText = currentVerb.value || "";
		}});
});

invSpaces.forEach(space => {
	space.addEventListener('mouseleave', () => {
		currentAction.innerText = currentVerb.value || "";
	});
});

invSpaces.forEach(space => {
	space.addEventListener('click', () => {
		chosenVerb = currentVerb ? currentVerb.id : defaultVerb.id;
		currentObject = items[space.id];
		if (currentObject[chosenVerb]) {
			currentObject[chosenVerb]();
		} else if (chosenVerb === "use") {
			useItem(space);
		} else {
			results.innerText = "I can't do that.";
		}
		currentAction.innerText = currentVerb.value || "";		
	});
});

// Function to use items from your inventory, turning them into your current verb to interact with

const useItem = (item) => {
	selectedItem = {
		id: item.value,
		value: `Use ${item.value} with`,
	};
	currentVerb = selectedItem;
}

// Inventory navigation, arrows appear when there're more than six itemas

let navigation =  inventory.querySelectorAll('td.navigation');

navigation.forEach(space => {
	space.addEventListener('mouseenter', () => {
		currentAction.innerText = "";
	});
});

navigation.forEach(space => {
	space.addEventListener('mouseleave', () => {
		currentAction.innerText = currentVerb.value || "";
	});
});

navigation.forEach(space => {
	space.addEventListener('click', () => {
		let mod = 0;
		let cell = "";
		let newIndex = 0;
		let lastIndex = inventoryList.length - 1;
		if (space.id === "previous") {
			mod = -1;
			invSpaces[invSpaces.length-1].style.display = "none";
			next.style.display = "inline-block";
		} else if (space.id === "next") {
			mod = 1;
			invSpaces[0].style.display = "none";
			previous.style.display = "inline-block";
			console.log(previous);
		}
		
			for (i=1; i<6; i++) {
				cell = invSpaces[i];
				for (j=0; j < inventoryList.length; j++) {
					if (cell.id === inventoryList[j].id) {
						newIndex = j + mod;
						if (newIndex >= 0 && newIndex <= lastIndex) {
							console.log(inventoryList[j + mod].id);
							cell.id = inventoryList[j + mod].id;
							cell.value = inventoryList[j + mod].innerText;
							cell.innerText = inventoryList[j + mod].innerText;
						}
						break;
					}					
				}
				if (inventoryList[1].id === invSpaces[1].id) {
					previous.style.display = "none";
					invSpaces[0].style.display = "inline-block";
				}				
			};
			
			if (inventoryList[inventoryList.length-1].id === invSpaces[invSpaces.length-1].id) {
					next.style.display = "none";
					invSpaces[invSpaces.length-1].style.display = "inline-block";
				}
		
	})
});


// Interactions with the enviroment
	
document.querySelectorAll('.point');
	
const points = document.querySelectorAll('.point');
const directions = document.querySelectorAll('.direction');

const clockCloseUp =  document.getElementById("clockCloseUp");
const studioDest =  document.getElementById("studio-dest");

let keyFound = false;
let crowbarFound = false;
let ashChecked = 0;
let novelsTaken = 0;
let occultTaken = 0;

// The points of interaction

const poi = {
	
	letter: {
		look: () => {results.innerText = "A letter signed by H.P. Lovecraft.";},
		read: () => {results.innerText = "I better take it first.";},
		take: () => {
			takeItem(letter);
			currentAction.innerText = "";
			books.src = "./images/noletter.png";
		}
	},
	
	manor: {
		look: () => {results.innerText = "The abandoned manor Lovecraft was rumored to visit.";},
		take: () => {results.innerText = "It's too big to take, even for an adventure game.";},
	},
	
	globe: {
		look: () => {results.innerText = "It looks like it can be opened. It has a keyhole.";},
		take: () => {results.innerText = "I don't want to carry it around.";},
		open: () => {
			if (keyFound === true) {
				results.innerText = "I opened it with the key.";
				globe.style.display = "none";
				openGlobe.style.display = "block";
			} else {
				results.innerText = "It's locked and I don't have the key.";
			}
		},
		key: () => {
			if (keyFound === true) {
				results.innerText = "I opened it with the key.";
				globe.style.display = "none";
				openGlobe.style.display = "block";
			} else {
				results.innerText = "It's locked and I don't have the key.";
			}
		},
	},
	
	ashes: {
		look: () => {
			ashChecked += 1;
			if (ashChecked == 1) {
				results.innerText = "They have been burning books and papers.";
			} else if (ashChecked == 2) {
				results.innerText = "I can't find a text which is still readable.";
			} else if (ashChecked == 3) {
				takeItem(key);
				results.innerText = "I've found a small key.";
				keyFound = true;
			} else {
				results.innerText = "I already have the key.";
			}
		},
	},
	
	openGlobe: {
		look: () => {
			if (crowbarFound === true) {
				results.innerText = "There's nothing else inside.";
			} else {
				results.innerText = "There is a crowbar inside.";
				openGlobe.style.display = "none";
				crowbar.style.display = "block";
				crowbarFound = true;
			}
		},
		take: () => {results.innerText = "I don't want to carry it around.";},
		open: () => {results.innerText = "It's already open.";},
		key: () => {results.innerText = "It's already open.";},
	},
	
	crowbar: {
		look: () => {results.innerText = "A small steel crowbar.";},
		take: () => {
			takeItem(crowbar);
			openGlobe.style.display = "block";
		}
	},
	
	clockCloseUp: {
		look: () => {results.innerText = "I think there's something in the wall behind the clock.";},
		read: () => {results.innerText = "A quarter to midnight. I think it's broken.";},
		open: () => {results.innerText = "I can't move it with my bare hands. It's fixed in place somehow.";},
		take: () => {results.innerText = "I can't move it with my bare hands. It's fixed in place somehow.";},
		use: () => {results.innerText = "I can't move it with my bare hands. It's fixed in place somehow.";},
		crowbar:  () => {
			results.innerText = "I moved the clock with the crowbar. There's a passageway behind.";
			clockCloseUp.style.display = "none";
			studioDest.style.display = "block";
		},
	},
	
	mess: {
		look: () => {results.innerText = "Someone has trashed the place.";},
		take: () => {results.innerText = "I can't find anything useful.";},
	},
	
	novels: {
		look: () => {results.innerText = "There's just a bunch of horror novels left.";},
		take: () => {
			novelsTaken += 1;
			if (novelsTaken == 1) {
				takeItem(book1);
				results.innerText = "I've picked one small novel.";
			} else if (novelsTaken == 2) {
				takeItem(book2);
				results.innerText = "Another good-looking novel.";
			} else if (novelsTaken == 3) {
				takeItem(book3);
				results.innerText = "This one's the smallest.";
			} else if (novelsTaken == 4) {
				takeItem(book4);
				results.innerText = "This one's very heavy.";
			} else {
				results.innerText = "I'm already carrying too many novels.";
			}
		},
	},
	
	occult: {
		look: () => {results.innerText = "Books on the supernatural.";},
		take: () => {
			occultTaken += 1;
			if (occultTaken == 1) {
				takeItem(book5);
				results.innerText = "I like this leather cover.";
			} else if (occultTaken == 2) {
				takeItem(book6);
				results.innerText = "This one's in English, I think.";
			} else if (occultTaken == 3) {
				takeItem(book7);
				results.innerText = "This one looks beautiful.";
			} else {
				results.innerText = "I'm already carrying enough of these.";
			}
		},
	},
}

const takeItem = (item) => {
	results.innerText = `I have the ${item.dataset.value}.`;
	checkForSpace();
	let pickedItem = firstEmptySpace || invSpaces[invSpaces.length - 1];
	pickedItem.innerText = item.dataset.value;
	pickedItem.id = `${item.id}Inv`;
	pickedItem.value = item.dataset.value;
	let clonedTd = pickedItem.cloneNode(true);
	inventoryList.push(clonedTd);
	item.remove();
	if (inventoryList.length > 6) {
		for (i=1; i<6; i++) {
			invSpaces[invSpaces.length - i].innerText = inventoryList[inventoryList.length -i].innerText;
			invSpaces[invSpaces.length - i].id = inventoryList[inventoryList.length -i].id;
			invSpaces[invSpaces.length - i].value = inventoryList[inventoryList.length -i].innerText;
		};
		invSpaces[0].style.display = "none";
		previous.style.display = "inline-block";
		invSpaces[invSpaces.length-1].style.display = "inline-block";
		next.style.display = "none";
	};
	navigation = inventory.querySelectorAll("td.navigation");
}

// Event listeners for the points of interest in the enviroment

points.forEach(space => {
	space.addEventListener('mouseenter', () => {
		if (currentVerb) {
			currentAction.innerText = currentVerb.value + " " + space.dataset.value;
		} else {
			currentAction.innerText = defaultVerb.value + " " + space.dataset.value;
		};
	});
});

points.forEach(space => {
	space.addEventListener('mouseleave', () => {
		currentAction.innerText = currentVerb.value || "";
	});
});

points.forEach(space => {
	space.addEventListener('click', () => {
		chosenVerb = currentVerb ? currentVerb.id : defaultVerb.id;
		currentObject = poi[space.id];
		if (currentObject[chosenVerb]) {
			currentObject[chosenVerb]();
		} else {
			results.innerText = "I can't do that.";
		}
		
	});
});


// Even listeners to move from one scene to another


directions.forEach(space => {
	space.addEventListener('mouseenter', () => {
		document.body.style.cursor = "crosshair";
		currentAction.innerText = "Go to" + " " + space.dataset.value;
	});
});

directions.forEach(space => {
	space.addEventListener('mouseleave', () => {
		currentAction.innerText = currentVerb.value || "";
		document.body.style.cursor = "default";
	});
});

directions.forEach(space => {
	space.addEventListener('click', () => {
		current.classList.remove("current");
		destiny = space.dataset.value;
		for (var i = 0; i < scenarios.length; i++) {
			if (scenarios[i].id === destiny) {
				scenarios[i].classList.add("current");
				current = document.querySelector(".current");
				results.innerText = "";
				currentVerb = "";
				break;
			}		
		}
	})
});

