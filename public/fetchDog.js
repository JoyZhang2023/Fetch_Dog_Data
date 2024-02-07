
// Fetch dog breed list from Dog API
const input = "https://dogapi.dog/api/v2/breeds";

fetch(input).then(res => {
    if(!res.ok) {
        throw new Error("Network response was not OK");
    };
    return res.json();
}).then(datafile => {
    console.log(datafile); // print out json file
    
    datafile.data.forEach(element => {
        
        const markup = `<ul>${element.attributes.name}</ul>`;
        document.querySelector('ul').insertAdjacentHTML('beforeend',markup);

        // insert name for drop down list
        const listRow = `<option value=${element.id}>${element.attributes.name}</option>`;
        document.getElementById("breeds").insertAdjacentHTML('beforeend',listRow);

    });

    // list selection and output of breed details

    let submitButton = document.getElementById("submit");
    submitButton.addEventListener('click',()=>{
        let dropdownList = document.getElementById("breeds");
        let updateInput = input+"/"+ dropdownList.value.toString();
        fetch(updateInput).then(res=> {
            if(!res.ok) {
                throw new Error("Network response was not OK");
            };
            return res.json();
        }).then(breed => {
            document.querySelector('p2').insertAdjacentHTML('beforeend',breed.data.attributes.description);
        }).catch(error => {
            console.error("Error:", error);
        })
    });

    // part 3 use ID from above to fetch detailed info
    let row = "";
    datafile.data.forEach(element => {
        
        let inputID = `https://dogapi.dog/api/v2/breeds/${element.id}`;
        
        fetch(inputID).then(res => {
            if(!res.ok) {
                throw new Error("Network response was not OK");
            };
            return res.json();
        }).then(datafile => {
            // insert data to html table
            row +=`<tr><td>${datafile.data.id}</td><td>${datafile.data.attributes.name}</td><td>${datafile.data.attributes.description}</td><td>${datafile.data.attributes.life.min} to ${datafile.data.attributes.life.max} years</td></tr>`;
            document.getElementById("data-output").innerHTML = row;
    
        }).catch(error => {
            console.error("Error:", error);
        })
    })    

}).catch(error => {
    console.error("Error:", error);
})

// Part 5: Dog Facts and Groups

// random integer from 0 to 99 for dog fact
let factNumber = Math.floor(Math.random() * 100);
fetch("https://dogapi.dog/api/v2/facts?limit=" + factNumber.toString()).then(res => {
    if(!res.ok) {
        throw new Error("Network response was not OK");
    };
    return res.json();
}).then(fact => {
    document.getElementById("facts").innerHTML = fact.data[0].attributes.body;

}).catch(error => {
    console.error("Error:", error);
})

// display dog group information
fetch("https://dogapi.dog/api/v2/groups").then(res => {
    if(!res.ok) {
        throw new Error("Network response was not OK");
    };
    return res.json();
}).then(group => {
    group.data.forEach(element => {
        let row = `<ul>${element.attributes.name}</ul>`
        document.getElementById("groups").insertAdjacentHTML('beforeend', row);
    })
}).catch(error => {
    console.error("Error:", error);
})
