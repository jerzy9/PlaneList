const militaryAircraft = [

    {
        name: "F-117 Nighthawk",
        image: "F117.jpg"
    },

    {
        name: "Northrop B-2 Spirit",
        image: "B2.jpg"
    },

    {
        name: "Boeing B-52 Stratofortress",
        image: "B52.jpg"
    },

    {
        name: "Rockwell B-1B Lancer",
        image: "b1b lancer.jpg"
    },

    {
        name: "Northrop B-21 Raider",
        image: "b21 raider.jpg"
    }

];


const fighterAircraft = [

     {
        name: "F-35A Lightning II",
        image: "F-35.jpg"
    },

    {
        name: "F-22 Raptor" ,
        image: "f-22.jpg"
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


    // Tylko F-35A otwiera popup
    if (aircraft.name === "F-35A Lightning II") {

        card.addEventListener("click", () => {

            document
                .getElementById("aircraft-popup")
                .classList.add("active");

        });

    }

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
displayAircraft(fighterAircraft, "fighters");



const popup = document.getElementById("aircraft-popup");
const closeButton = document.getElementById("popup-close");


// ZAMKNIĘCIE PRZYCISKIEM X

closeButton.addEventListener("click", () => {

    popup.classList.remove("active");

});


// ZAMKNIĘCIE PO KLIKNIĘCIU POZA OKNEM

popup.addEventListener("click", (event) => {

    if (event.target === popup) {

        popup.classList.remove("active");

    }

});


// ZAMKNIĘCIE KLAWISZEM ESC

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        popup.classList.remove("active");

    }

});