// 전체보기 기능
const markerMap = new Vue({
  el: "#test",
  data: {
    apiList: [],
  },
  methods: {
    search: function () {
      const self = this;
      const APIURL = "http://api.data.go.kr/openapi/tn_pubr_public_toilet_api";
      const APIKEY =
        "sQi%2FzMQ3vue0d1rD%2FvPtCe2OgezQc37UYHrqZnNakgkK%2B1ugwK%2BWAkj74lu4Kpz1WbP3s%2FlJYG%2B9Utm%2BCZVSJg%3D%3D";

      axios
        .get(`${APIURL}?serviceKey=${APIKEY}&pageNo=10&numOfRows=500&type=json`)
        .then((res) => {
          const preData = res.data.response.body.items;
          const upData = preData.filter(
            (li) => li.rdnmadr !== "null" && li.lnmadr !== "null"
          );
          self.apiList = upData;
        });
    },
  },
});

// *******************검색기능******************************
const searchShow = document.querySelector(".search-show");
const mapSearch = document.querySelector(".map-search");
const searchBox = document.querySelector(".search-box");
searchShow.addEventListener("click", function (event) {
  searchBox.classList.toggle("hidden");
});
// **********************사용자 위치정보 받아오기***************************************
const myLocate = document.querySelector(".map-locate");
myLocate.addEventListener("click", function () {
  if (navigator.geolocation) {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude; // 위도
      let lon = position.coords.longitude; // 경도
      var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        message = '<div style="padding:5px;">현재 위치</div>'; // 인포윈도우에 표시될 내용입니다
      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });
      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);
      map.setCenter(locPosition);
      console.log(lat, lon);
    });
  } else {
    // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

    alert("위치를 표시할");
  }
});
// ******************지도관련*****************************************************************************
const container = document.getElementById("map");
const options = {
  center: new kakao.maps.LatLng(37.606985002299545, 127.04176711490993),
  level: 3,
};

// 지도 생성
const map = new kakao.maps.Map(container, options);
// 주소를 좌표로 반환하는 객체 생성
const geocoder = new kakao.maps.services.Geocoder();
function myMaker(upData, i) {
  geocoder.addressSearch(
    // 주소
    upData.rdnmadr,
    function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
          clickable: true,
        });
        marker.setMap(map);
        // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
        var iwContent = `<div style="padding:5px;">${upData.toiletNm}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", function () {
          // 마커 위에 인포윈도우를 표시합니다
          infowindow.open(map, marker);
        });
      }
    }
  );
}

//

// ******************화장실 정보 관련*****************************************************************************
const APIURL = "http://api.data.go.kr/openapi/tn_pubr_public_toilet_api";
const APIKEY =
  "sQi%2FzMQ3vue0d1rD%2FvPtCe2OgezQc37UYHrqZnNakgkK%2B1ugwK%2BWAkj74lu4Kpz1WbP3s%2FlJYG%2B9Utm%2BCZVSJg%3D%3D";
axios
  .get(`${APIURL}?serviceKey=${APIKEY}&pageNo=10&numOfRows=500&type=json`)
  .then((res) => {
    const preData = res.data.response.body.items;
    const upData = preData.filter(
      (li) => li.rdnmadr !== "null" && li.rdnmadr !== ""
    );
    for (let i = 0; i < upData.length; i++) {
      myMaker(upData[i], i);
    }
    console.log(upData);
  });
