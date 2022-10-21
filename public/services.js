// json data. Yes I had fun making it up
json_data = {"information":[
    {
        "title": "Wash Ben's car",
        "author": "Ben",
        "startTime": "1:00 PM",
        "endTime": "1:30 PM",
        "date": "08/19/2022",
        "description": "The car is dirty so use a hose and a rag to clean the dirt off.  You will totally learn valuable skills. Not a chore.",
        "schools":
        [
            "School of Public Safety", 
            "School of Industry and Trades" 
        ]
    }]}
var xhr = new XMLHttpRequest(); // request json

xhr.open("POST", "/services");

xhr.setRequestHeader(
    "Content-Type", "application/json"
  );

xhr.send('');
// wait for json data!


xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 &&
        xhr.status === 200) {
        // Print received data from server
        
        json_data = JSON.parse(this.responseText);
        document.querySelector(".search-picture").click();
    }
};


// define filter variables
Agriculture = false;
ArtsPerformanceHumanities = false;
BehavioralSocialScience = false;
BusinessComputing = false;
FitnessHealth = false;
IndustryTrades = false;
LanguageArtsEducation = false;
PublicSafety = false;
ScienceMathematics = false;

// initialize the code by displaying all the services
window.onload = function() {
    
  };

// when the enter key is pressed in the searchbox, act like the user just clicked search
// coppied from the internet a little bit :)

document.querySelector(".input-for-search").addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 13) { // keycode 13 reffers to "enter"
        document.querySelector(".search-picture").click(); // simulate a click
    }
});

const searchButton = document.querySelector(".search-picture");
//wait for someone to edit the text in the search bar
searchButton.addEventListener('click', (event) => {
    // get the string to search for
    user_input = document.querySelector(".input-for-search").value;
    // clear the previous results
    const results = document.querySelector('.results');
    results.innerHTML = ''
    // search for the given string in title, author, and description of all possible services
    list = search(user_input,"title",[])
    list = search(user_input,"author",list)
    list = search(user_input,"description",list)
    list = Filter(list)
    // show search results
    for (service of list){
        //create the div, headers, and paragraphs needed for the service 
        const result = document.createElement("div");
        const title = document.createElement("h1");
        const author = document.createElement("h5");
        const time = document.createElement("p");
        const date = document.createElement("p");
        const description = document.createElement("p");
        var schools = document.createElement("p"); // schools needs to be able to be changed
        // add the correct text to each one (other than schools)
        title.textContent = service.title;
        author.textContent = service.author;
        time.textContent = service.startTime + " - " + service.endTime; //put start and end time into one line
        date.textContent = service.date;
        description.textContent = service.description;
        // write the html for each school icon
        schools = addIcons(schools, service)
        // give each one a class I hope this is helpful for css and/ or JS later
        result.classList.add('result-container');
        title.classList.add('result-title');
        author.classList.add('result-author');
        time.classList.add('result-time');
        date.classList.add('result-date');
        description.classList.add('result-description');
        schools.classList.add('result-schools');
        // arrange the text in the result-container
        result.appendChild(title)
        result.appendChild(author)
        result.appendChild(time)
        result.appendChild(date)
        result.appendChild(description)
        result.appendChild(schools)
        //display this search result!
        results.appendChild(result)
    }
    
});

// filter submit button
filterSubmit = document.querySelector(".filter-submit")
filterSubmit.addEventListener('click', (event) => {
    //I tried to base variable names off of school names
    Agriculture = document.getElementById('filter1').checked;
    ArtsPerformanceHumanities = document.getElementById('filter2').checked;
    BehavioralSocialScience = document.getElementById('filter3').checked;
    BusinessComputing = document.getElementById('filter4').checked;
    FitnessHealth = document.getElementById('filter5').checked;
    IndustryTrades = document.getElementById('filter6').checked;
    LanguageArtsEducation = document.getElementById('filter7').checked;
    PublicSafety = document.getElementById('filter8').checked;
    ScienceMathematics = document.getElementById('filter9').checked;

    document.querySelector(".search-picture").click(); // simulate a click in order to refresh
})

// filter reset button
filterReset = document.querySelector(".filter-reset")
filterReset.addEventListener('click', (event) => {
    // set all boxes to not be checked
    document.getElementById('filter1').checked = false;
    document.getElementById('filter2').checked = false;
    document.getElementById('filter3').checked = false;
    document.getElementById('filter4').checked = false;
    document.getElementById('filter5').checked = false;
    document.getElementById('filter6').checked = false;
    document.getElementById('filter7').checked = false;
    document.getElementById('filter8').checked = false;
    document.getElementById('filter9').checked = false;
    // cause filterSubmit to run, which will update filters
    document.querySelector(".filter-submit").click(); 
})


function addIcons(container,service){
    for (school of service.schools){
        //create the schools box, and elements to go in the schools box
        schoolsBox = document.createElement("div")
        icon = document.createElement('div')
        image = document.createElement('i') // the object that displays the icon
        iconText = document.createElement('span')
        //give all elements a css class
        schoolsBox.classList.add("schools-box")
        icon.classList.add("icon")
        iconText.classList.add("icon-text")
        // give image the correct class based on the school
        image.classList.add("fa-solid")
        image.classList.add("fa-3x")
        if (school === "School of Agriculture"){    
            image.classList.add("fa-cow")    
        }
        if (school === "School of Arts, Performance, & the Humanities"){    
            image.classList.add("fa-masks-theater")    
        }
        if (school === "School of Behavioral and Social Science"){    
            image.classList.add("fa-users")    
        }
        if (school === "School of Business and Computing"){    
            image.classList.add("fa-chart-line")    
        }
        if (school === "School of Fitness and Health Professions"){    
            image.classList.add("fa-heart-pulse")    
        }
        if (school === "School of Industry and Trades"){    
            image.classList.add("fa-gears")    
        }
        if (school === "School of Language Arts and Education"){    
            image.classList.add("fa-book")    
        }
        if (school === "School of Public Safety"){    
            image.classList.add("fa-house-chimney-medical")    
        }
        if (school === "School of Science and Mathematics"){    
            image.classList.add("fa-flask")    
        }
        iconText.textContent = school
        icon.appendChild(image)
        schoolsBox.appendChild(icon)
        
        container.appendChild(schoolsBox)
    }
    return container
}

function search(keyword,attribute,list) {
     // list of matches
    for (service of json_data.information){
        //find out if text is in the given attribute
        text = service[attribute].toLowerCase();
        if (text.includes(keyword.toLowerCase())){
            // don't create miltiple copies of the same result if the keyword appears twice
            if (list.includes(service)){

            }
            else{ // if this is the first time we have seen this service
                list.push(service) // add the service to the list
            }
            
        }
    }
    return list; 
  }


  function Filter(list){
    
    // add filters to a list
    filters = []
    if (Agriculture){
        filters.push("School of Agriculture")
    }
    if (ArtsPerformanceHumanities){
        filters.push("School of Arts, Performance, & the Humanities")
    }
    if (BehavioralSocialScience){
        filters.push("School of Behavioral and Social Science")
    }
    if (BusinessComputing){
        filters.push("School of Business and Computing")
    }
    if (FitnessHealth){
        filters.push("School of Fitness and Health Professions")
    }
    if (IndustryTrades){
        filters.push("School of Industry and Trades")
    }
    if (LanguageArtsEducation){
        filters.push("School of Language Arts and Education")
    }
    if (PublicSafety){
        filters.push("School of Public Safety")
    }
    if (ScienceMathematics){
        filters.push("School of Science and Mathematics")
    }

    newList = []
    for (service of list){ // for every service
        schools = service.schools
        matches = 0 
        neededMatches = filters.length
        for (filter of filters){ // only adds the service if it has every school required by the filter
            for (school of schools){
                if (school == filter){
                    matches+=1 // this school has a match
                }
            }
        }
        if (matches >= neededMatches){ // if every filter had a match
            newList.push(service) // add this service to the list
        }
        
    }

    return newList

}