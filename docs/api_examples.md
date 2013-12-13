Spark Core API Curl Examples
=======================

* [claim a core](#claim_a_core)
* [name a core](#name_a_core)
* [list my cores](#list_my_cores) (id, name, is connected to cloud)
* [signal LED on core](#signal_a_core)

* [compile a binary](#compile_a_binary)
* [flash firmware](#flash_a_binary)

* [call a firmware function](#call_firmware_function)
* [get a firmware variable value](#get_firmware_variable)


## <a name="claim_a_core"></a> Claim a core

    curl -d 'id=55ff68064989495329092587' \
         -d 'access_token=f7207ba15ebad0f7b71654ea2633d355f69f6b6f' \
      https://api.spark.io/v1/devices

## <a name="name_a_core"></a> Name a core

    curl -X PUT \
      -d 'name=NEW_NAME'
      -d 'access_token=f7207ba15ebad0f7b71654ea2633d355f69f6b6f'
      https://api.spark.io/v1/devices/55ff68064989495329092587

## <a name="list_my_cores"></a> List my cores

    curl 'https://api.spark.io/v1/devices?access_token=f7207ba15ebad0f7b71654ea2633d355f69f6b6f'

## <a name="signal_a_core"></a> Signal LED on core

    TODO

## <a name="compile_a_binary"></a> Compile firmware

    TODO

## <a name="flash_a_binary"></a> Flash firmware

    TODO

## <a name="call_firmware_function"></a> Call a firmware function

    TODO

## <a name="get_firmware_variable"></a> Get a firmware variable value

    TODO


