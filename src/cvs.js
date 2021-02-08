// NOTE: This is a prototype to scrape CVS CVD appointment system. It is not
// production ready.
const axios = require('axios');

// const njClinics = [
//   00003, 00125, 00129, 00203, 00208, 00228, 00243, 00251, 00271, 00289, 00298, 00320, 00336, 00340, 00356, 00360, 00362, 00381, 00385, 00398, 00429, 00431, 00432, 00435, 00448, 00456, 00462, 00463, 00464, 00465, 00472, 00477, 00478, 00479, 00481, 00506, 00514, 00519, 00548, 00596, 00617, 00638, 00648, 00655, 00661, 00667, 00668, 00687, 00688, 00695, 00715, 00716, 00749, 00752, 00759, 00761, 00764, 00790, 00808, 00809, 00814, 00815, 00817, 00824, 00825, 00836, 00837, 00849, 00853, 00855, 00862, 00864, 00867, 00905, 00936, 00955, 00961, 00965, 00975, 00991, 01033, 01059, 01061, 01062, 01069, 01072, 01088, 01124, 01146, 01158, 01165, 01167, 01195, 01214, 01220, 01224, 01240, 01243, 01269, 01272, 01275, 01279, 01287, 01526, 01780, 01782, 01927, 01928, 01929, 01946, 01956, 01967, 02001, 02014, 02015, 02017, 02023, 02024, 02026, 02031, 02051, 02064, 02079, 02090, 02092, 02093, 02094, 02117, 02122, 02126, 02130, 02139, 02163, 02196, 02199, 02203, 02207, 02209, 02231, 02235, 02261, 02264, 02265, 02284, 02300, 02301, 02302, 02319, 02320, 02354, 02369, 02390, 02409, 02416, 02456, 02462, 02464, 02480, 02492, 02508, 02511, 02535, 02547, 02576, 02577, 02683, 02684, 02723, 02724, 02742, 02746, 02753, 02762, 02795, 02796, 02813, 02815, 02816, 02820, 02835, 02837, 02853, 02854, 02868, 02870, 02949, 02950, 02957, 02967, 02968, 02970, 02987, 03031, 03097, 03136, 03161, 03194, 03596, 03618, 03759, 03972, 04047, 04125, 04131, 04163, 04259, 04443, 04615, 04626, 04644, 04685, 04771, 04841, 05128, 05193, 05300, 05427, 05461, 05491, 05675, 05767, 05771, 05820, 05831, 05855, 05871, 05967, 05980, 05984, 06032, 06034, 06035, 06036, 06038, 06039, 06060, 06061, 06063, 06064, 06065, 06067, 06070, 06071, 06073, 06074, 06075, 06076, 06170, 06344, 06544, 06760, 06872, 06873, 06877, 06900, 06947, 07069, 07096, 07105, 07160, 07171, 07182, 07190, 07238, 07400, 07613, 07842, 07915, 07961, 08924, 08939, 08951, 10001, 10031, 10046, 10047, 10062, 10087, 10091, 10211, 10237, 10289, 10322, 10363, 10379, 10381, 10458, 10552, 10608, 10611, 10655, 10766, 10853, 11010, 11012, 11088, 11135, 11163, 11203, 11204, 11271, 16440, 16463, 16464, 16482, 16496, 16497, 16513, 16514, 16515, 16516, 16517, 16520, 16533, 16542, 16550, 16579, 16610, 16658, 16671, 16684, 16704, 16717, 16728, 16796, 16799, 16823, 16943, 16944, 16984, 16985, 17006, 17035, 17047, 17190, 17224, 17250, 17261, 17322, 17331, 17444, 17447, 17455, 17501, 17667, 17690, 17734, 17738, 48303, 48304
// ];

// const arClinics = [
//   72001, 72002, 72410, 72820, 72921, 72003, 72611, 72004, 72821, 71921, 71922, 71923, 71998, 71999, 71630, 72310, 72513, 71822, 72823, 72311, 72006, 72007, 72010, 71631, 72923, 72312, 72313, 72501, 72503, 72011, 72411, 71720, 72013, 72012, 72412, 72014, 71721, 72714, 72715, 72824, 71823, 72015, 72018, 72019, 72712, 72716, 72615, 72616, 72617, 72016, 72413, 72017, 71929, 72414, 72415, 71825, 71722, 72315, 72316, 72926, 71933, 72416, 72927, 72020, 71826, 72928, 72320, 72828, 72021, 72517, 72417, 72022, 72089, 71827, 72619, 72321, 72023, 71935, 72322, 72519, 71724, 71701, 71711, 72520, 72717, 72419, 72024, 71725, 72025, 72421, 72026, 72521, 72718, 72930, 72932, 72027, 72719, 72829, 72933, 72522, 72525, 72529, 72324, 72934, 71726, 72028, 72029, 72325, 72623, 72830, 72030, 72031, 72832, 72053, 72326, 72721, 72624, 72523, 72032, 72033, 72034, 72035, 72524, 72422, 72626, 72036, 71937, 72037, 72327, 72038, 71635, 72328, 71728, 72526, 72039, 72833, 72834, 71832, 72041, 72042, 72722, 72628, 72425, 72835, 71940, 72426, 72629, 71638, 72040, 72527, 72630, 72043, 71833, 71834, 72528, 71941, 72837, 72530, 71639, 72935, 72330, 72331, 72044, 72332, 71730, 71731, 72045, 72333, 72531, 72727, 72728, 71740, 71835, 72046, 72047, 72428, 71640, 72631, 72632, 72729, 72532, 72633, 72088, 72730, 72701, 72702, 72703, 72704, 72533, 72429, 72634, 72534, 71742, 71836, 72335, 72336, 72901, 72902, 72903, 72904, 72905, 72906, 72908, 72913, 72914, 72916, 72917, 72918, 72919, 71837, 71642, 72051, 72536, 72338, 71838, 72537, 72732, 71839, 72052, 72635, 72733, 71840, 72734, 72538, 72636, 72055, 71841, 72539, 71943, 72735, 72319, 71643, 71644, 71944, 72057, 72736, 72638, 72058, 72737, 72430, 72936, 72060, 72431, 72540, 71743, 72061, 72937, 72839, 71646, 71744, 72542, 71745, 72639, 72432, 72601, 72602, 72938, 72840, 72841, 72640, 71945, 72063, 72842, 72064, 72543, 72843, 72342, 72544, 72065, 71647, 72346, 72066, 72347, 72067, 72068, 72738, 72739, 72069, 71801, 71802, 71842, 72512, 71901, 71902, 71903, 71913, 71914, 71909, 71910, 72070, 72433, 72348, 72072, 72073, 72074, 72940, 72740, 71747, 72546, 72434, 71748, 72076, 72078, 72641, 72079, 71651, 72080, 71949, 72741, 72350, 72105, 72401, 72402, 72403, 72404, 72081, 71749, 72351, 72082, 72083, 71652, 72742, 71950, 72435, 72845, 72436, 72437, 71653, 72642, 72846, 72941, 71750, 72438, 72644, 72084, 72354, 72645, 71845, 72355, 72744, 72201, 72202, 72203, 72204, 72205, 72206, 72207, 72209, 72210, 72211, 72212, 72214, 72215, 72216, 72217, 72219, 72221, 72222, 72223, 72225, 72227, 72231, 72260, 72295, 72099, 71846, 72550, 72847, 72086, 72087, 71751, 72745, 72358, 72440, 72103, 72359, 72943, 72553, 71753, 71754, 72104, 72554, 72442, 72944, 72648, 72555, 72360, 72364, 72365, 72443, 72650, 72366, 72113, 72106, 72444, 72747, 71847, 72101, 72441, 71654, 71752, 72102, 72556, 72367, 71953, 72107, 72945, 72651, 71851, 72445, 72447, 72108, 71655, 71656, 71657, 71658, 72368, 72110, 72749, 71758, 71957, 72655, 72561, 72111, 72653, 72654, 71956, 72560, 72946, 72947, 71958, 71852, 72948, 72851, 71660, 72562, 71959, 72112, 72658, 71960, 71759, 72114, 72115, 72116, 72117, 72118, 72119, 72124, 72190, 72199, 72660, 72661, 72852, 71961, 71853, 72564, 71962, 72853, 72662, 72369, 72663, 72370, 72565, 72949, 72854, 72372, 72121, 72450, 72451, 72855, 71661, 72373, 72950, 72122, 72666, 72123, 72751, 72453, 71964, 72668, 72856, 71965, 72125, 72126, 72752, 71662, 72454, 72669, 71601, 71603, 71611, 71613, 72566, 72857, 72567, 72568, 72127, 72455, 72456, 72670, 72374, 72457, 71663, 72858, 72569, 72458, 72128, 72753, 72129, 71857, 72130, 72376, 72672, 72131, 72951, 72459, 72460, 72461, 72132, 72462, 71665, 72134, 72756, 72757, 72758, 71666, 72135, 72136, 72137, 72571, 71858, 72860, 71968, 72952, 72139, 72801, 72802, 72811, 72812, 72572, 72573, 72140, 72464, 72675, 72760, 72576, 71859, 72141, 72142, 72863, 72143, 72145, 72149, 72150, 72152, 72120, 72153, 72577, 72761, 71762, 72466, 72156, 71763, 72762, 72764, 72765, 72766, 72157, 71860, 71667, 72467, 71764, 71970, 72469, 71765, 72578, 72160, 72865, 72470, 72579, 72768, 72769, 72677, 72164, 72471, 71861, 71854, 71766, 72166, 71670, 72679, 72657, 72680, 72770, 72167, 72472, 72168, 72473, 72581, 72169, 72384, 72386, 72170, 71971, 72955, 72682, 72956, 72957, 71972, 72387, 72173, 72583, 72584, 72389, 72474, 72475, 71770, 72958, 72476, 72176, 72478, 71671, 71862, 71674, 72479, 72773, 72774, 72390, 72301, 72303, 72178, 72685, 72392, 71772, 71602, 71612, 71973, 72585, 72394, 72179, 72482, 71864, 71675, 71676, 72395, 71865, 71677, 72959, 71866, 72776, 72180, 72181, 72182, 72183, 72396, 72687
// ];

// CVS COVID vaccine appointment is only rolled out to a few states. NJ is not
// in the list as of today (possibly availble starting Feb 8th). For now, use
// AR or CT for testing.
//
// The zip code selected are reverse engineered based on CVS' advertised 
// vaccine location. This list is not retrievable through API. Instead, you
// have to parse the XML block in https://www.cvs.com/bizcontent/marketing/covidvaccine_landingpage/acn-tool.js.
// The data ugly, so it is best to hardcode it for now.
const arClinics = [
  // 'Russellville, AR'
  '72801', '72802', '72811', '72812',
  // 'Springdale, AR'
  '72762', '72764', '72765', '72766', '72769',
  // 'Van Buren, AR'
  '72956', '72957'
]

const ctClinics = [
  // Colchester, CT
  '06415', '06420',
  // Putnam, CT
  '06260',
  // Waterford, CT
  '06385',
  // Windsor Locks, CT
  '06096'
]

/**
 * Given an "address" string, invoke the CVS getIMZStores API.
 * 
 * @param {string} address 
 * Address is a freeform item that satisfy the `searchCriteria: { addressLine: address }`
 * field. Based on experiment, addressLine can be city, county, town, or zipcode.
 * However, zipcode appears to be the most reliable in terms of results. 
 * (more experiment needed).
 */
async function queryClinic(address) {
  const cvsResults = [];
  const opt = {
    url: 'https://www.cvs.com/Services/ICEAGPV1/immunization/1.0.0/getIMZStores',
    method: 'post',
    headers: {
      Origin: 'https://www.cvs.com',
      Referer: 'https://www.cvs.com/vaccine/intake/store/cvd-store-select/first-dose-select',
      TE: 'Trailers'
    },
    data: {
      requestMetaData: {
        appName: 'CVS_WEB',
        lineOfBusiness: 'RETAIL',
        channelName: 'WEB',
        deviceType: 'DESKTOP',
        deviceToken: '7777',
        apiKey: 'a2ff75c6-2da7-4299-929d-d670d827ab4a',
        source: 'ICE_WEB',
        securityType: 'apiKey',
        responseFormat: 'JSON',
        type: 'cn-dep',
      },
      requestPayloadData: {
        selectedImmunization: ['CVD'],
        distanceInMiles: 25,
        searchCriteria: { addressLine: address },
      },
    },
  };
  try {
    const response = await axios(opt);
    if (response.data.responseMetaData.statusCode !== '1010') {
      console.log(`found results at ${address}`);
      console.log(JSON.stringify(response.data, null, 2));
      cvsResults.push(response.data);
    } else {
      console.log('nothing found at', address);
    }
  } catch (err) {
    console.log(err);
  }
  return cvsResults;
}

/**
 * Helper method to convert the CVS result to the scraper schema.
 * This way, the data output is standardized across all modules.
 * 
 * @param {array} cvsResults 
 * Array of CVS results from all stores. Each item in the array should be the 
 * fully decoded JSON response from getIMZStores.
 */
function convertToStandardSchema(cvsResults) {
  const nowStr = new Date().toISOString();
  const standardResults = [];
  cvsResults.forEach(cvsResult => {
    if (cvsResult.responseMetaData.statusCode !== '0000') {
      return;
    }

    cvsResult.responsePayloadData.locations.forEach(location => {
      standardResults.push({
        name: `CVS at ${location.addressCityDescriptionText}`,
        operated_by: 'CVS',
        availability: 'yes',
        checked_at: nowStr,
        offical: {
          'Facility Name': 'CVS',
          'Facility Address': `${location.addressLine}, ${location.addressCityDescriptionText}, ${location.addressState} ${location.addressZipCode}`,
          'County': '???',
          'Minimum Age': '???',
          'Phone Number for Appointments + Questions': location.pharmacyPhonenumber,
          'Facility Website': 'https://www.cvs.com/immunizations/covid-19-vaccine',
          'simpleName': 'CVS',
          'simpleAddress': `${location.addressLine}, ${location.addressCityDescriptionText}, ${location.addressState} ${location.addressZipCode}`,
          'isMegasite': true
        }
      });
    });
  });

  return standardResults;
}

// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// function getRandomInt(max) {
//   return Math.floor(Math.random() * Math.floor(max));
// }

/**
 * Kick off the scraper to crawl the getIMZStores endpoint.
 * 
 * @return {array} Array of results conforming to the scraper standard.
 */
async function run() {
  // NJ isn't available yet for CVS CVD appointment
  // let clinics = njClinics;

  // let clinics = ctClinics;
  let clinics = arClinics;
  let allResults = [];

  for (let i = 0; i < clinics.length; i += 1) {
    const clinicResults = await queryClinic(clinics[i].toString());
    allResults = allResults.concat(clinicResults);
    // await sleep(getRandomInt(5) * 1000);
  }

  const standardResults = convertToStandardSchema(allResults);
  console.log(standardResults);

  return standardResults;
}

let functionsToExport = { run };

// Allow extra function to be exported in the test environment.
if (process.env.NODE_ENV === 'test') {
  functionsToExport = {
    ...functionsToExport,
    convertToStandardSchema
  }
}

module.exports = functionsToExport;