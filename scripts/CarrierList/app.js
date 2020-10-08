'use strict';

// You must set your Airtable API key in an environment variable before calling this app
// export AIRTABLE_API_KEY=YOUR_SECRET_API_KEY
// node app.js
//
// The key is in the settings in Airtable. Keep this secret as it grants full access to your account.

// Generate a backup JSON file of the Airtable data
// node app.js -b 

// The parameter to base is the app ID for "SKUs / Carriers / Plans"
const base = require('airtable').base('appRCx9bhA5UCU4Gu');

// To view carrier data on Airtable: "SKUs / Carriers / Plans" 


const fs = require('fs');
const path = require('path');
const { SSL_OP_NETSCAPE_CHALLENGE_BUG } = require('constants');

// https://www.npmjs.com/package/yargs
const argv = require('yargs').argv;

var normalizeCountry = {
		'United States of America':'United States',
		'South Korea':'Korea'
};

// This is currently handled manually. We should probably move this into airtable
var no2g = {
		'Australia':' ',
		'Japan':' ',
		'Korea':' ',
		'New Zealand':'<sup>2</sup>', 	// note 2: Only with a 3rd-party SIM card
		'Singapore':' ',
		'Switzerland':'<sup>2</sup>', 	// note 2: Only with a 3rd-party SIM card
		'United States':'<sup>1</sup>' 	// note 1: T-Mobile only
};

// This table is keyed by a frequency band number a string (like '1' for 'B1') and contains object. One
// common use is the 'freq' key which will contain a frequency in MHz that this corresponds
// to (B1 = 2100 MHz). It will also contain a key for the modems that support this frequency.
// Currently limited to: 'eg91-e' and 'bg96-na'. These keys will be true if the band is 
// supported or undefined if not. And also 'u201', 'u260', 'u270' for 3G only.
const bandFrequencies = {
	'1':{'freq':2100,'eg91-e':true, 'u201':true, 'u270':true},
	'2':{'freq':1900,'bg96-na':true, 'u201':true, 'u260':true},
	'3':{'freq':1800,'eg91-e':true},
	'4':{'freq':1700,'bg96-na':true},
	'5':{'freq':850, 'u201':true, 'u260':true},
	'7':{'freq':2600,'eg91-e':true},
	'8':{'freq':900,'eg91-e':true, 'u201':true, 'u270':true},
	'9':{'freq':1800},
	'11':{'freq':1500},
	'12':{'freq':700,'bg96-na':true},
	'13':{'freq':700,'bg96-na':true},
	'14':{'freq':700},
	'17':{'freq':700},
	'18':{'freq':850},
	'19':{'freq':850},
	'20':{'freq':800,'eg91-e':true},
	'21':{'freq':1500},
	'24':{'freq':1600},
	'25':{'freq':1900},
	'26':{'freq':850},
	'28':{'freq':700,'eg91-e':true},
	'29':{'freq':700},
	'30':{'freq':2300},
	'31':{'freq':450},
	'32':{'freq':1500},
	'34':{'freq':2000},
	'37':{'freq':1900},
	'38':{'freq':2600},
	'39':{'freq':1900},
	'40':{'freq':2300},
	'41':{'freq':2500},
	'42':{'freq':3500},
	'43':{'freq':3700},
	'44':{'freq':700},
	'46':{'freq':5200},
	'47':{'freq':5900},
	'48':{'freq':3500},
	'49':{'freq':3500},
	'50':{'freq':1500},
	'51':{'freq':1500},
	'52':{'freq':3300},
	'53':{'freq':2400},
	'65':{'freq':2100},
	'66':{'freq':1700},
	'67':{'freq':700},
	'68':{'freq':700},
	'69':{'freq':2600},
	'70':{'freq':1700},
	'71':{'freq':600},
	'72':{'freq':450},
	'73':{'freq':450},
	'74':{'freq':1500},
	'75':{'freq':1500},
	'76':{'freq':1500},
	'85':{'freq':700},
	'87':{'freq':410},
	'88':{'freq':410},
	// 2G frequencies don't have band numbers
	'850':{'freq':850,'2g':true, 'u201':true, 'u260':true},
	'900':{'freq':900,'2g':true,'eg91-e':true, 'u201':true, 'u270':true},
	'1800':{'freq':1800,'2g':true,'eg91-e':true, 'u201':true, 'u270':true},
	'1900':{'freq':1900,'2g':true, 'u201':true, 'u260':true},
};

// Array of SIM types. These correspond to the radio button values in the web page
// "LTE" is actually LTE Cat M1, but is left at LTE for historical reasons.
const simTypes = ['Electron', 'LTE', 'Boron', 'BoronAllNet', 'B523'];

const regionB523 = ['Europe', 'Baltics'];
//const regionT523 = ['Africa', 'Asia', 'Australia', 'Baltics', 'Commonwealth', 'Europe', 'Middle East', 'Oceania' ];

// This is the data that is per SIM type, used to generate the Markdown
// The key is an element in the simTypes array ('Electron', 'Boron, etc.)
var perSimType = {};

// These exceptions are listed at the top (and also duplicated at the normal alphabetical position)
var countryListTop = ['United States', 'Canada', 'United Kingdom'];

// countryList and countryData used to be global, but now are elements on perSimType


// Country to region map. Key is the country record ID. Value is a region record ID.
var countryRegionMap = {};

// Map planName recordID to the plan name. Key is record ID.
var planNameMap = {};

// Carriers is the index of carrier names. key = Airtable record ID (like rec0HLbyRewpBHwDe)
// and value is the carrier name (like BTC Bahamas); 
var carrierNameMap = {};

// Map country recordID to the country name. Key is record ID.
var countryNameMap = {};

// Map to which 3G device (U260 or U270) is used in this country. Key is record ID.
var which3GMap = {};

// Map to whether 2G is available. Key is record ID. Not currently used, the static no2g data
// above is used instead.
var has2GMap = {};

// Map of SKU record ID to SKU name. Key is record ID.
var skuNameMap = {};

// Map of Region record ID to region name. Key is region record ID.
var regionNameMap = {};

// Map of Region Name to record ID (opposite of regionNameMap)
var regionRecordIdMap = {};

// Map of Region record ID to region parent. Key is region record ID.
var regionParentMap = {};

// Map of SIM Providers record ID to name. Key is record ID.
var simProviderNameMap = {};

// Basically the data from the country-sim-carrier table, indexed by Record ID. It's the 
// data from Airtable mostly, so the data can be in one place and easily referenced.
var countrySimCarrier = {};

simTypes.forEach(function(simType) {
	perSimType[simType] = {};
	
	// Array of country names (unique). They are normalized using the normalizeCountry object.
	perSimType[simType].countryList = [];

	// Country data object. Key is the normalized country name. Value is an array of record ID in countrySimCarrier
	perSimType[simType].countryData = {};
});

// These SIM types don't get countryListTop added at the top 
perSimType['B523'].noCountryListTop = true;
perSimType['LTE'].noCountryListTop = true;



// Start by getting the plans. The other operations are chained off the completion of that.
getPlans();

function getPlans() {
	
	base('Plans').select({
	    maxRecords: 100,
	    fields: ['Name']
	}).eachPage(function page(records, fetchNextPage) {
	    // This function (`page`) will get called for each page of records.
	
	    records.forEach(function(record) {
	        // console.log('Retrieved Plans ' + record.getId() + ' ' + record.get('Name'));
	        planNameMap[record.getId()] = record.get('Name');
	    });
	
	    // To fetch the next page of records, call `fetchNextPage`.
	    // If there are more records, `page` will get called again.
	    // If there are no more records, `done` will get called.
	    fetchNextPage();
	
	}, function done(err) {
	    if (err) { console.error(err); return; }
	    
	    getRegions();
	});
}

function getRegions() {
	base('Region').select({
	    maxRecords: 100,
	    fields: ['Name','Parent']
	}).eachPage(function page(records, fetchNextPage) {
	    // This function (`page`) will get called for each page of records.
	
	    records.forEach(function(record) {
			//console.log('Retrieved Region id=' + record.getId() + ' name=' + record.get('Name') + ' parent=' + record.get('Parent'));
			const name = record.get('Name').trim();
			const recordId = record.getId();
			regionNameMap[recordId] = name;
			regionRecordIdMap[name] = recordId;

			regionParentMap[recordId] = record.get('Parent');
	    });
	
	    // To fetch the next page of records, call `fetchNextPage`.
	    // If there are more records, `page` will get called again.
	    // If there are no more records, `done` will get called.
	    fetchNextPage();
	
	}, function done(err) {
	    if (err) { console.error(err); return; }
	    
	    getSKUs(); 
	});
}


function getSKUs() {
	base('SKU').select({
	    maxRecords: 100,
	    fields: ['Name']
	}).eachPage(function page(records, fetchNextPage) {
	    // This function (`page`) will get called for each page of records.

	    records.forEach(function(record) {
	    	// console.log('Retrieved SKU ' + record.getId() + ' ' + record.get('Name'));
	        skuNameMap[record.getId()] = record.get('Name');
	    });

	    fetchNextPage();

	}, function done(err) {
	    if (err) { console.error(err); return; }

	    getCountries();
	});
}

function getCountries() {
	base('Countries').select({
	    maxRecords: 9999,
	    fields: ['Country','SKUs','Region']
	}).eachPage(function page(records, fetchNextPage) {
	    // This function (`page`) will get called for each page of records.

	    records.forEach(function(record) {	        
	        let has2G = false;
			let which3G = 'U260';
			if (!record) {
				console.log('empty record?');
				return;
			}

			let skus = record.get('SKUs');
			if (skus) {
				record.get('SKUs').forEach(function(skuRecord) {
					var sku = skuNameMap[skuRecord];
					if (sku === 'E350') {
						has2G = true;
					}
					else
					if (sku === 'E260') {
						which3G = 'U260';
					}
					else
					if (sku === 'E270') {
						which3G = 'U270';
					}
				});	  
			}
	        // console.log('Retrieved Country ' + record.getId() + ' ' + record.get('Country') + ' has2G=' + has2G + ' which3G=' + which3G);
			countryNameMap[record.getId()] = record.get('Country');
			
			countryRegionMap[record.getId()] = record.get('Region');

	        if (which3G) {
	        	which3GMap[record.getId()] = which3G;
	        }
	        has2GMap[record.getId()] = has2G;
	    });

	    fetchNextPage();

	}, function done(err) {
	    if (err) { console.error(err); return; }
	    
	    getCarriers();
	});
}


function getCarriers() {
	base('Carriers').select({
	    maxRecords: 9999,
	    fields: ['Name']
	}).eachPage(function page(records, fetchNextPage) {
	    // This function (`page`) will get called for each page of records.

	    records.forEach(function(record) {
	        // console.log('Retrieved carrier ' + record.getId() + ' ' + record.get('Name'));
	        carrierNameMap[record.getId()] = record.get('Name');
	    });

	    fetchNextPage();

	}, function done(err) {
	    if (err) { console.error(err); return; }
	    
	    getSimProviders();
	});

}

function getSimProviders() {
	base('SIM Providers').select({
	    maxRecords: 9999,
	    fields: ['Name']
	}).eachPage(function page(records, fetchNextPage) {
	    // This function (`page`) will get called for each page of records.

	    records.forEach(function(record) {
			// console.log('Retrieved SIM provider ' + record.getId() + ' ' + record.get('Name'));
			simProviderNameMap[record.getId()] = record.get('Name');
	    });

	    fetchNextPage();

	}, function done(err) {
		if (err) { console.error(err); return; }
		
		// console.log("simProviderNameMap", simProviderNameMap);
	    
	    getFullData();
	});

}


function getFullData() {
	base('Country-SIM-Carrier').select({
	    maxRecords: 9999, 
	    fields: ['ID', 'Country', 'SIM Provider', 'Carrier-link', 'Plan_Name-link', 'Technology-link', 'Network rank', 'Partner zone', '2G Sunset', '3G Sunset', '2g bands', '3g bands', 'Cat-M LTE bands']
	}).eachPage(function page(records, fetchNextPage) {
	    // This function (`page`) will get called for each page of records.

	    records.forEach(function(record) {
	        // console.log('Retrieved ' + record.get('ID'), record);
	    	// console.log('record IDs: Country=' + record.get('Country') + ' Carrier-link=' + record.get('Carrier-link') + ' Plan_Name-link=' +record.get('Plan_Name-link'));
			
	    	const planName = planNameMap[record.get('Plan_Name-link')];
			if (planName == 'Original') {
				// Ignore the Telefonica Original plan, otherwise it will override things like
				// Technology-Link which are less correct in the no-longer used Original plan.
				return;
			}

			const recordId = record.get('ID'); // Country-SIM-Carrier 
			countrySimCarrier[recordId] = {};
			
			const countryId = record.get('Country');
			countrySimCarrier[recordId].countryId = countryId;
		
	    	let countryName = countryNameMap[countryId]; 
			if (normalizeCountry[countryName]) {
				countryName = normalizeCountry[countryName];
			}
			countrySimCarrier[recordId].countryName = countryName;
			
			countrySimCarrier[recordId].simProviderName = simProviderNameMap[record.get('SIM Provider')];

			// Some carriers have '(Merged with' strings appended to them, which are too long
			// to fit in the table comfortably. Remove those strings.
			var carrierName = carrierNameMap[record.get('Carrier-link')];
			const mergedOffset = carrierName.indexOf('(Merged');
			if (mergedOffset > 0) {
				carrierName = carrierName.substring(0, mergedOffset).trim();
			}
			countrySimCarrier[recordId].carrierName = carrierName;
			// console.log("countryName=" + countryName + " carrierName=" + carrierName + " recordId=" + recordId);
		

	    	countrySimCarrier[recordId].planName = planName;
	    	countrySimCarrier[recordId].rank = record.get('Network rank');
			countrySimCarrier[recordId].zone = parseInt(record.get('Partner zone'));
			
			// technology is an array of: '2G', '3G', '4G' (strings)
			// It's now correct for all SIM providers
			// Note that it's possible for bandLTE to be set (carrier supports 4G) but 4G to
			// not be in the technology list because our plan does not support it.
			countrySimCarrier[recordId].technology = record.get('Technology-link');
			
			// I'm pretty sure this is no longer used, which would also allow has2GMap to be removed
			countrySimCarrier[recordId].has2G = has2GMap[countryId];
			
			countrySimCarrier[recordId].which3G = which3GMap[countryId] || 'U270';
			
	    	
			countrySimCarrier[recordId].sunset2G = record.get('2G Sunset');
			countrySimCarrier[recordId].sunset3G = record.get('3G Sunset');

			countrySimCarrier[recordId].bands2G = record.get('2g bands');
			countrySimCarrier[recordId].bands3G = record.get('3g bands');

			countrySimCarrier[recordId].bandsLTE = record.get('Cat-M LTE bands');

			const regionName = regionNameMap[countryRegionMap[countryId]];
			countrySimCarrier[recordId].regionName = regionName;
			countrySimCarrier[recordId].isB523 = regionB523.includes(regionName);	

	    	switch(countrySimCarrier[recordId].planName) {
	    	case 'Original':
	    		break;
	    		
	    	case 'Bundled':
				// Zone 6 and higher is hidden for Telefonica, except for Korea and Taiwan
				countrySimCarrier[recordId].isTelefonica = (countrySimCarrier[recordId].zone < 6 || countryName == 'South Korea' || countryName === 'Taiwan');
				if (countrySimCarrier[recordId].isTelefonica) {
					addSimTypeCountryData('Electron', countryName, recordId);
				}
	    		
	    		break;
	    		
	    	case 'LTE-M':
	    	case 'NORAM':
				addSimTypeCountryData('LTE', countryName, recordId);
	    		break;
	    			    		
	    	case 'One Net':
				addSimTypeCountryData('Boron', countryName, recordId);
				addSimTypeCountryData('BoronAllNet', countryName, recordId);

				if (countrySimCarrier[recordId].isB523) {
					addSimTypeCountryData('B523', countryName, recordId);
				}
 	    		break;
	    		
	    	case 'All Net':
				addSimTypeCountryData('BoronAllNet', countryName, recordId);
				//console.log('adding BoronAllNet countryName=' + countryName + " recordId=" + recordId + " carrierName=" + carrierName + " rank=" + countrySimCarrier[recordId].rank );
				break;
				
			case 'SuperSIM':
				break;
	    		
    		default:
    			console.log('unknown planName=' + countrySimCarrier[recordId].planName);	
    			break;
	    	}
	    	
	    		
	    });

	    fetchNextPage();

	}, function done(err) {
	    if (err) { console.error(err); return; }

		simTypes.forEach(function(simType) {
			for(var country in perSimType[simType].countryData) {
				perSimType[simType].countryList.push(country);
			}
			// Need to do a case-insensitive comparison because of eSwatini. 
			perSimType[simType].countryList.sort(function(a, b) {
				return a.localeCompare(b, undefined, { sensitivity: 'accent' });
			});
			
			// Put commonly used countries at the top (but still leave them alphabetically below)
			// unless noCountryListTop is true (B523 and LTE).
			if (!perSimType[simType].noCountryListTop) {
				for(var ii = countryListTop.length - 1; ii >= 0; ii--) {
					perSimType[simType].countryList.unshift(countryListTop[ii]);
				}
			}

			// For Boron AllNet, fix the ordering of primary/secondary/backup
			
			if (simType === 'BoronAllNet') {
				for(var country in perSimType[simType].countryData) {
					perSimType[simType].countryData[country].sort(function(a, b) {
						
						const rankA = rankToNumber(countrySimCarrier[a].rank); 
						const rankB = rankToNumber(countrySimCarrier[b].rank);
						if (rankA != rankB) {
							return rankA - rankB;
						} 
						// Rank is the same, compare by carrier name
						const carrierNameA = countrySimCarrier[a].carrierName; 
						const carrierNameB = countrySimCarrier[b].carrierName;
						return carrierNameA.localeCompare(carrierNameB, undefined, { sensitivity: 'accent' });

					});				
				}
			}
			
		});

		if (argv.c) {
			generateCarrierComparison();
		}
		else 
		if (argv.b) {
			generateBackup();
		}
		else
		if (argv.r) {
			generateRegionCountryList();
		}
		else {
			generateMarkdown();
		}
	});
	
}

// Parse either a comma-separated list of bands for 3G/LTE: B1,B2,B3
// Or frequencies for 2G: 900,1800
// Returned array will only be the numbers [1,2,3] or [900,1800] respectively
function parseBandList(commaSeparatedList) {
	var bands = [];

	if (!commaSeparatedList || commaSeparatedList == 'n/a') {
		return bands;
	}

	commaSeparatedList.split(',').forEach(function(band) {
		band = band.trim();
		if (band.startsWith('B')) {
			const num = parseInt(band.substr(1));
			if (num != 0) {
				bands.push(num);
			}
			else {
				console.log('unknown band name ' + band + ' in ' + commaSeparatedList);
			}
		}
		else {
			const num = parseInt(band);
			if (num != 0) {
				bands.push(num);
			}
			else {
				console.log('unknown band name ' + band + ' in ' + commaSeparatedList);
			}			
		}
	});

	bands.sort();

	return bands;
}

function updateAllBandsList(bandArray, allBands) {
	bandArray.forEach(function(band) {
		if (!allBands.includes(band)) {
			allBands.push(band);
		}
	});
	allBands.sort(function(a, b) {
		if (a < 100 && b < 100) {
			// Sort by band number
			// First by frequency, then band number
			var fa = bandFrequencies[a.toString()].freq;
			var fb = bandFrequencies[b.toString()].freq;
			if (fa != fb) {
				return fa - fb;
			}
			return a - b;
		}
		else {
			// Sort by actual frequency (2G)
			return a - b;
		}
	});
} 

function rankToNumber(rank) {
	switch(rank) {
		case 'Primary':
			return 1;
		case 'Secondary':
			return 2;
		case 'Backup':
			return 3;
		default:
			return 4;
	}
}


function addSimTypeCountryData(simType, country, value) {	
	if (!perSimType[simType].countryData[country]) {
		perSimType[simType].countryData[country] = [];
	} 
	
	perSimType[simType].countryData[country].push(value);
}


function generateMarkdown() {
	var md = '';
	
	
	for(var jj = 0; jj < simTypes.length; jj++) {
		var simType = simTypes[jj];
		md += '{{collapse op="start" simType="' + simType + '"}}\n\n';

		var sunsetMd1 = '';
		var sunsetMd2 = '';

		if (simType === 'Electron' || simType === 'Boron' || simType === 'BoronAllNet') {
			sunsetMd1 = ' 2G    | 3G    | 2G Sunset | 3G Sunset | ';
			sunsetMd2 = ' :---: | :---: |:-------: | :-------: | ';
		}

		if (simType === 'Electron') {
			md += '| Country | Carriers | Model |' + sunsetMd1 + '\n';
			md += '| ------- | -------- | :---: |' + sunsetMd2 + '\n';
		}
		else
		if (simType === 'B523') {
			md += '| Country | Carriers | 2G    | 3G    | LTE   |\n';
			md += '| ------- | -------- | :---: | :---: | :---: |\n';			
		}
		else {
			md += '| Country | Carriers |' + sunsetMd1 + '\n';
			md += '| ------- | -------- |' + sunsetMd2 + '\n';			
		}
	
		for(var ii = 0; ii < perSimType[simType].countryList.length; ii++) {
			var country = perSimType[simType].countryList[ii];

			var recordArray = perSimType[simType].countryData[country];

			var carrierAdded = {};

			for(var kk = 0; kk < recordArray.length; kk++) {
				var recordId = recordArray[kk];
				var carrierName = countrySimCarrier[recordId].carrierName;

				if (carrierAdded[carrierName]) {
					continue;
				}

				if (kk == 0) {
					md += '| ' + country + ' | ';
				}
				else {
					md += '|   | ';
				}

				var rankIndicator = '';
				if (simType === 'BoronAllNet' && recordArray.length > 1) {
					rankIndicator = '<sup>' + rankToNumber(countrySimCarrier[recordId].rank) + '</sup>';
				}

				md += carrierName + rankIndicator + ' |'; // TODO: Add a space here
				
				if (simType === 'Electron') {
					md += countrySimCarrier[recordId].which3G + ' |';					
				}

				const technology = countrySimCarrier[recordId].technology;

				if (sunsetMd1 != '') {
					// Include 2G/3G usage info
					md += (technology.includes('2G') ? '&check;' : '&nbsp;') + '| ';
					md += (technology.includes('3G') ? '&check;' : '&nbsp;') + '| ';

					// Include 2G/3G sunset information
					md += sunsetToMd(countrySimCarrier[recordId].sunset2G) + ' | ' + 
						sunsetToMd(countrySimCarrier[recordId].sunset3G) + ' | ';
				}

				if (simType === 'B523') {
					// console.log('country=' + country, technology);
					md += (technology.includes('2G') ? '&check;' : '&nbsp;') + '| ';
					md += (technology.includes('3G') ? '&check;' : '&nbsp;') + '| ';
					md += (technology.includes('4G') ? '&check;' : '&nbsp;') + '| ';
				}

				carrierAdded[carrierName] = true;

				md += '\n';
			}
	
		}
		
		md += '\n{{collapse op="end"}}\n\n';
	}
	
	// fs.writeFileSync(path.join(__dirname, 'carriers.md'), md);
		
	updateDocs(md);
}


function sunsetToMd(content) {
	if (!content || content == '?' || content == 'NA') {
		return '';
	}

	return content;
}

function updateDocs(md) {
	// {{!-- BEGIN do not edit content below, it is automatically generated by the CarrierList tool --}}
	// {{!-- END do not edit content above, it is automatically generated by the CarrierList tool --}}

	const docsPath = __dirname + '/../../src/content/tutorials/cellular-connectivity/cellular-carriers.md';
	
	const docsData = fs.readFileSync(docsPath, 'utf8');
	
	let preData = '';
	let postData = '';
	let state = 0;
	
	docsData.split("\n").forEach(function(line, index) {
		switch(state) {
		case 0:
			if (line.startsWith('{{!-- BEGIN do not edit content')) {
				state = 1;
			}
			preData += line + '\n';
			break;
		case 1:
			if (line.startsWith('{{!-- END do not edit content')) {
				postData += line + '\n';
				state = 2;
			}
			break;
		case 2:
			postData += line + '\n';
			break;
		}
		
	});
	
	var newDocsData = preData + md + postData;
	
	fs.writeFileSync(docsPath, newDocsData);	
}


// -r option
function generateRegionCountryList() {

	// Sort by region
	// Then within region by country
	// Within each country list the OneNet carrier(s), then AllNet, each group alphabetically
	// Horizontally: country, carrier, AllNet, 2G bands, 3G bands, LTE bands (for this region)
	//
	// For each band cell:
	// blank           = band not used
	// green checkmark = band used, band supported by EG91-E (U+2705)
	// red X           = band used, but not supported by EG91-E (U+274C)
	var output = '';

	const headings = [
		"Regions Currently Supported",
		"Regions That Should Generally Work",
		"Not recommended"
	];
	const regionGroups = [
		// "Region Currently Supported"
		[
			'Europe',
			'Baltics'
		],
		// "Region Should Generally Work"
		[
			'Australia',
			'Asia',
			'Middle East',
			'Commonwealth',
			'Africa',
			'Oceania'
		],
		// Everything else goes into "Not recommended"
		[
			'United States of America',
			'North America',
			'Carribean',
			'LATAM'
		],
		// These are omitted entirely 
		[
			'?',
			'Americas',
			'Global'
		]
	];


	// console.log('allBandsInUse', allBandsInUse);

	for(var headingIndex = 0; headingIndex < headings.length; headingIndex++) {

		output += '\n## ' + headings[headingIndex] + '\n\n';

		for(var regionIndex = 0; regionIndex < regionGroups[headingIndex].length; regionIndex++) {
			const regionId = regionRecordIdMap[regionGroups[headingIndex][regionIndex]];
			output += '\n### ' + regionNameMap[regionId] + '\n\n';

			var regionData = [];
			var bands2G = [];
			var bands3G = [];
			var bandsLTE = [];
			var maxCountryLen = 0;
			var maxCarrierNameLen = 0;

			// Pass 1: Calculate all of the bands in this region
			for(const countryId in countryRegionMap) {
				//console.log('checking countryId=' + countryId + ' regionId=' + regionId + ' against=' + countryRegionMap[countryId]);
				if (countryRegionMap[countryId] == regionId) {
					for(const recordId in countrySimCarrier) {
						if (countrySimCarrier[recordId].countryId == countryId) {
							if (countrySimCarrier[recordId].planName == 'One Net' || countrySimCarrier[recordId].planName == 'All Net') {
								// countryNames.push(countryNameMap[countryId] + ' (' + countrySimCarrier[recordId].carrierName + ')');
								
								// If none of the band fields are filled in, skip
								if (countrySimCarrier[recordId].bands2G ||
									countrySimCarrier[recordId].bands3G ||
									countrySimCarrier[recordId].bandsLTE) {
									// 
									let obj = {};
									obj.countryName = countryNameMap[countryId];
									obj.planGroup = (countrySimCarrier[recordId].planName == 'One Net') ? 1 : 2;
									obj.carrierName = countrySimCarrier[recordId].carrierName;
									
									obj.bands2G = parseBandList(countrySimCarrier[recordId].bands2G);
									obj.bands3G = parseBandList(countrySimCarrier[recordId].bands3G);
									obj.bandsLTE = parseBandList(countrySimCarrier[recordId].bandsLTE);

									updateAllBandsList(obj.bands2G, bands2G);
									updateAllBandsList(obj.bands3G, bands3G);
									updateAllBandsList(obj.bandsLTE, bandsLTE);

									regionData.push(obj);

									if (obj.countryName.length > maxCountryLen) {
										maxCountryLen = obj.countryName.length;
									}
									if (obj.carrierName.length > maxCarrierNameLen) {
										maxCarrierNameLen = obj.carrierName.length;
									}
								}

							}



						}
					}
				}
			}		

			//console.log('bands2G', bands2G);
			//console.log('bands3G', bands3G);
			//console.log('bandsLTE', bandsLTE);

			regionData.sort(function(a, b) {
				let cmp = a.countryName.localeCompare(b.countryName);
				if (cmp) {
					return cmp;
				}
				cmp = a.planGroup - b.planGroup;
				if (cmp) {
					return cmp;
				}
				cmp = a.carrierName.localeCompare(b.carrierName);
				if (cmp) {
					return cmp;
				}
				return 0;
			});

			//console.log("regionData", regionData);

			if (maxCountryLen < 8) {
				maxCountryLen = 8;
			}
			if (maxCarrierNameLen < 8) {
				maxCarrierNameLen = 8;
			}

			// Generate header
			const spacePad = '                                       ';
			var hdr1 = '';
			var hdr2 = '';
			var hdr3 = '';
			var hdr4 = '';

			hdr1 += '| Country ' + spacePad.substring(0, maxCountryLen - 8) + ' | Carrier ' + spacePad.substring(0, maxCarrierNameLen - 8) + ' | OneNet ';
			hdr2 += '| :------ ' + spacePad.substring(0, maxCountryLen - 8) + ' | :------ ' + spacePad.substring(0, maxCarrierNameLen - 8) + ' | :----: '
			hdr3 += '|         ' + spacePad.substring(0, maxCountryLen - 8) + ' |         ' + spacePad.substring(0, maxCarrierNameLen - 8) + ' |        '
			hdr4 += '|         ' + spacePad.substring(0, maxCountryLen - 8) + ' |         ' + spacePad.substring(0, maxCarrierNameLen - 8) + ' |        '

			for(var ii = 0; ii < bands2G.length; ii++) {
				var s = bands2G[ii].toString();
				hdr1 += '| ' + s + spacePad.substring(0, 6 - s.length);
				hdr2 += '| :---: ';
				hdr3 += '| 2G    ';
				hdr4 += '| ' + s + spacePad.substring(0, 6 - s.length);
			}
			for(var ii = 0; ii < bands3G.length; ii++) {
				var s = bands3G[ii].toString();
				// console.log('s=' + s + ' bandFrequencies[s]=' + bandFrequencies[s]);
				var s2 = bandFrequencies[s].freq.toString();
				hdr1 += '| B' + s + spacePad.substring(0, 5 - s.length);
				hdr2 += '| :---: ';
				hdr3 += '| 3G    ';
				hdr4 += '| ' +  s2 + spacePad.substring(0, 6 - s2.length);
			}
			for(var ii = 0; ii < bandsLTE.length; ii++) {
				var s = bandsLTE[ii].toString();
				// console.log('s=' + s + ' bandFrequencies[s]=' + bandFrequencies[s]);
				var s2 = bandFrequencies[s].freq.toString();
				hdr1 += '| B' + s + spacePad.substring(0, 5 - s.length);
				hdr2 += '| :---: ';
				hdr3 += '| LTE   ';
				hdr4 += '| ' +  s2 + spacePad.substring(0, 6 - s2.length);
			}
			hdr1 += '|';
			hdr2 += '|';
			hdr3 += '|';
			hdr4 += '|';
			

			output += hdr1 + '\n';
			output += hdr2 + '\n';
			output += hdr3 + '\n';
			output += hdr4 + '\n';

			// Pass 2: Generate Markdown 
			regionData.forEach(function(obj) {
				var row = '';

				row += '| ' + obj.countryName + spacePad.substring(0, maxCountryLen - obj.countryName.length + 1);
				row += '| ' + obj.carrierName + spacePad.substring(0, maxCarrierNameLen - obj.carrierName.length + 1);
				row += '| ' + ((obj.planGroup == 1) ? '\u2714      ' : '       '); // One Net gets a checkmark

				for(var ii = 0; ii < bands2G.length; ii++) {
					if (obj.bands2G.includes(bands2G[ii])) {
						// This band is used by this carrier
						if (bandFrequencies[bands2G[ii]]['eg91-e']) {
							row += '| \u2705     '; // Green box with with checkmark
						}
						else {
							row += '| \u274C     '; // Red X
						}
					}
					else {
						row += '|       ';
					}
				}

				for(var ii = 0; ii < bands3G.length; ii++) {
					if (obj.bands3G.includes(bands3G[ii])) {
						// This band is used by this carrier
						if (bandFrequencies[bands3G[ii]]['eg91-e']) {
							row += '| \u2705     '; // Green box with with checkmark
						}
						else {
							row += '| \u274C     '; // Red X
						}
					}
					else {
						row += '|       ';
					}
				}

				for(var ii = 0; ii < bandsLTE.length; ii++) {
					if (obj.bandsLTE.includes(bandsLTE[ii])) {
						// This band is used by this carrier
						if (bandFrequencies[bandsLTE[ii]]['eg91-e']) {
							row += '| \u2705     '; // Green box with with checkmark
						}
						else {
							row += '| \u274C     '; // Red X
						}
					}
					else {
						row += '|       ';
					}
				}

				row += '|';

				output += row + '\n';
			});

		}
	}

	fs.writeFileSync(path.join(__dirname, 'eg91.md'), output);


}



// -b option
function generateBackup() {
	var backup = {};

	backup.countryRegionMap = countryRegionMap;
	backup.planNameMap = planNameMap;
	backup.carrierNameMap = carrierNameMap;
	backup.countryNameMap = countryNameMap;
	backup.which3GMap = which3GMap;
	backup.has2GMap = has2GMap;
	backup.skuNameMap = skuNameMap;
	backup.regionNameMap = regionNameMap;
	backup.regionParentMap = regionParentMap;
	backup.simProviderNameMap = simProviderNameMap;
	backup.countrySimCarrier = countrySimCarrier;


	fs.writeFileSync(path.join(__dirname, 'backup.json'), JSON.stringify(backup));
}

function bandsToModel3G(bands) {
	if (bands.includes('B2') || bands.includes('B5')) {
		return 'U260';
	}
	else {
		return 'U270';
	}
}

// -c option
function generateCarrierComparison() {

	// Columns:
	// Country
	// Telefonica (Bundle)
	// Kore/AT&T (LTE Cat M1)
	// Kore/Vodfone (OneNet, AllNet)
	// Twilio SuperSIM

	// Build a list sorted by normalized country name (alphabetical)
	let countryNames = [];

	for(let recordId in countrySimCarrier) {
		if (!countryNames.includes(countrySimCarrier[recordId].countryName)) {
			countryNames.push(countrySimCarrier[recordId].countryName);
		}
	}

	countryNames.sort(function(a, b) {
		return a.localeCompare(b);
	});

	const simTypeNames = ['telefonica', 'korelte', 'koreone', 'koreall', 'supersim'];

	const remapCarrierName = {
		'Roshan (TDAC)':'Roshan',
		'Movistar Argentina':'Movistar',
		'Setar GSM':'Setar',
		'T-Mobile Austria':'T-Mobile',
		'Base (KPN)':'Base',
		'Etisalat Benin (Moov)':'Moov',
		'Vivacom (Vivatel)':'Vivacom',
		'Rogers AT&T Wireless':'Rogers Wireless',
		'Movistar Chile':'Movistar',
		'VipNet (Mobilkom)':'VIPnet',
		'Telefonica (O2) Czech Republic':'O2',
		'Telenor AS':'Telenor',
		'TeleTwo Estonia':'Tele2',
		'Faroese Telecom Faroe Islands':'Faroese Telecom',
		'Digicel Fiji':'Digicel',
		'TeliaSonera Finland':'Telia Sonera',
		'Bouygues Telecom France':'Bouygues',
		'Airtel (Zain) Gabon':'Airtel',
		'Geocell Georgia':'Geocell',
		'Telefonica O2 Germany':'O2',
		'Telekom Deutschland GmbH':'Telekom',
		'Vodafone D2 GmbH':'Vodafone',
		'Vodafone Ghana (ONEtouch)':'Vodafone',
		'Wind Hellas':'Wind',
		'GNBSB-Spacetel MTN Guinea Bissau':'Spacetel',
		'Digicel Guyana':'Digicel',
		'Claro (Sercom Honduras)':'Claro',
		'CSL Ltd':'CSL',
		'Telenor Hungary':'Telenor',
		'Siminn (On-Waves)':'Siminn',
		'Telkomsel Indonesia':'Telkomsel',
		'Digicel Caribbean':'Digicel',
		'Movistar Uruguay':'Movistar',
		'Telefonica Moviles Venezuela':'Movistar',
		'Dialog Telekom Ltd':'Dialog',
		'Telefonica Moviles España':'Telefonica',
		'Telefonica O2 Slovakia':'O2',
		'StarHub Mobile Pte Ltd.':'StarHub',
		'Africell Sierra Leone':'Africell',
		'Airtel (Seychelles)':'Airtel',
		'Telenor Serbia':'Telenor',
		'STC Al Jawal':'Al Jawal',
		'Cable & Wireless St Kitts & Nevis':'Cable & Wireless',
		'Orange Romania SA':'Orange',
		'Q-TEL Qartar':'Q-Tel',
		'TMN Portugal':'TMN',
		'Globe Telecom Philippines':'Globe',
		'Telefonica Moviles Peru':'Movistar',
		'Telefonica Moviles Panama S.A.':'Movistar',
		'Vodacom Mozambique':'Vodacom',
		'Cable & Wireless Montserrat':'Cable & Wireless',
		'Telenor Montenegro':'Telenor',
		'Unitel Mongolia':'Unitel',
		'Telefonica Moviles Mexico':'Movistar',
		'Go Mobile Malta':'go mobile',
		'Digi Telecom Malaysia':'DiGi',
		'TANGO Mobile SA':'Tango',
		'Tele 2':'Tele2',
		'Mobilkom Liechtenstein':'Mobilkom',
		'TELE2 Latvia':'Tele2',
		'Jersey Telecoms UK':'Jersey Telecom',
		'Partner Communication Israel':'Partner',
		'Telefonica Moviles El Salvador':'Telefonica',
		'Otecel S.A. Ecuador':'Otecel',
		'Telefonica Costa Rica':'Movistar',
		'Colombia Telefonica':'Movistar',
		'Airtel Burkina Faso (Celtel Zain)':'Airtel'
	};

	let output = '';

	const labelRow = '| Country | Carrier | Telefonica | Kore LTE-M1 | Kore OneNet | Kore AllNet | SuperSIM |\n';
	const spacerRow = '| &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |\n';

	output += labelRow;
	output += '| :--- | :--- | :---: | :---: | :---: | :---: | :---: |\n';



	let countryCoverage = {};

	let lastLetter = 'A';

	for(let ii = 0; ii < countryNames.length; ii++) {
		const countryName = countryNames[ii];
		// console.log(countryName);

		countryCoverage[countryName] = {};

		// Build a list of carriers for this country
		let carriersInCountry = [];

		let carrierInfo = {};

		for(let recordId in countrySimCarrier) {
			if (countrySimCarrier[recordId].countryName === countryName) {
				let carrierName = countrySimCarrier[recordId].carrierName;
				if (remapCarrierName[carrierName]) {
					carrierName = remapCarrierName[carrierName];
				}

				if (!carriersInCountry.includes(carrierName)) {
					carriersInCountry.push(carrierName);
					carrierInfo[carrierName] = {};
				}	

				switch(countrySimCarrier[recordId].planName) {
					case 'Original':
						break;
						
					case 'Bundled':
						// Zone 6 and higher is hidden for Telefonica, except for Korea and Taiwan
						if (countrySimCarrier[recordId].zone < 6 || countryName == 'South Korea' || countryName === 'Taiwan') {
							carrierInfo[carrierName].telefonica = true;	
							countryCoverage[countryName].telefonica = true;

							if (!countryCoverage[countryName].telfonicaBands3G) {
								countryCoverage[countryName].telfonicaBands3G = bandsToModel3G(countrySimCarrier[recordId].bands3G);
							}
							else 
							if (countryCoverage[countryName].telfonicaBands3G != bandsToModel3G(countrySimCarrier[recordId].bands3G)) {
								countryCoverage[countryName].telfonicaBands3G += ' ' + bandsToModel3G(countrySimCarrier[recordId].bands3G);
							}
						}
						break;
						
					case 'LTE-M':
					case 'NORAM':
						carrierInfo[carrierName].korelte = true;	
						countryCoverage[countryName].korelte = true;
						break;
										
					case 'One Net':
						carrierInfo[carrierName].koreone = true;	
						carrierInfo[carrierName].koreall = true;	
						countryCoverage[countryName].koreone = true;
						countryCoverage[countryName].koreall = true;
						break;
						
					case 'All Net':
						carrierInfo[carrierName].koreall = true;	
						countryCoverage[countryName].koreall = true;
						break;
						
					case 'SuperSIM':
						carrierInfo[carrierName].supersim = true;	
						countryCoverage[countryName].supersim = true;

						if (!countryCoverage[countryName].supersimBands3G) {
							countryCoverage[countryName].supersimBands3G = bandsToModel3G(countrySimCarrier[recordId].bands3G);
						}
						else 
						if (countryCoverage[countryName].supersimBands3G != bandsToModel3G(countrySimCarrier[recordId].bands3G)) {
							countryCoverage[countryName].supersimBands3G += ' ' + bandsToModel3G(countrySimCarrier[recordId].bands3G);
						}
						break;
				}

			}
		}

		carriersInCountry.sort(function(a, b) {
			return a.localeCompare(b);
		});
	
		countryCoverage[countryName].carriersInCountry = carriersInCountry;

		if (lastLetter != countryName.charAt(0)) {
			lastLetter = countryName.charAt(0);
			output += labelRow + spacerRow;
		}

		for(let jj = 0; jj < carriersInCountry.length; jj++) {
			// console.log("  " + carriersInCountry[jj]);
			const carrierName = carriersInCountry[jj];

			output += '| ' + countryName + ' | ' + carrierName;

			simTypeNames.forEach(function(simType) {
				if (carrierInfo[carrierName][simType]) {
					output += ' | &check; ';
				}
				else {
					output += ' | &nbsp; ';
				}
			});

			output += '| \n';
		}

		output += spacerRow;


	}

	//
	//
	//
	output += '\n';
	output += 'Telefonica to SuperSIM: Countries gaining or losing coverage\n';
	output += 'Affected SKUs: Electron (G350, U260, U270), E Series E310\n';
	output += '\n';

	output += '| Country | Coverage Change |\n';
	output += "| :--- | :---: |\n";

	for(let ii = 0; ii < countryNames.length; ii++) {
		const countryName = countryNames[ii];
		
		if (countryCoverage[countryName].telefonica && !countryCoverage[countryName].supersim) {
			// Losing coverage
			output += '| ' + countryName + '| \u274C |\n'; // Red X
		}
		else
		if (!countryCoverage[countryName].telefonica && countryCoverage[countryName].supersim) {
			// Gaining coverage
			output += '| ' + countryName + '| \u2705  |\n'; // Green box with with checkmark
		}
	}

	//
	//
	//
	/*
	output += '\n';
	output += 'Telefonica to SuperSIM: Countries with different 3G Electron due to carrier change\n';
	output += '\n';
	
	for(let ii = 0; ii < countryNames.length; ii++) {
		const countryName = countryNames[ii];


		if (countryCoverage[countryName].telefonica && countryCoverage[countryName].supersim) {

			if (countryCoverage[countryName].telfonicaBands3G != countryCoverage[countryName].supersimBands3G) {
				output += '| ' + countryName + ' | ' + countryCoverage[countryName].telfonicaBands3G + 
					' | ' + countryCoverage[countryName].supersimBands3G + ' |\n';
			}
		}

	}
	*/


	//
	//
	//
	output += '\n';
	output += 'Kore (OneNet) to SuperSIM: Countries gaining or losing coverage\n';
	output += 'Affected SKUs: Boron 2G/3G, B Series B523, E Series E313, Tracker SoM T523\n';
	output += '\n';


	output += '| Country | Coverage Change |\n';
	output += "| :--- | :---: |\n";

	for(let ii = 0; ii < countryNames.length; ii++) {
		const countryName = countryNames[ii];
		
		if (countryCoverage[countryName].koreone && !countryCoverage[countryName].supersim) {
			// Losing coverage
			output += '| ' + countryName + '| \u274C |\n'; // Red X
		}
		else
		if (!countryCoverage[countryName].koreone && countryCoverage[countryName].supersim) {
			// Gaining coverage
			output += '| ' + countryName + '| \u2705  |\n'; // Green box with with checkmark
		}
	}


	fs.writeFileSync(path.join(__dirname, 'carrierComparison.md'), output);

}