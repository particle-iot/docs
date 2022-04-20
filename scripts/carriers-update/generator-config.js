const fs = require('fs');
const path = require('path');


(function(generatorConfig) {
    
    generatorConfig.updates = [
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
                return updater.generateCountryList('electron'); 
            } 
        },
        // E Series datasheet
        {
            guid:'26c8707c-76ca-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('e series'); 
            } 
        },
        {
            guid:'2445e222-76e2-11eb-9439-0242ac130002',
            generatorFn:function(updater) {
                return updater.generateCountryList('e series'); 
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
        // datasheets/electron/e404x-migration-guide.md
        {
            guid:'6c533551-bce6-4c2e-b248-c7274f4b1b22', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'migration-removed',
                    platformOld: 'E Series',
                    platformNew: 'E404X'
                }); 
            } 
        },
        {
            guid:'aa218eb3-5975-4ba6-b26d-2a5d43c5378e', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'full-comparison',
                    platformOld: 'E Series',
                    platformNew: 'E404X'
                }); 
            } 
        },
        {
            guid:'0fc429e8-585e-4f36-9874-e3fa37a1136e', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformOld: 'E Series',
                    platformNew: 'E404X',
                    port: 'analogWritePWM',
                    label: 'PWM',
                }); 
            } 
        },
        {
            guid:'a7091023-5382-4496-8bfc-727593f0d426', 
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'port-comparison',
                    platformOld: 'E Series',
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
                    platformOld: 'E Series',
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
                    platformOld: 'E Series',
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
                    platformOld: 'E Series',
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
                    platformOld: 'E Series',
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
                    platformOld: 'E Series',
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
                    platformOld: 'E Series',
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
                    platformOld: 'E Series',
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
        // datasheets/boron/b404x-b404-b402-datasheet.md
        {
            guid:'91d8b83c-76ce-11eb-9439-0242ac130002', 
            generatorFn:function(updater) {
                return updater.generateFamilySkus('b series', {
                    filterFn:function(skuObj) {
                        return skuObj.skuRegion != 'noram';
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
        // datasheets/boron/b524-b523-datasheet.md
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
        // datasheets/boron/b-series-boron-migration-guide.md
        {
            guid:'b28329f3-7067-4ae1-aafa-c48b75d77674',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    onlyGA: true,
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
                    platformNewTitle: 'B Series SoM',
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
                    platformNewTitle: 'B Series SoM',
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
                    platformNewTitle: 'B Series SoM',
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
                    platformNewTitle: 'B Series SoM',
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
                    platformNewTitle: 'B Series SoM',
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
                    style: 'pinFunction',
                    platformNew: 'P2',
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
            guid:'3b7b8712-9617-11ec-b909-0242ac120002',
            generatorFn:function(updater){
                return updater.generatePinInfo({
                    style: 'pinNameChange2022_02_25',
                    platformNew: 'P2'
                }); 
            } 
        },
        // datasheets/wi-fi/photon-2-datasheet.md
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
                        return !modemObj.technologies.includes('Cat1');
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
        // tutorials/particle-hardware.md
        {
            guid:'b7083b52-4bd3-47a6-85e8-396922c41b33',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    onlyGA: true,
                    columns: ['name', 'desc', 'region', 'lifecycle'],
                    filterFn: function(skuObj) {
                        return skuObj.family != 'tracker' || !skuObj.name.includes('ONE');
                    },
                }); 
            } 
        },
        {
            guid:'6a02fd77-1222-4208-8da5-45c9290c5f6d',
            generatorFn:function(updater) {
                return updater.generateSkuList({
                    onlyGA: true,
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
                    onlyGA: true,
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
                    onlyGA: true,
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
                    onlyGA: true,
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
                    onlyGA: true,
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
                    onlyGA: true,
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
                    onlyGA: true,
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
                    onlyGA: true,
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
                    onlyGA: true,
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
                    onlyGA: true,
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
    ];


}(module.exports));
