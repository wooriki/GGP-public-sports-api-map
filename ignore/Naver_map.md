# Naver map

## 좌표 찍기

```js
<Marker defaultPosition={{ lat: 37.3595704, lng: 127.105399 }} />
```

혹은

```js
<Marker defaultPosition={{ lat: 37.5666103, lng: 126.9783882 }} />
```

를 통해서 원하는 좌표에 핑을 찍을 수 있다.

AI NAVER API에서 "Reverse Geocoding"를 통해 좌표값을 주소값으로 변경 가능하다.
https://api.ncloud-docs.com/docs/ai-naver-mapsreversegeocoding

### API URL

API URL = https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc

### 요청헤더

X-NCP-APIGW-API-KEY-ID:{Client ID}
X-NCP-APIGW-API-KEY:{Client Secret}

src/axios/naverMapReverseGeoAPI.js에 있는 reverseGeoAPI를 통해서 axios 요청을 보낸다.
