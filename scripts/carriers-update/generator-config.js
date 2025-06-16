const fs = require('fs');
const path = require('path');

const schemaDocs = require('./schema-docs');


(function(generatorConfig) {
    
    generatorConfig.updates = [
        // Monitor One schema
        {
            guid: '40b06c67-b4eb-4be9-b9c2-539ac2f68dbd',
            generatorFn: function(updater) {
                return schemaDocs.generateMd({
                    kind: 'monitor',
                    idOmit: [                        
                        '#/properties/location',
                        '#/properties/store',
                        '#/properties/imu_trig',
                        '#/properties/rgb',
                        '#/properties/sleep',
                        '#/properties/monitoring',
                        '#/properties/geofence',
                        '#/properties/temp_trig',
                        '#/properties/tracker',
                        '#/properties/modbus_rs485',
                        '#/properties/modbus1',
                        '#/properties/modbus2',
                        '#/properties/modbus3',
                        '#/properties/io',
                        '#/properties/iocal',
                    ],
                    indent: 3,
                    updater,
                });
            },
        },
        {
            guid: 'c7548071-4421-40b6-b229-bf8e51e625cc',
            generatorFn: function(updater) {
                return schemaDocs.generateMd({
                    kind: 'monitor',
                    id: [
                        '#/properties/modbus_rs485',
                        '#/properties/modbus1',
                        '#/properties/modbus2',
                        '#/properties/modbus3',
                    ],
                    headingOmit: true,
                    indent: 3,
                    updater,
                });
            },
        },
        {
            guid: 'cef0011b-49a1-4992-ab61-ee8eea74abc2',
            generatorFn: function(updater) {
                return schemaDocs.generateMd({
                    kind: 'monitor',
                    id: '#/properties/io',
                    headingOmit: true,
                    indent: 3,
                    updater,
                });
            },
        },
        {
            guid: '23d4ca8b-c845-4939-bf6b-e259dc45af27',
            generatorFn: function(updater) {
                return schemaDocs.generateMd({
                    kind: 'monitor',
                    id: '#/properties/iocal',
                    headingOmit: true,
                    indent: 3,
                    updater,
                });
            },
        },

        // Tracker schema
        {
            guid: 'a0a2120c-78c7-4d51-84af-062f116d70be',
            generatorFn: function(updater) {
                return schemaDocs.generateMd({
                    kind: 'tracker',
                    idOmit: [
                        '#/properties/location',
                        '#/properties/store',
                        '#/properties/imu_trig',
                        '#/properties/rgb',
                        '#/properties/sleep',
                        '#/properties/monitoring',
                        '#/properties/geofence',
                        '#/properties/temp_trig',
                        '#/properties/tracker'
                    ],
                    indent: 3,
                    updater,
                });
            },
        },
        {
            guid: '38cf5c3c-cd20-45a4-b87f-a541b9bbef70',
            generatorFn: function(updater) {
                return schemaDocs.generateMd({
                    kind: 'tracker',
                    id: '#/properties/location',
                    headingOmit: true,
                    indent: 3,
                    updater,
                });
            },
        },
        {
            guid: '192e9889-fb5c-4082-af99-19d65beadc02',
            generatorFn: function(updater) {
                return schemaDocs.generateMd({
                    kind: 'tracker',
                    id: '#/properties/store',
                    headingOmit: true,
                    indent: 3,
                    updater,
                });
            },
        },
        {
            guid: '36859bbf-9198-4f15-bf70-cd7471c84827',
            generatorFn: function(updater) {
                return schemaDocs.generateMd({
                    kind: 'tracker',
                    id: '#/properties/imu_trig',
                    headingOmit: true,
                    indent: 3,
                    updater,
                });
            },
        },
        {
            guid: 'da5553f8-b134-484e-9b04-64aa241b66dd',
            generatorFn: function(updater) {
                return schemaDocs.generateMd({
                    kind: 'tracker',
                    id: '#/properties/rgb',
                    headingOmit: true,
                    indent: 3,
                    updater,
                });
            },
        },
        {
            guid: 'b7d34d6c-e7e3-4125-85bb-6965346098ed',
            generatorFn: function(updater) {
                return schemaDocs.generateMd({
                    kind: 'tracker',
                    id: '#/properties/sleep',
                    headingOmit: true,
                    indent: 3,
                    updater,
                });
            },
        },        
        {
            guid: '77fd453b-6ad4-4a69-adae-a7f31118c4ca',
            generatorFn: function(updater) {
                return schemaDocs.generateMd({
                    kind: 'tracker',
                    id: '#/properties/monitoring',
                    headingOmit: true,
                    indent: 3,
                    updater,
                });
            },
        },        
        {
            guid: 'b1bb1d44-9b07-4237-ad3c-1050a7125619',
            generatorFn: function(updater) {
                return schemaDocs.generateMd({
                    kind: 'tracker',
                    id: '#/properties/geofence',
                    headingOmit: true,
                    indent: 3,
                    updater,
                });
            },
        },        
        {
            guid: '62c6ee9b-ac47-4a85-aeae-075c62511901',
            generatorFn: function(updater) {
                return schemaDocs.generateMd({
                    kind: 'tracker',
                    id: '#/properties/temp_trig',
                    headingOmit: true,
                    indent: 3,
                    updater,
                });
            },
        },        
        {
            guid: '77fd453b-6ad4-4a69-adae-a7f31118c4ca',
            generatorFn: function(updater) {
                return schemaDocs.generateMd({
                    kind: 'tracker',
                    id: '#/properties/tracker',
                    headingOmit: true,
                    indent: 3,
                    updater,
                });
            },
        },        


        

        // firmware.md
        {
            guid:'4d3ada5a-494c-469b-b6ee-6b4ec53bc3d3', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pwm-groups',
                    platformNew: 'E404X',
                    useGroup: true,
                }); 
            } 
        },                
        {
            // content/hardware/b-series-som/b-series-som-flexibility.md
            guid:'28581230-6d89-4e9c-a7f7-7dcef556fb2b', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformOld: 'B4xx SoM',
                    platformNew: 'B5xx SoM',
                    hideUnchanged: true,
                }); 
            } 
        },
        {
            guid:'46200be3-45e5-4b7a-8106-80c9ee17d4b7', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pwm-listing',
                    platformFilter: (e => e.id > 0 && e.id < 99),
                }); 
            } 
        },                
        // serial-number
        {            
            guid: 'b0fce313-6098-47bc-b2f7-c700210b1cc6', 
            generatorFn:function(updater) {
                return updater.generateSkuToPrefix(); 
            }             
        },
        {            
            guid: '682e93c3-adcd-4d72-b183-813ee5164dc4', 
            generatorFn:function(updater) {
                return updater.generatePrefixToSku(); 
            }             
        },

        // product-lifecycle-policy-status
        {            
            guid: 'ac230403-4883-4c71-8781-601d6ca5a0fa', 
            generatorFn:function(updater) {
                return updater.generateSkuLifecycle(); 
            }             
        },
        // verizon-faq
        {            
            guid: '45d4d59b-d643-41d2-96ef-a7ec73124a9c', 
            generatorFn:function(updater) {
                return updater.generateVerizonSku(); 
            }             
        },
        // Manual setup
        {
            guid: '58997959-6743-4757-8081-18a46c2f6abf', 
            generatorFn:function(updater) {
                return updater.generateUsbCable(); 
            }             
        },
        {
            guid: '4db96e4d-e7bd-4f43-a5dc-2c1db07fd338', 
            generatorFn:function(updater) {
                return updater.generateBatteryRequired(); 
            }             
        },

        // Electron datasheet
        {
            guid:'ab31991a-76c5-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('electron'); 
            } 
        },
        {
            guid:'0ca3e34e-76e2-11eb-9439-0242ac130002',
            generatorFn:function(updater) {
                return updater.generateCountryList('electron', {noVerizon: true}); 
            } 
        },
        // E-Series datasheet
        {
            guid:'26c8707c-76ca-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('e series'); 
            } 
        },
        {
            guid:'2445e222-76e2-11eb-9439-0242ac130002',
            generatorFn:function(updater) {
                return updater.generateCountryList('e series', {noVerizon: true}); 
            } 
        },

        // m.2 breakout board
        {
            guid:'9ea389b4-0c66-4b3e-9c95-9e31e1fa6f00', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformOld: 'M.2 SoM breakout board header, B-SoM',
                    platformOldTitle: 'B-SoM',
                    platformNew: 'M.2 SoM breakout board header, M-SoM',
                    platformNewTitle: 'M-SoM',
                    showPinNum: true,
                    showMorePins: [
                        'm2Pin',
                        'somPin',
                    ]
                }); 
            } 
        },                

        // datasheets/electron/b-series-eval-board.md
        {
            guid:'3c7bdf46-c2a2-4b04-aeb1-222b761e036b', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-details',
                    showPinNum: true,
                    platformNew: 'M.2 SoM eval board header, B-SoM'
                }); 
            } 
        },                
        {
            guid: '029063e9-db97-4294-933c-3d4625abcfae', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'net-label',
                    showPinNum: true,
                    onlyDifferences: true,
                    platformNew: 'M.2 SoM eval board header, B-SoM',
                    showMorePins: [
                        'label',
                        'net',
                    ]
                }); 
            } 
        },                


        // datasheets/electron/e-series-eval-board.md
        {
            guid:'89806642-76cb-11eb-9439-0242ac130002',
            generatorFn:function(updater) {
                return updater.generateFamilySkus('e series', {
                    filterFn:function(skuObj) {
                        return skuObj.skuClass != 'eval';
                    }        
                }); 
            } 
        },
        // datasheets/electron/e404x-datasheet.md
        {
            guid:'6591a5b8-3326-46c8-9133-de4d6dacbc77', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'modulePins',
                    platformNew: 'E404X'
                }); 
            } 
        },                
        {
            guid:'7467d36c-a9d2-4629-be9f-2e76262f956e', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'portPins',
                    platformNew: 'E404X',
                    port: 'analogWritePWM',
                    label: 'PWM'
                }); 
            } 
        },                
        {
            guid:'bdf550a7-6a65-4cb3-9650-ec612986b349', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'portPins',
                    platformNew: 'E404X',
                    port: 'i2c',
                    label: 'I2C',
                    useShortName: true
                }); 
            } 
        },                
        {
            guid:'ec8e0cf4-a9be-4964-ab24-5e9d8cd3670f', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'portPins',
                    platformNew: 'E404X',
                    port: 'hardwareADC',
                    label: 'ADC',
                    useShortName: true
                }); 
            } 
        },                
        {
            guid:'68c19adf-d373-4061-8f71-0ebc756b68c0', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'portPins',
                    platformNew: 'E404X',
                    port: 'serial',
                    label: 'UART',
                    useShortName: true
                }); 
            } 
        },                
        {
            guid:'42be4ad3-031d-4718-bf69-fa9320d7eae5', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'portPins',
                    platformNew: 'E404X',
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true
                }); 
            } 
        },                
        {
            guid:'4ccb8904-6d00-446d-9aa6-5786c66435d4', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'portPins',
                    platformNew: 'E404X',
                    port: 'digitalRead',
                    label: 'GPIO'
                }); 
            } 
        },     
        {
            guid:'0e3f5e76-cfaf-4215-8c3c-b764621ff10f', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('electron', {
                    filterFn:function(skuObj) {
                        return skuObj.modem != 'U201';
                    }        
                }); 
            } 
        },
        {
            guid:'10a242d8-273c-4d63-8aa1-69cc12bdc1fd', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('electron', {
                    filterFn:function(skuObj) {
                        return skuObj.modem != 'G350';
                    }        
                }); 
            } 
        },
        {
            guid:'2ed15218-3c7e-4866-b3f4-a27dff5ac592', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('electron', {
                    filterFn:function(skuObj) {
                        return skuObj.modem != 'U260';
                    }        
                }); 
            } 
        },
        {
            guid:'ff7523c9-9847-44f7-a749-752bc2c2f22c', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('electron', {
                    filterFn:function(skuObj) {
                        return skuObj.modem != 'U270';
                    }        
                }); 
            } 
        },
        // datasheets/electron/e404x-migration-guide.md
        {
            guid:'6c533551-bce6-4c2e-b248-c7274f4b1b22', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'migration-removed',
                    platformOld: 'E-Series',
                    platformNew: 'E404X'
                }); 
            } 
        },
        {
            guid:'aa218eb3-5975-4ba6-b26d-2a5d43c5378e', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformOld: 'E-Series',
                    platformNew: 'E404X'
                }); 
            } 
        },
        {
            guid:'0fc429e8-585e-4f36-9874-e3fa37a1136e', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformOld: 'E-Series',
                    platformNew: 'E404X',
                    port: 'analogWritePWM',
                    label: 'PWM',
                    includeHardwareTimer: true,
                }); 
            } 
        },
        {
            guid:'a7091023-5382-4496-8bfc-727593f0d426', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformOld: 'E-Series',
                    platformNew: 'E404X',
                    port: 'analogRead',
                    label: 'ADC'
                }); 
            }
        },
        {
            guid:'c7f59d46-dca3-4376-b885-0b4ca924a28b', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformOld: 'E-Series',
                    platformNew: 'E404X',
                    port: 'serial',
                    label: 'Serial',
                    useShortName: true
                }); 
            }
        },
        {
            guid:'e6a3ce62-dfb5-4926-a1b4-5f2fd5048d05', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformOld: 'E-Series',
                    platformNew: 'E404X',
                    port: 'i2c',
                    label: 'I2C',
                    useShortName: true
                }); 
            }
        },
        {
            guid:'9327b9b9-21fd-46fd-a406-8c249ade9688', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformOld: 'E-Series',
                    platformNew: 'E404X',
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true
                }); 
            }
        },
        {
            guid:'2ee8f339-68a5-4d9c-b6b9-0f359038d704', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformOld: 'E-Series',
                    platformNew: 'E404X',
                    port: 'analogWriteDAC',
                    label: 'DAC'
                }); 
            }
        },
        {
            guid:'aaf618d9-4053-490d-8b3b-2ef6118592d6', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformOld: 'E-Series',
                    platformNew: 'E404X',
                    port: 'can',
                    label: 'CAN',
                    useShortName: true
                }); 
            }
        },
        {
            guid:'2767a61d-eba6-4720-8c91-869be322880f', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformOld: 'E-Series',
                    platformNew: 'E404X',
                    port: 'jtag',
                    label: 'JTAG',
                    useShortName: true
                }); 
            }
        },
        {
            guid:'b90ca6ee-1877-4f05-a3bd-b073d768e54d', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformOld: 'E-Series',
                    platformNew: 'E404X',
                    port: 'swd',
                    label: 'SWD',
                    useShortName: true
                }); 
            }
        },
        // datasheets/boron/boron-datasheet.md
        {
            guid:'281acdea-76ce-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('boron'); 
            } 
        },
        {
            guid:'945c4c4c-76d1-11eb-9439-0242ac130002',
            generatorFn:function(updater) {
                return updater.generateCountryList('boron'); 
            } 
        },
        {
            guid:'e2c1aabb-d8d1-4bf4-90e1-6fe0978663e8',
            generatorFn:function(updater) {
                return updater.generateCountryList('boron', {
                    groupFn:function(groupObj) {
                        return groupObj.modem != 'R510';
                    }
                }); 
            } 
        },        
        {
            guid:'a7f02cc7-9035-489e-a7dc-15d4e915866f', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('boron', {
                    filterFn:function(skuObj) {
                        return skuObj.modem != 'R510';
                    }        
                }); 
            } 
        },
        {
            guid:'d1aa84ec-2018-4446-8bcf-2f0380abf834', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('boron', {
                    filterFn:function(skuObj) {
                        return skuObj.modem != 'R410';
                    }        
                }); 
            } 
        },
        {
            guid:'785e45e8-9da4-45d9-a1f5-71add831195b', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('boron', {
                    filterFn:function(skuObj) {
                        return skuObj.modem != 'U201';
                    }        
                }); 
            } 
        },      
        // battery guide
        {
            
            guid:'993e47b6-c085-45bf-908b-238bb6c323b8', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    addMiddle: [
                        {
                            key: 'usb',
                            title: 'USB connector',
                            align: 'center',
                        },
                        {
                            key: 'batteryConn',
                            title: 'Battery Connector',        
                            align: 'center',
                        },
                    ],
                    filterFn:function(skuObj) {
                        return !skuObj.batteryConn;
                    }        
                }); 
            }             
        }, 
        {
            
            guid:'c9f92c9a-3485-4faa-a30d-9b49fcb0a76e', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    addMiddle: [
                    ],
                    filterFn:function(skuObj) {
                        if (!skuObj.platformId) {
                            return true;
                        }

                        // TODO: Implement this!
                        
                        for(const key in updater.datastore.data.deviceConstants) {
                            if (updater.datastore.data.deviceConstants[key].id == skuObj.platformId) {
                                const deviceConstantObj = updater.datastore.data.deviceConstants[key];
                                // console.log('deviceConstantObj', deviceConstantObj);
                            }
                        }

                        return true;
                    }        
                }); 
            }             
        }, 
        // power modules
        {
            
            guid:'3d1db546-0b6a-44a5-ba46-fc58a360e33e', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('PMBAT')
                    }        
                }); 
            }             
        }, 
        {
            
            guid:'ce788a12-7fda-4377-adc4-cd86329af29c', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('PMDC')
                    }        
                }); 
            }             
        }, 
        // electron 2 
        {
            guid:'128e6580-8ddd-45bc-882f-71785ae12855', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('electron-2', {
                    filterFn:function(skuObj) {
                        return false;
                    }        
                }); 
            } 
        },
        {
            
            guid:'c7f6eddb-bbdf-41c9-99e3-69a9f90a834a', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    addMiddle: [
                        {
                            key: 'skuRegion',
                            title: 'Region',
                            align: 'center',
                        },
                    ],
                    filterFn:function(skuObj) {
                        return !skuObj.feather || skuObj.lifecycle == 'Deprecated' || skuObj.lifecycle == 'End of life' || skuObj.lifecycle == 'Hidden';
                    }        
                }); 
            }             
        }, 
        {
            
            guid:'f13e8e51-ccb7-4e3c-bac1-4a7d4457b55b', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    addMiddle: [
                        {
                            key: 'skuRegion',
                            title: 'Region',
                            align: 'center',
                        },
                    ],
                    filterFn:function(skuObj) {
                        return !skuObj.m2som || skuObj.lifecycle == 'Deprecated' || skuObj.lifecycle == 'End of life' || skuObj.lifecycle == 'Hidden';
                    }        
                }); 
            }             
        }, 
        {
            
            guid:'f13e8e51-ccb7-4e3c-bac1-4a7d4457b55b', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    addMiddle: [
                        {
                            key: 'skuRegion',
                            title: 'Region',
                            align: 'center',
                        },
                    ],
                    filterFn:function(skuObj) {
                        return typeof skuObj.gnss != 'string' || skuObj.gnss == 'cellular-modem' || skuObj.lifecycle == 'Deprecated' || skuObj.lifecycle == 'End of life' || skuObj.lifecycle == 'Hidden';
                    }        
                }); 
            }             
        }, 
        {
            
            guid:'a4b614a6-b9c8-44c3-921e-548c45280ab7', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    addMiddle: [
                        {
                            key: 'skuRegion',
                            title: 'Region',
                            align: 'center',
                        },
                    ],
                    filterFn:function(skuObj) {
                        return typeof skuObj.mcu != 'string' || skuObj.mcu != 'nrf52840' || skuObj.lifecycle == 'Deprecated' || skuObj.lifecycle == 'End of life' || skuObj.lifecycle == 'Hidden';
                    }        
                }); 
            }             
        }, 
        {
            
            guid:'280bbf98-939d-41db-b3b8-a64042687b30', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    addMiddle: [
                        {
                            key: 'skuRegion',
                            title: 'Region',
                            align: 'center',
                        },
                    ],
                    filterFn:function(skuObj) {
                        return typeof skuObj.mcu != 'string' || skuObj.mcu != 'rtl872x' || skuObj.lifecycle == 'Deprecated' || skuObj.lifecycle == 'End of life' || skuObj.lifecycle == 'Hidden';
                    }        
                }); 
            }             
        }, 
        {
            
            guid:'4cffddb7-1c7e-4ddb-a8a9-098c947fe543', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    addMiddle: [
                        {
                            key: 'skuRegion',
                            title: 'Region',
                            align: 'center',
                        },
                    ],
                    filterFn:function(skuObj) {
                        return typeof skuObj.modem != 'string' || !skuObj.modem.startsWith('EG91') || skuObj.lifecycle == 'Deprecated' || skuObj.lifecycle == 'End of life' || skuObj.lifecycle == 'Hidden';
                    }        
                }); 
            }             
        }, 
        {
            
            guid:'e31c7f1f-7d9a-4fac-8490-e3256845d215', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    addMiddle: [
                        {
                            key: 'skuRegion',
                            title: 'Region',
                            align: 'center',
                        },
                    ],
                    filterFn:function(skuObj) {
                        return typeof skuObj.modem != 'string' || !skuObj.modem.startsWith('EG800Q') || skuObj.lifecycle == 'Deprecated' || skuObj.lifecycle == 'End of life' || skuObj.lifecycle == 'Hidden';
                    }        
                }); 
            }             
        }, 
        {
            
            guid:'521a2be9-7d36-4cf9-9996-1b59720d07b8', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    addMiddle: [
                        {
                            key: 'skuRegion',
                            title: 'Region',
                            align: 'center',
                        },
                    ],
                    filterFn:function(skuObj) {
                        return typeof skuObj.modem != 'string' || skuObj.lifecycle == 'Deprecated' ||
                        (!skuObj.modem.startsWith('BG9') && !skuObj.modem.startsWith('R4') && !skuObj.modem.startsWith('R5')) || skuObj.lifecycle == 'End of life' || skuObj.lifecycle == 'Hidden';
                    }        
                }); 
            }             
        }, 
        {
            
            guid:'bfde3ce5-1f90-40fe-9bba-481cdc5b89bd', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    filterFn:function(skuObj) {
                        return typeof skuObj.skuRegion != 'string' || skuObj.skuRegion != 'noram' || skuObj.lifecycle == 'Deprecated' || skuObj.lifecycle == 'End of life' || skuObj.lifecycle == 'Hidden' || (!skuObj.m2som && !skuObj.feather);
                    }        
                }); 
            }             
        }, 
        {
            
            guid:'6a8ccfd8-0058-481f-bcd3-2a78b88a3e82', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    filterFn:function(skuObj) {
                        return typeof skuObj.skuRegion != 'string' || skuObj.skuRegion != 'emeaa' || skuObj.lifecycle == 'Deprecated' || skuObj.lifecycle == 'End of life' || skuObj.lifecycle == 'Hidden' || (!skuObj.m2som && !skuObj.feather);
                    }        
                }); 
            }             
        }, 
        {
            
            guid:'be8173dc-011c-4719-ae3e-9bba199849a8', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    filterFn:function(skuObj) {
                        return typeof skuObj.skuRegion != 'string' || skuObj.skuRegion != 'americas' || skuObj.lifecycle == 'Deprecated' || skuObj.lifecycle == 'End of life' || skuObj.lifecycle == 'Hidden' || (!skuObj.m2som && !skuObj.feather);
                    }        
                }); 
            }             
        }, 

        // power-measurement.md
        {
            guid:'1e4ff400-8197-4485-ab74-b81d81c3eedc', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    filterFn:function(skuObj) {
                        return typeof skuObj.pmic != 'string' || skuObj.pmic.length == 0;
                    },
                    addMiddle: [
                        {
                            key: 'pmic',
                            title: 'PMIC',
                        },
                    ],
                }); 
            },
        },
        

        // datasheets/boron/b404-b402-datasheet.md
        {
            guid:'91d8b83c-76ce-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('b series', {
                    filterFn:function(skuObj) {
                        return skuObj.modem != 'R410';
                    }        
                }); 
            } 
        },
        {
            guid:'442e5625-6587-4002-9f2f-474eb9ff7927', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('b series', {
                    filterFn:function(skuObj) {
                        return skuObj.modem != 'R510';
                    }        
                }); 
            } 
        },
        {
            guid:'c9241a2c-76e0-11eb-9439-0242ac130002',
            generatorFn:function(updater) {
                return updater.generateCountryList('b series', {
                    groupFn:function(groupObj) {
                        return groupObj.modem != 'R410';
                    }
                }); 
            } 
        },
        {
            guid:'6d0451d8-43b0-498e-8a13-9a4099a0067e',
            generatorFn:function(updater) {
                return updater.generateCountryList('b series', {
                    groupFn:function(groupObj) {
                        return groupObj.modem != 'R410';
                    },
                    noModel: true,
                }); 
            } 
        },
        // Electron 2
        {
            guid:'c13cd883-4df5-4de7-868e-5999c8650ce4',
            generatorFn:function(updater) {
                return updater.generateCountryModelComparison({
                    leftColumns: [
                        {
                            rowFlag: true,
                        },
                        {
                            title: 'Country',
                            key: 'country',    
                        },
                    ],
                    groups: [
                        {
                            key: 'na',
                            title: 'ELC504EM (NorAm)',
                            modem: 'EG800Q-NA',
                            sim: 4,
                            backgroundColor: '#AFE4EE', // COLOR_Sky_600
                            textColor: '#001928', // Midnight_700
                            columns: [
                                {
                                    title: 'Rec',
                                    key: 'na.recommendation',
                                    roamingRestrictionsKey: 'na.roamingRestrictions',  
                                },
                                /*{
                                    title: 'Technologies',
                                    key: 'na.technologies',
                                },*/
                                {
                                    title: 'Carriers',
                                    key: 'na.carriers',
                                },
                            ],
                        },
                        {
                            separator: '6px',
                        },
                        {
                            key: 'eu',
                            title: 'ELC524EM (Europe)',
                            modem: 'EG800Q-EU',
                            sim: 4,
                            backgroundColor: '#89E2B3', // COLOR_Mint_600
                            textColor: '#001928', // Midnight_700
                            columns: [
                                {
                                    title: 'Rec',
                                    key: 'eu.recommendation',
                                    roamingRestrictionsKey: 'eu.roamingRestrictions',  
                                },
                                /*{
                                    title: 'Technologies',
                                    key: 'na.technologies',
                                },*/
                                {
                                    title: 'Carriers',
                                    key: 'eu.carriers',
                                },
                            ],
                        }
                    ],
                }); 
            } 
        },      
        {
            guid:'936be9f3-0894-4b5f-88cd-3b22ebf42fc0',
            generatorFn:function(updater) {
                return updater.generateCountryModelComparison({
                    leftColumns: [
                        {
                            title: 'Country',
                            key: 'country',    
                        },
                    ],
                    groups: [
                        {
                            key: 'elc504',
                            title: 'ELC504EM (NorAm)',
                            modem: 'EG800Q-NA',
                            sim: 4,
                            columns: [
                                {
                                    title: 'Rec',
                                    key: 'elc504.recommendation',
                                    roamingRestrictionsKey: 'elc504.roamingRestrictions',  
                                },
                                {
                                    title: 'Technologies',
                                    key: 'elc504.technologies',
                                }
                            ],
                        },
                        {
                            separator: '6px',
                        },
                        {
                            key: 'elc524',
                            title: 'ELC524EM (Europe)',
                            modem: 'EG800Q-EU',
                            sim: 4,
                            columns: [
                                {
                                    title: 'Rec',
                                    key: 'elc524.recommendation',
                                    roamingRestrictionsKey: 'elc524.roamingRestrictions',  
                                },
                                {
                                    title: 'Technologies',
                                    key: 'elc524.technologies',
                                },
                            ],
                        },
                        {
                            separator: '6px',
                        },
                        {
                            key: 'b504',
                            title: 'B504e (Americas)',
                            modem: 'EG91-NAX',
                            sim: 4,
                            columns: [
                                {
                                    title: 'Rec',
                                    key: 'b504.recommendation',
                                    roamingRestrictionsKey: 'b504.roamingRestrictions',  
                                },
                                {
                                    title: 'Technologies',
                                    key: 'b504.technologies',
                                },
                            ],
                        },                        
                        {
                            separator: '6px',
                        },
                        {
                            key: 'm404',
                            title: 'M404 (NorAm)',
                            modem: 'BG95-M5',
                            sim: 4,
                            columns: [
                                {
                                    title: 'Rec',
                                    key: 'm404.recommendation',
                                    roamingRestrictionsKey: 'm404.roamingRestrictions',  
                                },
                                {
                                    title: 'Technologies',
                                    key: 'm404.technologies',
                                },
                            ],
                        },
                        {
                            separator: '6px',
                        },
                        {
                            key: 'm524',
                            title: 'M534 (EMEAA)',
                            modem: 'EG91-EX',
                            sim: 4,
                            columns: [
                                {
                                    title: 'Rec',
                                    key: 'm524.recommendation',
                                    roamingRestrictionsKey: 'm524.roamingRestrictions',  
                                },
                                {
                                    title: 'Technologies',
                                    key: 'm524.technologies',
                                },
                            ],
                        },
                    ],
                }); 
            } 
        },      

        // B504
        {
            guid:'716800d6-7c3f-45f7-8cc4-91af58795240',
            generatorFn:function(updater) {
                return updater.generateCountryList(null, {
                    modems: ['EG91-NAX'],
                    noModel: true,
                }); 
            } 
        },
        {
            guid:'4dd8ccc8-d597-4a5b-8ed9-174666f1dd3b',
            generatorFn:function(updater) {
                return updater.generateCountryList(null, {
                    modems: ['EG91-NAX'],
                    noModel: true,
                    possibleSkusOnly: true,
                }); 
            } 
        },
        {
            guid:'86efb1c7-a248-4821-8403-6f949b5b0285', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('b series', {
                    filterFn:function(skuObj) {
                        return skuObj.modem != 'EG91-NAX';
                    },
                    noEtherSimColumn: true,
                }); 
            } 
        },        
        // Tachyon
        {
            guid:'ae3c46e6-c970-4ceb-8e55-2adde82efb79',
            generatorFn:function(updater) {
                return updater.generateCountryList(null, {
                    modems: ['SG560D-NA'],
                    sim: 5,
                    noModel: true,
                }); 
            } 
        },
        {
            guid:'d37da224-3ea6-4b28-823c-8b322ab3b7c6',
            generatorFn:function(updater) {
                return updater.generateCountryList(null, {
                    modems: ['SG560D-EM'],
                    sim: 5,
                    noModel: true,
                }); 
            } 
        },
        {
            guid:'99a15043-5618-49a0-84b4-4f1ef9c1fa3e',
            generatorFn:function(updater) {
                return updater.generateCountryList(null, {
                    modems: ['SG560D-EM'],
                    simPlanKey: 'kddi',
                    sim: 5,
                    possibleSkusOnly: true,
                }); 
            } 
        },

        // SoM guide
        {
            guid:'9e1f59dd-fe76-4361-85a0-daaed2736a85', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    filterFn:function(skuObj) {
                        return !skuObj.m2som
                    }        
                }); 
            } 
        },        
        // Electron 2
        {
            guid:'22694b55-ad2c-4e61-a33f-71994b569ba3', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-details',
                    showPinNum: true,
                    platformNew: 'Electron 2'
                }); 
            } 
        },                
        {
            guid: 'e3a16918-77ca-4439-9020-220282c681ee',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'Electron 2',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'4dccb92d-ca6c-491a-8aab-2f5a1d259809',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Electron 2',
                    interface: 'serial',
                    noPinNumbers: true,
                }); 
            }                     
        },
        {
            guid:'dcad2250-0112-4901-ae15-f18d3b8fd771',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Electron 2',
                    interface: 'spi',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'5f81e7fc-53ae-46e5-9976-9a71f2d94bb2',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Electron 2',
                    interface: 'i2c',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'6d2f42d4-109a-43d6-9375-4bcd750f1225',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Electron 2',
                    interface: 'hardwareADC',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'cdac1a36-7742-47d6-b1cd-c8ecced4974d',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Electron 2',
                    interface: 'analogWritePWM',
                    noInterface: true,
                    showHardwareTimer: true,
                    noPinNumbers: true,
                }); 
            } 
        },        
        // BRN404X
        {
            guid:'4b3e02b9-2be9-40ff-8486-90fa48a9e518', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-details',
                    showPinNum: true,
                    platformNew: 'Boron'
                }); 
            } 
        },                
        {
            guid: 'ac335968-6a40-4e3a-9493-46510917cf20',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'Boron',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'6169d4a3-4938-4c53-9830-849f29c0ffe7',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Boron',
                    interface: 'serial',
                    noPinNumbers: true,
                }); 
            }                     
        },
        {
            guid:'5578133c-be91-431a-bec6-c903d70e87dd',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Boron',
                    interface: 'spi',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'b959c6b0-5b22-4e0d-9bbc-ce9989d7e16c',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Boron',
                    interface: 'i2c',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'bf872784-b042-45b5-980a-ff7abdec8a1b',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Boron',
                    interface: 'hardwareADC',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'2ee22e01-a29b-46db-9e33-cd9f93223537',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Boron',
                    interface: 'analogWritePWM',
                    noInterface: true,
                    showHardwareTimer: true,
                    noPinNumbers: true,
                }); 
            } 
        },
        // B404X
        {
            guid:'e0eff6f3-2cc8-4ad3-92ef-8f8de063cf2b', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-details',
                    showPinNum: true,
                    platformNew: 'B4xx SoM'
                }); 
            } 
        },                
        {
            guid: '50c2d429-c8a8-4dd1-9afa-5ceab1fdb714',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'B4xx SoM',
                }); 
            } 
        },/*
        {
            guid:'5c5c78ef-c99c-49b7-80f4-19196b90ecfe',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'modulePins',
                    platformNew: 'B4xx SoM',
                }); 
            } 
        },*/
        {
            guid:'f054fe69-870e-43d3-bd07-4d3168908a2b',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'B4xx SoM',
                    interface: 'serial'
                }); 
            }                     
        },
        {
            guid:'7fe583f7-da0e-4353-aba3-57085789528f',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'B4xx SoM',
                    interface: 'spi'
                }); 
            } 
        },
        {
            guid:'5736a439-4588-407f-a2bd-3a9f32920646',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'B4xx SoM',
                    interface: 'i2c'
                }); 
            } 
        },
        {
            guid:'4f2addb7-dc0c-4a01-915a-e47b4cbea4f5',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'B4xx SoM',
                    interface: 'hardwareADC'
                }); 
            } 
        },
        {
            guid:'32c36a5a-08d1-4cd0-bb65-a9d05e085a3d',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'B4xx SoM',
                    interface: 'analogWritePWM',
                    noInterface: true,
                    showHardwareTimer: true,
                }); 
            } 
        },
        {
            guid:'9a03f9ac-6d5e-4d9c-8962-4856d9029c30',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'B4xx SoM',
                    interface: 'isUSB',
                    noInterface: true,
                }); 
            } 
        },
        {
            guid:'c4771770-1f59-4b95-9774-06e7ee605b64',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'B4xx SoM',
                    interface: 'isLED',
                    noInterface: true,
                }); 
            } 
        },
        {
            guid:'e653d1b3-41a4-4c63-94a3-7029c2128bfd',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'B4xx SoM',
                    interface: 'isControl',
                    noInterface: true,
                }); 
            } 
        },
        // datasheets/boron/b524-b523-datasheet.md
        {
            guid:'88cf3396-ffa7-4f4c-b2ef-deead0b0315d', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-details',
                    showPinNum: true,
                    platformNew: 'B5xx SoM'
                }); 
            } 
        },                
        // 
        {
            guid:'ea841986-76ce-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('b series', {
                    filterFn:function(skuObj) {
                        return skuObj.skuRegion != 'emeaa';
                    }        
                }); 
            } 
        },
        {
            guid:'99975710-76e0-11eb-9439-0242ac130002',
            generatorFn:function(updater) {
                return updater.generateCountryList('b series', {
                    groupFn:function(groupObj) {
                        return groupObj.modem != 'EG91-E';
                    }
                });                 
            } 
        },
        // datasheets/asset-tracking/tracker-one.md
        {
            guid:'9aef0d9c-76d6-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('tracker', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('ONE');
                    }        
                }); 
            } 
        },
        {
            guid:'2f3d1a14-76de-11eb-9439-0242ac130002',
            generatorFn:function(updater) {
                return updater.generateCountryList('tracker', {
                    modelFilterFn:function(model) {
                        return !model.startsWith('ONE');
                    }
                }); 
            } 
        },
        // datasheets/asset-tracking/tracker-som-datasheet.md
        {
            guid:'04ad48d4-76d7-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('tracker', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('T') || skuObj.skuClass == 'eval';
                    }        
                }); 
            } 
        },
        {
            guid:'ff0124f9-1fef-464c-ad08-4d1379202ede', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('tracker', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('T') || skuObj.modem != 'BG96-MC';
                    }        
                }); 
            } 
        },
        {
            guid:'33d26d3d-613c-4ebc-96d0-cc1488f6ce4d', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('tracker', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('T') || skuObj.modem != 'EG91-EX';
                    }        
                }); 
            } 
        },
        {
            guid:'e63f1897-f6da-4b67-a67d-045960454fd6', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('tracker', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('ONE') || skuObj.modem != 'BG96-MC';
                    }        
                }); 
            } 
        },
        {
            guid:'1bd8150d-c605-497c-b973-14aaae0ddada', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('tracker', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('ONE') || skuObj.modem != 'EG91-EX';
                    }        
                }); 
            } 
        },
        {
            guid:'8e7b0446-76de-11eb-9439-0242ac130002',
            generatorFn:function(updater) {
                return updater.generateCountryList('tracker', {
                    modelFilterFn:function(model) {
                        return !model.startsWith('T');
                    }
                }); 
            } 
        },
        // datasheets/asset-tracking/tracker-som-eval-board.md
        {
            guid:'698155b6-76d7-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('tracker', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('T') || skuObj.skuClass != 'eval';
                    }        
                }); 
            } 
        },
    
        // datasheets/boron/b-series-electron-migration-guide.md
        {
            guid:'4ca93c19-3cd8-4edf-ae24-d5a3ab433844', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'Electron',
                    mapBy: 'name',
                    showPinNum: true,
                    platformNewTitle: 'B-Series SoM',
                }); 
            }
        },   
        {
            guid:'adfc129f-947d-4e22-b703-a6710d77a5a3', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'Electron',
                    port: 'digitalWrite',
                    label: 'GPIO',
                    useShortName: true,
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'B-Series SoM',
                    checkmark: true,
                }); 
            }
        },
        {
            guid:'fa06b028-2b43-4832-9c98-41329ed4cd78', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'Electron',
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true,
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'B-Series SoM',
                }); 
            }
        },
        {
            guid:'1d4ebec9-df9d-457f-acf8-9305a870c888', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'Electron',
                    port: 'serial',
                    label: 'Serial',
                    useShortName: true,
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'B-Series SoM',
                }); 
            }
        },
        {
            guid:'090c9e42-91dc-4531-8c51-3ed6e4b8ade0', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'Electron',
                    port: 'analogRead',
                    label: 'ADC',
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'B-Series SoM',
                }); 
            }
        },
        {
            guid:'598e5ada-284b-4648-b553-1580a0020f38', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'Electron',
                    port: 'analogWritePWM',
                    label: 'PWM',
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'B-Series SoM',
                    includeHardwareTimer: true,
                }); 
            } 
        },             
        {
            guid:'d4215285-8a57-4639-991b-8551b6f2c3e2', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'Electron',
                    port: 'can',
                    label: 'CAN',
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    checkmark: false,
                    platformNewTitle: 'B-Series SoM',
                }); 
            } 
        }, 

        {
            guid:'175f09c2-2761-42e2-acbf-f7e0ea730d20', 
            generatorFn:function(updater){
                return updater.generateCountryComparison({
                    models: [
                        {
                            title: 'Electron U260',
                            modem: 'U260',
                            sim: 1,
                            recommendationMap: {
                                'NRND': '&check;', // Green Check
                            },
                        },
                        {
                            title: 'Electron U270',
                            modem: 'U270',
                            sim: 1,
                            recommendationMap: {
                                'NRND': '&check;',
                            },
                        },
                        {
                            title: 'Electron LTE',
                            modem: 'R410',
                            sim: 3,
                        },
                        {
                            title: 'B404X',
                            modem: 'R510',
                            sim: 4,
                        },
                        {
                            title: 'B524',
                            modem: 'EG91-E',
                            sim: 4,
                        },
                    ],
                });            
            },     
        },
        {
            guid:'fb53409a-8f87-44fa-91e0-5c82ee1feb5c', 
            generatorFn:function(updater) {
                return updater.generateAntCell({
                    filterFn: function(skuObj) {
                        if (skuObj.family == 'electron' || skuObj.family == 'b series') {
                            if (skuObj.name.startsWith('ASSET')) {
                                return true;
                            }
                            else {
                                // Leave in list
                                return false;
                            }
                        }
                        else {
                            return true;
                        }
                    },
                });
            }
        },

        // datasheets/boron/b-series-e-series-migration-guide.md
        {
            guid:'611f8e2a-7c24-434a-a98e-007c3aa3dd83', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'E-Series',
                    mapBy: 'name',
                    showPinNum: true,
                    platformNewTitle: 'B-Series SoM',
                }); 
            }
        },   
        {
            guid:'4d946a4a-17ba-4ac3-82f9-d5031762a08a', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'E-Series',
                    port: 'digitalWrite',
                    label: 'GPIO',
                    useShortName: true,
                    noPinNumbers: true,
                    oldPinNumber: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'B-Series SoM',
                    checkmark: true,
                }); 
            }
        },
        {
            guid:'40cba6f3-2c1b-4ede-a8b5-5d15846c582c', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'E-Series',
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true,
                    noPinNumbers: true,
                    oldPinNumber: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'B-Series SoM',
                }); 
            }
        },
        {
            guid:'238303fc-ef64-4bfe-b28a-bc20c294eb00', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'E-Series',
                    port: 'serial',
                    label: 'Serial',
                    useShortName: true,
                    noPinNumbers: true,
                    oldPinNumber: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'B-Series SoM',
                }); 
            }
        },
        {
            guid:'178a8aef-c0c8-4aec-ab3c-44db240c7b7e', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'E-Series',
                    port: 'analogRead',
                    label: 'ADC',
                    noPinNumbers: true,
                    oldPinNumber: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'B-Series SoM',
                }); 
            }
        },
        {
            guid:'1dc0b0d0-7736-4b3e-8e83-1cceaaff6df6', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'E-Series',
                    port: 'analogWritePWM',
                    label: 'PWM',
                    noPinNumbers: true,
                    oldPinNumber: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'B-Series SoM',
                    includeHardwareTimer: true,
                }); 
            } 
        },             
        {
            guid:'07265ded-150d-46ee-bd3f-c0f28278d76f', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'E-Series',
                    port: 'can',
                    label: 'CAN',
                    noPinNumbers: true,
                    oldPinNumber: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    checkmark: false,
                    platformNewTitle: 'B-Series SoM',
                }); 
            } 
        }, 

        {
            guid:'8f096cfa-f769-4e93-aabd-6cd19831602f', 
            generatorFn:function(updater){
                return updater.generateCountryComparison({
                    models: [
                        {
                            title: 'E310',
                            modem: 'U201',
                            sim: 1,
                        },
                        {
                            title: 'E313',
                            modem: 'U201',
                            sim: 2,
                        },
                        {
                            title: 'B404X',
                            modem: 'R510',
                            sim: 4,
                        },
                        {
                            title: 'B524',
                            modem: 'EG91-E',
                            sim: 4,
                        },
                    ],
                });            
            },     
        },
        {
            guid:'9fdb2282-d2a5-491d-9e00-6af5cde622f9', 
            generatorFn:function(updater) {
                return updater.generateAntCell({
                    filterFn: function(skuObj) {
                        if (skuObj.family == 'e series' || skuObj.family == 'b series') {
                            // Leave in list
                            return false;
                        }
                        else {
                            return true;
                        }
                    },
                });
            }
        },
        
        // datasheets/boron/msom-e-series-migration-guide.md
        {
            guid:'159eb8da-b56b-40d7-8df0-b54b7889555d',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'E-Series',
                    mapBy: 'name',
                    showPinNum: true,
                    platformNewTitle: 'M-SoM',
                }); 
            }
        },   
        {
            guid:'369dffc5-2607-422c-8d2f-049b8bac8b5d',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'E-Series',
                    port: 'digitalWrite',
                    label: 'GPIO',
                    useShortName: true,
                    noPinNumbers: true,
                    oldPinNumber: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'M-SoM',
                    checkmark: true,
                }); 
            }
        },
        {
            guid:'4757df20-600f-4beb-b781-59ff36cbb3d5',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'E-Series',
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true,
                    noPinNumbers: true,
                    oldPinNumber: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'M-SoM',
                }); 
            }
        },
        {
            guid:'b19893d3-ab63-4323-9b3f-b948d4c1c249',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'E-Series',
                    port: 'i2c',
                    label: 'I2C',
                    useShortName: true,
                    noPinNumbers: true,
                    oldPinNumber: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'M-SoM',
                }); 
            }
        },        {
            guid:'8c9a7dac-af5b-4a4d-9e40-7deb06ed921f', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'E-Series',
                    port: 'serial',
                    label: 'Serial',
                    useShortName: true,
                    noPinNumbers: true,
                    oldPinNumber: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'M-SoM',
                }); 
            }
        },
        {
            guid:'eeeca022-6ba8-4f96-b0e2-5b00362fed6d', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'E-Series',
                    port: 'analogRead',
                    label: 'ADC',
                    noPinNumbers: true,
                    oldPinNumber: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: 'M-SoM',
                }); 
            }
        },
        {
            guid:'4f18e140-7466-4fad-bc1f-55e8fcdf9561', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'E-Series',
                    port: 'analogWritePWM',
                    label: 'PWM',
                    noPinNumbers: true,
                    oldPinNumber: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    platformNewTitle: '< SoM',
                    includeHardwareTimer: true,
                }); 
            } 
        },             
        {
            guid:'c17ecfe5-34b1-473b-86f2-d8c7e48ca167', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'E-Series',
                    port: 'can',
                    label: 'CAN',
                    noPinNumbers: true,
                    oldPinNumber: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    checkmark: false,
                    platformNewTitle: 'M-SoM',
                }); 
            } 
        }, 
        {
            guid:'55771164-b2c5-4c32-b389-ad5b9d6f378e', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'E-Series',
                    interface: 'hibernate'
                }); 
            } 
        }, 
        {
            guid:'3e05bb14-1927-42cb-8f15-8ebe473bc99c', 
            generatorFn:function(updater){
                return updater.generateCountryComparison({
                    models: [
                        {
                            title: 'E310',
                            modem: 'U201',
                            sim: 1,
                        },
                        {
                            title: 'E313',
                            modem: 'U201',
                            sim: 2,
                        },
                        {
                            title: 'B404X',
                            modem: 'R510',
                            sim: 4,
                        },
                        {
                            title: 'B524',
                            modem: 'EG91-E',
                            sim: 4,
                        },
                    ],
                });            
            },     
        },
        {
            guid:'a36f228d-5374-4bae-9557-4ec215613f66', 
            generatorFn:function(updater) {
                return updater.generateAntCell({
                    filterFn: function(skuObj) {
                        if (skuObj.family == 'e series' || skuObj.family == 'b series') { // TODO: Fix this!
                            // Leave in list
                            return false;
                        }
                        else {
                            return true;
                        }
                    },
                });
            }
        },
        
        // datasheets/boron/b-series-boron-migration-guide.md
        {
            guid:'b28329f3-7067-4ae1-aafa-c48b75d77674',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'region', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return skuObj.family != 'b series';
                    },
                    includeSkus:['M2EVAL'],
                }); 
            },
        },
        {
            guid:'09a7da10-a5d0-11ec-b909-0242ac120002', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'Boron',
                    mapBy: 'name',
                    showPinNum: true,
                    platformNewTitle: 'B-Series SoM',
                }); 
            } 
        },
        {
            guid:'ce9644de-a5de-11ec-b909-0242ac120002', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'Boron',
                    port: 'analogWritePWM',
                    label: 'PWM',
                    noPinNumbers: true,
                    mapBy: 'name',
                    platformNewTitle: 'B-Series SoM',
                }); 
            } 
        },
        {
            guid:'db4246c4-a5de-11ec-b909-0242ac120002', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'Boron',
                    port: 'analogRead',
                    label: 'ADC',
                    noPinNumbers: true,
                    mapBy: 'name',
                    platformNewTitle: 'B-Series SoM',
                }); 
            }
        },
        {
            guid:'ef25dc00-a5de-11ec-b909-0242ac120002', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'Boron',
                    port: 'serial',
                    label: 'Serial',
                    useShortName: true,
                    noPinNumbers: true,
                    mapBy: 'name',
                    platformNewTitle: 'B-Series SoM',
                }); 
            }
        },
        {
            guid:'49b31eea-a5de-11ec-b909-0242ac120002', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'B4xx SoM',
                    platformOld: 'Boron',
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true,
                    noPinNumbers: true,
                    mapBy: 'name',
                    platformNewTitle: 'B-Series SoM',
                }); 
            }
        },
        // datasheets/wi-fi/argon-datasheet.md
        {
            guid:'81ddccf2-774f-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('argon'); 
            } 
        },
        // datasheets/wi-fi/p1-datasheet.md
        {
            guid:'797577ac-7751-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('p series', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('P1');
                    }        
                }); 
            } 
        },
        // datasheets/wi-fi/p2-datasheet.md
        {
            guid:'2b457422-47aa-43ed-9fe6-a47d952fcd4b', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-details',
                    showPinNum: true,
                    platformNew: 'P2'
                }); 
            } 
        },                
        {
            guid:'a201cbf3-f21d-4b34-ac10-a713ef5a857e', 
            generatorFn:function(updater){
                return updater.generateFamilySkus('p series', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('P2');
                    }        
                }); 
            } 
        },
        {
            guid: '8bd904e1-0088-488c-9fbb-e695d7643949',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'portPins',
                    platformNew: 'P2',
                    port: 'digitalRead',
                    label: 'GPIO',
                    newMCU: 'MCU',
                    showBootMode: true,
                }); 
            } 
        },
        {
            guid:'5c5c78ef-c99c-49b7-80f4-19196b90ecfe', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'modulePins',
                    platformNew: 'P2',
                }); 
            } 
        },
        {
            guid:'cd89fea9-4917-4af5-bfd0-4bdaa400545c',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'P2',
                    interface: 'serial'
                }); 
            }                     
        },
        {
            guid:'c48b830e-f222-4a5d-a34f-14973ce84e22',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'P2',
                    interface: 'spi'
                }); 
            } 
        },
        {
            guid:'5b55adb8-1e32-4518-b01e-eadf4e67a262',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'P2',
                    interface: 'i2c'
                }); 
            } 
        },
        {
            guid:'ed5c8a8d-6f7f-4253-be72-a45e7316421e',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'P2',
                    interface: 'hardwareADC'
                }); 
            } 
        },
        {
            guid:'d68a9c54-a380-11ec-b909-0242ac120002',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'P2',
                    interface: 'analogWritePWM',
                    noInterface: true,
                }); 
            } 
        },
        {
            guid:'9974c87e-242b-4a44-8f89-eca3a455ab5f',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'P2',
                    interface: 'pdm',
                    noInterface: true,
                }); 
            } 
        },        {
            guid:'51e324e1-6f8a-43d5-aad2-f7cbbb699804',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'P2',
                    interface: 'isUSB',
                    noInterface: true,
                }); 
            } 
        },
        {
            guid:'e5794e03-d007-4420-be1f-b62ca2788442',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'P2',
                    interface: 'isLED',
                    noInterface: true,
                }); 
            } 
        },
        {
            guid:'a4b4a564-7178-4ba6-a98e-7b7ac5c8eeb9',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'P2',
                    interface: 'isControl',
                    noInterface: true,
                }); 
            } 
        },
        {
            guid:'c70374f7-3ef1-45b0-a5ee-cd7e09032ca7',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'P2',
                    interface: 'is5VTolerant',
                    noInterface: true,
                }); 
            } 
        },
        {
            guid:'6e6f887d-3df4-4cb3-b8e4-67f2aa26ad72',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'P2',
                    interface: 'hibernate',
                    onlyGPIO: true,
                }); 
            } 
        },
        {
            guid:'eaaf88f3-6d4b-41e8-b183-74ba8141dec1',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'P2',
                    interface: 'hibernatePull',
                    onlyGPIO: true,
                }); 
            } 
        },
        {
            guid:'3b7b8712-9617-11ec-b909-0242ac120002',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinNameChange2022_02_25',
                    platformNew: 'P2'
                }); 
            } 
        },
        {
            guid:'5936ede0-76ff-423b-97c7-5ba925aa6095',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'bootPins',
                    platformNew: 'P2'
                }); 
            }             
        },

        // datasheets/wi-fi/photon-2-datasheet.md
        {
            guid:'d4d39408-f360-442f-b5ad-2b240da5d14c', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-details',
                    showPinNum: false,
                    platformNew: 'Photon 2'
                }); 
            } 
        },                
        {
            guid:'097ba52c-0c46-4ec0-827d-3c5880d3fd3a', 
            generatorFn:function(updater){
                return updater.generateFamilySkus('p series', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('PHN2');
                    }        
                }); 
            } 
        },        
        {
            guid: 'ed19d7a3-f59d-4eec-85ba-2f67859e87b2',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'Photon 2',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'e9628714-d248-4806-897f-189eef8d4352', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'modulePins',
                    platformNew: 'Photon 2',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'f0b0b5df-84bf-400d-a833-1dd3276ca910',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Photon 2',
                    interface: 'serial',
                    noPinNumbers: true,
                }); 
            }                     
        },
        {
            guid:'90d1c896-32b3-4211-9d62-24d356098f29',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Photon 2',
                    interface: 'spi',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'136ece09-1c16-422d-8078-8c5fc47cf23e',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Photon 2',
                    interface: 'i2c',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'99012761-fa31-40d4-b657-0233111b81cb',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Photon 2',
                    interface: 'pdm',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'2bb13ba8-9f9c-44d6-8734-df6e85bb09042',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Photon 2',
                    interface: 'hibernate',
                    noPinNumbers: true,
                    onlyGPIO: true,
                }); 
            } 
        },
        {
            guid:'aff3d900-5161-48b1-a3b2-948739caea97',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Photon 2',
                    interface: 'hibernatePull',
                    noPinNumbers: true,
                    onlyGPIO: true,
                }); 
            } 
        },
        {
            guid:'2e0292c9-3489-40dd-b411-1a1ad8e5bb81',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Photon 2',
                    interface: 'hardwareADC',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'7c78e07c-4e5a-43a6-8c61-d9a322871bd8',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'old-new-comparison',
                    platformOld: 'Photon 2', // Left column
                    platformNew: 'P2', // Right column
                    pinNumberNew: true,
                    mapBy: 'hardwarePin',
                    hardwarePin: true,
                }); 
            } 
        },
        {
            guid:'2eae4165-6d66-49cc-b8ec-0e564c0f7a9e',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'bootPins',
                    platformNew: 'Photon 2'
                }); 
            }             
        },

        // datasheets/tracker/monitor-one-datasheet.md
        {
            guid: '9b3cae8d-ceee-4ec3-b8f3-d281501feb5e',
            generatorFn:function(updater){
                return updater.generatePinInfo({ // GPIO
                    style: 'interfacePins',
                    platformNew: 'Monitor One Expansion',
                    interface: 'digitalWrite',
                    noInterface: true,
                    noPinNumbers: true,
                    noInterface: true,
                    showSomPin: true,
                }); 
            } 
        },
        {
            guid:'7dcbd294-4979-41bf-8e70-252fdb227e06',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Monitor One Expansion',
                    interface: 'hardwareADC',
                    noPinNumbers: true,
                    showSomPin: true,
                }); 
            } 
        },
        {
            guid:'291a5a48-7c53-4243-b1d5-db4fa8a8b7ff',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Monitor One Expansion',
                    interface: 'spi',
                    noPinNumbers: true,
                    showSomPin: true,
                }); 
            } 
        },
        {
            guid:'d8395668-3997-4528-9701-303a37ea1a6e',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Monitor One Expansion',
                    interface: 'i2c',
                    noPinNumbers: true,
                    showSomPin: true,
                }); 
            } 
        },
        {
            guid:'4ab733fc-0cd1-4ad5-a55e-1d986eab4205',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Monitor One Expansion',
                    interface: 'serial',
                    noPinNumbers: true,
                    showSomPin: true,
                }); 
            } 
        },
        {
            guid:'010c5e58-e69f-468f-9d6c-3c7c6df851b5',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Monitor One Expansion',
                    interface: 'hardwareTimer',
                    noPinNumbers: true,
                    showSomPin: true,
                }); 
            } 
        },
        {
            guid:'a3c5f7f2-c933-4f71-9936-6373090a5d7e',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Monitor One Expansion',
                    interface: 'can',
                    noPinNumbers: true,
                    showSomPin: true,
                    noMCU: true
                }); 
            } 
        },
        {
            guid:'eb58b0f8-264c-4d09-8a26-d653ddc84b5a', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'modulePins',
                    platformNew: 'Monitor One Expansion',
                }); 
            } 
        },
        {
            guid:'fa286927-e333-41ee-9c2c-585f6729873b', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('tracker', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('MON404');
                    }        
                }); 
            } 
        },
        {
            guid:'df800960-c749-4b1d-9c69-ae4372e86ab7', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('tracker', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('MON');
                    }        
                }); 
            } 
        },
        {
            guid:'6cd2470c-9c54-45d5-877a-64290cf8f7b6',
            generatorFn:function(updater) {
                return updater.generateCountryList('tracker', {
                    modelFilterFn:function(model) {
                        return !model.startsWith('MON');
                    }
                }); 
            } 
        },
        {
            guid:'b7b56d49-1e9a-496c-bf05-70d5b9957cf9', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('m series', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('M404');
                    }        
                }); 
            } 
        },
        {
            guid:'3edc7960-f3e7-4034-a557-838ff3b7a480', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('m series', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('M524');
                    }        
                }); 
            } 
        },


        // datasheets/tracker/tracker-m-datasheet.md
        {
            guid: '58de1b4d-5c09-41bd-8d67-cef17d1ae475',
            generatorFn:function(updater){
                return updater.generatePinInfo({ // GPIO
                    style: 'interfacePins',
                    platformNew: 'Tracker M Expansion',
                    interface: 'digitalWrite',
                    noInterface: true,
                    noPinNumbers: true,
                    noInterface: true,
                    showSomPin: true,
                    pinIncludeFn: function(pin) {
                        return pin.num >= 100 && pin.num < 300;
                    },
                }); 
            } 
        },
        {
            guid:'ad9f1e40-1d9e-4fc3-9789-34453572592c',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Tracker M Expansion',
                    interface: 'hardwareADC',
                    noPinNumbers: true,
                    showSomPin: true,
                    pinIncludeFn: function(pin) {
                        return pin.num >= 100 && pin.num < 300;
                    },
                }); 
            } 
        },
        {
            guid:'34aac488-6adf-4a08-b708-e27db809932b',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Tracker M Expansion',
                    interface: 'spi',
                    noPinNumbers: true,
                    showSomPin: true,
                    pinIncludeFn: function(pin) {
                        return pin.num >= 100 && pin.num < 300;
                    },
                }); 
            } 
        },
        {
            guid:'b989915a-a028-4c9e-a421-22e513f03a2c',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Tracker M Expansion',
                    interface: 'i2c',
                    noPinNumbers: true,
                    showSomPin: true,
                    pinIncludeFn: function(pin) {
                        return pin.num >= 100 && pin.num < 300;
                    },
                }); 
            } 
        },
        {
            guid:'95735a1e-8452-4055-b4fb-abc03c0aa4b8',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Tracker M Expansion',
                    interface: 'serial',
                    noPinNumbers: true,
                    showSomPin: true,
                    pinIncludeFn: function(pin) {
                        return pin.num >= 100 && pin.num < 300;
                    },
                }); 
            } 
        },
        {
            guid:'0d196639-9ee4-4bc5-b5d1-ad2f4c6f1b52',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Tracker M Expansion',
                    interface: 'analogWritePWM',
                    noInterface: true,
                    noPinNumbers: true,
                    showSomPin: true,
                    pinIncludeFn: function(pin) {
                        return pin.num >= 100 && pin.num < 300;
                    },
                }); 
            } 
        },
        {
            guid:'8a89ce75-a226-4cba-8662-72930b0cac76', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'modulePins',
                    platformNew: 'Tracker M Expansion',
                    pinIncludeFn: function(pin) {
                        return pin.num >= 100 && pin.num < 300;
                    },
                    specialPinFn: function(num) {
                        const hundreds = Math.floor(num / 100);
                        const pinNum = num % 100;

                        let prefix = '';
                        switch(hundreds) {
                            case 1:
                                prefix = 'Top ';
                                break;
                            case 2:
                                prefix = 'Bot ';
                                break;
                        }

                        return prefix + pinNum.toString();
                    },
                }); 
            } 
        },
        {
            guid:'474c33ef-b42d-40a3-af86-ddbb3e26bcaf',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Tracker M Expansion',
                    interface: 'ioex',
                    noPinNumbers: true,
                    showSomPin: false,
                    noMCU: true,
                    tableSortFn: function(a, b) {
                        return a.ioex.localeCompare(b.ioex);
                    },
                }); 
            } 
        },
        {
            guid:'646ae9fe-b07b-4b5b-8184-fba1cab1fdee',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Tracker M Expansion',
                    interface: 'demux',
                    noPinNumbers: true,
                    showSomPin: false,
                    noMCU: true,
                    tableSortFn: function(a, b) {
                        return a.demux.localeCompare(b.demux);
                    },
                }); 
            } 
        },
        {
            guid: '3ca6e91c-b5bc-4f7d-9442-160b6c08b235',
            generatorFn:function(updater){
                return updater.generatePinInfo({ // MCU pins
                    style: 'interfacePins',
                    platformNew: 'Tracker M Expansion',
                    interface: 'mcuPin',
                    noInterface: true,
                    noPinNumbers: true,
                    showP2pin: true,
                    tableSortFn: function(a, b) {
                        return a.name.localeCompare(b.name);
                    },
                }); 
            } 
        },


        
        

        // datasheets/wi-fi/p2-photon-migration-guide.md
        {
            guid:'3729b0b4-4058-454e-aef8-0ca5c2526bd52', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'migration-removed',
                    platformNew: 'P2',
                    platformOld: 'Photon',
                    mapBy: 'name',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'1de5c9cc-077e-45d1-bc1e-d5892742d68e', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'migration-added',
                    platformNew: 'P2',
                    platformOld: 'Photon',
                    mapBy: 'name',
                }); 
            } 
        },
        {
            guid:'46220dbb-60cf-40f4-8fd0-30a968622977', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    mapBy: 'name',
                    showPinNum: true,
                    platformNew: 'P2',
                    platformOld: 'Photon',
                }); 
            } 
        },
        {
            guid:'2edd3413-e159-4396-9a02-db963b4c8999', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'Photon',
                    mapBy: 'name',
                    noPinNumbers: true,
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true
                }); 
            }
        },
        {
            guid:'15242326-04aa-4cc8-b2fd-8621301c7bdd', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'Photon',
                    mapBy: 'name',
                    noPinNumbers: true,
                    port: 'i2c',
                    label: 'I2C',
                    useShortName: true
                }); 
            }
        },            
        {
            guid:'21bcd7d9-474c-4d45-81e1-0cb1753fdb87', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'Photon',
                    mapBy: 'name',
                    noPinNumbers: true,
                    port: 'serial',
                    label: 'Serial',
                    useShortName: true
                }); 
            }
        },            
        {
            guid:'37d26734-83ca-42db-8dd6-701e3c411928', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'Photon',
                    mapBy: 'name',
                    noPinNumbers: true,
                    port: 'analogRead',
                    label: 'ADC',
                    useShortName: true,
                    checkmark: true,
                }); 
            }
        },            
        {
            guid:'e27ab11e-d144-4fe0-bfcf-dc5a56809e22', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'Photon',
                    mapBy: 'name',
                    noPinNumbers: true,
                    port: 'analogWritePWM',
                    label: 'PWM',
                    useShortName: true,
                    checkmark: true,
                }); 
            }
        },            
        {
            guid:'79d52214-7c64-4437-92e8-2ed059b3bbe3', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'Photon',
                    mapBy: 'name',
                    noPinNumbers: true,
                    port: 'analogWriteDAC',
                    label: 'DAC',
                    useShortName: true,
                    checkmark: true,
                }); 
            }
        },            
        {
            guid:'2cf91e3c-e8d7-40a4-a637-6a69a4d08e59', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'Photon',
                    mapBy: 'name',
                    noPinNumbers: true,
                    port: 'can',
                    label: 'CAN',
                    useShortName: true
                }); 
            }
        },            
        {
            guid:'b2ddf109-3a53-449e-a940-a3c9736b15fc', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'Photon',
                    mapBy: 'name',
                    noPinNumbers: true,
                    port: 'i2s',
                    label: 'I2S',
                    useShortName: true
                }); 
            }
        },            
        {
            guid:'84ab47ce-0497-437a-96cc-b56c854104b8', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'P2',
                    interface: 'swd',
                    otherNames: ['RST', 'GND'],
                }); 
            } 
        },    
        {
            guid:'1e172c40-939f-4ff0-85b3-11bcb54a70b8', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'old-new-comparison',
                    platformOld: 'Photon', // Left column
                    platformNew: 'P2', // Right column
                    pinNumberNew: true,
                    hardwarePin: true,
                    mapping: {
                        'A2': 'S3', 
                        'A3': 'S2', 
                        'A4': 'S1', 
                        'A5': 'S0',
                        'DAC': 'S5', 
                        'WKP': 'S6'
                    },
                    onlyIO: true
                }); 
            }
        },  
        {
            guid:'276c4cb4-5683-49ce-b9f6-e0bb74dc6735', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'old-new-comparison',
                    platformOld: 'Photon', // Left column
                    platformNew: 'P2', // Right column
                    pinNumberNew: true,
                    hardwarePin: true,
                    mapping: {
                        'A3': 'A2', 
                        'A5': 'A5',
                        'DAC': 'S5', 
                        'WKP': 'S6'
                    },
                    onlyIO: true
                }); 
            }
        },  
        // datasheets/wi-fi/p2-argon-migration-guide.md
        {
            guid:'d524a654-8845-4d9c-b8c4-05b60dca363e2', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'migration-removed',
                    platformNew: 'P2',
                    platformOld: 'Argon',
                    mapBy: 'name',
                    noPinNumbers: true,
                }); 
            } 
        },
        {
            guid:'fa0065f1-ba10-43af-9b5c-78338c2d02b8', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'migration-added',
                    platformNew: 'P2',
                    platformOld: 'Argon',
                    mapBy: 'name',
                }); 
            } 
        },
        {
            guid:'ee790982-5af6-44e2-aabf-89cd1ff1f392', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    mapBy: 'name',
                    showPinNum: true,
                    platformNew: 'P2',
                    platformOld: 'Argon',
                }); 
            } 
        },
        {
            guid:'cf7eb295-1ecf-4d24-b2a1-dc8a654321362', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'Argon',
                    mapBy: 'name',
                    noPinNumbers: true,
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true
                }); 
            }
        },
        {
            guid:'748b912b-44bf-41a9-84dc-ba3efb637b24', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'Argon',
                    mapBy: 'name',
                    noPinNumbers: true,
                    port: 'i2c',
                    label: 'I2C',
                    useShortName: true
                }); 
            }
        },            
        {
            guid:'ae9002de-ec14-49d1-a748-5ae16dd5b2d2', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'Argon',
                    mapBy: 'name',
                    noPinNumbers: true,
                    port: 'serial',
                    label: 'Serial',
                    useShortName: true
                }); 
            }
        },            
        {
            guid:'5c24cf45-54bd-4636-b52f-1adb72b46b15', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'Argon',
                    mapBy: 'name',
                    noPinNumbers: true,
                    port: 'analogRead',
                    label: 'ADC',
                    useShortName: true,
                    checkmark: true,
                }); 
            }
        },            
        {
            guid:'3cbcb367-cb90-4081-86d0-d7d0c07fc626', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'Argon',
                    mapBy: 'name',
                    noPinNumbers: true,
                    port: 'analogWritePWM',
                    label: 'PWM',
                    useShortName: true,
                    checkmark: true,
                }); 
            }
        },           
        {
            guid:'25914318-fc34-4f72-80f0-9ca6a3091e30', // General
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'old-new-comparison',
                    platformOld: 'Argon', // Left column
                    platformNew: 'P2', // Right column
                    pinNumberNew: true,
                    hardwarePin: true,
                    mapping: {
                        'A3':'S3',
                        'A4':'S4',
                        'SCK':'S2',
                        'MISO':'S1',
                        'MOSI':'S0',
                    },
                    onlyIO: true
                }); 
            }
        },              
        {
            guid:'5f99e2b9-32a0-4378-a074-459ef068e96f', // SPI1
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'old-new-comparison',
                    platformOld: 'Argon', // Left column
                    platformNew: 'P2', // Right column
                    pinNumberNew: true,
                    hardwarePin: true,
                    mapping: {
                        'A3':'S3',
                        'A4':'S4',
                        'SCK':'S2',
                        'MISO':'S1',
                        'MOSI':'S0',
                        'D2':'D4',
                        'D3':'D2',
                        'D4':'D3',
                    },
                    onlyIO: true
                }); 
            }
        },   
        // datasheets/wi-fi/p2-p1-migration-guide.md
        {
            guid:'17989260-63ec-4ba4-96ce-71639b445d9d', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'migration-removed',
                    platformNew: 'P2',
                    platformOld: 'P1',
                }); 
            } 
        },
        {
            guid:'0f8940d5-5d0b-4f16-bfa2-1666616ba9ef', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'migration-added',
                    platformNew: 'P2',
                    platformOld: 'P1',
                }); 
            } 
        },
        {
            guid:'5626ebed-0fab-4d08-bdc9-092490e8c084', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformNew: 'P2',
                    platformOld: 'P1',
                }); 
            } 
        },
        {
            guid:'597f8364-70a6-4861-9bb6-6f1df20418e3', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'P1',
                    port: 'analogWritePWM',
                    label: 'PWM',
                }); 
            } 
        },
        {
            guid:'cb6c8957-8f01-4166-8dea-1d1d5c862618', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'P1',
                    port: 'analogRead',
                    label: 'ADC'
                }); 
            }
        },
        {
            guid:'678b62a8-7981-406c-bd67-f7c1e607291f', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'P1',
                    port: 'serial',
                    label: 'Serial',
                    useShortName: true
                }); 
            }
        },
        {
            guid:'05f6184b-f88f-4737-82d7-647b489af469', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'P1',
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true
                }); 
            }
        },
        {
            guid:'09bea7c2-a382-11ec-b909-0242ac120002', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'P1',
                    port: 'i2c',
                    label: 'I2C',
                    useShortName: true
                }); 
            }
        },
        {
            guid:'129fac7d-5c50-46e3-82f6-6be5edaaccf1', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'P1',
                    port: 'analogWriteDAC',
                    label: 'DAC'
                }); 
            }
        },
        {
            guid:'75a00cb1-2521-442a-bd25-3b2071dcdf43', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'P1',
                    port: 'can',
                    label: 'CAN'
                }); 
            }
        },
        {
            guid:'8d8e7a73-c60c-4b04-8039-c5f8a7072f39', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'P2',
                    platformOld: 'P1',
                    port: 'i2s',
                    label: 'I2S',
                    useShortName: true
                }); 
            }
        },
        // datasheets/wi-fi/photon-2-argon-migration-guide.md
        {
            guid:'971b8de5-cd16-4546-b554-8535ea744b71', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Argon',
                    noModulePin: true,
                }); 
            } 
        },
        {
            guid:'bf93e2c1-5640-404d-a2f7-5150ade02743', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Argon',
                    port: 'analogWritePWM',
                    label: 'PWM',
                    noPinNumbers: true,
                    noModulePin: true,
                }); 
            } 
        },
        {
            guid:'74be4a79-6a50-4688-a29e-f0ca660e7c49', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Argon',
                    port: 'analogRead',
                    label: 'ADC',
                    noPinNumbers: true,
                    noModulePin: true,
                }); 
            }
        },
        {
            guid:'6a0631e5-4c61-4617-997c-0b310d0d2574', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Argon',
                    port: 'serial',
                    label: 'Serial',
                    useShortName: true,
                    noPinNumbers: true,
                    noModulePin: true,
                }); 
            }
        },
        {
            guid:'021430dd-e4d9-434c-8a5a-9632168c57b5', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Argon',
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true,
                    noPinNumbers: true,
                    noModulePin: true,
                }); 
            }
        },
        {
            guid:'25447b5c-994b-4406-8459-0a7d2d53b1c5', // not currently used
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Argon',
                    port: 'analogWriteDAC',
                    label: 'DAC',
                    noPinNumbers: true,
                    noModulePin: true,
                }); 
            }
        },      
        // datasheets/wi-fi/photon-2-photon-migration-guide.md
        {
            guid:'8fe037d3-67e1-429f-9865-014e4e5b50af', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Photon',
                    mapBy: 'argonPin',
                }); 
            } 
        },
        {
            guid:'5a2874df-488f-4879-93cf-b0c85dced7a9', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Photon',
                    port: 'analogWritePWM',
                    label: 'PWM',
                    noPinNumbers: true,
                    mapBy: 'photonPin',
                }); 
            } 
        },
        {
            guid:'7b8ec61a-2e3d-4569-9e37-a06d1a8926d0', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Photon',
                    port: 'analogRead',
                    label: 'ADC',
                    noPinNumbers: true,
                    mapBy: 'photonPin',
                }); 
            }
        },
        {
            guid:'b4bf5550-eadd-49f9-a462-e1cc867d9768', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Photon',
                    port: 'serial',
                    label: 'Serial',
                    useShortName: true,
                    noPinNumbers: true,
                    mapBy: 'photonPin',
                }); 
            }
        },
        {
            guid:'e0b9fa70-6d55-4b97-97c3-59591785f6a3', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Photon',
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true,
                    noPinNumbers: true,
                    mapBy: 'photonPin',
                }); 
            }
        },
        {
            guid:'1b998d6c-a383-11ec-b909-0242ac120002', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Photon',
                    port: 'i2c',
                    label: 'I2C',
                    useShortName: true,
                    noPinNumbers: true,
                    mapBy: 'photonPin',
                }); 
            }
        },
        {
            guid:'516f360b-9f6c-4eb0-b931-e095b24dcd02', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Photon',
                    port: 'analogWriteDAC',
                    label: 'DAC',
                    noPinNumbers: true,
                    mapBy: 'photonPin',
                }); 
            }
        },
        {
            guid:'0509e2dc-3122-4ed1-905d-41330c531519', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Photon',
                    port: 'can',
                    label: 'CAN',
                    noPinNumbers: true,
                    mapBy: 'photonPin',
                }); 
            }
        },
        {
            guid:'0d09bd5a-5858-41dd-a48a-82198eb7cb4a', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Photon 2',
                    platformOld: 'Photon',
                    port: 'i2s',
                    label: 'I2S',
                    useShortName: true,
                    noPinNumbers: true,
                    mapBy: 'photonPin',
                }); 
            }
        },
        {
            guid:'0339ca50-9a3e-11ec-b909-0242ac120002', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'classic-adapter',
                    platformNew: 'Photon 2',
                    platformOld: 'Electron',
                    noPinNumbers: true,
                    mapBy: 'classicAdapter',
                }); 
            }
        },
        // datasheets/wi-fi/photon-datasheet.md
        {
            guid:'c9a47b1a-7751-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('photon'); 
            } 
        },
        // datasheets/certifications/antenna.md
        {
            guid:'95bdb290-775f-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateAntCell();
            }
        },
        {
            guid:'04ed49fe-7766-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateAntWiFi();
            }
        },
        {
            guid:'54f1ecbe-7768-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateAntBle();
            }
        },
        {
            guid:'2b1c34c8-776b-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateAntNfc();
            }
        },
        {
            guid:'dd897350-776b-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateAntGnss();
            }
        },
        {
            guid:'57d69268-776d-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateNotCompatible({
                    filterFn:function(skuObj) {
                        return !!skuObj.cellAnt;
                    }        
                });
            }
        },
        {
            guid:'cee24faa-776d-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateNotCompatible({
                    filterFn:function(skuObj) {
                        return !!skuObj.wifiAntInt || !!skuObj.wifiAntExt;
                    }        
                });
            }
        },
        {
            guid:'2cf3e112-776e-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateNotCompatible({
                    filterFn:function(skuObj) {
                        return !!skuObj.bleAntInt || !!skuObj.bleAntExt;
                    }        
                });
            }
        },
        {
            guid:'6b9301fa-776e-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateNotCompatible({
                    filterFn:function(skuObj) {
                        return !!skuObj.nfcAntExt;
                    }        
                });
            }
        },
        // tutorials/asset-tracking/introduction.md
        {
            guid:'e6d392c0-777e-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('tracker'); 
            } 
        },
        // tutorials/cellular-connectivity/introduction.md
        {
            guid:'0f0d9a27-0176-4f7d-8006-75cf7c3f5072', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('boron'); 
            } 
        },
        {
            guid:'295a969b-7ffa-4f84-8234-7e4cb38d1f10', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('b series'); 
            } 
        },
        {
            guid:'d833e557-5289-450c-92cf-a6eedec30bd8', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('tracker'); 
            } 
        },
        {
            guid:'7a6e03da-072c-4955-922a-288e9609292a', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('electron'); 
            } 
        },
        {
            guid:'d5825d70-1978-4172-a917-9127c8879f4e', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('e series'); 
            } 
        },
        {
            guid:'32ab7e42-640f-462e-bcf5-be48681aa6ab', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('e series', {
                    filterFn:function(skuObj) {
                        return skuObj.modem != 'U201';
                    }        
                }); 
            } 
        },        
        {
            guid:'e2dcb80b-980f-400f-8151-672b236a194c', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('e series', {
                    filterFn:function(skuObj) {
                        return skuObj.modem != 'R410';
                    }        
                }); 
            } 
        },        
        {
            guid:'d3744bfd-dee2-4722-8b14-624c4eca69ac', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('e series', {
                    filterFn:function(skuObj) {
                        return skuObj.modem != 'R510';
                    }        
                }); 
            } 
        },        
        {
            // SKUs by region
            guid:'921d1b74-0130-49e9-9322-3da75e405e4e',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    columns: ['region', 'name', 'desc', 'modem', 'ethersim', 'gen', 'lifecycle', 'replacement'],
                    filterFn: function(skuObj) {
                        return !skuObj.modem;
                    },
                    sortFn: function(a, b) {
                        let cmp = a.skuRegion.localeCompare(b.skuRegion);
                        if (cmp) {
                            return cmp;
                        }
                        return a.name.localeCompare(b.name);
                    },
                }); 
            } 
        },
        {
            // SKUs by modem
            guid:'a85479cf-355b-45c8-9062-db69f037bfea',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    columns: ['modem', 'name', 'desc', 'region', 'ethersim', 'gen', 'lifecycle', 'replacement'],
                    filterFn: function(skuObj) {
                        return !skuObj.modem;
                    },
                    sortFn: function(a, b) {
                        let cmp = a.modem.localeCompare(b.modem);
                        if (cmp) {
                            return cmp;
                        }
                        return a.name.localeCompare(b.name);
                    },
                }); 
            }                 
        },
        {
            // SKUs by SIM
            guid:'8747e7eb-420e-425e-882c-e10117b77620',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    columns: ['simName', 'name', 'desc', 'region', 'modem', 'gen', 'lifecycle', 'replacement'],
                    filterFn: function(skuObj) {
                        return !skuObj.modem;
                    },
                    sortFn: function(a, b) {
                        let cmp = a.simName.localeCompare(b.simName);
                        if (cmp) {
                            return cmp;
                        }
                        return a.name.localeCompare(b.name);
                    },
                }); 
            }                 
        },
        {
            // SKUS - 2G only
            guid:'8d85e976-88f2-11ec-a8a3-0242ac120002',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    columns: ['name', 'desc', 'region', 'modem', 'gen', 'lifecycle', 'replacement'],
                    filterFn: function(skuObj) {
                        const modemObj = updater.datastore.findModemByModel(skuObj.modem);
                        if (!modemObj) {
                            return true;
                        }
                        if (modemObj.technologies.length != 1) {
                            return true;
                        }
                        return modemObj.technologies[0] != '2G';
                    },
                    sortFn: function(a, b) {
                        let cmp = a.simName.localeCompare(b.simName);
                        if (cmp) {
                            return cmp;
                        }
                        return a.name.localeCompare(b.name);
                    },
                }); 
            }                 
        },
        {
            // SKUS - 2G/3G only
            guid:'84f9efae-88f3-11ec-a8a3-0242ac120002',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    columns: ['name', 'desc', 'region', 'ethersim', 'modem', 'gen', 'lifecycle', 'replacement'],
                    filterFn: function(skuObj) {
                        const modemObj = updater.datastore.findModemByModel(skuObj.modem);
                        if (!modemObj) {
                            return true;
                        }
                        if (modemObj.technologies.length != 2) {
                            return true;
                        }
                        return !modemObj.technologies.includes('2G') || !modemObj.technologies.includes('3G');
                    },
                }); 
            }                 
        },
        ,
        {
            // SKUS - LTE Cat M1
            guid:'2b701cb4-88f4-11ec-a8a3-0242ac120002',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    columns: ['name', 'desc', 'region', 'ethersim', 'modem', 'gen', 'lifecycle', 'replacement'],
                    filterFn: function(skuObj) {
                        const modemObj = updater.datastore.findModemByModel(skuObj.modem);
                        if (!modemObj) {
                            return true;
                        }
                        return !modemObj.technologies.includes('M1');
                    },
                }); 
            }                 
        },
        {
            // SKUS - LTE Cat 1
            guid:'42193f40-88f4-11ec-a8a3-0242ac120002',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    columns: ['name', 'desc', 'region', 'ethersim', 'modem', 'gen', 'lifecycle', 'replacement'],
                    filterFn: function(skuObj) {
                        const modemObj = updater.datastore.findModemByModel(skuObj.modem);
                        if (!modemObj) {
                            return true;
                        }
                        return !modemObj.technologies.includes('4G');
                    },
                }); 
            }                 
        },
        {
            // 3rd-party SIM compatible
            guid:'5299a764-88fa-11ec-a8a3-0242ac120002',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    columns: ['name', 'desc', 'region', 'ethersim', 'modem', 'gen', 'lifecycle', 'replacement'],
                    filterFn: function(skuObj) {
                        if (!skuObj.sim4ff) {
                            return true;
                        }
                        return false;
                    },
                }); 
            }                 
        },
        // tutorials/cellular-connectivity/lte-cat-1-expansion.md
        {
            guid:'2bc27d9d-f9fc-419e-8239-a4533c6cf4c6', 
            generatorFn:function(updater) {
                return updater.generateSpecialSkuList({
                    filterFn: function(skuObj) {
                        if (skuObj.modem == 'EG91-E' || skuObj.modem == 'EG91-EX') {
                            if (skuObj.sim == 4) {
                                return false; // Keep
                            }
                        }
                        return true; // Filter (remove)
                    }
                }); 
            } 
        },
        {
            guid:'574fffef-d296-4b39-a38f-9dc8bba013c8', 
            generatorFn:function(updater) {
                return updater.generateExpansionCarrierList({
                }); 
            } 
        },
        // tutorials/learn-more/gen2-cellular-migration.md
        {
            guid:'0c8fb8e4-0420-11ec-9a03-0242ac130003',
            generatorFn:function(updater) {
                return updater.generateGen2Migration(); 
            } 
        },
        // tutorials/device-cloud/device-claiming.md
        {
            guid:'fabf0754-7838-11ec-90d6-0242ac120003', 
            generatorFn:function(updater) {
                return updater.simActivationSpeed(); 
            } 
        },
        // location 
        {
            guid:'b7083b52-4bd3-47a6-85e8-396922c41b33',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'region', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return skuObj.family != 'tracker' || !skuObj.name.includes('ONE');
                    },
                }); 
            } 
        },
        {
            guid:'89024c15-a66e-466b-9449-48bc25856725',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'region', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return skuObj.family != 'tracker' || !skuObj.name.startsWith('MON');
                    },
                }); 
            } 
        },
        {
            guid:'4507ee1f-212e-4638-8320-6e8d6d9f7873',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'region', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return skuObj.family != 'b series' || !skuObj.gnss;
                    },
                }); 
            },
        },
        {
            guid:'800c1260-a4d4-4c9a-a41c-a6f2993218ce',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'region', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return skuObj.family != 'm series';
                    },
                }); 
            },
        },
        // tutorials/particle-hardware.md
        {
            guid:'6a02fd77-1222-4208-8da5-45c9290c5f6d',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return !skuObj.accessory || !skuObj.name.includes('M8');
                    },
                }); 
            } 
        },
        {
            // Argon and Boron, no quantity packs
            guid:'455bf1d0-0230-4074-bfa7-99ce6e4f6245',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'region', 'batteryInc', 'lifecycle'],
                    filterFn: function(skuObj) {
                        if (skuObj.multiple) {
                            return true;
                        }
                        return skuObj.gen != '3' || (skuObj.skuClass != 'prototyping' && skuObj.skuClass != 'kit');
                    },
                    omitSkus: [
                        'BRN310TRAY50', 'ARG-AQKT'
                    ]
                }); 
            } 
        },                               
        {
            // Argon and Boron, include multi-packs
            guid:'a4c0c80f-3745-4b3c-b6dd-e774c4c71ad5',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'region', 'batteryInc', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return skuObj.gen != '3' || (skuObj.skuClass != 'prototyping' && skuObj.skuClass != 'kit');
                    },
                    omitSkus: [
                        'BRN310TRAY50', 'ARG-AQKT'
                    ]
                }); 
            } 
        },               

        {
            guid:'518869dc-61de-43db-add1-f0d57956c4e0',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'region', 'batteryInc', 'cellAntInc', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return skuObj.family != 'boron';
                    },
                }); 
            } 
        },
        {
            guid:'88844fc4-c390-44ff-9254-2fa41e2b8963',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'region', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return skuObj.family != 'tracker' || skuObj.name.includes('ONE');
                    },
                }); 
            } 
        },
        {
            // All trackers
            guid:'b9f495c6-80bc-49d7-a4b7-cb210f89fb65',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'region', 'batteryInc', 'cellAntInc', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return skuObj.family != 'tracker';
                    },
                }); 
            } 
        },
        {
            // Argon
            guid:'a1f313d4-5b1a-409e-b03c-32ebec003b10',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'region', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return skuObj.family != 'argon';
                    },
                }); 
            } 
        },
        {
            guid:'5e188545-21ff-4ef8-9510-155caea7014e',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'region', 'batteryInc', 'cellAntInc', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return skuObj.family != 'e series';
                    },
                }); 
            } 
        },
        {
            guid:'8ba8241b-1084-463b-b5be-64cda68e3a4b',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'region', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return skuObj.family != 'p series' || skuObj.name.includes('P0');
                    },
                }); 
            } 
        },
        {
            // Ethernet compatible models: All Gen3 except Tracker One
            guid:'2de596b8-2889-4df7-86d1-910d5551b34f',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    lifecycles: ['GA', 'NRND-US', 'Sampling', 'In development'],
                    columns: ['name', 'desc', 'region', 'batteryInc', 'cellAntInc', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return skuObj.gen != '3' || skuObj.name.includes('ONE');
                    },
                    includeSkus: [
                        'FWNG-ETH', 'M2EVAL'
                    ],
                    omitSkus: [
                        'BRN310TRAY50', 'ARG-AQKT'
                    ]
                }); 
            } 
        },

        // M-SoM - RTL8722DM
        {
            guid: '1ef65384-3694-4999-a6d8-4ee9432ca08d',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'M-SoM',
                }); 
            } 
        },        
        {
            guid: '5feb3f9e-2bf4-4e73-a2c8-b6584b125391',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'M-SoM',
                    sortByNum: true,
                }); 
            } 
        },        
        {
            guid:'315abea5-56c1-45ce-af72-bf0d9d8e8482',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'portPins',
                    platformNew: 'M-SoM',
                    port: 'digitalRead',
                    label: 'GPIO',
                    newMCU: 'MCU',
                    showBootMode: true,
                }); 
            } 
        },
        {
            guid:'64e4bc46-68b8-4974-a61e-ddeae080fd44',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'M-SoM',
                    interface: 'swd'
                }); 
            } 
        },
        {
            guid:'8f52432b-ccd8-4be0-a2e2-1718b6771c4f',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'M-SoM',
                    interface: 'hardwareADC'
                }); 
            } 
        },
        {
            guid:'d3ffb099-2b14-45d6-b006-71efef7af3ff',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'M-SoM',
                    interface: 'serial'
                }); 
            }                     
        },
        {
            guid:'fd3eed60-17cc-4294-9a39-7f3d01bf7487',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'M-SoM',
                    interface: 'spi',
                }); 
            }                     
        },
        {
            guid:'e673700c-e099-4705-b7be-768efe895a08',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'M-SoM',
                    interface: 'i2c'
                }); 
            }                     
        },
        {        
            guid:'ce50aa3a-b76c-4140-bf85-100dded18864',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'M-SoM',
                    interface: 'analogWritePWM',
                    noInterface: true,
                    showHardwareTimer: false, // temporary until assigned
                }); 
            } 
        },
        {        
            guid:'b97d7e7b-d462-4687-8371-96e0150b106f',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'M-SoM',
                    interface: 'pdm',
                    noInterface: true,
                }); 
            } 
        },
        {
            guid:'dd39756a-80c9-4fc0-8665-7533da96152d',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'M-SoM',
                    interface: 'sim',
                    noInterface: true,
                    noMCU: true,
                }); 
            }                     
        },        
        {
            guid:'58475011-6c17-488b-a042-a363c1312d02',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'M-SoM',
                    interface: 'hibernate',
                    onlyGPIO: true,
                }); 
            }                     
        },       
        {
            guid:'c9bab6c3-be4f-44e8-aea3-d1a738422b13',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'M-SoM',
                    interface: 'hibernatePull',
                    onlyGPIO: true,
                }); 
            }                     
        },       
        {
            guid:'6d82afd2-3dd4-4a30-a75b-7d9b0b780986', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'old-new-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'B4xx SoM',
                    platformOldTitle: 'B-SoM',
                    pinNumberOld: true,
                    newHardwarePin: true,
                    changeIndicator: true,
                }); 
            }
        },
        {
            guid:'ed9de0f9-7941-4090-9fb2-d6bb398fd860', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'B4xx SoM',
                    platformOldTitle: 'B-SoM',
                    port: 'analogRead',
                    label: 'ADC',
                    noPinNumbers: false,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },        
        {
            guid:'5458f22f-840f-4892-97cc-57e6ebd5c1bb', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'B4xx SoM',
                    platformOldTitle: 'B-SoM',
                    port: 'serial',
                    label: 'Serial',
                    useShortName: true,
                    noPinNumbers: false,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },        
        {
            guid:'89fcdf38-5b12-43fa-b306-72a4262c913e', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'B4xx SoM',
                    platformOldTitle: 'B-SoM',
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true,
                    noPinNumbers: false,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },      
        {
            guid:'d72da918-d38e-46f0-b651-0c4ddee8cad7', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'B4xx SoM',
                    platformOldTitle: 'B-SoM',
                    port: 'i2c',
                    label: 'I2C',
                    useShortName: true,
                    noPinNumbers: false,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },      
        {
            guid:'d6253ac9-1074-48cd-a7b9-05315e4a5850', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'B4xx SoM',
                    platformOldTitle: 'B-SoM',
                    port: 'analogWritePWM',
                    label: 'PWM',
                    noPinNumbers: false,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },  
        {
            guid:'2ad3dc88-d864-49db-bb3a-46b2a2f7ced0', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'B4xx SoM',
                    platformOldTitle: 'B-SoM',
                    showPinNum: true,
                    platformNewTitle: 'M-SoM',
                }); 
            } 
        },
        {
            guid:'15c79387-e8a2-418b-886f-a9439e41663b',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'M-SoM',
                    interface: 'isUSB',
                    noInterface: true,
                }); 
            } 
        },
        {
            guid:'79cc6da1-8165-49c1-914d-e39064a9ed06',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'M-SoM',
                    interface: 'isLED',
                    noInterface: true,
                }); 
            } 
        },
        {
            guid:'e39d39e4-5349-44b3-9aaa-989469037cd45',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'bootPins',
                    platformNew: 'M-SoM'
                }); 
            }             
        },
        {
            guid:'e39d39e4-5349-44b3-9aaa-989469037cd4',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'M-SoM',
                    interface: 'isControl',
                    noInterface: true,
                }); 
            } 
        },
        {
            guid:'c8bcf02e-86f8-45b2-8623-9768fc47515e',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'modulePins',
                    platformNew: 'M-SoM',
                }); 
            } 
        },
        ///
        {
            guid:'198f100b-a9d2-40c0-bfad-c835be7dcf6c', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'P2',
                    port: 'analogRead',
                    label: 'ADC',
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },        
        {
            guid:'8b15c299-ec3c-4638-94e0-70c287b3b480', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'P2',
                    port: 'serial',
                    label: 'Serial',
                    useShortName: true,
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },        
        {
            guid:'e825d0f8-1762-4ea4-9da8-22f393747616', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'P2',
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true,
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },      
        {
            guid:'d4f5a73f-20a3-4e45-9cbb-f55a68e1c8a5', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'P2',
                    port: 'i2c',
                    label: 'I2C',
                    useShortName: true,
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },      
        {
            guid:'be7ef0ce-b932-4cfd-840f-d8f7bf716a6d', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'P2',
                    port: 'analogWritePWM',
                    label: 'PWM',
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },  
        {
            guid:'b69d8385-7cbe-4fd1-951a-f9f93dbfd822', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'P2',
                    port: 'pdm',
                    label: 'PDM',
                    useShortName: true,
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },  
        {
            guid:'f892e697-679e-4e73-99f6-c396698f3b87', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'P2',
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'M-SoM',
                }); 
            } 
        },
        //
        {
            guid:'0ad610ce-7eb9-463a-a214-3abf217f2e80', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'Boron',
                    port: 'analogRead',
                    label: 'ADC',
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },        
        {
            guid:'53ee9c68-d92a-4a07-b56a-7c1cfab44f60', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'Boron',
                    port: 'serial',
                    label: 'Serial',
                    useShortName: true,
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },        
        {
            guid:'ca018024-837f-42ea-9d48-55f307a26e38', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'Boron',
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true,
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },      
        {
            guid:'1b2c8715-6448-4bb6-aebf-8a507c16a87d', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'Boron',
                    port: 'i2c',
                    label: 'I2C',
                    useShortName: true,
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },      
        {
            guid:'f8d3a842-6457-4404-ad7b-d1c47a53e638', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'Boron',
                    port: 'analogWritePWM',
                    label: 'PWM',
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'M-SoM',
                    newHardwarePin: true,
                }); 
            }
        },  
        {
            guid:'92c0afb8-3e86-47bf-adc2-34873410a475', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformNew: 'M-SoM',
                    platformOld: 'Boron',
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'M-SoM',
                }); 
            } 
        },

        // Muon - RTL8722DM
        {
            guid: '4c12540b-20a8-4d2b-a070-0237af5223e3',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'Muon',
                    noPinNumbers: false,
                    pinFilterFn: p => typeof p.hardwarePin == 'undefined',
                    includeDesc: false, 
                    rightColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                    functionCols: [["hardwareADC", "i2s"], ["i2c","swd"], ["spi"], ["serial"]],
                }); 
            } 
        },        
        {
            guid: '5e824205-fd34-4c55-b256-be28273fdaf2',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'Muon',
                    noPinNumbers: false,
                    sortByNum: true,
                    includeDesc: false,
                    rightColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                    functionCols: [["hardwareADC", "i2s"], ["i2c","swd"], ["spi"], ["serial"]],
                }); 
            } 
        },        
        {
            guid: '07ff48d2-f1ec-418c-be98-5f5e0d808dc0',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'Muon',
                    noPinNumbers: false,
                    sortByNum: 'rpiGPIO',
                    includeDesc: false,
                    leftColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                    functionCols: [["hardwareADC", "i2s"], ["i2c","swd"], ["spi"], ["serial"]],
                }); 
            } 
        },        
        {
            guid:'2f265258-147d-4139-8a20-d85d1d137af5',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'portPins',
                    platformNew: 'Muon',
                    port: 'digitalRead',
                    label: 'GPIO',
                    newMCU: 'MCU',
                    showBootMode: true,
                    noPinNumbers: false,
                    newRightColumns: [
                        {
                            key: 'new_rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            } 
        },
        {
            guid:'cb3c6480-361d-4437-8cc3-6422e4c04d74',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Muon',
                    interface: 'hardwareADC',
                    noPinNumbers: false,
                    showM2Pin: true,
                    rightColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            } 
        },
        {
            guid:'a2d6df45-4f77-45d8-8280-f73c14add2e7',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Muon',
                    interface: 'serial',
                    noPinNumbers: false,
                    showM2Pin: true,
                    rightColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }                     
        },
        {
            guid:'3fd13fdc-0a2d-41aa-9a26-3afd196022bd',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Muon',
                    interface: 'spi',
                    noPinNumbers: false,
                    showM2Pin: true,
                    rightColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }                     
        },
        {
            guid:'e9702f86-0377-4b10-a451-c4ebebd36177',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Muon',
                    interface: 'i2c',
                    noPinNumbers: false,
                    showM2Pin: true,
                    rightColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }                     
        },
        {        
            guid:'0e2ce92a-0155-43c6-b496-e30bafeb33e4',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Muon',
                    interface: 'analogWritePWM',
                    noInterface: true,
                    showHardwareTimer: false, // temporary until assigned
                    noPinNumbers: false,
                    showM2Pin: true,
                    rightColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            } 
        },
        {        
            guid:'1fbd4565-425c-4e5f-9136-130f4558d675',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Muon',
                    interface: 'i2s',
                    noInterface: true,
                    showHardwareTimer: false, // temporary until assigned
                    noPinNumbers: false,
                    showM2Pin: true,
                    rightColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            } 
        }, 
        {
            guid:'2629e77b-eb69-4f63-8f0e-011032c72782',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Muon',
                    interface: 'hibernate',
                    noPinNumbers: false,
                    showM2Pin: true,
                    onlyGPIO: true,
                }); 
            }                     
        },   
        {
            guid:'ecbef542-699d-4e47-bf18-b4568b48c0c7',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Muon',
                    interface: 'hibernatePull',
                    noPinNumbers: false,
                    showM2Pin: true,
                    onlyGPIO: true,
                }); 
            }                     
        },           {
            guid:'c9e7a163-b53c-4c4f-81ff-f84ec7344a0c',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'bootPins',
                    platformNew: 'Muon',
                    noPinNumbers: false,
                    showM2Pin: true,
                    rightColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }             
        },
        {
            guid:'7bdb0f44-3eb6-4e4a-89bb-14c9bb159cbd', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-details',
                    noPinNumbers: false,
                    platformNew: 'Muon',
                    moreComparisonTags: [
                        'rpi'
                    ],
                }); 
            } 
        },  
        // Muon expansion cards
        {
            guid:'e09ec63f-a037-4dac-b8ca-8038186e5515',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Muon',
                    interface: 'rpiSPI',
                    noPinNumbers: false,
                    showM2Pin: true,
                    rightColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }                     
        },
        {
            guid:'8b0e89b2-549c-47a2-bb14-bfb86825687b',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Muon',
                    interface: 'rpiI2C',
                    noPinNumbers: false,
                    showM2Pin: true,
                    rightColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }                     
        },
        {
            guid:'eefd3c21-afb4-4412-b457-accaf0fa2413',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Muon',
                    interface: 'rpiSerial',
                    noPinNumbers: false,
                    showM2Pin: true,
                    rightColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }                     
        },
        {
            guid:'a5166ee1-a72a-401d-ae99-6e1ebf2a7082',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Muon',
                    interface: 'rpiPWM',
                    noPinNumbers: false,
                    showM2Pin: true,
                    rightColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }                     
        },
        {
            guid:'258144bf-ccd6-430f-be0d-9a0867b8b015',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'interfacePins',
                    platformNew: 'Muon',
                    interface: 'rpiPCM',
                    noPinNumbers: false,
                    showM2Pin: true,
                    rightColumns: [
                        {
                            key: 'rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }                     
        },
        {
            guid: '547410e9-fa4c-4166-9b92-4d365b9a8471',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'piPins',
                    platformNew: 'Muon',
                    noPinNumbers: false,
                    showM2Pin: false,
                    showHardwarePin: false,
                    showPorts: true,
                });
            },
        },
        
        // Muon <- Argon/Boron migration guide
        {
            guid:'18b9d26a-9a58-48ee-98e5-c375ee7f15a5', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Muon',
                    platformOld: 'Boron',
                    port: 'digitalWrite',
                    label: 'GPIO',
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'Muon',
                    newHardwarePin: true,
                    newRightColumns: [
                        {
                            key: 'new_rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }
        },  
        {
            guid:'7569c844-d0ac-4468-b317-3c9c6d9b7198', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Muon',
                    platformOld: 'Boron',
                    port: 'analogRead',
                    label: 'ADC',
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'Muon',
                    newHardwarePin: true,
                    newRightColumns: [
                        {
                            key: 'new_rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }
        },        
        {
            guid:'5bb5787d-980b-4cb7-8293-14ed6775d21b', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Muon',
                    platformOld: 'Boron',
                    port: 'serial',
                    label: 'Serial',
                    useShortName: true,
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'Muon',
                    newHardwarePin: true,
                    newRightColumns: [
                        {
                            key: 'new_rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }
        },        
        {
            guid:'bb723044-07c3-4cf6-819f-8a140213ec6b', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Muon',
                    platformOld: 'Boron',
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true,
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'Muon',
                    newHardwarePin: true,
                    newRightColumns: [
                        {
                            key: 'new_rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }
        },      
        {
            guid:'202b1c57-447e-4821-b2f5-ef6f90407e49', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Muon',
                    platformOld: 'Boron',
                    port: 'i2c',
                    label: 'I2C',
                    useShortName: true,
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'Muon',
                    newHardwarePin: true,
                    newRightColumns: [
                        {
                            key: 'new_rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }
        },      
        {
            guid:'7ccd5b6d-7fac-406d-9245-8a0659e3b746', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Muon',
                    platformOld: 'Boron',
                    port: 'analogWritePWM',
                    label: 'PWM',
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'Muon',
                    newHardwarePin: true,
                    newRightColumns: [
                        {
                            key: 'new_rpi',
                            title: 'Raspberry Pi',
                        }
                    ],
                }); 
            }
        },  
        {
            guid:'a92768ab-8aea-4c68-8223-c1a6636141f8', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformNew: 'Muon',
                    platformOld: 'Boron',
                    noPinNumbers: true,
                    newPinNumber: true,
                    mapBy: 'name',
                    noMapAltName: true,
                    platformNewTitle: 'Muon',
                }); 
            } 
        },
        {
            // Country compatibility - M404
            guid:'291c6e45-3647-412b-8e38-47d29d5b4a83',
            generatorFn:function(updater) {
                return updater.generateCountryList('m series', {
                    groupFn:function(groupObj) {
                        return groupObj.modem != 'BG95-M5';
                    }
                });                 
            } 
        },
        {
            // Country compatibility - M524
            guid:'da2ba229-df4a-4df6-a0a5-d74444b8d5c1',
            generatorFn:function(updater) {
                return updater.generateCountryList('m series', {
                    groupFn:function(groupObj) {
                        return groupObj.modem != 'EG91-EX';
                    }
                });                 
            } 
        },
        {
            // SKU list M-SoM
            guid:'5c48836c-dced-4420-be6f-15916d265a5e', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('m series', {
                    filterFn:function(skuObj) {
                        return skuObj.name.startsWith('MUON');
                    }        
                }); 
            } 
        },
        // M-HAT
        {
            // SKU list MHAT
            guid:'47e37393-b9c0-4b04-9da6-e54cb2227cd1', 
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    columns: ['name', 'desc', 'region', 'lifecycle'],
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('MHAT');
                    }        
                }); 
            } 
        },
        {
            guid: '5c7622c6-ae73-4a5b-88b6-e761ee69fa3f',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'm-hat-m2',
                    noPinNumbers: true, 
                    sortByNum: false,
                    includeDesc: false,
                    noPWM: true,
                    noHardwarePin: true,
                    // pinFilterFn return true to hide pin
                    rightColumns: [
                        {
                            key: 'net',
                            title: 'Schematic net'
                        },
                        {
                            key: 'direction',
                            title: 'MCU direction'
                        },
                        {
                            key: 'connectedTo',
                            title: 'Connected to'
                        },
                        {
                            key: 'desc',
                            title: 'Description'
                        },
                        {
                            key: 'num',
                            title: 'M.2 pin'
                        },
                    ],
                    functionCols: [],
                }); 
            } 
        },        
        {
            guid: 'bf89b87e-f66f-4de9-9a5e-fc88a792cf7b',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'm-hat-m2',
                    noPinNumbers: false,
                    sortByNum: true,
                    includeDesc: false,
                    noPWM: true,
                    noHardwarePin: true,
                    pinFilterFn: function(pinObj) {
                        return pinObj.connectedTo != 'IOEX connector';
                    },
                    rightColumns: [
                        {
                            key: 'net',
                            title: 'Schematic net'
                        },
                        {
                            key: 'direction',
                            title: 'MCU direction'
                        },
                        {
                            key: 'desc',
                            title: 'Description'
                        },
                    ],
                    functionCols: [],
                }); 
            } 
        },    
        {
            guid: '3f9e11ff-5582-435d-af08-5e087b63414b',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'm-hat-m2',
                    noPinNumbers: false,
                    sortByNum: true,
                    includeDesc: false,
                    noPWM: true,
                    noHardwarePin: true,
                    pinFilterFn: function(pinObj) {
                        return pinObj.connectedTo != 'STUSB4500';
                    },
                    rightColumns: [
                        {
                            key: 'net',
                            title: 'Schematic net'
                        },
                        {
                            key: 'direction',
                            title: 'MCU direction'
                        },
                        {
                            key: 'desc',
                            title: 'Description'
                        },
                    ],
                    functionCols: [],
                }); 
            } 
        },    
        {
            guid: 'f6622f00-cc13-43e4-99d4-c955ed253710',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'm-hat-m2',
                    noPinNumbers: false,
                    sortByNum: true,
                    includeDesc: false,
                    noPWM: true,
                    noHardwarePin: true,
                    pinFilterFn: function(pinObj) {
                        return pinObj.connectedTo != 'TMP112A';
                    },
                    rightColumns: [
                        {
                            key: 'net',
                            title: 'Schematic net'
                        },
                        {
                            key: 'direction',
                            title: 'MCU direction'
                        },
                        {
                            key: 'desc',
                            title: 'Description'
                        },
                    ],
                    functionCols: [],
                }); 
            } 
        },  
        {
            guid: 'f77388d6-01aa-4a52-afa9-8d05985c5907',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'm-hat-m2',
                    noPinNumbers: false,
                    sortByNum: true,
                    includeDesc: false,
                    noPWM: true,
                    noHardwarePin: true,
                    pinFilterFn: function(pinObj) {
                        return !pinObj.connectedTo.startsWith('Grove');
                    },
                    rightColumns: [
                        {
                            key: 'net',
                            title: 'Schematic net'
                        },
                        {
                            key: 'direction',
                            title: 'MCU direction'
                        },
                        {
                            key: 'desc',
                            title: 'Description'
                        },
                    ],
                    functionCols: [],
                }); 
            } 
        },  
        {
            guid: 'e37904f1-301c-4f2b-97a9-3bab92a6acd3',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'm-hat-m2',
                    noPinNumbers: false,
                    sortByNum: true,
                    includeDesc: false,
                    noPWM: true,
                    noHardwarePin: true,
                    pinFilterFn: function(pinObj) {
                        return pinObj.connectedTo != 'AB1805';
                    },
                    rightColumns: [
                        {
                            key: 'net',
                            title: 'Schematic net'
                        },
                        {
                            key: 'direction',
                            title: 'MCU direction'
                        },
                        {
                            key: 'desc',
                            title: 'Description'
                        },
                    ],
                    functionCols: [],
                }); 
            } 
        },  
        {
            guid: 'cc5c6247-5bdb-43bd-8b18-24954f4adea4',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'm-hat-m2',
                    noPinNumbers: false,
                    sortByNum: true,
                    includeDesc: false,
                    noPWM: true,
                    noHardwarePin: true,
                    pinFilterFn: function(pinObj) {
                        return pinObj.connectedTo != 'PM-BAT';
                    },
                    rightColumns: [
                        {
                            key: 'net',
                            title: 'Schematic net'
                        },
                        {
                            key: 'direction',
                            title: 'MCU direction'
                        },
                        {
                            key: 'desc',
                            title: 'Description'
                        },
                    ],
                    functionCols: [],
                }); 
            } 
        },      
        {
            guid: '7f56ea43-30ef-4cb1-988a-3d7e31247bc9',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'm-hat-m2',
                    noPinNumbers: false,
                    sortByNum: true,
                    includeDesc: false,
                    noPWM: true,
                    noHardwarePin: true,
                    pinFilterFn: function(pinObj) {
                        return pinObj.connectedTo != 'FSA2567';
                    },
                    rightColumns: [
                        {
                            key: 'net',
                            title: 'Schematic net'
                        },
                        {
                            key: 'direction',
                            title: 'MCU direction'
                        },
                        {
                            key: 'desc',
                            title: 'Description'
                        },
                    ],
                    functionCols: [],
                }); 
            } 
        },  
        {
            guid: 'f90b1182-87f3-4aa6-8599-01504bfdff97',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'm-hat-m2',
                    noPinNumbers: false,
                    sortByNum: true,
                    includeDesc: false,
                    noPWM: true,
                    noHardwarePin: true,
                    pinFilterFn: function(pinObj) {
                        // return pinObj.connectedTo != 'DML3006';
                        return !pinObj.net.match(/EN[0-9]_CTR/);
                    },
                    rightColumns: [
                        {
                            key: 'net',
                            title: 'Schematic net'
                        },
                        {
                            key: 'direction',
                            title: 'MCU direction'
                        },
                        {
                            key: 'desc',
                            title: 'Description'
                        },
                    ],
                    functionCols: [],
                }); 
            } 
        },          
        {
            guid: '04c52083-eb85-46a7-b2a7-c366be119571',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinFunction',
                    platformNew: 'm-hat-m2',
                    noPinNumbers: true, // num is M.2 pin number, which doesn't make sense
                    sortByNum: true,
                    includeDesc: false,
                    noPWM: true,
                    noHardwarePin: true,
                    pinFilterFn: function(pinObj) {
                        return pinObj.connectedTo != 'HAT';
                    },
                    rightColumns: [
                        {
                            key: 'net',
                            title: 'Schematic net'
                        },
                        {
                            key: 'direction',
                            title: 'MCU direction'
                        },
                        {
                            key: 'desc',
                            title: 'Description'
                        },
                        {
                            key: 'rpiGPIO',
                            title: 'Pi Pin',
                        },
                        {
                            key: 'rpiFunction',
                            title: 'Pi Function',
                        }
                    ],
                    functionCols: [],
                }); 
            } 
        },    

        // Tethering
        {
            guid:'7dc335b7-4ddc-464d-ae96-6231944ccc76', 
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    columns: ['name', 'desc', 'modem', 'region', 'gen', 'lifecycle'],
                    filterFn:function(skuObj) {
                        if (!skuObj.modem) {
                            return true;
                        }
                        const modemObj = updater.datastore.findModemByModel(skuObj.modem);
                        if (!modemObj) {
                            return true;
                        }

                        // true to remove from list
                        return skuObj.family != "b series" || (skuObj.sim != 4 && skuObj.sim != 5) || !modemObj.technologies.includes('4G');
                    }        
                }); 
            }           
        },      
        {
            guid:'71ebb5bc-2b24-40c6-98fe-40cc38acc89a',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'connectionDiagram',
                    platformOld: 'pi5', // from (left)
                    platformNew: 'M.2 SoM breakout board header, B-SoM', // to (right)
                    connections: [
                        {
                            fromKey: 'name',
                            fromValue: 'GPIO14',
                            fromLabel: 'UART0_TX',
                            toKey: 'name',
                            toValue: 'RX',
                            toLabel: 'Serial1 RX'
                        },
                        {
                            fromKey: 'name',
                            fromValue: 'GPIO15',
                            fromLabel: 'UART0_RX',
                            toKey: 'name',
                            toValue: 'TX',
                            toLabel: 'Serial1 TX'
                        },
                        {
                            fromKey: 'name',
                            fromValue: 'GPIO16',
                            fromLabel: 'UART0_CTS',
                            toKey: 'name',
                            toValue: 'D2',
                            toLabel: 'Serial1 RTS'
                        },
                        {
                            fromKey: 'name',
                            fromValue: 'GPIO17',
                            fromLabel: 'UART0_RTS',
                            toKey: 'name',
                            toValue: 'D3',
                            toLabel: 'Serial1 CTS'
                        },
                        {
                            fromKey: 'num',
                            fromValue: 6,
                            fromLabel: '',
                            toKey: 'num',
                            toValue: 1,
                            toLabel: ''
                        },
                    ],
                    columns: [
                        {
                            key: 'from.num',
                            title: 'Pi Pin Num',
                        },
                        {
                            key: 'from.name',
                            title: 'Pi GPIO',
                        },
                        {
                            key: 'fromLabel',
                            title: 'Pi Function',
                        },
                        {
                            isSeparator: true, // separator between from and to
                        },
                        {
                            key: 'to.name',
                            title: 'Particle Name',
                        },
                        {
                            key: 'toLabel',
                            title: 'Particle Function',
                        },
                    ],
                }); 
            },
        },
        {
            guid:'1b6753e8-fead-433a-8fa0-476c6a851e2e',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'connectionDiagram',
                    platformOld: 'pi4', // from (left)
                    platformNew: 'M.2 SoM breakout board header, B-SoM', // to (right)
                    connections: [
                        {
                            fromKey: 'name',
                            fromValue: 'GPIO0',
                            fromLabel: 'UART2_TX',
                            toKey: 'name',
                            toValue: 'RX',
                            toLabel: 'Serial1 RX'
                        },
                        {
                            fromKey: 'name',
                            fromValue: 'GPIO1',
                            fromLabel: 'UART2_RX',
                            toKey: 'name',
                            toValue: 'TX',
                            toLabel: 'Serial1 TX'
                        },
                        {
                            fromKey: 'name',
                            fromValue: 'GPIO2',
                            fromLabel: 'UART2_CTS',
                            toKey: 'name',
                            toValue: 'D2',
                            toLabel: 'Serial1 RTS'
                        },
                        {
                            fromKey: 'name',
                            fromValue: 'GPIO3',
                            fromLabel: 'UART2_RTS',
                            toKey: 'name',
                            toValue: 'D3',
                            toLabel: 'Serial1 CTS'
                        },
                        {
                            fromKey: 'num',
                            fromValue: 6,
                            fromLabel: '',
                            toKey: 'num',
                            toValue: 1,
                            toLabel: ''
                        },

                    ],
                    columns: [
                        {
                            key: 'from.num',
                            title: 'Pi Pin Num',
                        },
                        {
                            key: 'from.name',
                            title: 'Pi GPIO',
                        },
                        {
                            key: 'fromLabel',
                            title: 'Pi Function',
                        },
                        {
                            isSeparator: true, // separator between from and to
                        },
                        {
                            key: 'to.name',
                            title: 'Particle Name',
                        },
                        {
                            key: 'toLabel',
                            title: 'Particle Function',
                        },
                    ],
                }); 
            },
        },
        {
            guid:'c864a725-a712-44ad-b4e9-ccb882e860b7',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'connectionDiagram',
                    platformOld: 'pi5', // from (left)
                    platformNew: 'M.2 SoM breakout board header, B-SoM', // to (right)
                    connections: [
                        {
                            fromKey: 'name',
                            fromValue: 'GPIO14',
                            fromLabel: 'UART0_TX',
                            toKey: 'name',
                            toValue: 'RX',
                            toLabel: 'Serial1 RX'
                        },
                        {
                            fromKey: 'name',
                            fromValue: 'GPIO15',
                            fromLabel: 'UART0_RX',
                            toKey: 'name',
                            toValue: 'TX',
                            toLabel: 'Serial1 TX'
                        },
                        {
                            fromKey: 'num',
                            fromValue: 6,
                            fromLabel: '',
                            toKey: 'num',
                            toValue: 1,
                            toLabel: ''
                        },
                    ],
                    columns: [
                        {
                            key: 'from.num',
                            title: 'Pi Pin Num',
                        },
                        {
                            key: 'from.name',
                            title: 'Pi GPIO',
                        },
                        {
                            key: 'fromLabel',
                            title: 'Pi Function',
                        },
                        {
                            isSeparator: true, // separator between from and to
                        },
                        {
                            key: 'to.name',
                            title: 'Particle Name',
                        },
                        {
                            key: 'toLabel',
                            title: 'Particle Function',
                        },
                    ],
                }); 
            },
        },
        {
            
            guid:'421a98df-e95f-4a4d-aa8b-3c690a6398d2', 
            generatorFn:function(updater) {
                return updater.generateSimpleSkus({
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('M2BREAKOUT')
                    }        
                }); 
            }             
        }, 

        // M1 Enclosure
        {
            // SKU m1 enclosure
            guid:'1ee1e229-4747-4ebe-9c86-90a2ddbb73af', 
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    columns: ['name', 'desc', 'lifecycle'],
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('M1ENCL');
                    }        
                }); 
            } 
        },
        // Muon
        {
            // SKU list Muon
            guid:'f4a91103-4428-4732-a1bc-83784f9bf207', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('m series', {
                    filterFn:function(skuObj) {
                        return !skuObj.name.startsWith('MUON');
                    }        
                }); 
            } 
        },
        // monitor-one-muon-cards.md
        {
            guid:'fdd63f32-8330-4bde-942f-3c707ef91eb0', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformNew: 'Muon',
                    platformOld: 'Monitor One Expansion',
                    showPinNum: true,
                    platformNewTitle: 'Muon Expansion',
                }); 
            }
        },   
        {
            guid:'7e4f9bbe-44f6-40ae-bcab-6e0eb1cb50f0', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Muon',
                    platformOld: 'Monitor One Expansion',
                    port: 'i2c',
                    label: 'I2C',
                    useShortName: true,
                    newPinNumber: true,
                    platformNewTitle: 'Muon Expansion',
                }); 
            }
        },
        {
            guid:'d5f43cdb-55ad-41a1-bd96-5c2c7fd6fd07', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Muon',
                    platformOld: 'Monitor One Expansion',
                    port: 'spi',
                    label: 'SPI',
                    useShortName: true,
                    newPinNumber: true,
                    platformNewTitle: 'Muon Expansion',
                }); 
            }
        },
        {
            guid:'5e904a3c-9904-4468-b3aa-c721a247322d', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Muon',
                    platformOld: 'Monitor One Expansion',
                    port: 'serial',
                    label: 'UART',
                    useShortName: true,
                    newPinNumber: true,
                    platformNewTitle: 'Muon Expansion',
                }); 
            }
        },
        {
            guid:'d2f12256-c380-4915-8595-5e5fb89066eb', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Muon',
                    platformOld: 'Monitor One Expansion',
                    port: 'hardwareADC',
                    label: 'ADC',
                    useShortName: true,
                    newPinNumber: true,
                    platformNewTitle: 'Muon Expansion',
                    checkmark: true,
                }); 
            }
        },
        {
            guid:'df6bdb3e-9bf6-4a92-9807-013eafba7d7f', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Muon',
                    platformOld: 'Monitor One Expansion',
                    port: 'analogWritePWM',
                    label: 'PWM',
                    useShortName: true,
                    newPinNumber: true,
                    platformNewTitle: 'Muon Expansion',
                    checkmark: true,
                }); 
            }
        },
        {
            guid:'d559a76e-0faf-4f12-97f4-abe1d8cd74f0', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformNew: 'Muon',
                    platformOld: 'Monitor One Expansion',
                    port: 'digitalWrite',
                    label: 'GPIO',
                    useShortName: true,
                    newPinNumber: true,
                    platformNewTitle: 'Muon Expansion',
                    checkmark: true,
                }); 
            }
        },
        // Power module
        {
            guid: 'f7d89d7b-2988-4b97-842d-f28f2c6fc767',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'modulePins',
                    platformNew: 'PM-BAT Power Module',
                    noPinNumbers: false,
                    includeDesc: true,
                    noHardwarePin: true,
                }); 
            } 
        },        
        {
            guid: 'cccd005a-023b-4ae4-90a6-41a6764199bf',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'modulePins',
                    platformNew: 'PM-DC Power Module',
                    noPinNumbers: false,
                    includeDesc: true,
                    noHardwarePin: true,
                }); 
            } 
        },        


    ];


}(module.exports));
