'use strict';

// You must set your Airtable API key in an environment variable before calling this app
// export AIRTABLE_API_KEY=YOUR_SECRET_API_KEY
// The key is in the settings in Airtable. Keep this secret as it grants full access to your account.

// The parameter to base is the app ID for "SKUs / Carriers / Plans"
const base = require('airtable').base('appRCx9bhA5UCU4Gu');

// To view carrier data on Airtable: "SKUs / Carriers / Plans" 


const fs = require('fs');
const path = require('path');

var normalizeCountry = {
		'United States of America':'United States'
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
	        // console.log('Retrieved Region id=' + record.getId() + ' name=' + record.get('Name') + ' parent=' + record.get('Parent'));
			regionNameMap[record.getId()] = record.get('Name');
			regionParentMap[record.getId()] = record.get('Parent');
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
	        let which3G;
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
	    fields: ['ID', 'Country', 'SIM Provider', 'Carrier-link', 'Plan_Name-link', 'Technology-link', 'Network rank', 'Partner zone', '2G Sunset', '3G Sunset']
	}).eachPage(function page(records, fetchNextPage) {
	    // This function (`page`) will get called for each page of records.

	    records.forEach(function(record) {
	        // console.log('Retrieved ' + record.get('ID'), record);
	    	// console.log('record IDs: Country=' + record.get('Country') + ' Carrier-link=' + record.get('Carrier-link') + ' Plan_Name-link=' +record.get('Plan_Name-link'));
			
			const recordId = record.get('ID'); // Country-SIM-Carrier 
			countrySimCarrier[recordId] = {};
			
			const countryId = record.get('Country');
		
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
		

	    	countrySimCarrier[recordId].planName = planNameMap[record.get('Plan_Name-link')];
	    	countrySimCarrier[recordId].rank = record.get('Network rank');
			countrySimCarrier[recordId].zone = parseInt(record.get('Partner zone'));
			
			// technology is an array of: '2G', '3G', '4G' (strings)
			// It's only accurate for Kore. Most Telefonica entries are set to 3G even if they support 2G.
			countrySimCarrier[recordId].technology = record.get('Technology-link');
			
			// I'm pretty sure this is no longer used, which would also allow has2GMap to be removed
			countrySimCarrier[recordId].has2G = has2GMap[countryId];
			
			countrySimCarrier[recordId].which3G = which3GMap[countryId] || 'U270';
			
	    	
			countrySimCarrier[recordId].sunset2G = record.get('2G Sunset');
			countrySimCarrier[recordId].sunset3G = record.get('3G Sunset');


			const regionName = regionNameMap[countryRegionMap[countryId]];
			countrySimCarrier[recordId].regionName = regionName;
			countrySimCarrier[recordId].isB523 = isInArray(regionName, regionB523);	

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
	    		
    		default:
    			console.log('unknown planName=' + planName);	
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


	    generateMarkdown();
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
			sunsetMd1 = ' 2G Sunset | 3G Sunset | ';
			sunsetMd2 = ' :-------: | :-------: | ';
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

				if (sunsetMd1 != '') {
					// Include 2G/3G sunset information
					md += sunsetToMd(countrySimCarrier[recordId].sunset2G) + ' | ' + 
						sunsetToMd(countrySimCarrier[recordId].sunset3G) + ' | ';
				}

				if (simType === 'B523') {
					const technology = countrySimCarrier[recordId].technology;
					// console.log('country=' + country, technology);
					md += (isInArray('2G', technology) ? '&check;' : '&nbsp;') + '| ';
					md += (isInArray('3G', technology) ? '&check;' : '&nbsp;') + '| ';
					md += (isInArray('4G', technology) ? '&check;' : '&nbsp;') + '| ';
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

function isInArray(value, array) {
	for(var ii = 0; ii < array.length; ii++) {
		if (array[ii] === value) {
			return true;
		}
	}
	return false;
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





