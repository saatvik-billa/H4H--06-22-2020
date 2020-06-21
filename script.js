import {list, getCoordinates} from './js/data'

var map;
let properties = []

function initMap() {
  map = new google.maps.Map(document.querySelector('.map'), {
    zoom: 11,
    center: {lat: 30.2672, lng: -97.7431}
  });

  let markers = []
  list.forEach( (element, index) => {
    markers.push(element)
    markers[index].map = map
  })

  markers.forEach((element, index) => {
      addMarker(element, index)
      properties.push(element)
  }) 
}

window.initMap = initMap; 
window.addMarker = addMarker;

async function addMarker(obj, i) {
    await getCoordinates(obj);

    var marker = new google.maps.Marker(obj);
    var infowindow = new google.maps.InfoWindow({
        content: obj.title
    });
    let note; 
    if (obj.note) {
      note = obj.note; 
    } else {
      note = 'Currently in need of gloves/masks'
    }

    let markup; 
    if (obj.type === 'monetaryDonation') {
      markup = `
        <li>
          <h4>${obj.title}</h4>
          <p>${obj.address}</p>
          <button class="selectButton">Select</button>
        </li>
      `
    } else {
      markup = `
        <li class="special">
          <h4>${obj.title}</h4>
          <p>${obj.address}</p>
          <p><b>Note: <span style="color:${note === 'Currently in need of gloves/masks' ? 'red' : 'blue'};">${note}</span></b> </p>
          <button class="selectButton">Select</button>
        </li>
      `
      // #e74c3c -- red
      // #3498db -- blue
    }
    
    document.querySelector('.locations').insertAdjacentHTML('beforeend', markup) 

    properties[i].position = obj.position

    marker.addListener('click', function() {
        infowindow.open(map, marker)
        
        document.querySelector('.inputBox').value = obj.address; 
        
        let index = getAddress();
        if (properties[index].squareLink !== '') {
          document.querySelector('.selectOptions').setAttribute('href', properties[index].squareLink) 
        }
        
    });
}

function getAddress() {
  let value = document.querySelector('.inputBox').value;
  let index = properties.findIndex(element => element.address === value)
  if (index !== -1) {
    return index; 
  }
  return -1
}

function toggleButton() {
  var e = document.querySelector('.dropdown-content');
  if (e.style.display == 'block') {
    e.style.display = 'none';
  } else {
    e.style.display = 'block'; 
  }
}

// ---- EVENT LISTENERS ----

['.dropbtn', '.link'].forEach(element => {
  document.querySelectorAll(element).forEach(el => {
    el.addEventListener('click', () => {
      toggleButton();
    })
  })
})

document.querySelectorAll('.sm').forEach(element => {
  element.addEventListener('click', () => {
    window.alert('We do not have any social media accounts at this time.')
  })
})

document.querySelector('.selectOptions').addEventListener('click', () => {
  getAddress();
})

document.querySelector('.locations').addEventListener('click', element => {
  let el = element.target.parentNode.childNodes[3].innerHTML; 
  if (el) {
    document.querySelector('.inputBox').value = el; 
  }
  
  let index = getAddress(); 
  document.querySelector('.selectOptions').setAttribute('href', properties[index].squareLink)
  
})



