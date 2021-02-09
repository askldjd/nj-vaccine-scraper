const { convertToStandardSchema } = require('../src/cvs');

// Sample CVS getIMZStore output when covid vaccine is available.
let sample = {
  "responseMetaData": {
    "statusCode": "0000",
    "statusDesc": "Success",
    "conversationID": "Id-105920609b4d2cfc5baabe16",
    "refId": "Id-105920609b4d2cfc5baabe16"
  },
  "responsePayloadData": {
    "schedulerRefType": "IMZ_STORE",
    "availableDates": [
      "2021-02-08",
      "2021-02-09",
      "2021-02-10",
      "2021-02-11",
      "2021-02-12",
      "2021-02-13",
      "2021-02-14"
    ],
    "locations": [
      {
        "StoreNumber": "01070",
        "minuteClinicID": "0",
        "opticalClinicID": "0",
        "storeType": 0,
        "pharmacyNCPDPProviderIdentifier": "0712629",
        "addressLine": "90 MAIN STREET",
        "addressCityDescriptionText": "WINDSOR LOCKS",
        "addressState": "CT",
        "addressZipCode": "06096",
        "addressCountry": "US",
        "geographicLatitudePoint": "41.931200",
        "geographicLongitudePoint": "-72.628100",
        "indicatorStoreTwentyFourHoursOpen": "N",
        "indicatorPrescriptionService": "Y",
        "indicatorPhotoCenterService": "Y",
        "indicatorOpticalService": "N",
        "instorePickupService": "Y",
        "indicatorDriveThruService": "Y",
        "indicatorPharmacyTwentyFourHoursOpen": "N",
        "rxConvertedFlag": "Y",
        "indicatorCircularConverted": "Y",
        "indicatorH1N1FluShot": "N",
        "indicatorRxFluFlag": "N",
        "indicatorWicService": "Y",
        "snapIndicator": "Y",
        "indicatorVaccineServiceSupport": "N",
        "indicatorPneumoniaShotService": "N",
        "indicatorWeeklyAd": "Y",
        "indicatorCVSStore": "Y",
        "indicatorStorePickup": "N",
        "storeLocationTimeZone": "EST",
        "storePhonenumber": "8606232407",
        "pharmacyPhonenumber": "8606232407",
        "storeHours": {
          "DayHours": [
            {
              "Day": "MON",
              "Hours": "07:00 AM - 10:00 PM"
            },
            {
              "Day": "TUE",
              "Hours": "07:00 AM - 10:00 PM"
            },
            {
              "Day": "WED",
              "Hours": "07:00 AM - 10:00 PM"
            },
            {
              "Day": "THU",
              "Hours": "07:00 AM - 10:00 PM"
            },
            {
              "Day": "FRI",
              "Hours": "07:00 AM - 10:00 PM"
            },
            {
              "Day": "SAT",
              "Hours": "07:00 AM - 10:00 PM"
            },
            {
              "Day": "SUN",
              "Hours": "07:00 AM - 10:00 PM"
            }
          ]
        },
        "pharmacyHours": {
          "DayHours": [
            {
              "Day": "MON",
              "Hours": "08:00 AM - 09:00 PM"
            },
            {
              "Day": "TUE",
              "Hours": "08:00 AM - 09:00 PM"
            },
            {
              "Day": "WED",
              "Hours": "08:00 AM - 09:00 PM"
            },
            {
              "Day": "THU",
              "Hours": "08:00 AM - 09:00 PM"
            },
            {
              "Day": "FRI",
              "Hours": "08:00 AM - 09:00 PM"
            },
            {
              "Day": "SAT",
              "Hours": "09:00 AM - 06:00 PM"
            },
            {
              "Day": "SUN",
              "Hours": "09:00 AM - 06:00 PM"
            }
          ]
        },
        "adVersionCdCurrent": "C",
        "adVersionCdNext": "C",
        "distance": "1.32",
        "immunizationAvailability": {
          "available": [
            "CVD"
          ],
          "unavailable": []
        },
        "schedulerRefId": "CVS_01070",
        "imzAdditionalData": [
          {
            "imzType": "CVD",
            "availableDates": [
              "2021-02-08",
              "2021-02-09",
              "2021-02-10",
              "2021-02-11",
              "2021-02-12",
              "2021-02-13",
              "2021-02-14"
            ]
          }
        ]
      }
    ]
  }
}

/**
 * Simple sanity test case to convert the CVS data schema to the scraper's schema.
 */
test('simple schema conversion', () => {
  const standardResult = convertToStandardSchema([sample]);
  console.log(standardResult);
  expect(standardResult.length).toBe(1);
  expect(standardResult.length).toBe(1);
  expect(standardResult[0]).toEqual({
    name: 'CVS at WINDSOR LOCKS',
    operated_by: 'CVS',
    availability: 'yes',
    checked_at: standardResult[0].checked_at,
    offical: {
      'Facility Name': 'CVS',
      'Facility Address': '90 MAIN STREET, WINDSOR LOCKS, CT 06096',
      County: '???',
      'Minimum Age': '???',
      'Phone Number for Appointments + Questions': '8606232407',
      'Facility Website': 'https://www.cvs.com/immunizations/covid-19-vaccine',
      simpleName: 'CVS',
      simpleAddress: '90 MAIN STREET, WINDSOR LOCKS, CT 06096',
      isMegasite: true
    }
  });
});