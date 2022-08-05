// The states object
let states = [
  {
    name: 'alabama'
  },
  {
    name: 'alaska'
  },
  {
    name: 'arizona'
  },
  {
    name: 'arkansas'
  },
  {
    name: 'california'
  },
  {
    name: 'colorado'
  },
  {
    name: 'connecticut'
  },
  {
    name: 'delaware'
  },
  {
    name: 'florida'
  },
  {
    name: 'georgia'
  },
  {
    name: 'hawaii'
  },
  {
    name: 'idaho'
  },
  {
    name: 'illinois'
  },
  {
    name: 'indiana'
  },
  {
    name: 'iowa'
  },
  {
    name: 'kansas'
  },
  {
    name: 'kentucky'
  },
  {
    name: 'louisiana'
  },
  {
    name: 'maine'
  },
  {
    name: 'maryland'
  },
  {
    name: 'massachusetts'
  },
  {
    name: 'michigan'
  },
  {
    name: 'minnesota'
  },
  {
    name: 'mississippi'
  },
  {
    name: 'missouri'
  },
  {
    name: 'montana'
  },
  {
    name: 'nebraska'
  },
  {
    name: 'nevada'
  },
  {
    name: 'new hampshire'
  },
  {
    name: 'new jersey'
  },
  {
    name: 'new mexico'
  },
  {
    name: 'new york'
  },
  {
    name: 'north carolina'
  },
  {
    name: 'north dakota'
  },
  {
    name: 'ohio'
  },
  {
    name: 'oklahoma'
  },
  {
    name: 'oregon'
  },
  {
    name: 'pennsylvania'
  },
  {
    name: 'rhode island'
  },
  {
    name: 'south carolina'
  },
  {
    name: 'south dakota'
  },
  {
    name: 'tennessee'
  },
  {
    name: 'texas'
  },
  {
    name: 'utah'
  },
  {
    name: 'vermont'
  },
  {
    name: 'virginia'
  },
  {
    name: 'washington'
  },
  {
    name: 'west virginia'
  },
  {
    name: 'wisconsin'
  },
  {
    name: 'wyoming'
  }
];

// Get the relevant elements
let input = document.querySelector('#state-name');
let btn = document.querySelector('#btn');
let listContainer = document.querySelector('.list-container');
let correctList = document.querySelector('#correct-list');
let score = document.querySelector('#score');
let form = document.querySelector('#form');

// Set up empty array and count variable
let previousCorrect = [];
let count = 0;

function getStateMap (name) {
  $.ajax({
    url: "https://collections.leventhalmap.org/search.json?per_page=100&q=" + name + "&search_field=exemplary_image_ss",
    type:"Get",
    dataType: "json",
    success:function(response){
        let mapImg = document.querySelector('.map');
        let mapsLabel = document.querySelector('.mapsLabel');
        let totalResults = response.response.docs.length;
        let randomImg = Math.floor(Math.random() * totalResults);
        let urlSmall = "https://iiif.digitalcommonwealth.org/iiif/2/" + response.response.docs[randomImg].exemplary_image_ssi + "/full/!600,600/0/default.jpg";
        let url = "https://iiif.digitalcommonwealth.org/iiif/2/" + response.response.docs[randomImg].exemplary_image_ssi + "/full/full/0/default.jpg";
        mapImg.src = urlSmall;

        // Capitalise the first letter of each word
        let wordsName = name.split(' ');

        for (let i = 0; i < wordsName.length; i++) {
          wordsName[i] = wordsName[i][0].toUpperCase() + wordsName[i].substr(1);
        }

        nameCapitalised = wordsName.join(' ');

        mapsLabel.textContent = nameCapitalised + ' is correct!';

        correctList.innerHTML += `<li><a href="${url}" target="_blank">${nameCapitalised}</a></li>`;
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert('Oops! something went wrong!');
    }
  });
}


function checkState () {
  let stateGuess = input.value.toLowerCase();
  let stateCorrect;

  // If there is currently a notice on the page, remove it
  let notice = document.querySelector('#notice');

  if (notice) {
    notice.remove();
  }

  // Check the guessed name against the states object
  states.forEach(function (state, i) {
    if (stateGuess === state.name) {
      stateCorrect = stateGuess;
      stateIsCorrect(stateCorrect);
    }
    console.log(previousCorrect);
  })

  // If the state doesn't match, provide a notice
  if (!stateCorrect) {

    // Create a notification
    let notice = document.createElement('div');
    notice.setAttribute('id', 'notice');
    notice.setAttribute('aria-live', 'polite');
    notice.setAttribute('class', 'notice-style');

    // Inject it into the DOM
    form.append(notice);

    let notices = document.querySelectorAll('#notice').length;
    console.log(notices);

    // Add text after it's in the UI
    setTimeout(function () {
      if (notices > 1) {
        return;
      }

      notice.textContent = 'That is not a state - try again!';
      notices--;
    }, 1);

    input.value = '';
  }

  // Clear form value
  input.value = '';
}

function stateIsCorrect (stateCorrect) {
  if (!previousCorrect.includes(stateCorrect)) {
    // Add original, lowercase string to array
    previousCorrect.push(stateCorrect);

    // Call the function to get an image - with stateCorrect as the input
    getStateMap(stateCorrect);

    // Add to count and display new score
    count++;
    score.innerHTML = `${count}/50`;
  } else {

    // Create a notification
    let notice = document.createElement('div');
    notice.setAttribute('id', 'notice');
    notice.setAttribute('aria-live', 'polite');
    notice.setAttribute('class', 'notice-style');

    notice.style.padding = '16px 0';

    // Inject it into the DOM
    form.append(notice);

    let notices = document.querySelectorAll('#notice').length;
    console.log(notices);

    // Add text after it's in the UI
    setTimeout(function () {
      if (notices > 1) {
        return;
      }

      notice.textContent = 'You have already named that state - try again!';
      notices--;
    }, 1);
  }
}


// Listen for DOM events
btn.addEventListener('click', checkState);
