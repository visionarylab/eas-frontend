# EchaloasuerteApi.RaffleApi

All URIs are relative to *https://localhost/api*

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

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="raffleRead"></a>
# **raffleRead**
> Raffle raffleRead(id)



### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';

let apiInstance = new EchaloasuerteApi.RaffleApi();

let id = "id_example"; // String | 

apiInstance.raffleRead(id).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

[**Raffle**](Raffle.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="raffleToss"></a>
# **raffleToss**
> RaffleResult raffleToss(id, data)



### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';

let apiInstance = new EchaloasuerteApi.RaffleApi();

let id = "id_example"; // String | 

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
 **id** | **String**|  | 
 **data** | [**DrawTossPayload**](DrawTossPayload.md)|  | 

### Return type

[**RaffleResult**](RaffleResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

