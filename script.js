
const militaryAircraft = [
    { name: "F-117 Nighthawk", image: "F117.jpg", type: "STEALTH ATTACK AIRCRAFT" },
    { name: "Northrop B-2 Spirit", image: "B2.jpg", type: "STEALTH STRATEGIC BOMBER" },
    { name: "Boeing B-52 Stratofortress", image: "B52.jpg", type: "STRATEGIC BOMBER" },
    { name: "Rockwell B-1B Lancer", image: "b1b lancer.jpg", type: "HEAVY BOMBER" },
    { name: "Northrop B-21 Raider", image: "b21 raider.jpg", type: "NEXT-GENERATION STEALTH BOMBER" }
];

const fighterAircraft = [
    { name: "F-35A Lightning II", image: "F-35.jpg", type: "MULTIROLE STEALTH FIGHTER" },
    { name: "F-22 Raptor", image: "f-22.jpg", type: "AIR SUPERIORITY FIGHTER" }
];

const allAircraft = [...militaryAircraft, ...fighterAircraft];

// TWORZENIE KART
function createAircraftCard(aircraft) {
    const card = document.createElement("div");
    card.className = "aircraft-card";

    const image = document.createElement("img");
    image.src = aircraft.image;
    image.alt = aircraft.name;

    const name = document.createElement("div");
    name.className = "aircraft-name";
    name.textContent = aircraft.name;

    card.appendChild(image);
    card.appendChild(name);

    // OTWIERANIE POPUPU F-35
    if (aircraft.name === "F-35A Lightning II") {
        card.addEventListener("click", () => {
            document.getElementById("aircraft-popup")?.classList.add("active");
        });
    }

    // OTWIERANIE POPUPU F-22
    if (aircraft.name === "F-22 Raptor") {
        card.addEventListener("click", () => {
            document.getElementById("f22-popup")?.classList.add("active");
        });
    }

    return card;
}

// WYŚWIETLANIE KART
function displayAircraft(aircraftList, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error("Nie znaleziono elementu #" + containerId);
        return;
    }

    container.innerHTML = "";

    aircraftList.forEach(aircraft => {
        container.appendChild(createAircraftCard(aircraft));
    });
}

displayAircraft(militaryAircraft, "military");
displayAircraft(fighterAircraft, "fighters");

// POPUP F-35
const popup = document.getElementById("aircraft-popup");
const popupClose = document.getElementById("popup-close");

// POPUP F-22
const f22Popup = document.getElementById("f22-popup");
const f22Close = document.getElementById("f22-popup-close");

// ZAMYKANIE POPUPU F-35
if (popup && popupClose) {
    popupClose.addEventListener("click", () => {
        popup.classList.remove("active");
    });

    popup.addEventListener("click", event => {
        if (event.target === popup) {
            popup.classList.remove("active");
        }
    });
}

// ZAMYKANIE POPUPU F-22
if (f22Popup && f22Close) {
    f22Close.addEventListener("click", () => {
        f22Popup.classList.remove("active");
    });

    f22Popup.addEventListener("click", event => {
        if (event.target === f22Popup) {
            f22Popup.classList.remove("active");
        }
    });
}

// AIRCRAFT COMPARISON
const comparisonScreen = document.getElementById("comparison-screen");
const openComparisonButton = document.getElementById("open-comparison");
const closeComparisonButton = document.getElementById("close-comparison");

const aircraftOneSelect = document.getElementById("aircraft-one");
const aircraftTwoSelect = document.getElementById("aircraft-two");

// WYPEŁNIANIE LIST SAMOLOTÓW
function populateAircraftSelect(select) {
    if (!select) return;

    select.innerHTML = "";

    allAircraft.forEach((aircraft, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = aircraft.name;
        select.appendChild(option);
    });
}

populateAircraftSelect(aircraftOneSelect);
populateAircraftSelect(aircraftTwoSelect);

// AKTUALIZACJA WYŚWIETLANYCH SAMOLOTÓW
function updateComparisonAircraft(index, side) {
    const aircraft = allAircraft[index];
    if (!aircraft) return;

    const image = document.getElementById(`image-${side}`);
    const name = document.getElementById(`name-${side}`);
    const type = document.getElementById(`type-${side}`);

    if (image) {
        image.src = aircraft.image;
        image.alt = aircraft.name;
    }

    if (name) name.textContent = aircraft.name;
    if (type) type.textContent = aircraft.type;
}

function refreshComparison() {
    if (!aircraftOneSelect || !aircraftTwoSelect) return;

    updateComparisonAircraft(Number(aircraftOneSelect.value), "one");
    updateComparisonAircraft(Number(aircraftTwoSelect.value), "two");
}

// DOMYŚLNIE B-21 VS B-2
if (aircraftOneSelect && aircraftTwoSelect) {
    const b21Index = allAircraft.findIndex(
        aircraft => aircraft.name === "Northrop B-21 Raider"
    );

    const b2Index = allAircraft.findIndex(
        aircraft => aircraft.name === "Northrop B-2 Spirit"
    );

    aircraftOneSelect.value = String(b21Index);
    aircraftTwoSelect.value = String(b2Index);

    refreshComparison();

    aircraftOneSelect.addEventListener("change", refreshComparison);
    aircraftTwoSelect.addEventListener("change", refreshComparison);
}

// OTWIERANIE PORÓWNYWARKI
function openComparisonScreen() {
    if (!comparisonScreen) return;

    comparisonScreen.classList.add("active");
    comparisonScreen.setAttribute("aria-hidden", "false");
    document.body.classList.add("comparison-open");
}

// ZAMYKANIE PORÓWNYWARKI
function closeComparisonScreen() {
    if (!comparisonScreen) return;

    comparisonScreen.classList.remove("active");
    comparisonScreen.setAttribute("aria-hidden", "true");
    document.body.classList.remove("comparison-open");
}

if (openComparisonButton) {
    openComparisonButton.addEventListener("click", openComparisonScreen);
}

if (closeComparisonButton) {
    closeComparisonButton.addEventListener("click", closeComparisonScreen);
}

// ESC ZAMYKA POPUPY I PORÓWNYWARKĘ
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeComparisonScreen();

        if (popup) popup.classList.remove("active");
        if (f22Popup) f22Popup.classList.remove("active");
    }
});
