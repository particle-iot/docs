### Table of Contents

-   [Particle](#particle)
    -   [constructor](#constructor)
    -   [login](#login)
    -   [sendOtp](#sendotp)
    -   [enableMfa](#enablemfa)
    -   [confirmMfa](#confirmmfa)
    -   [disableMfa](#disablemfa)
    -   [createCustomer](#createcustomer)
    -   [loginAsClientOwner](#loginasclientowner)
    -   [createUser](#createuser)
    -   [resetPassword](#resetpassword)
    -   [deleteAccessToken](#deleteaccesstoken)
    -   [deleteCurrentAccessToken](#deletecurrentaccesstoken)
    -   [deleteActiveAccessTokens](#deleteactiveaccesstokens)
    -   [deleteUser](#deleteuser)
    -   [trackingIdentity](#trackingidentity)
    -   [listDevices](#listdevices)
    -   [getDevice](#getdevice)
    -   [claimDevice](#claimdevice)
    -   [addDeviceToProduct](#adddevicetoproduct)
    -   [removeDevice](#removedevice)
    -   [removeDeviceOwner](#removedeviceowner)
    -   [renameDevice](#renamedevice)
    -   [signalDevice](#signaldevice)
    -   [setDeviceNotes](#setdevicenotes)
    -   [markAsDevelopmentDevice](#markasdevelopmentdevice)
    -   [lockDeviceProductFirmware](#lockdeviceproductfirmware)
    -   [unlockDeviceProductFirmware](#unlockdeviceproductfirmware)
    -   [updateDevice](#updatedevice)
    -   [unprotectDevice](#unprotectdevice)
    -   [provisionDevice](#provisiondevice)
    -   [getClaimCode](#getclaimcode)
    -   [getVariable](#getvariable)
    -   [flashDevice](#flashdevice)
    -   [compileCode](#compilecode)
    -   [downloadFirmwareBinary](#downloadfirmwarebinary)
    -   [sendPublicKey](#sendpublickey)
    -   [callFunction](#callfunction)
    -   [getEventStream](#geteventstream)
    -   [publishEvent](#publishevent)
    -   [Hook](#hook)
    -   [createWebhook](#createwebhook)
    -   [deleteWebhook](#deletewebhook)
    -   [listWebhooks](#listwebhooks)
    -   [createIntegration](#createintegration)
    -   [editIntegration](#editintegration)
    -   [deleteIntegration](#deleteintegration)
    -   [listIntegrations](#listintegrations)
    -   [getUserInfo](#getuserinfo)
    -   [setUserInfo](#setuserinfo)
    -   [changeUsername](#changeusername)
    -   [changeUserPassword](#changeuserpassword)
    -   [listSIMs](#listsims)
    -   [getSIMDataUsage](#getsimdatausage)
    -   [getFleetDataUsage](#getfleetdatausage)
    -   [checkSIM](#checksim)
    -   [activateSIM](#activatesim)
    -   [deactivateSIM](#deactivatesim)
    -   [reactivateSIM](#reactivatesim)
    -   [updateSIM](#updatesim)
    -   [removeSIM](#removesim)
    -   [listBuildTargets](#listbuildtargets)
    -   [listLibraries](#listlibraries)
    -   [getLibrary](#getlibrary)
    -   [getLibraryVersions](#getlibraryversions)
    -   [contributeLibrary](#contributelibrary)
    -   [publishLibrary](#publishlibrary)
    -   [deleteLibrary](#deletelibrary)
    -   [downloadFile](#downloadfile)
    -   [listOAuthClients](#listoauthclients)
    -   [createOAuthClient](#createoauthclient)
    -   [updateOAuthClient](#updateoauthclient)
    -   [deleteOAuthClient](#deleteoauthclient)
    -   [listProducts](#listproducts)
    -   [getProduct](#getproduct)
    -   [listProductFirmware](#listproductfirmware)
    -   [uploadProductFirmware](#uploadproductfirmware)
    -   [getProductFirmware](#getproductfirmware)
    -   [updateProductFirmware](#updateproductfirmware)
    -   [downloadProductFirmware](#downloadproductfirmware)
    -   [downloadManufacturingBackup](#downloadmanufacturingbackup)
    -   [releaseProductFirmware](#releaseproductfirmware)
    -   [listTeamMembers](#listteammembers)
    -   [inviteTeamMember](#inviteteammember)
    -   [removeTeamMember](#removeteammember)
    -   [lookupSerialNumber](#lookupserialnumber)
    -   [createMeshNetwork](#createmeshnetwork)
    -   [removeMeshNetwork](#removemeshnetwork)
    -   [listMeshNetworks](#listmeshnetworks)
    -   [getMeshNetwork](#getmeshnetwork)
    -   [updateMeshNetwork](#updatemeshnetwork)
    -   [addMeshNetworkDevice](#addmeshnetworkdevice)
    -   [removeMeshNetworkDevice](#removemeshnetworkdevice)
    -   [listMeshNetworkDevices](#listmeshnetworkdevices)
    -   [getProductConfiguration](#getproductconfiguration)
    -   [getProductConfigurationSchema](#getproductconfigurationschema)
    -   [getProductDeviceConfiguration](#getproductdeviceconfiguration)
    -   [getProductDeviceConfigurationSchema](#getproductdeviceconfigurationschema)
    -   [setProductConfiguration](#setproductconfiguration)
    -   [setProductDeviceConfiguration](#setproductdeviceconfiguration)
    -   [getProductLocations](#getproductlocations)
    -   [getProductDeviceLocations](#getproductdevicelocations)
    -   [executeLogic](#executelogic)
    -   [createLogicFunction](#createlogicfunction)
    -   [getLogicFunction](#getlogicfunction)
    -   [updateLogicFunction](#updatelogicfunction)
    -   [deleteLogicFunction](#deletelogicfunction)
    -   [listLogicFunctions](#listlogicfunctions)
    -   [listLogicRuns](#listlogicruns)
    -   [getLogicRun](#getlogicrun)
    -   [getLogicRunLogs](#getlogicrunlogs)
    -   [createLedger](#createledger)
    -   [getLedger](#getledger)
    -   [updateLedger](#updateledger)
    -   [archiveLedger](#archiveledger)
    -   [Scope](#scope)
    -   [listLedgers](#listledgers)
    -   [getLedgerInstance](#getledgerinstance)
    -   [SetMode](#setmode)
    -   [setLedgerInstance](#setledgerinstance)
    -   [deleteLedgerInstance](#deleteledgerinstance)
    -   [listLedgerInstances](#listledgerinstances)
    -   [listLedgerInstanceVersions](#listledgerinstanceversions)
    -   [getLedgerInstanceVersion](#getledgerinstanceversion)
    -   [listDeviceOsVersions](#listdeviceosversions)
    -   [getDeviceOsVersion](#getdeviceosversion)
    -   [listEnvVars](#listenvvars)
    -   [updateEnvVars](#updateenvvars)
    -   [setEnvVar](#setenvvar)
    -   [deleteEnvVar](#deleteenvvar)
    -   [renderEnvVars](#renderenvvars)
    -   [reviewEnvVarsRollout](#reviewenvvarsrollout)
    -   [startEnvVarsRollout](#startenvvarsrollout)
    -   [setDefaultAuth](#setdefaultauth)
    -   [get](#get)
    -   [head](#head)
    -   [post](#post)
    -   [put](#put)
    -   [patch](#patch)
    -   [delete](#delete)
    -   [request](#request)

## Particle

Defined in: [Particle.ts:64](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L64)

Particle Cloud API wrapper.

See <https://docs.particle.io/reference/javascript/> for examples
of using the `Particle` class.

Most Particle methods take a single unnamed argument object documented as
`options` with key/value pairs for each option.

### constructor

Defined in: [Particle.ts:86](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L86)

Contructor for the Cloud API wrapper.

Create a new Particle object and call methods below on it.

**Parameters**

-   `options?` Options for this API call Options to be used for all requests (see [Defaults](../src/Defaults.js))
    -   `baseUrl?` **`string`**
    -   `clientId?` **`string`**
    -   `clientSecret?` **`string`**
    -   `tokenDuration?` **`number`**
    -   `auth?` **`string`** The access token. If not specified here, will have to be added to every request

Returns **`Particle`**

### login

Defined in: [Particle.ts:142](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L142)

Login to Particle Cloud using an existing Particle acccount.

**Parameters**

-   `options` **`LoginOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`LoginResponse`>>** A promise that resolves with the response data

### sendOtp

Defined in: [Particle.ts:168](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L168)

If login failed with an 'mfa_required' error, this must be called with a valid OTP code to login

**Parameters**

-   `options` **`SendOtpOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`LoginResponse`>>** A promise that resolves with the response data

### enableMfa

Defined in: [Particle.ts:192](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L192)

Enable MFA on the currently logged in user

**Parameters**

-   `options` **`EnableMfaOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`EnableMfaResponse`>>** A promise that resolves with the response data

### confirmMfa

Defined in: [Particle.ts:207](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L207)

Confirm MFA for the user. This must be called with current TOTP code, determined from the results of enableMfa(). You will be prompted to enter an OTP code every time you login after enrollment is confirmed.

**Parameters**

-   `options` **`ConfirmMfaOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`ConfirmMfaResponse`>>** A promise that resolves with the response data

### disableMfa

Defined in: [Particle.ts:232](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L232)

Disable MFA for the user.

**Parameters**

-   `options` **`DisableMfaOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### createCustomer

Defined in: [Particle.ts:252](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L252)

Create Customer for Product.

**Parameters**

-   `options` **`CreateCustomerOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`CreateCustomerResponse`>>** A promise that resolves with the response data

### loginAsClientOwner

Defined in: [Particle.ts:275](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L275)

Login to Particle Cloud using an OAuth client.

**Parameters**

-   `options?` **`LoginAsClientOwnerOptions` = `{}`** Options for this API call

Returns **`Promise`<`JSONResponse`<`LoginResponse`>>** A promise that resolves with the response data

### createUser

Defined in: [Particle.ts:300](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L300)

Create a user account for the Particle Cloud

**Parameters**

-   `options` Options for this API call
    -   `username` **`string`** Email of the new user
    -   `password` **`string`** Password
    -   `accountInfo?` **`Record`<`string`, `string` \| `number` \| `boolean`>** Object that contains account information fields such as user real name, company name, business account flag etc
    -   `utm?` **`Record`<`string`, `string`>** Object that contains info about the campaign that lead to this user creation
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### resetPassword

Defined in: [Particle.ts:322](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L322)

Send reset password email for a Particle Cloud user account

**Parameters**

-   `options` **`ResetPasswordOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### deleteAccessToken

Defined in: [Particle.ts:339](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L339)

Revoke an access token

**Parameters**

-   `options` **`DeleteAccessTokenOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### deleteCurrentAccessToken

Defined in: [Particle.ts:355](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L355)

Revoke the current session access token

**Parameters**

-   `options` **`DeleteCurrentAccessTokenOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### deleteActiveAccessTokens

Defined in: [Particle.ts:372](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L372)

Revoke all active access tokens

**Parameters**

-   `options` **`DeleteActiveAccessTokensOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### deleteUser

Defined in: [Particle.ts:390](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L390)

Delete the current user

**Parameters**

-   `options` **`DeleteUserOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### trackingIdentity

Defined in: [Particle.ts:410](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L410)

Retrieves the information that is used to identify the current login for tracking.

**Parameters**

-   `options?` **`TrackingIdentityOptions` = `{}`** Options for this API call

Returns **`Promise`<`JSONResponse`<`TrackingIdentityResponse`>>** A promise that resolves with the response data

### listDevices

Defined in: [Particle.ts:436](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L436)

List devices claimed to the account or product

**Parameters**

-   `options` Options for this API call
    -   `deviceId?` **`string`** (Product only) Filter results to devices with this ID (partial matching)
    -   `deviceName?` **`string`** (Product only) Filter results to devices with this name (partial matching)
    -   `groups?` **`string`[]** (Product only) A list of full group names to filter results to devices belonging to these groups only.
    -   `sortAttr?` **`string`** (Product only) The attribute by which to sort results. See API docs for options.
    -   `sortDir?` **`string`** (Product only) The direction of sorting. See API docs for options.
    -   `page?` **`number`** (Product only) Current page of results
    -   `perPage?` **`number`** (Product only) Records per page
    -   `product?` **`string` \| `number`** List devices in this product ID or slug
    -   `auth?` **`string`** The access token. Can be ignored if provided in constructor
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<`DeviceInfo`[]>>** A promise that resolves with the response data

### getDevice

Defined in: [Particle.ts:468](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L468)

Get detailed informationa about a device

**Parameters**

-   `options` **`GetDeviceOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`DeviceInfo`>>** A promise that resolves with the response data

### claimDevice

Defined in: [Particle.ts:483](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L483)

Claim a device to the account. The device must be online and unclaimed.

**Parameters**

-   `options` **`ClaimDeviceOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`ClaimResponse`>>** A promise that resolves with the response data

### addDeviceToProduct

Defined in: [Particle.ts:508](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L508)

Add a device to a product or move device out of quarantine.

**Parameters**

-   `options` **`AddDeviceToProductOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### removeDevice

Defined in: [Particle.ts:540](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L540)

Unclaim / Remove a device from your account or product, or deny quarantine

**Parameters**

-   `options` **`RemoveDeviceOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### removeDeviceOwner

Defined in: [Particle.ts:556](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L556)

Unclaim a product device its the owner, but keep it in the product

**Parameters**

-   `options` **`RemoveDeviceOwnerOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### renameDevice

Defined in: [Particle.ts:572](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L572)

Rename a device

**Parameters**

-   `options` **`RenameDeviceOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`DeviceInfo`>>** A promise that resolves with the response data

### signalDevice

Defined in: [Particle.ts:587](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L587)

Instruct the device to turn on/off the LED in a rainbow pattern

**Parameters**

-   `options` **`SignalDeviceOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`DeviceInfo`>>** A promise that resolves with the response data

### setDeviceNotes

Defined in: [Particle.ts:602](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L602)

Store some notes about device

**Parameters**

-   `options` Options for this API call
    -   `deviceId` **`string`** Device ID or Name
    -   `notes` **`string`** Your notes about this device
    -   `product?` **`string` \| `number`** Device in this product ID or slug
    -   `auth?` **`string`** The access token. Can be ignored if provided in constructor
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<`DeviceInfo`>>** A promise that resolves with the response data

### markAsDevelopmentDevice

Defined in: [Particle.ts:617](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L617)

Mark device as being used in development of a product so it opts out of automatic firmware updates

**Parameters**

-   `options` Options for this API call
    -   `deviceId` **`string`** Device ID or Name
    -   `development?` **`boolean` = `true`** Set to true to mark as development, false to return to product fleet
    -   `product` **`string` \| `number`** Device in this product ID or slug
    -   `auth?` **`string`** The access token. Can be ignored if provided in constructor
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<`DeviceInfo`>>** A promise that resolves with the response data

### lockDeviceProductFirmware

Defined in: [Particle.ts:633](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L633)

Mark device as being used in development of a product, so it opts out of automatic firmware updates

**Parameters**

-   `options` Options for this API call
    -   `deviceId` **`string`** Device ID or Name
    -   `desiredFirmwareVersion` **`number`** Lock the product device to run this firmware version.
    -   `flash?` **`boolean`** Immediately flash firmware indicated by desiredFirmwareVersion
    -   `product` **`string` \| `number`** Device in this product ID or slug
    -   `auth?` **`string`** The access token. Can be ignored if provided in constructor
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<`DeviceInfo`>>** A promise that resolves with the response data

### unlockDeviceProductFirmware

Defined in: [Particle.ts:647](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L647)

Mark device as receiving automatic firmware updates

**Parameters**

-   `options` Options for this API call
    -   `deviceId` **`string`** Device ID or Name
    -   `product` **`string` \| `number`** Device in this product ID or slug
    -   `auth?` **`string`** The access token. Can be ignored if provided in constructor
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<`DeviceInfo`>>** A promise that resolves with the response data

### updateDevice

Defined in: [Particle.ts:668](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L668)

Update multiple device attributes at the same time

**Parameters**

-   `options` **`UpdateDeviceOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`DeviceInfo`>>** A promise that resolves with the response data

### unprotectDevice

Defined in: [Particle.ts:700](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L700)

Disable device protection.

**Parameters**

-   `options` **`UnprotectDeviceOptions`** Options for this API call.

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### provisionDevice

Defined in: [Particle.ts:727](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L727)

Provision a new device for products that allow self-provisioning

**Parameters**

-   `options` **`ProvisionDeviceOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`DeviceInfo`>>** A promise that resolves with the response data

### getClaimCode

Defined in: [Particle.ts:749](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L749)

Generate a claim code to use in the device claiming process.
To generate a claim code for a product, the access token MUST belong to a
customer of the product.

**Parameters**

-   `options` **`GetClaimCodeOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`ClaimCodeResponse`>>** A promise that resolves with the response data

### getVariable

Defined in: [Particle.ts:765](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L765)

Get the value of a device variable

**Parameters**

-   `options` **`GetVariableOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`DeviceVariableResponse`>>** A promise that resolves with the response data

### flashDevice

Defined in: [Particle.ts:785](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L785)

Compile and flash application firmware to a device. Pass a pre-compiled binary to flash it directly to the device.

**Parameters**

-   `options` **`FlashDeviceOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### compileCode

Defined in: [Particle.ts:809](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L809)

Compile firmware using the Particle Cloud

**Parameters**

-   `options` **`CompileCodeOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`CompileResponse`>>** A promise that resolves with the response data

### downloadFirmwareBinary

Defined in: [Particle.ts:838](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L838)

Download a firmware binary

**Parameters**

-   `options` **`DownloadFirmwareBinaryOptions`** Options for this API call

Returns **`Promise`<`Buffer` \| `ArrayBuffer`>** A promise that resolves with the binary data

### sendPublicKey

Defined in: [Particle.ts:860](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L860)

Send a new device public key to the Particle Cloud

**Parameters**

-   `options` Options for this API call
    -   `deviceId` **`string`** Device ID or Name
    -   `key` **`string` \| `Buffer`** Public key contents
    -   `algorithm?` **`string`** Algorithm used to generate the public key. Valid values are `rsa` or `ecc`.
    -   `auth?` **`string`** The access token. Can be ignored if provided in constructor
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### callFunction

Defined in: [Particle.ts:888](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L888)

Call a device function

**Parameters**

-   `options` **`CallFunctionOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`FunctionCallResponse`>>** A promise that resolves with the response data

### getEventStream

Defined in: [Particle.ts:906](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L906)

Get a stream of events

**Parameters**

-   `options` **`GetEventStreamOptions`** Options for this API call

Returns **`Promise`<`EventStream`>** A promise that resolves with the response data emit 'event' events.

### publishEvent

Defined in: [Particle.ts:945](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L945)

Publish a event to the Particle Cloud

**Parameters**

-   `options` Options for this API call
    -   `name` **`string`** Event name
    -   `data?` **`string`** Event data
    -   `isPrivate?` **`boolean`** Should the event be publicly available?
    -   `product?` **`string` \| `number`** Event for this product ID or slug
    -   `auth?` **`string`** The access token. Can be ignored if provided in constructor
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### Hook

Defined in: [Particle.ts:940](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L940)

Type: `Object`

**Properties**

-   `method` **`string`** (optional, default `POST`) Type of web request triggered by the Webhook (GET, POST, PUT, or DELETE)
-   `auth` **`object`** (optional) Auth data like `{ user: 'me', pass: '1234' }` for basic auth or `{ bearer: 'token' }` to send with the Webhook request
-   `headers` **`object`** (optional) Additional headers to add to the Webhook like `{ 'X-ONE': '1', X-TWO: '2' }`
-   `query` **`object`** (optional) Query params to add to the Webhook request like `{ foo: 'foo', bar: 'bar' }`
-   `json` **`object`** (optional) JSON data to send with the Webhook request - sets `Content-Type` to `application/json`
-   `form` **`object`** (optional) Form data to send with the Webhook request - sets `Content-Type` to `application/x-www-form-urlencoded`
-   `body` **`string`** (optional) Custom body to send with the Webhook request
-   `responseTemplate` **`object`** (optional) Template to use to customize the Webhook response body
-   `responseEvent` **`object`** (optional) The Webhook response event name that your devices can subscribe to
-   `errorResponseEvent` **`object`** (optional) The Webhook error response event name that your devices can subscribe to

### createWebhook

Defined in: [Particle.ts:980](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L980)

Create a webhook

**Parameters**

-   `options` Options for this API call
    -   `event` **`string`** The name of the Particle event that should trigger the Webhook
    -   `url` **`string`** The web address that will be targeted when the Webhook is triggered
    -   `device?` **`string`** Trigger Webhook only for this device ID or Name
    -   `rejectUnauthorized?` **`boolean`** Set to `false` to skip SSL certificate validation of the target URL
    -   `noDefaults?` **`boolean`** Don't include default event data in the webhook request
    -   `hook?` **\{ `method?`: `string`; `auth?`: `Record`<`string`, `string`>; `headers?`: `Record`<`string`, `string`>; `query?`: `Record`<`string`, `string`>; `json?`: `object`; `form?`: `object`; `body?`: `string`; `responseTemplate?`: `string`; `responseEvent?`: `string`; `errorResponseEvent?`: `string`; \}** Webhook configuration settings
        -   `hook.method?` **`string`**
        -   `hook.auth?` **`Record`<`string`, `string`>**
        -   `hook.headers?` **`Record`<`string`, `string`>**
        -   `hook.query?` **`Record`<`string`, `string`>**
        -   `hook.json?` **`object`**
        -   `hook.form?` **`object`**
        -   `hook.body?` **`string`**
        -   `hook.responseTemplate?` **`string`**
        -   `hook.responseEvent?` **`string`**
        -   `hook.errorResponseEvent?` **`string`**
    -   `product?` **`string` \| `number`** Webhook for this product ID or slug
    -   `auth?` **`string`** The access token. Can be ignored if provided in constructor
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<`CreateWebhookResponse`>>** A promise that resolves with the response data

### deleteWebhook

Defined in: [Particle.ts:1014](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1014)

Delete a webhook

**Parameters**

-   `options` **`DeleteWebhookOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### listWebhooks

Defined in: [Particle.ts:1028](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1028)

List all webhooks owned by the account or product

**Parameters**

-   `options` **`ListWebhooksOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`WebhookInfo`[]>>** A promise that resolves with the response data

### createIntegration

Defined in: [Particle.ts:1048](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1048)

Create an integration to send events to an external service

See the API docs for details https://docs.particle.io/reference/api/#integrations-webhooks-

**Parameters**

-   `options` **`CreateIntegrationOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`IntegrationInfo`>>** A promise that resolves with the response data

### editIntegration

Defined in: [Particle.ts:1070](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1070)

Edit an integration to send events to an external service

See the API docs for details https://docs.particle.io/reference/api/#integrations-webhooks-

**Parameters**

-   `options` **`EditIntegrationOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`IntegrationInfo`>>** A promise that resolves with the response data

### deleteIntegration

Defined in: [Particle.ts:1087](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1087)

Delete an integration to send events to an external service

**Parameters**

-   `options` **`DeleteIntegrationOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### listIntegrations

Defined in: [Particle.ts:1101](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1101)

List all integrations owned by the account or product

**Parameters**

-   `options` **`ListIntegrationsOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`IntegrationInfo`[]>>** A promise that resolves with the response data

### getUserInfo

Defined in: [Particle.ts:1114](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1114)

Get details about the current user

**Parameters**

-   `options` Options for this API call
    -   `auth?` **`string`** The access token. Can be ignored if provided in constructor
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<`UserInfo`>>** A promise that resolves with the response data

### setUserInfo

Defined in: [Particle.ts:1127](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1127)

Set details on the current user

**Parameters**

-   `options` Options for this API call
    -   `accountInfo?` **`Record`<`string`, `string` \| `number` \| `boolean`>** Set user's extended info fields (name, business account, company name, etc)
    -   `auth?` **`string`** The access token. Can be ignored if provided in constructor
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<`UserInfo`>>** A promise that resolves with the response data

### changeUsername

Defined in: [Particle.ts:1143](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1143)

Change username (i.e, email)

**Parameters**

-   `options` **`ChangeUsernameOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### changeUserPassword

Defined in: [Particle.ts:1164](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1164)

Change user's password

**Parameters**

-   `options` **`ChangeUserPasswordOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### listSIMs

Defined in: [Particle.ts:1188](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1188)

List SIM cards owned by a user or product

**Parameters**

-   `options` **`ListSIMsOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`SimInfo`[]>>** A promise that resolves with the response data

### getSIMDataUsage

Defined in: [Particle.ts:1204](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1204)

Get data usage for one SIM card for the current billing period

**Parameters**

-   `options` **`GetSIMDataUsageOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`SimDataUsage`>>** A promise that resolves with the response data

### getFleetDataUsage

Defined in: [Particle.ts:1221](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1221)

Get data usage for all SIM cards in a product the current billing period

**Parameters**

-   `options` **`GetFleetDataUsageOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`SimDataUsage`>>** A promise that resolves with the response data

### checkSIM

Defined in: [Particle.ts:1239](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1239)

Check SIM status

**Parameters**

-   `options` **`CheckSIMOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`SimInfo`>>** A promise that resolves with the response data

### activateSIM

Defined in: [Particle.ts:1256](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1256)

Activate and add SIM cards to an account or product

**Parameters**

-   `options` **`ActivateSIMOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### deactivateSIM

Defined in: [Particle.ts:1277](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1277)

Deactivate a SIM card so it doesn't incur data usage in future months.

**Parameters**

-   `options` **`DeactivateSIMOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### reactivateSIM

Defined in: [Particle.ts:1294](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1294)

Reactivate a SIM card the was deactivated or unpause a SIM card that was automatically paused

**Parameters**

-   `options` **`ReactivateSIMOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### updateSIM

Defined in: [Particle.ts:1311](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1311)

Update SIM card data limit

**Parameters**

-   `options` **`UpdateSIMOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`SimInfo`>>** A promise that resolves with the response data

### removeSIM

Defined in: [Particle.ts:1327](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1327)

Remove a SIM card from an account so it can be activated by a different account

**Parameters**

-   `options` **`RemoveSIMOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### listBuildTargets

Defined in: [Particle.ts:1341](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1341)

List valid build targets to be used for compiling

**Parameters**

-   `options` **`ListBuildTargetsOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`BuildTargetsResponse`>>** A promise that resolves with the response data

### listLibraries

Defined in: [Particle.ts:1370](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1370)

List firmware libraries

**Parameters**

-   `options` **`ListLibrariesOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<\{ `data`: `LibraryInfo`[]; \}>>** A promise

### getLibrary

Defined in: [Particle.ts:1403](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1403)

Get firmware library details

**Parameters**

-   `options` **`GetLibraryOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<\{ `data`: `LibraryInfo`; \}>>** A promise

### getLibraryVersions

Defined in: [Particle.ts:1424](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1424)

Firmware library details for each version

**Parameters**

-   `options` **`GetLibraryVersionsOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<\{ `data`: `LibraryInfo`[]; \}>>** A promise

### contributeLibrary

Defined in: [Particle.ts:1444](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1444)

Contribute a new library version from a compressed archive

**Parameters**

-   `options` **`ContributeLibraryOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<\{ `data`: `LibraryInfo`; \}>>** A promise

### publishLibrary

Defined in: [Particle.ts:1468](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1468)

Publish the latest version of a library to the public

**Parameters**

-   `options` **`PublishLibraryOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<\{ `data`: `LibraryInfo`; \}>>** A promise

### deleteLibrary

Defined in: [Particle.ts:1489](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1489)

Delete one version of a library or an entire private library

**Parameters**

-   `options` **`DeleteLibraryOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### downloadFile

Defined in: [Particle.ts:1507](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1507)

Download an external file that may not be on the API

**Parameters**

-   `options` **`DownloadFileOptions`** Options for this API call

Returns **`Promise`<`Buffer` \| `ArrayBuffer`>** A promise that resolves with the binary data

### listOAuthClients

Defined in: [Particle.ts:1520](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1520)

List OAuth client created by the account

**Parameters**

-   `options` **`ListOAuthClientsOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<\{ `clients`: `OAuthClientInfo`[]; \}>>** A promise

### createOAuthClient

Defined in: [Particle.ts:1538](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1538)

Create an OAuth client

**Parameters**

-   `options` Options for this API call
    -   `name` **`string`** Name of the OAuth client
    -   `type` **`string`** web, installed or web
    -   `redirect_uri?` **`string`** URL to redirect after OAuth flow. Only for type web.
    -   `scope?` **`Record`<`string`, `string`>** Limits what the access tokens created by this client can do.
    -   `product?` **`string` \| `number`** Create client for this product ID or slug
    -   `auth?` **`string`** The access token. Can be ignored if provided in constructor
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<`OAuthClientInfo`>>** A promise that resolves with the response data

### updateOAuthClient

Defined in: [Particle.ts:1556](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1556)

Update an OAuth client

**Parameters**

-   `options` **`UpdateOAuthClientOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OAuthClientInfo`>>** A promise that resolves with the response data

### deleteOAuthClient

Defined in: [Particle.ts:1572](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1572)

Delete an OAuth client

**Parameters**

-   `options` **`DeleteOAuthClientOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### listProducts

Defined in: [Particle.ts:1585](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1585)

List products the account has access to

**Parameters**

-   `options` **`ListProductsOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<\{ `products`: `ProductInfo`[]; \}>>** A promise

### getProduct

Defined in: [Particle.ts:1598](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1598)

Get detailed information about a product

**Parameters**

-   `options` **`GetProductOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<\{ `product`: `ProductInfo`; \}>>** A promise

### listProductFirmware

Defined in: [Particle.ts:1611](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1611)

List product firmware versions

**Parameters**

-   `options` **`ListProductFirmwareOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`ProductFirmwareInfo`[]>>** A promise that resolves with the response data

### uploadProductFirmware

Defined in: [Particle.ts:1629](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1629)

List product firmware versions

**Parameters**

-   `options` **`UploadProductFirmwareOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`ProductFirmwareInfo`>>** A promise that resolves with the response data

### getProductFirmware

Defined in: [Particle.ts:1657](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1657)

Get information about a product firmware version

**Parameters**

-   `options` **`GetProductFirmwareOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`ProductFirmwareInfo`>>** A promise that resolves with the response data

### updateProductFirmware

Defined in: [Particle.ts:1678](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1678)

Update information for a product firmware version

**Parameters**

-   `options` **`UpdateProductFirmwareOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`ProductFirmwareInfo`>>** A promise that resolves with the response data

### downloadProductFirmware

Defined in: [Particle.ts:1693](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1693)

Download a product firmware binary

**Parameters**

-   `options` **`DownloadProductFirmwareOptions`** Options for this API call

Returns **`Promise`<`Buffer` \| `ArrayBuffer`>** A promise that resolves with the binary data

### downloadManufacturingBackup

Defined in: [Particle.ts:1713](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1713)

Download a tachyon manufacturing backup files

**Parameters**

-   `options` **`DownloadManufacturingBackupOptions`** Options for this API call

Returns **`Promise`<`Buffer` \| `ArrayBuffer`>** A promise that resolves with the binary data

### releaseProductFirmware

Defined in: [Particle.ts:1734](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1734)

Release a product firmware version as the default version

**Parameters**

-   `options` **`ReleaseFirmwareOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### listTeamMembers

Defined in: [Particle.ts:1748](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1748)

List product team members

**Parameters**

-   `options` **`ListTeamMembersOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`TeamMember`[]>>** A promise that resolves with the response data

### inviteTeamMember

Defined in: [Particle.ts:1767](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1767)

Invite Particle user to a product team

**Parameters**

-   `options` **`InviteTeamMemberOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### removeTeamMember

Defined in: [Particle.ts:1787](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1787)

Remove Particle user to a product team

**Parameters**

-   `options` **`RemoveTeamMemberOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### lookupSerialNumber

Defined in: [Particle.ts:1805](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1805)

Fetch details about a serial number

**Parameters**

-   `options` **`LookupSerialNumberOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`SerialNumberResponse`>>** A promise that resolves with the response data

### createMeshNetwork

Defined in: [Particle.ts:1825](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1825)

Create a mesh network

**Parameters**

-   `options` **`CreateMeshNetworkOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`NetworkInfo`>>** A promise that resolves with the response data

### removeMeshNetwork

Defined in: [Particle.ts:1844](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1844)

Remove a mesh network.

**Parameters**

-   `options` **`RemoveMeshNetworkOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### listMeshNetworks

Defined in: [Particle.ts:1858](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1858)

List all mesh networks

**Parameters**

-   `options` **`ListMeshNetworksOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`NetworkInfo`[]>>** A promise that resolves with the response data

### getMeshNetwork

Defined in: [Particle.ts:1872](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1872)

Get information about a mesh network.

**Parameters**

-   `options` **`GetMeshNetworkOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`NetworkInfo`>>** A promise that resolves with the response data

### updateMeshNetwork

Defined in: [Particle.ts:1887](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1887)

Modify a mesh network.

**Parameters**

-   `options` **`UpdateMeshNetworkOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`NetworkInfo`>>** A promise that resolves with the response data

### addMeshNetworkDevice

Defined in: [Particle.ts:1907](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1907)

Add a device to a mesh network.

**Parameters**

-   `options` Options for this API call
    -   `networkId` **`string`** Network ID or name
    -   `deviceId` **`string`** Device ID
    -   `auth?` **`string`** The access token. Can be ignored if provided in constructor
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<`NetworkInfo`>>** A promise that resolves with the response data

### removeMeshNetworkDevice

Defined in: [Particle.ts:1928](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1928)

Remove a device from a mesh network.

**Parameters**

-   `options` **`RemoveMeshNetworkDeviceOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### listMeshNetworkDevices

Defined in: [Particle.ts:1959](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1959)

List all devices of a mesh network.

**Parameters**

-   `options` **`ListMeshNetworkDevicesOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`DeviceInfo`[]>>** A promise that resolves with the response data

### getProductConfiguration

Defined in: [Particle.ts:1979](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1979)

Get product configuration

**Parameters**

-   `options` **`GetProductConfigurationOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`ProductConfigurationResponse`>>** A promise that resolves with the response data

### getProductConfigurationSchema

Defined in: [Particle.ts:1997](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L1997)

Get product configuration schema

**Parameters**

-   `options` **`GetProductConfigurationSchemaOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`object`>>** A promise that resolves with the response data

### getProductDeviceConfiguration

Defined in: [Particle.ts:2017](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2017)

Get product device's configuration

**Parameters**

-   `options` **`GetProductDeviceConfigurationOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`ProductConfigurationResponse`>>** A promise that resolves with the response data

### getProductDeviceConfigurationSchema

Defined in: [Particle.ts:2036](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2036)

Get product device's configuration schema

**Parameters**

-   `options` **`GetProductDeviceConfigurationSchemaOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`object`>>** A promise that resolves with the response data

### setProductConfiguration

Defined in: [Particle.ts:2056](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2056)

Set product configuration

**Parameters**

-   `options` **`SetProductConfigurationOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`ProductConfigurationResponse`>>** A promise that resolves with the response data

### setProductDeviceConfiguration

Defined in: [Particle.ts:2077](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2077)

Set product configuration for a specific device within the product

**Parameters**

-   `options` **`SetProductDeviceConfigurationOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`ProductConfigurationResponse`>>** A promise that resolves with the response data

### getProductLocations

Defined in: [Particle.ts:2104](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2104)

Query location for devices within a product

**Parameters**

-   `options` **`GetProductLocationsOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`LocationListResponse`>>** A promise that resolves with the response data

### getProductDeviceLocations

Defined in: [Particle.ts:2138](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2138)

Query location for one device within a product

**Parameters**

-   `options` **`GetProductDeviceLocationsOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`DeviceLocationInfo`>>** A promise that resolves with the response data

### executeLogic

Defined in: [Particle.ts:2166](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2166)

Executes the provided logic function once and returns the result. No logs, runs, etc are saved

NOTE: Any external interactions such as Particle.publish will actually occur when the logic is executed.

**Parameters**

-   `options` **`ExecuteLogicOptions`** The options for creating the logic function.

Returns **`Promise`<`JSONResponse`<`ExecuteLogicResponse`>>** A promise that resolves with the response data

### createLogicFunction

Defined in: [Particle.ts:2194](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2194)

Creates a new logic function in the specified organization or sandbox using the provided function data.

When you create a logic function with Event logic triggers, events will immediately
start being handled by the function code.

When you create a Scheduled logic trigger, it will immediately be scheduled at the next time
according to the cron and start_at properties.

**Parameters**

-   `options` The options for creating the logic function.
    -   `auth?` **`string`** The access token. Can be ignored if provided in constructor
    -   `org?` **`string`** The Organization ID or slug. If not provided, the request will go to your sandbox account.
    -   `logicFunction` **\{ `name`: `string`; `description?`: `string`; `enabled?`: `boolean`; `source`: \{ `type`: `"JavaScript"`; `code`: `string`; \}; `logic_triggers?`: `object`[]; `api_username?`: `string`; \}** The logic function object containing the function details.
        -   `logicFunction.name` **`string`**
        -   `logicFunction.description?` **`string`**
        -   `logicFunction.enabled?` **`boolean`**
        -   `logicFunction.source` **\{ `type`: `"JavaScript"`; `code`: `string`; \}**
        -   `logicFunction.source.type` **`"JavaScript"`**
        -   `logicFunction.source.code` **`string`**
        -   `logicFunction.logic_triggers?` **`object`[]**
        -   `logicFunction.api_username?` **`string`**
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<\{ `logic_function`: `LogicFunction`; \}>>** A promise that resolves to the created logic function data.

### getLogicFunction

Defined in: [Particle.ts:2216](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2216)

Get a logic function in the specified organization or sandbox by logic function ID.

**Parameters**

-   `options` **`GetLogicFunctionOptions`** The options for the logic function.

Returns **`Promise`<`JSONResponse`<\{ `logic_function`: `LogicFunction`; \}>>** A promise that resolves to the specified logic function data.

### updateLogicFunction

Defined in: [Particle.ts:2240](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2240)

Updates an existing logic function in the specified organization or sandbox using the provided function data.

If you include an id on a logic trigger, it will update the logic trigger in place.

**Parameters**

-   `options` The options for updating the logic function.
    -   `auth?` **`string`** The access token. Can be ignored if provided in constructor
    -   `org?` **`string`** The Organization ID or slug. If not provided, the request will go to your sandbox account.
    -   `logicFunctionId` **`string`** The ID of the logic function to update.
    -   `logicFunction` **\{ `name?`: `string`; `description?`: `string`; `enabled?`: `boolean`; `source?`: \{ `type`: `"JavaScript"`; `code`: `string`; \}; `logic_triggers?`: `object`[]; \}** The logic function object containing the logic function details.
        -   `logicFunction.name?` **`string`**
        -   `logicFunction.description?` **`string`**
        -   `logicFunction.enabled?` **`boolean`**
        -   `logicFunction.source?` **\{ `type`: `"JavaScript"`; `code`: `string`; \}**
        -   `logicFunction.source.type` **`"JavaScript"`**
        -   `logicFunction.source.code` **`string`**
        -   `logicFunction.logic_triggers?` **`object`[]**
    -   `headers?` **`Record`<`string`, `string`>** Key/Value pairs like `{ 'X-FOO': 'foo', X-BAR: 'bar' }` to send as headers.
    -   `context?` **\{ `tool?`: `ToolContext`; `project?`: `ProjectContext`; \}** Request context.
        -   `context.tool?` **`ToolContext`**
        -   `context.project?` **`ProjectContext`**

Returns **`Promise`<`JSONResponse`<\{ `logic_function`: `LogicFunction`; \}>>** A promise that resolves to the updated logic function data.

### deleteLogicFunction

Defined in: [Particle.ts:2262](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2262)

Deletes a logic function in the specified organization or sandbox by logic function ID.

**Parameters**

-   `options` **`DeleteLogicFunctionOptions`** The options for deleting the logic function.

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### listLogicFunctions

Defined in: [Particle.ts:2283](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2283)

Lists all logic functions in the specified organization or sandbox.

**Parameters**

-   `options` **`ListLogicFunctionsOptions`** The options for listing logic functions.

Returns **`Promise`<`JSONResponse`<\{ `logic_functions`: `LogicFunction`[]; \}>>** A promise that resolves to an array of logic functions data.

### listLogicRuns

Defined in: [Particle.ts:2307](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2307)

Lists all logic runs for the specified logic function in the specified organization or sandbox.

**Parameters**

-   `options` **`ListLogicRunsOptions`** The options for the request.

Returns **`Promise`<`JSONResponse`<\{ `logic_runs`: `LogicRun`[]; \}>>** A promise that resolves to an array of logic run data.

### getLogicRun

Defined in: [Particle.ts:2329](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2329)

Retrieves a logic run by its ID for the specified logic function in the specified organization or sandbox.

**Parameters**

-   `options` **`GetLogicRunOptions`** The options for the request.

Returns **`Promise`<`JSONResponse`<\{ `logic_run`: `LogicRun`; \}>>** A promise that resolves to an array of logic run data for the specified logic run ID.

### getLogicRunLogs

Defined in: [Particle.ts:2351](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2351)

Retrieves the logs for a logic run by its ID for the specified logic function in the specified organization or sandbox.

**Parameters**

-   `options` **`GetLogicRunLogsOptions`** The options for the request.

Returns **`Promise`<`JSONResponse`<\{ `logs`: `LogicRunLog`[]; \}>>** A promise that resolves to the logs for the specified logic run ID.

### createLedger

Defined in: [Particle.ts:2372](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2372)

Creates a new ledger definition in the specified organization or sandbox.

**Parameters**

-   `options` **`CreateLedgerOptions`** The options for creating the ledger definition.

Returns **`Promise`<`JSONResponse`<`LedgerDefinition`>>** A promise that resolves with the response data

### getLedger

Defined in: [Particle.ts:2394](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2394)

Get a ledger definition in the specified organization or sandbox by ledger name.

**Parameters**

-   `options` **`GetLedgerOptions`** The options for the ledger definition.

Returns **`Promise`<`JSONResponse`<`LedgerDefinition`>>** A promise that resolves with the response data

### updateLedger

Defined in: [Particle.ts:2416](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2416)

Updates an existing ledger definition in the specified organization or sandbox.

**Parameters**

-   `options` **`UpdateLedgerOptions`** The options for updating the ledger definition.

Returns **`Promise`<`JSONResponse`<`LedgerDefinition`>>** A promise that resolves with the response data

### archiveLedger

Defined in: [Particle.ts:2438](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2438)

Archives a ledger definition in the specified organization or sandbox by ledger name.

**Parameters**

-   `options` **`ArchiveLedgerOptions`** The options for archiving the ledger definition.

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### Scope

Defined in: [Particle.ts:2436](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2436)

Type: `"Owner" | "Product" | "Device"`

### listLedgers

Defined in: [Particle.ts:2466](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2466)

Lists all ledger definitions in the specified organization or sandbox.

**Parameters**

-   `options` **`ListLedgersOptions`** The options for listing ledger definitions.

Returns **`Promise`<`JSONResponse`<\{ `ledger_definitions`: `LedgerDefinition`[]; \}>>** A promise that resolves to an array of ledger definition data.

### getLedgerInstance

Defined in: [Particle.ts:2494](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2494)

Get ledger instance data.

**Parameters**

-   `options` **`GetLedgerInstanceOptions`** The options for the ledger instance.

Returns **`Promise`<`JSONResponse`<`LedgerInstance`>>** A promise that resolves with the response data

### SetMode

Defined in: [Particle.ts:2492](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2492)

Type: `"Replace" | "Merge"`

### setLedgerInstance

Defined in: [Particle.ts:2522](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2522)

Set ledger instance data.

**Parameters**

-   `options` **`SetLedgerInstanceOptions`** The options for updating the ledger instance.

Returns **`Promise`<`JSONResponse`<`LedgerInstance`>>** A promise that resolves with the response data

### deleteLedgerInstance

Defined in: [Particle.ts:2548](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2548)

Delete a ledger instance in the specified organization or sandbox by ledger name.

**Parameters**

-   `options` **`DeleteLedgerInstanceOptions`** The options for archiving the ledger instance.

Returns **`Promise`<`JSONResponse`<`OKResponse`>>** A promise that resolves with the response data

### listLedgerInstances

Defined in: [Particle.ts:2571](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2571)

Lists ledger instances in the specified organization or sandbox.

**Parameters**

-   `options` **`ListLedgerInstancesOptions`** The options for listing ledger instances.

Returns **`Promise`<`JSONResponse`<`LedgerInstanceListResponse`>>** A promise that resolves with the response data

### listLedgerInstanceVersions

Defined in: [Particle.ts:2599](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2599)

List ledger instance versions

**Parameters**

-   `options` **`ListLedgerInstanceVersionsOptions`** The options for the ledger instance.

Returns **`Promise`<`JSONResponse`<`LedgerVersionListResponse`>>** A promise that resolves with the response data

### getLedgerInstanceVersion

Defined in: [Particle.ts:2626](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2626)

Get specific ledger instance version

**Parameters**

-   `options` **`GetLedgerInstanceVersionOptions`** The options for the ledger instance.

Returns **`Promise`<`JSONResponse`<`LedgerInstance`>>** A promise that resolves with the response data

### listDeviceOsVersions

Defined in: [Particle.ts:2649](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2649)

List Device OS versions

**Parameters**

-   `options` **`ListDeviceOsVersionsOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`DeviceOsVersion`[]>>** A promise that resolves with the response data

### getDeviceOsVersion

Defined in: [Particle.ts:2678](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2678)

Get a specific Device OS version

**Parameters**

-   `options` **`GetDeviceOsVersionOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`DeviceOsVersion`>>** A promise that resolves with the response data

### listEnvVars

Defined in: [Particle.ts:2703](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2703)

List environment variables for the given scope.

**Parameters**

-   `options` **`ListEnvVarsOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`EnvVarsResponse`>>** A promise that resolves with the env vars data

### updateEnvVars

Defined in: [Particle.ts:2725](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2725)

Bulk update environment variables with set/unset operations.

**Parameters**

-   `options` **`UpdateEnvVarsOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`EnvVarsResponse`>>** A promise that resolves with the updated env vars data

### setEnvVar

Defined in: [Particle.ts:2749](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2749)

Set a single environment variable.

**Parameters**

-   `options` **`SetEnvVarOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`EnvVarsResponse`>>** A promise that resolves with the updated env vars data

### deleteEnvVar

Defined in: [Particle.ts:2772](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2772)

Delete a single environment variable.

**Parameters**

-   `options` **`DeleteEnvVarOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`EnvVarsResponse`>>** A promise that resolves with the updated env vars data

### renderEnvVars

Defined in: [Particle.ts:2793](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2793)

Get the rendered (flattened) environment variables for the given scope.

**Parameters**

-   `options` **`RenderEnvVarsOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`EnvVarsRenderResponse`>>** A promise that resolves with the rendered env vars

### reviewEnvVarsRollout

Defined in: [Particle.ts:2814](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2814)

Review the pending environment variables rollout changes.

**Parameters**

-   `options` **`ReviewEnvVarsRolloutOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`EnvVarsRolloutResponse`>>** A promise that resolves with the rollout diff

### startEnvVarsRollout

Defined in: [Particle.ts:2836](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2836)

Start rolling out environment variables to devices.

**Parameters**

-   `options` **`StartEnvVarsRolloutOptions`** Options for this API call

Returns **`Promise`<`JSONResponse`<`EnvVarsRolloutStartResponse`>>** A promise that resolves with success status

### setDefaultAuth

Defined in: [Particle.ts:2849](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2849)

Set default auth token that will be used in each method if `auth` is not provided

**Parameters**

-   `auth` **`string`** The access token

Returns **`void`**

###### Throws

When not auth string is provided

### get

> **get**<`T`>(`params`: `GetHeadOptions`): `Promise`<`JSONResponse`<`T`>>

Defined in: [Particle.ts:2906](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2906)

Make a GET request

###### Type Parameters

###### T

`T` = `object`

**Parameters**

-   `params` **`GetHeadOptions`**

Returns **`Promise`<`JSONResponse`<`T`>>** A promise that resolves with the response data

### head

> **head**<`T`>(`params`: `GetHeadOptions`): `Promise`<`JSONResponse`<`T`>>

Defined in: [Particle.ts:2922](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2922)

Make a HEAD request

###### Type Parameters

###### T

`T` = `object`

**Parameters**

-   `params` **`GetHeadOptions`**

Returns **`Promise`<`JSONResponse`<`T`>>** A promise that resolves with the response data

### post

> **post**<`T`>(`params`: `MutateOptions`): `Promise`<`JSONResponse`<`T`>>

Defined in: [Particle.ts:2938](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2938)

Make a POST request

###### Type Parameters

###### T

`T` = `object`

**Parameters**

-   `params` **`MutateOptions`**

Returns **`Promise`<`JSONResponse`<`T`>>** A promise that resolves with the response data

### put

> **put**<`T`>(`params`: `MutateOptions`): `Promise`<`JSONResponse`<`T`>>

Defined in: [Particle.ts:2955](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2955)

Make a PUT request

###### Type Parameters

###### T

`T` = `object`

**Parameters**

-   `params` **`MutateOptions`**

Returns **`Promise`<`JSONResponse`<`T`>>** A promise that resolves with the response data

### patch

> **patch**<`T`>(`params`: `MutateOptions`): `Promise`<`JSONResponse`<`T`>>

Defined in: [Particle.ts:2971](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2971)

Make a PATCH request

###### Type Parameters

###### T

`T` = `object`

**Parameters**

-   `params` **`MutateOptions`**

Returns **`Promise`<`JSONResponse`<`T`>>** A promise that resolves with the response data

### delete

> **delete**<`T`>(`params`: `MutateOptions`): `Promise`<`JSONResponse`<`T`>>

Defined in: [Particle.ts:2987](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L2987)

Make a DELETE request

###### Type Parameters

###### T

`T` = `object`

**Parameters**

-   `params` **`MutateOptions`**

Returns **`Promise`<`JSONResponse`<`T`>>** A promise that resolves with the response data

### request

Defined in: [Particle.ts:3008](https://github.com/particle-iot/particle-api-js/blob/fe2858dfc1c46cecb41c0ff8e55bbf41e5da553b/src/Particle.ts#L3008)

**Parameters**

-   `args` **`AgentRequestOptions`** An obj with all the possible request configurations

Returns **`Promise`<`RequestResponse`>** A promise that resolves with the response data
