import React, { Component } from 'react';
import "./Pollution.css";

class Pollution extends Component{
    render(){
        return(
            <div id="pollution-info" className='pollution-info'>
                <div id="station-name" className='station-name'>
                    <span>측정시 : {this.props.sidoName}</span><br/>
                    <span>측정장소 : {this.props.stationName}</span>
                </div>
                <div id="co-area" className='co-area'>
                    <span>일산화탄소 등급:{this.props.coGrade}</span><br/>
                    <span>일산화탄소 농도:{this.props.coValue}</span>
                </div>
                <div id="no2-area" className='no2-area'>
                    <span>이산화질소 등급:{this.props.no2Grade}</span><br/>
                    <span>이산화질소 농도:{this.props.no2Value}</span>
                </div>
                <div id="pm10-area" className='pm10-area'>
                    <span>미세먼지(10mm) 등급:{this.props.pm10Grade}</span><br/>
                    <span>미세먼지(10mm) 농도:{this.props.pm10Value}</span>
                </div>
                <div id="pm25-area" className='pm25-area'>
                    <span>미세먼지(25mm) 등급:{this.props.pm25Grade}</span><br/>
                    <span>미세먼지(25mm) 농도:{this.props.pm25Value}</span>
                </div>
                <div id="so2-area" className='so2-area'>
                    <span>이산화황 등급:{this.props.so2Grade}</span><br/>
                    <span>이산화황 농도:{this.props.so2Value}</span>
                </div>
                <div id="o3-area" className='o3-area'>
                    <span>오존 등급:{this.props.o3Grade}</span><br/>
                    <span>오존 농도:{this.props.o3Value}</span>
                </div>
            </div>
        );
    }
}

export default Pollution;
