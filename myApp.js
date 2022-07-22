// The states info
let states = [
  {
    name: 'alabama',
    code: ''
  },
  {
    name: 'alaska',
    code: ''
  },
  {
    name: 'arizona',
    code: ''
  },
  {
    name: 'arkansas',
    code: ''
  },
  {
    name: 'california',
    code: ''
  },
  {
    name: 'colorado',
    code: ''
  },
  {
    name: 'connecticut',
    code: ''
  },
  {
    name: 'delaware',
    code: ''
  },
  {
    name: 'florida',
    code: ''
  },
  {
    name: 'georgia',
    code: ''
  },
  {
    name: 'hawaii',
    code: ''
  },
  {
    name: 'idaho',
    code: ''
  },
  {
    name: 'illinois',
    code: ''
  },
  {
    name: 'indiana',
    code: ''
  },
  {
    name: 'iowa',
    code: ''
  },
  {
    name: 'kansas',
    code: ''
  },
  {
    name: 'kentucky',
    code: ''
  },
  {
    name: 'louisiana',
    code: ''
  },
  {
    name: 'maine',
    code: ''
  },
  {
    name: 'maryland',
    code: ''
  },
  {
    name: 'massachusetts',
    code: ''
  },
  {
    name: 'michigan',
    code: ''
  },
  {
    name: 'minnesota',
    code: ''
  },
  {
    name: 'mississippi',
    code: ''
  },
  {
    name: 'missouri',
    code: ''
  },
  {
    name: 'montana',
    code: ''
  },
  {
    name: 'nebraska',
    code: ''
  },
  {
    name: 'nevada',
    code: ''
  },
  {
    name: 'new hampshire',
    code: ''
  },
  {
    name: 'new jersey',
    code: ''
  },
  {
    name: 'new mexico',
    code: ''
  },
  {
    name: 'new york',
    code: ''
  },
  {
    name: 'north carolina',
    code: ''
  },
  {
    name: 'north dakota',
    code: ''
  },
  {
    name: 'ohio',
    code: ''
  },
  {
    name: 'oklahoma',
    code: ''
  },
  {
    name: 'oregon',
    code: ''
  },
  {
    name: 'pennsylvania',
    code: ''
  },
  {
    name: 'rhode island',
    code: ''
  },
  {
    name: 'south carolina',
    code: ''
  },
  {
    name: 'south dakota',
    code: ''
  },
  {
    name: 'tennessee',
    code: ''
  },
  {
    name: 'texas',
    code: ''
  },
  {
    name: 'utah',
    code: ''
  },
  {
    name: 'vermont',
    code: ''
  },
  {
    name: 'virginia',
    code: ''
  },
  {
    name: 'washington',
    code: ''
  },
  {
    name: 'west virginia',
    code: ''
  },
  {
    name: 'wisconsin',
    code: ''
  },
  {
    name: 'wyoming',
    code: ''
  }
];

// Get the input, btn and container
let input = document.querySelector('#state-name');
let btn = document.querySelector('#btn');
let listContainer = document.querySelector('.list-container');
let correctList = document.querySelector('#correct-list');
let previousCorrect = [];
let count = 0;
let score = document.querySelector('#score');
let form = document.querySelector('#form');

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
        let url = "https://iiif.digitalcommonwealth.org/iiif/2/" + response.response.docs[randomImg].exemplary_image_ssi + "/full/full/0/default.jpg";
        mapImg.src = url;

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
      alert('Ops! something went wrong!');
    }
  });
}


function checkState () {
  let stateGuess = input.value.toLowerCase();
  let stateCorrect;

  // If there is currently a notice, remove it
  let notice = document.querySelector('#notice');

  if (notice) {
    notice.remove();
  }


  // Check the guessed name against the states object
  states.forEach(function (state, i) {
    if (stateGuess === state.name) {
      stateCorrect = stateGuess;
    }
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

  if (!previousCorrect.includes(stateCorrect)) {

    // // Capitalise the first letter of each word
    // let words = stateCorrect.split(' ');
    //
    // for (let i = 0; i < words.length; i++) {
    //   words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    // }
    //
    // stateCorrectCapitalised = words.join(' ');
    //
    // correctList.innerHTML += `<li><ul href="">${stateCorrectCapitalised}</ul></li>`;

    // Add original, lowercase string to array
    previousCorrect.push(stateCorrect);

    // Call the function to get an image - with stateCorrect as the input
    getStateMap(stateCorrect);

    count++;
    score.innerHTML = `${count}/50`;

  } else {

    // Create a notification
    let notice = document.createElement('div');
    notice.setAttribute('id', 'notice');
    notice.setAttribute('aria-live', 'polite');
    notice.setAttribute('class', 'notice-style');

    // To do: This isn't working
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

  // Need to clear form value at the end
  input.value = '';
}

// Listen for DOM events
btn.addEventListener('click', checkState);
