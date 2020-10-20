const fs = require('fs');
const path = require('path');
const dns = require('dns');


const dnsJsonPath = path.join(__dirname, '../config', 'dnsTable.json');
    
const lookupArray = [
    {
        "key":"udp",
        "hosts":[
            "eks-udp-device-service-blue-static.us-east-1.eks-production-gotham.particle.io",
            "eks-udp-device-service-green-static.us-east-1.eks-production-gotham.particle.io",
            "eks-udp-device-service-red-static.us-east-1.eks-production-gotham.particle.io"       
        ]
    },
    {
        "key":"tcp",
        "hosts":[
            "eks-tcp-device-service-blue-static.us-east-1.eks-production-gotham.particle.io",
            "eks-tcp-device-service-green-static.us-east-1.eks-production-gotham.particle.io",
        ]
    },
    {
        "key":"api",
        "hosts":[
            "api.particle.io"
        ]
    },
    {
        "key":"tools",
        "hosts":[
            "build.particle.io",
            "console.particle.io",
            "docs.particle.io",            
            "support.particle.io"
        ]
    }
];

// console.log('generating...');
let results = {};

processLookupArray(function() {
    fs.writeFileSync(dnsJsonPath, JSON.stringify(results, null, 2));
});

function processLookupArray(completion) {

    lookupArray.forEach(function(lookupObj, outerIndex) {
        // Create empty keys for the results
        if (!results[lookupObj.key]) {
            results[lookupObj.key] = {};
        }
        if (!results[lookupObj.key].addresses) {
            results[lookupObj.key].addresses = [];
        }

        const outerLast = (outerIndex + 1) >= lookupArray.length;

        lookupObj.hosts.forEach(function(hostName, innerIndex) {
            dns.lookup(hostName, {family:4, all:true}, function(err, addresses) {
                const innerLast = (innerIndex + 1) >= lookupObj.hosts.length;

                if (err) {
                    throw err;
                }
                
                addresses.forEach(function(obj) {
                    results[lookupObj.key].addresses.push(obj.address);    
                });


                if (innerLast) {
                    //console.log('innerLast');
                    results[lookupObj.key].addresses.sort(ipAddrSort);
                    // console.log('addresses', results[lookupObj.key].addresses);

                    // results[lookupObj.key].md = arrayToMd(results[lookupObj.key].addresses);
                }

                if (outerLast && innerLast) {
                    //console.log('outerLast && innerLast');
                    completion();
                }
            });
        });
    });
}

function ipAddrSort(a, b) {
    const aArray = a.split('.');
    const bArray = b.split('.');

    if (aArray.length != 4 || bArray.length != 4) {
        return a.localeCompare(b);
    }

    for(let ii = 0; ii < aArray.length; ii++) {
        const aInt = parseInt(aArray[ii]);
        const bInt = parseInt(bArray[ii]);

        if (aInt < bInt) {
            return -1;
        }
        else if (aInt > bInt) {
            return +1;
        }
    }
    return 0;
}

/*
function arrayToMd(array) {
    var md = '';

    md += '| IP address      |\n';
    md += '| :-------------: |\n';

    array.forEach(function(addr) {
        md += '| ' + addr + '                '.substr(0, 15 - addr.length) + ' |\n';
    });

    return md;
}
*/
