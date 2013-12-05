# Example API Requests

This file exists to demonstrate successful low-level Spark Cloud API interactions in bash and jQuery (executable by dropping in a developer console in the spark.io web-app).

## Ensure the CORS OPTIONS Are good

### bash

    curl -vv -X OPTIONS https://api.spark.io/v1/devices

## List All Registered Devices + their current state

### bash

    curl -vv https://api.spark.io/v1/devices?access_token=f7207ba15ebad0f7b71654ea2633d355f69f6b6f

### jQuery

    $.ajax({
        type: 'GET',
        url: 'https://api.spark.io/v1/devices?access_token=f7207ba15ebad0f7b71654ea2633d355f69f6b6f',
        //crossDomain: true,
        dataType: 'json',
        success: function(responseData, textStatus, jqXHR) {
          console.log(responseData);
        },
        error: function (responseData, textStatus, errorThrown) {
          alert('POST failed.');
        }
    });

## Claim a core

### Bash

    curl -vv -d 'id=55ff68064989495329092587' https://api.spark.io/v1/devices?access_token=f7207ba15ebad0f7b71654ea2633d355f69f6b6f

### jQuery

    $.ajax({
        type: 'POST',
        url:'https://api.spark.io/v1/devices',
        data: {"id":"55ff68064989495329092587", "access_token": "f7207ba15ebad0f7b71654ea2633d355f69f6b6f"},
        success: function(responseData, textStatus, jqXHR) {
          console.log('aaaaaaaaaa', responseData);
        },
        error: function (responseData, textStatus, errorThrown) {
          alert('POST failed.');
        }
    });

