# EchaloasuerteApi.RaffleApi

All URIs are relative to *http://127.0.0.1:8000/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**raffleCreate**](RaffleApi.md#raffleCreate) | **POST** /raffle/ | 
[**raffleRead**](RaffleApi.md#raffleRead) | **GET** /raffle/{id}/ | 
[**raffleToss**](RaffleApi.md#raffleToss) | **POST** /raffle/{id}/toss/ | 


<a name="raffleCreate"></a>
# **raffleCreate**
> Raffle raffleCreate(data)





### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';
let defaultClient = EchaloasuerteApi.ApiClient.instance;

// Configure HTTP basic authorization: basic
let basic = defaultClient.authentications['basic'];
basic.username = 'YOUR USERNAME';
basic.password = 'YOUR PASSWORD';

let apiInstance = new EchaloasuerteApi.RaffleApi();

let data = new EchaloasuerteApi.Raffle(); // Raffle | 

apiInstance.raffleCreate(data).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **data** | [**Raffle**](Raffle.md)|  | 

### Return type

[**Raffle**](Raffle.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="raffleRead"></a>
# **raffleRead**
> Raffle raffleRead(id)





### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';
let defaultClient = EchaloasuerteApi.ApiClient.instance;

// Configure HTTP basic authorization: basic
let basic = defaultClient.authentications['basic'];
basic.username = 'YOUR USERNAME';
basic.password = 'YOUR PASSWORD';

let apiInstance = new EchaloasuerteApi.RaffleApi();

let id = "id_example"; // String | A unique value identifying this raffle.

apiInstance.raffleRead(id).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| A unique value identifying this raffle. | 

### Return type

[**Raffle**](Raffle.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="raffleToss"></a>
# **raffleToss**
> DrawTossPayload raffleToss(id, data)





### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';
let defaultClient = EchaloasuerteApi.ApiClient.instance;

// Configure HTTP basic authorization: basic
let basic = defaultClient.authentications['basic'];
basic.username = 'YOUR USERNAME';
basic.password = 'YOUR PASSWORD';

let apiInstance = new EchaloasuerteApi.RaffleApi();

let id = "id_example"; // String | A unique value identifying this raffle.

let data = new EchaloasuerteApi.DrawTossPayload(); // DrawTossPayload | 

apiInstance.raffleToss(id, data).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| A unique value identifying this raffle. | 
 **data** | [**DrawTossPayload**](DrawTossPayload.md)|  | 

### Return type

[**DrawTossPayload**](DrawTossPayload.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

