$(document).ready(function () {
    if ($('.apiHelper').length == 0) {
        return;
    }


    apiHelper.protobuf = function(data) {
        // data must be a Uint8Array
        let protobuf = {
            data,
            offset: 0,
        };

        protobuf.decodeVarint = function() {
            let value = 0;
        
            let bytes = [];
        
            let ii = 0;
            while(true) {
                const more = ((protobuf.data[protobuf.offset + ii] & 0x80) != 0);
                
                bytes.push(protobuf.data[protobuf.offset + ii] & 0x7f);
        
                ii++;
        
                if (!more) {
                    break;
                }
            }
        
            bytes.reverse();
            for(const b of bytes) {
                value <<= 7;
                value |= b;
            }
            protobuf.offset += ii;
        
            return value;
        };


        protobuf.decodeTag = function() {
            let result = {};
        
            result.wireType = protobuf.data[protobuf.offset] & 0x07;
            result.field = protobuf.data[protobuf.offset] >> 3;
            protobuf.offset++;
            
            if (result.wireType == 0 || result.wireType == 2) {
                // varint, zigzag, or delimited, next thing is a varint size
                // Also length delimited (string, bytes, embedded messages, packed repeated fields)
                result.value = protobuf.decodeVarint();
            }
            if (result.wireType == 5) {
                // fixed32, sfixed32, float
                const bytes = protobuf.decodeBytes(4);
                protobuf.offset += 4;

                result.value = bytes[0] | (bytes[1] << 8) | (bytes[2] << 16) | (bytes[3] << 24);
            }
            if (result.wireType == 1) {
                // fixed64, sfixed64, double
                const bytes = protobuf.decodeBytes(8);
                protobuf.offset += 8;
                result.value = bytes[0] | (bytes[1] << 8) | (bytes[2] << 16) | (bytes[3] << 24) || (bytes[4] << 32) | (bytes[5] << 40) || (bytes[6] << 48) | (bytes[7] << 56);
            }
            

            if (result.wireType == 2) {
                const endOffset = protobuf.offset + result.value;
                result.isEnd = function() {
                    return protobuf.offset >= endOffset;   
                }
            }
            else
            if (result.wireType == 3) {
                // This is untested. I added it because I thought I found an SGROUP but it was just because
                // the data before it wasn't parsed correctly.

                // SGROUP
                const origField = result.field;

                result.isEnd = function() {
                    const wireType = protobuf.data[protobuf.offset] & 0x07;
                    const field = protobuf.data[protobuf.offset] >> 3;
                    
                    // EGROUP
                    return wireType == 4 && field == origField;
                }
            }


            return result;
        }

        protobuf.decodeString = function(len) {
            const a = protobuf.data.slice(protobuf.offset, protobuf.offset + len);

            return new TextDecoder('utf-8').decode(a);
        }

        protobuf.decodeBytes = function(len) {
            return protobuf.data.slice(protobuf.offset, protobuf.offset + len);
        }



        return protobuf;
    }

    apiHelper.protobufEncoder = function() {
        let encoder = {
            output: [],
        };

        encoder.appendTag = function(field, wireType) {
            encoder.output.push((field << 3) | wireType);
        };

        encoder.appendVarInt = function(value) {
            let bytes = [];

            if (value > 0) {
                while(value > 0) {
                    bytes.push(value & 0x7f);
                    value >>= 7;
                }    
            }
            else {
                bytes.push(0);
            }
            bytes.reverse();

            for(let ii = 0; ii < bytes.length; ii++) {
                const more = (ii < (bytes.length - 1));
                if (more) {
                    encoder.output.push(bytes[ii] | 0x80);
                }
                else {
                    encoder.output.push(bytes[ii]);
                }
            }
        }

        encoder.appendString = function(s) {
            const a = new TextEncoder("utf-8").encode(s);
            encoder.appendUint8Array(a);    
        }

        encoder.appendUint8Array = function(a) {
            encoder.appendVarInt(a.length);
            for(let ii = 0; ii < a.length; ii++) {
                encoder.output.push(a[ii]);
            }
        }

        encoder.toUint8Array = function() {
            return new Uint8Array(encoder.output);
        }

        return encoder;
    }
});