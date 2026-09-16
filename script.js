const militaryAircraft = [

    {
        name: "F-117 Nighthawk",
        image: "f117.jpg"
    },

    {
        name: "Northrop B-2 Spirit",
        image: "b-2.jpg"
    },

    {
        name: "Boeing B-52 Stratofortress",
        image: "b-52.jpg"
    },

       {
        name: "Rockwell B-1B Lancer",
        image: "b-1.jpg"
    },

        {
        name: " Northrop B-21 Raider",
        image: " Northrop Grumman B-21 Raider.jpg"
    }


];


function createAircraftCard(aircraft) {

    const card = document.createElement("div");

    card.className = "aircraft-card";

    card.innerHTML = `
        <img src="${aircraft.image}" alt="${aircraft.name}">
        <div class="aircraft-name">
            ${aircraft.name}
        </div>
    `;

    return card;
}


function displayAircraft(aircraftList, containerId) {

    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Nie znaleziono elementu #${containerId}`);
        return;
    }

    aircraftList.forEach(aircraft => {

        const card = createAircraftCard(aircraft);

        container.appendChild(card);

    });
}


displayAircraft(militaryAircraft, "military");