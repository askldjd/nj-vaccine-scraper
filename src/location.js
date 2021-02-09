// Example for https://covid19.nj.gov/pages/alt-vaccine-locator-map to create/update location
// API KEY generated and needs to be added to dev/production environment

var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
 'name': 'CVS Pharmacy',
'address_line_1': '4251 U.s. Hwy 9',
'visible': '{{visible}}',
'city': 'Howell',
'country': '{{country}}',
'display_address': '{{display_address}}',
'address_line_2': '{{address_line_2}}',
'state': 'NJ',
'postcode': '07731',
'phone': '{{phone}}',
'url': '{{url}}',
'email': '{{email}}',
'lat': '',
'lng': '',
'location_type': '{{locationType}}',
'facebook': '{{facebook}}',
'instagram': '{{instagram}}',
'twitter': '{{twitter}}',
'marker': '{{markerId}}',
'fields[appointments]': '<a style="color:red" href="https://innovation.nj.gov/index.html#contact">02/16/21 at 20:15</a><br><a style="color:red" href="https://innovation.nj.gov/index.html#contact">02/17/21 at 8:15</a>',
'hours[mon]': '{{value}}',
'hours[tue]': '{{value}}',
'hours[wed]': '{{value}}',
'hours[thu]': '{{value}}',
'hours[fri]': '{{value}}',
'hours[sat]va l': '{{value}}',
'hours[sun]': '{{value}}',
'cover': '{{value}}'
});
var config = {
  method: 'post',
  url: 'https://storerocket.io/api/locations',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer XXXXXXXXXX'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


