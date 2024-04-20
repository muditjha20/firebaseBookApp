let state = [];

async function getData() {
    try {
        let response = await fetch("https://perenual.com/api/species-list?key=sk-wCuG66231bce7eaf35192");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data; // Extract the 'data' part from the response
    } catch (e) {
        console.error('Error fetching plant data:', e);
    }
}

// Function to fetch plant data
async function showAllPlants() {
    state = await getData();
    drawTable(state);
}
showAllPlants();

// Function to display plant data in HTML
function drawTable(records) {
    const result = document.querySelector("#plant-list-container");
    if (!result) {
        console.error('#plant-list-container not found in HTML');
        return;
    }

    let html = '';
    for (let record of records) {
        // Build HTML string
        html += `<div class="grid-item">
            <p><strong>ID:</strong> ${record.id}</p>
            <p><strong>Common Name:</strong> ${record.common_name}</p>`;
        
        // Check if default_image exists and is not null
        if (record.default_image && record.default_image.small_url) {
            html += `<img src="${record.default_image.small_url}" alt="${record.common_name}">`;
        } else if (record.default_image && record.default_image.original_url) {
            // Use original_url if small_url is not available
            html += `<img src="${record.default_image.original_url}" alt="${record.common_name}">`;
        } else {
            // Provide a default image or handle the case where no image is available
            html += `<p>No image available</p>`;
        }

        html += `<p><strong>Scientific Name:</strong> ${record.scientific_name}</p>
            <p><strong>Cycle:</strong> ${record.cycle}</p>
            <p><strong>Watering:</strong> ${record.watering}</p>
            <p><strong>Sunlight:</strong> ${record.sunlight}</p>
            <button class = "button" onclick="addToMarketplace(JSON.parse(atob('${btoa(JSON.stringify(record.id))}')), JSON.parse(atob('${btoa(JSON.stringify(record.common_name))}')), JSON.parse(atob('${btoa(JSON.stringify(record.scientific_name))}')), JSON.parse(atob('${btoa(JSON.stringify(record.cycle))}')), JSON.parse(atob('${btoa(JSON.stringify(record.watering))}')), JSON.parse(atob('${btoa(JSON.stringify(record.sunlight))}')), JSON.parse(atob('${btoa(JSON.stringify(record.default_image ? (record.default_image.small_url || record.default_image.original_url) : [].join()))}')))">Add to Marketplace</button>
</div>`;
    }
    result.innerHTML = html;
}

let marketLength = parseInt(localStorage.marketLength) || 0;
for(let i=0;i<marketLength;i++){
    const {id, commonName, scientificName, cycle, watering, sunlight, imageUrl, name, phone, price}=JSON.parse(localStorage['market-item-'+i]);
    addToMarketplace(id, commonName, scientificName, cycle, watering, sunlight, imageUrl, name, phone, price, true);
}
// Function to add a plant to the marketplace
function addToMarketplace(id, commonName, scientificName, cycle, watering, sunlight, imageUrl, name, phone, price, loadedFromLocalStorage) {
    // Prompt user for name, phone number, and price
    name = name || prompt("Please enter your name:");
    phone = phone || prompt("Please enter your phone number:");
    price = price || prompt("Please enter the price of the plant:");

    // Check if user clicked cancel or left input empty
    if (name === null || name.trim() === "" || phone === null || phone.trim() === "" || price === null || price.trim() === "") {
        alert("Name, phone number, or price cannot be empty. Plant not added to marketplace.");
        return;
    }
    if(!loadedFromLocalStorage){
        const object={id, commonName, scientificName, cycle, watering, sunlight, imageUrl, name, phone, price};
        localStorage.setItem('market-item-'+marketLength, JSON.stringify(object));
        marketLength = marketLength + 1;
        localStorage.setItem('marketLength', marketLength);
    }

    const marketplace = document.querySelector("#marketplace");
    const entry = document.createElement("div");
    entry.classList.add("grid-item");

    let html = `
        <p><strong>ID:</strong> ${id}</p>
        <p><strong>Common Name:</strong> ${commonName}</p>`;

    if (imageUrl) {
        html += `<img src="${imageUrl}" alt="${commonName}">`;
    } else {
        html += `<p>No image available</p>`;
    }

    html += `
        <p><strong>Scientific Name:</strong> ${scientificName}</p>
        <p><strong>Cycle:</strong> ${cycle}</p>
        <p><strong>Watering:</strong> ${watering}</p>
        <p><strong>Sunlight:</strong> ${sunlight}</p>
        <p><strong>Seller name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Price:</strong> $${price}</p>`;

    entry.innerHTML = html;
    marketplace.appendChild(entry);

    // Alert the user that the plant has been successfully added to the marketplace
    if(!loadedFromLocalStorage){
        alert("Plant successfully added to the marketplace!");
    }
}


// Function to perform a search
function search() {
    let searchKey = document.querySelector('#searchKey').value.trim().toLowerCase();
    console.log('Search key:', searchKey);
    let results = [];
    for (let rec of state) {
        let searchText = rec.common_name.toLowerCase();
        if (searchText.includes(searchKey)) {
            results.push(rec);
        }
    }
    drawTable(results);
}
