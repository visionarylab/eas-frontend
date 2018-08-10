# EchaloasuerteApi.RandomNumberApi

All URIs are relative to *http://127.0.0.1:8000/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**randomNumberCreate**](RandomNumberApi.md#randomNumberCreate) | **POST** /random_number/ | 
[**randomNumberRead**](RandomNumberApi.md#randomNumberRead) | **GET** /random_number/{id}/ | 
[**randomNumberToss**](RandomNumberApi.md#randomNumberToss) | **POST** /random_number/{id}/toss/ | 


<a name="randomNumberCreate"></a>
# **randomNumberCreate**
> RandomNumber randomNumberCreate(randomNumber)



### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';

let apiInstance = new EchaloasuerteApi.RandomNumberApi();
let randomNumber = new EchaloasuerteApi.RandomNumber(); // RandomNumber | 
apiInstance.randomNumberCreate(randomNumber).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **randomNumber** | [**RandomNumber**](RandomNumber.md)|  | 

### Return type

[**RandomNumber**](RandomNumber.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="randomNumberRead"></a>
# **randomNumberRead**
> RandomNumber randomNumberRead(id)



### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';

let apiInstance = new EchaloasuerteApi.RandomNumberApi();
let id = "id_example"; // String | 
apiInstance.randomNumberRead(id).then((data) => {
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

[**RandomNumber**](RandomNumber.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="randomNumberToss"></a>
# **randomNumberToss**
> RandomNumberResult randomNumberToss(id, drawTossPayload)



### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';

let apiInstance = new EchaloasuerteApi.RandomNumberApi();
let id = "id_example"; // String | 
let drawTossPayload = new EchaloasuerteApi.DrawTossPayload(); // DrawTossPayload | 
apiInstance.randomNumberToss(id, drawTossPayload).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **drawTossPayload** | [**DrawTossPayload**](DrawTossPayload.md)|  | 

### Return type

[**RandomNumberResult**](RandomNumberResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

