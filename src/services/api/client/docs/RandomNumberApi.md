# EchaloasuerteApi.RandomNumberApi

All URIs are relative to *http://127.0.0.1:8000/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**randomNumberCreate**](RandomNumberApi.md#randomNumberCreate) | **POST** /random_number/ | 
[**randomNumberRead**](RandomNumberApi.md#randomNumberRead) | **GET** /random_number/{id}/ | 
[**randomNumberToss**](RandomNumberApi.md#randomNumberToss) | **POST** /random_number/{id}/toss/ | 


<a name="randomNumberCreate"></a>
# **randomNumberCreate**
> RandomNumber randomNumberCreate(data)





### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';
let defaultClient = EchaloasuerteApi.ApiClient.instance;

// Configure HTTP basic authorization: basic
let basic = defaultClient.authentications['basic'];
basic.username = 'YOUR USERNAME';
basic.password = 'YOUR PASSWORD';

let apiInstance = new EchaloasuerteApi.RandomNumberApi();

let data = new EchaloasuerteApi.RandomNumber(); // RandomNumber | 

apiInstance.randomNumberCreate(data).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **data** | [**RandomNumber**](RandomNumber.md)|  | 

### Return type

[**RandomNumber**](RandomNumber.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="randomNumberRead"></a>
# **randomNumberRead**
> RandomNumber randomNumberRead(id)





### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';
let defaultClient = EchaloasuerteApi.ApiClient.instance;

// Configure HTTP basic authorization: basic
let basic = defaultClient.authentications['basic'];
basic.username = 'YOUR USERNAME';
basic.password = 'YOUR PASSWORD';

let apiInstance = new EchaloasuerteApi.RandomNumberApi();

let id = "id_example"; // String | A unique value identifying this random number.

apiInstance.randomNumberRead(id).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| A unique value identifying this random number. | 

### Return type

[**RandomNumber**](RandomNumber.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="randomNumberToss"></a>
# **randomNumberToss**
> DrawTossPayload randomNumberToss(id, data)





### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';
let defaultClient = EchaloasuerteApi.ApiClient.instance;

// Configure HTTP basic authorization: basic
let basic = defaultClient.authentications['basic'];
basic.username = 'YOUR USERNAME';
basic.password = 'YOUR PASSWORD';

let apiInstance = new EchaloasuerteApi.RandomNumberApi();

let id = "id_example"; // String | A unique value identifying this random number.

let data = new EchaloasuerteApi.DrawTossPayload(); // DrawTossPayload | 

apiInstance.randomNumberToss(id, data).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| A unique value identifying this random number. | 
 **data** | [**DrawTossPayload**](DrawTossPayload.md)|  | 

### Return type

[**DrawTossPayload**](DrawTossPayload.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

