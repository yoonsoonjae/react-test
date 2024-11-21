import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AirQuality.css';

const AirQuality = () => {
    const [airQuality, setAirQuality] = useState(null);
    const [locationName, setLocationName] = useState(""); // 지역 이름 상태 추가
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 위치 정보 가져오기
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

        function successCallback(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("위치 정보:", { latitude, longitude }); // 위치 정보 콘솔에 출력
            fetchAirQualityData(latitude, longitude);
            fetchLocationName(latitude, longitude); // 지역 이름 가져오기
        }

        function errorCallback() {
            setError("위치 정보를 가져오는 데 실패했습니다.");
            setLoading(false);
        }
    }, []);

    const fetchAirQualityData = async (latitude, longitude) => {
        const apiKey = '3598c54da4d7cf34e04ec92640a797a9'; // 대기질 API 키
        const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        try {
            const response = await axios.get(apiUrl);
            console.log("대기질 API 응답:", response.data); // 응답 로그 출력
            if (response.data.list && response.data.list.length > 0) {
                const airData = response.data.list[0];
                setAirQuality(airData.components); // components에서 미세먼지 정보 가져오기
            } else {
                setError("미세먼지 데이터를 가져오는 데 실패했습니다.");
            }
        } catch (err) {
            console.error("대기질 API 요청 오류:", err);
            setError("미세먼지 데이터를 가져오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const fetchLocationName = async (latitude, longitude) => {
        const apiKey = '3598c54da4d7cf34e04ec92640a797a9'; // 지오코딩 API 키
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=kr`; // 한국어 요청

        try {
            const response = await axios.get(apiUrl);
            if (response.data) {
                let name = response.data.name; // 지역 이름 설정
                const locationMapping = {
                    "Seoul": "서울특별시",
                    "Busan": "부산광역시",
                    "Incheon": "인천광역시",
                    "Daegu": "대구광역시",
                    "Daejeon": "대전광역시",
                    "Gwangju": "광주광역시",
                    "Ulsan": "울산광역시",
                    "Sejong": "세종특별자치시",
                    "Gyeonggi-do": "경기도",
                    "Gangwon-do": "강원도",
                    "Chungcheongbuk-do": "충청북도",
                    "Chungcheongnam-do": "충청남도",
                    "Jeollabuk-do": "전라북도",
                    "Jeollanam-do": "전라남도",
                    "Gyeongsangbuk-do": "경상북도",
                    "Gyeongsangnam-do": "경상남도",
                    "Jeju-do": "제주도",
                    "Miryang" : "밀양"
                };
                setLocationName(locationMapping[name] || name); // 매핑된 이름 또는 기본 이름 설정
            }
        } catch (err) {
            console.error("지역 이름 요청 오류:", err);
        }
    };

    if (loading) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="AirQuality-info">
            <h1 className="Dust">미세먼지 정보</h1>
            {locationName && <h2>현재 지역: {locationName}</h2>}
            {airQuality ? (
                <div className="flex">
                    <div className="air-quality-item">
                        <p>미세먼지 (PM10): {airQuality.pm10} μg/m³</p>
                    </div>
                    <div className="air-quality-item">
                        <p>초미세먼지 (PM2.5): {airQuality.pm2_5} μg/m³</p>
                    </div>
                </div>
            ) : (
                <p>미세먼지 정보가 없습니다.</p>
            )}
            {airQuality && (
                <div className="status">
                    <p>상태: {airQuality.pm10 > 50 ? "나쁨" : "좋음"}</p>
                </div>
            )}
        </div>
    );
};

export default AirQuality;
