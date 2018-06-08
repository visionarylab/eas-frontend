# EchaloasuerteApi.DrawApi

All URIs are relative to *http://localhost:8080/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createRandomNumber**](DrawApi.md#createRandomNumber) | **POST** /random_number | Creates a new draw
[**getRandomNumber**](DrawApi.md#getRandomNumber) | **GET** /random_number/{id_} | Find draw by private or public id
[**putRandomNumber**](DrawApi.md#putRandomNumber) | **PUT** /random_number/{id_} | Generates a result for an existing Draw


<a name="createRandomNumber"></a>
# **createRandomNumber**
> RandomNumber createRandomNumber(body)

Creates a new draw

Creates a new draw of type random_numer

### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';

let apiInstance = new EchaloasuerteApi.DrawApi();

let body = new EchaloasuerteApi.RandomNumber(); // RandomNumber | Draw object to create

apiInstance.createRandomNumber(body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**RandomNumber**](RandomNumber.md)| Draw object to create | 

### Return type

[**RandomNumber**](RandomNumber.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getRandomNumber"></a>
# **getRandomNumber**
> RandomNumber getRandomNumber(id_)

Find draw by private or public id

Returns a single draw

### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';

let apiInstance = new EchaloasuerteApi.DrawApi();

let id_ = "id__example"; // String | ID of draw to return

apiInstance.getRandomNumber(id_).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id_** | **String**| ID of draw to return | 

### Return type

[**RandomNumber**](RandomNumber.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="putRandomNumber"></a>
# **putRandomNumber**
> RandomNumber putRandomNumber(id_)

Generates a result for an existing Draw



### Example
```javascript
import EchaloasuerteApi from 'echaloasuerte-api';

let apiInstance = new EchaloasuerteApi.DrawApi();

let id_ = "id__example"; // String | ID of draw to toss

apiInstance.putRandomNumber(id_).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id_** | **String**| ID of draw to toss | 

### Return type

[**RandomNumber**](RandomNumber.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

