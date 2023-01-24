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
});