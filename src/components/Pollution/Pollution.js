import React, { Component } from 'react';
import axios from 'axios';
import './Pollution.css';

class Pollution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollutionDataList: [],
            city: '',
        };
    }

    getData = async () => {
        const serviceKey = 'scbPesyEHWA4akZys78sDQjG6AEq%2FQGj6l3VkN70FwRpmyY2VJM4IVgAsf%2BI2oq%2BJFoG10Tcr4LiFVbc5Kq2ew%3D%3D';
        let sidoName = this.state.city;

        if (sidoName === '') {
            alert("도시를 입력하세요!");
            return;
        }

        try {
            const response = await axios.get(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${serviceKey}&returnType=json&numOfRows=1&pageNo=1&sidoName=${sidoName}&ver=1.0`);
            console.log(response);
            console.log(response.data.response.body.items);
            this.setState({
                pollutionDataList: response.data.response.body.items,
            });
        } catch (error) {
            console.error("데이터 가져오기 오류:", error);
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        const result = this.state.pollutionDataList.map((data) => (
            <PollutionDetail 
                key={data.stationName} // 고유 키 추가
                sidoName={data.sidoName}
                stationName={data.stationName}
                coGrade={data.coGrade} 
                coValue={data.coValue}
                no2Grade={data.no2Grade} 
                no2Value={data.no2Value}
                pm10Grade={data.pm10Grade} 
                pm10Value={data.pm10Value}
                pm25Grade={data.pm25Grade} 
                pm25Value={data.pm25Value}
                so2Grade={data.so2Grade} 
                so2Value={data.so2Value}
                o3Grade={data.o3Grade} 
                o3Value={data.o3Value}
            />
        ));

        return (
            <div id="app" className='pollution-info'>
                <input 
                    type="text" 
                    placeholder="도시를 입력하세요" 
                    onChange={this.handleChange} 
                    name="city" 
                />
                <button onClick={this.getData}>검색</button>
                {result}
            </div>
        );
    }
}

const PollutionDetail = ({ sidoName, stationName, coGrade, coValue, no2Grade, no2Value, pm10Grade, pm10Value, pm25Grade, pm25Value, so2Grade, so2Value, o3Grade, o3Value }) => {
    return (
        <div id="pollution-info" className='pollution-info'>
            <div id="station-name" className='station-name'>
                <span>측정시 : {sidoName}</span><br />
                <span>측정장소 : {stationName}</span>
            </div>
            <div id="co-area" className='co-area'>
                <span>일산화탄소 등급: {coGrade}</span><br />
                <span>일산화탄소 농도: {coValue}</span>
            </div>
            <div id="no2-area" className='no2-area'>
                <span>이산화질소 등급: {no2Grade}</span><br />
                <span>이산화질소 농도: {no2Value}</span>
            </div>
            <div id="pm10-area" className='pm10-area'>
                <span>미세먼지(10mm) 등급: {pm10Grade}</span><br />
                <span>미세먼지(10mm) 농도: {pm10Value}</span>
            </div>
            <div id="pm25-area" className='pm25-area'>
                <span>미세먼지(25mm) 등급: {pm25Grade}</span><br />
                <span>미세먼지(25mm) 농도: {pm25Value}</span>
            </div>
            <div id="so2-area" className='so2-area'>
                <span>이산화황 등급: {so2Grade}</span><br />
                <span>이산화황 농도: {so2Value}</span>
            </div>
            <div id="o3-area" className='o3-area'>
                <span>오존 등급: {o3Grade}</span><br />
                <span>오존 농도: {o3Value}</span>
            </div>
        </div>
    );
}

export default Pollution;

