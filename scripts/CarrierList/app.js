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


// These exceptions are listed at the top (and also duplicated at the normal alphabetical position)
var countryListTop = ['United States', 'Canada', 'United Kingdom'];

// Array of country names (unique). They are normalized using the normalizeCountry object.
var countryList = [];

// Country data object. Key is the normalized country name.
var countryData = {};

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

// Sunset information
var sunset2g = {};
var sunset3g = {};

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
	    
	    getFullData();
	});

}

function getFullData() {
	base('Country-SIM-Carrier').select({
	    maxRecords: 9999, // TEMPORARY set to 9999
	    fields: ['Country', 'Carrier-link', 'Plan_Name-link', 'Technology-link', 'Network rank', 'Partner zone', '2G Sunset', '3G Sunset']
	}).eachPage(function page(records, fetchNextPage) {
	    // This function (`page`) will get called for each page of records.

	    records.forEach(function(record) {
	        // console.log('Retrieved ' + record.get('ID'), record);
	    	// console.log('record IDs: Country=' + record.get('Country') + ' Carrier-link=' + record.get('Carrier-link') + ' Plan_Name-link=' +record.get('Plan_Name-link'));
			// const recordId = record.get('ID'); 
			
			let countryId = record.get('Country');

	    	let countryName = countryNameMap[countryId]; 
	    	let carrierName = carrierNameMap[record.get('Carrier-link')];
	    	const planName = planNameMap[record.get('Plan_Name-link')];
	    	const rank = record.get('Network rank');
			const zone = parseInt(record.get('Partner zone'));
			
			// technology is an array of: '2G', '3G', '4G' (strings)
			const technology = record.get('Technology-link');
			
	    	const has2G = has2GMap[countryId];
	    	const which3G = which3GMap[countryId];
	    	
			if (normalizeCountry[countryName]) {
				countryName = normalizeCountry[countryName];
			}
			sunset2g[countryName + carrierName] = record.get('2G Sunset');
			sunset3g[countryName + carrierName] = record.get('3G Sunset');

			const mergedOffset = carrierName.indexOf('(Merged');
			if (mergedOffset > 0) {
				carrierName = carrierName.substring(0, mergedOffset).trim();
			}
			
	    	var showPlan = true;
	    	var group;
	    	
	    	switch(planName) {
	    	case 'Original':
    			showPlan = false;
	    		break;
	    		
	    	case 'Bundled':
	    		if (zone >= 6) {
		    		// Zone 6 and higher is hidden for Telefonica, except for Korea and Taiwan
		    		if (countryName == 'South Korea' || countryName === 'Taiwan') {
		    			// OK to show this plan
		    		}
		    		else {
		    			// Hide plan
		    			showPlan = false;
		    		}
	    		}
	    		group = 'telefonicaCarriers';
	    		break;
	    		
	    	case 'LTE-M':
	    	case 'NORAM':
	    		group = 'lteCarriers';
	    		break;
	    			    		
	    	case 'One Net':
	    		break;
	    		
	    	case 'All Net':
    			//showPlan = false;
	    		break;
	    		
    		default:
    			console.log('unknown planName=' + planName);
	    		showPlan = false;	
    			break;
	    	}
	    	
	    	if (planName === 'One Net' || planName === 'All Net') {
	    		switch(rank) {
	    		default:
	    		case 'Primary':
		    		group = 'vodafoneCarrierPrimary';
	    			break;
	    			
	    		case 'Secondary':
	    			group = 'vodafoneCarrierSecondary';
	    			break;
	    			
	    		case 'Backup':
		    		group = 'vodafoneCarrierBackup';
	    			break;
	    		}
	    	}
	    	
	    	if (showPlan) {
		    	console.log('countryName=' + countryName + ' carrierName=' + carrierName + ' planName=' + planName + ' rank=' + rank + ' zone=' + zone);	    	
	    		
	    		addCountryDataArray(countryName, group, carrierName);
	    		
	    		// We get this from the array configured about instead of airtable. We should fix this to store the data there.
				//addCountryData(countryName, 'has2g', has2G ? '' : '&#x2714;');
				addCountryData(countryName, 'has2g', no2g[countryName] ? no2g[countryName] : '&#x2714;');

	    		
				addCountryData(countryName, 'has3g', which3G ? which3G : 'U270');							

				var regionName = regionNameMap[countryRegionMap[countryId]];
				var isEurope = regionName === 'Europe' || regionName === 'Baltics';
				addCountryData(countryName, 'isEurope', isEurope);			
				// console.log('countryName=' + countryName + ' isEurope=' + isEurope);			
				
				if (planName === 'One Net' && rank === 'Primary') {
					addCountryData(countryName, 'oneNetTechnology', technology);
					// console.log('technology ' + countryName, technology);
				}
	    	}
	    	else {
		    	// console.log('hidden: countryName=' + countryName + ' carrierName=' + carrierName + ' planName=' + planName + ' rank=' + rank + ' zone=' + zone);	    	
	    	} 
	    		
	    });

	    fetchNextPage();

	}, function done(err) {
	    if (err) { console.error(err); return; }
	    
		for(var country in countryData) {
			countryList.push(country);
		}
		// Need to do a case-insensitive comparison because of eSwatini. 
		countryList.sort(function(a, b) {
			return a.localeCompare(b, undefined, { sensitivity: 'accent' });
		});
		
		// Put commonly used countries at the top (but still leave them alphabetically below)
		for(var ii = countryListTop.length - 1; ii >= 0; ii--) {
			countryList.unshift(countryListTop[ii]);
		}

	    generateMarkdown();
	});
	
}

function addCountryData(country, key, value) {
	if (!countryData[country]) {
		countryData[country] = {};
	} 
	countryData[country][key] = value;
}

function addCountryDataArray(country, key, value) {	
	if (!countryData[country]) {
		countryData[country] = {};
	} 
	if (!countryData[country][key]) {
		countryData[country][key] = [];		
	}
	for(var ii = 0; ii < countryData[country][key].length; ii++) {
		if (countryData[country][key][ii] == value) {
			// Already in list
			return;
		}
	}
	
	countryData[country][key].push(value);
}

function addCountryDataArrayArray(country, key, value) {	
	if (Array.isArray(value)) {
		for(var ii = 0; ii < value.length; ii++) {
			addCountryDataArray(country, key, value[ii]);			
		}
	}
	else {
		addCountryDataArray(country, key, value);
	}
}


function generateMarkdown() {
	var md = '';
	
	var simTypes = ['Electron', 'LTE', 'Boron', 'BoronAllNet', 'B523'];
	
	for(var jj = 0; jj < simTypes.length; jj++) {
		var simType = simTypes[jj];
		md += '{{collapse op="start" simType="' + simType + '"}}\n\n';

		var isAllNet = false;
		const allNetIndex = simType.indexOf('AllNet');
		if (allNetIndex > 0) {
			isAllNet = true;
			simType = simType.substr(0, allNetIndex);
		}

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
		
		var countryAdded = {};
		var ii = 0;
		if (simType == 'LTE' || simType == 'B523') {
			// Don't include US, Canada, and UK at the stop for these short lists
			ii += countryListTop.length;
		}
		for(; ii < countryList.length; ii++) {
			var country = countryList[ii];

			var carrierArray = [];
			
			if (!countryData[country]) {
		 		console.log('missing data for ' + country);
				continue;
			}
			
			if (simType === 'Electron') {
				if (countryData[country].telefonicaCarriers) {
					for(var kk = 0; kk < countryData[country].telefonicaCarriers.length; kk++) {
						carrierArray.push(countryData[country].telefonicaCarriers[kk]);
					}
				}
			}
			else
			if (simType === 'LTE') {
				// Dedupe the LTE list because it's short. Otherwise, United States shows up twice.
				if (countryData[country].lteCarriers && !countryAdded[country]) {					
					for(var kk = 0; kk < countryData[country].lteCarriers.length; kk++) {
						carrierArray.push(countryData[country].lteCarriers[kk]);
					}
				}
			}
			else
			if (simType === 'Boron') {
				var hasSecondaryOrBackup = countryData[country].vodafoneCarrierSecondary || countryData[country].vodafoneCarrierBackup;
				
				if (!isAllNet) {
					hasSecondaryOrBackup = false; 
				}

				if (countryData[country].vodafoneCarrierPrimary) {
					for(var kk = 0; kk < countryData[country].vodafoneCarrierPrimary.length; kk++) {
						carrierArray.push(countryData[country].vodafoneCarrierPrimary[kk] + (hasSecondaryOrBackup ? '<sup>1</sup>' : ''));
					}
				}
				if (hasSecondaryOrBackup && countryData[country].vodafoneCarrierSecondary) {
					for(var kk = 0; kk < countryData[country].vodafoneCarrierSecondary.length; kk++) {
						carrierArray.push(countryData[country].vodafoneCarrierSecondary[kk] + '<sup>2</sup>');
					}
				}
				if (hasSecondaryOrBackup && countryData[country].vodafoneCarrierBackup) {
					for(var kk = 0; kk < countryData[country].vodafoneCarrierBackup.length; kk++) {
						carrierArray.push(countryData[country].vodafoneCarrierBackup[kk] + '<sup>3</sup>');
					}
				}
			}
			else
			if (simType === 'B523') {
				// Europe only
				if (!countryData[country].isEurope) {
					continue;
				}
				// Include Vodafone OneNet carriers
				if (countryData[country].vodafoneCarrierPrimary) {
					for(var kk = 0; kk < countryData[country].vodafoneCarrierPrimary.length; kk++) {
						carrierArray.push(countryData[country].vodafoneCarrierPrimary[kk]);
					}
				}
			}
			
			for(var kk = 0; kk < carrierArray.length; kk++) {
				if (kk == 0) {
					md += '| ' + country + ' | ';
				}
				else {
					md += '|   | ';
				}
				md += carrierArray[kk] + ' |';

				var carrierName = carrierArray[kk];
				var supIndex = carrierName.indexOf('<sup>');
				if (supIndex > 0) {
					carrierName = carrierName.substr(0, supIndex);
				}
				
				if (simType === 'Electron') {
					// countryData[country].has2g + ' | '
					md += countryData[country].has3g + ' |';					
				}

				if (sunsetMd1 != '') {
					// Include 2G/3G sunset information
					md += sunsetToMd(sunset2g[country + carrierName]) + ' | ' + 
						sunsetToMd(sunset3g[country + carrierName]) + ' | ';
				}

				if (simType === 'B523') {
					const technology = countryData[country].oneNetTechnology;
					// console.log('country=' + country, technology);
					md += (isInArray('2G', technology) ? '&check;' : '&nbsp;') + '| ';
					md += (isInArray('3G', technology) ? '&check;' : '&nbsp;') + '| ';
					md += (isInArray('4G', technology) ? '&check;' : '&nbsp;') + '| ';
				}

				md += '\n';
			}
			
			countryAdded[country] = true;
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





