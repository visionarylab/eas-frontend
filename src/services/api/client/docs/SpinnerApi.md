# EchaloasuerteApi.SpinnerApi

All URIs are relative to *http://127.0.0.1:8000/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**spinnerCreate**](SpinnerApi.md#spinnerCreate) | **POST** /spinner/ | 
[**spinnerRead**](SpinnerApi.md#spinnerRead) | **GET** /spinner/{id}/ | 
[**spinnerToss**](SpinnerApi.md#spinnerToss) | **POST** /spinner/{id}/toss/ | 


<a name="spinnerCreate"></a>
# **spinnerCreate**
> Spinner spinnerCreate(spinner)



### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';

let apiInstance = new EchaloasuerteApi.SpinnerApi();
let spinner = new EchaloasuerteApi.Spinner(); // Spinner | 
apiInstance.spinnerCreate(spinner).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **spinner** | [**Spinner**](Spinner.md)|  | 

### Return type

[**Spinner**](Spinner.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="spinnerRead"></a>
# **spinnerRead**
> Spinner spinnerRead(id)



### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';

let apiInstance = new EchaloasuerteApi.SpinnerApi();
let id = "id_example"; // String | 
apiInstance.spinnerRead(id).then((data) => {
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

[**Spinner**](Spinner.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="spinnerToss"></a>
# **spinnerToss**
> SpinnerResult spinnerToss(id, drawTossPayload)



### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';

let apiInstance = new EchaloasuerteApi.SpinnerApi();
let id = "id_example"; // String | 
let drawTossPayload = new EchaloasuerteApi.DrawTossPayload(); // DrawTossPayload | 
apiInstance.spinnerToss(id, drawTossPayload).then((data) => {
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

[**SpinnerResult**](SpinnerResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

