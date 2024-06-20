import React from 'react';
interface HydroData {
  id: number;
  location: string;
  date: string;
  water_temperature: number;
  pH: number;
  dissolved_oxygen: number;
  conductivity: number;
  turbidity: number;
  permanganate_index: number;
  ammonia_nitrogen: number;
  total_phosphorus: number;
  total_nitrogen: number;
  site_condition?: string; // 可选属性
}

interface Props {
  data: HydroData;
}
const MapComponent: React.FC<Props> = ({ data }) => {
    let latitude = 39.0856735; // 默认纬度
    let longitude = 117.1951073; // 默认经度
    let pos = "tianjin"; // 默认位置
    if (data.location === "北京市") {
    latitude = 39.9042;
    longitude = 116.4074;
    pos="beijing";
  }else if (data.location === "上海市") {
    latitude = 31.2304;
    longitude = 121.4737;
    pos="shanghai";}
    else if (data.location === "天津市") {
    latitude = 39.3434;
    longitude = 117.3616;
    pos="tianjin";}
    else if (data.location === "重庆市") {
    latitude = 29.4316;
    longitude = 106.9123;
    pos="chongqing";}
    else if (data.location === "香港特别行政区") {
    latitude = 22.3193;
    longitude = 114.1694;
    pos="xianggang";}
    else if (data.location === "澳门特别行政区") {
    latitude = 22.1987;
    longitude = 113.5439;
    pos="aomen";}
    else if (data.location === "台湾省") {
    latitude = 25.032969;
    longitude = 121.565418;
    pos="taiwan";}
    else if (data.location === "河北省") {
    latitude = 38.042307;
    longitude = 114.51486;
    pos="hebei";}
    else if (data.location === "山西省") {
    latitude = 37.873532;
    longitude = 112.562398;
    pos="shanxi";}
    else if (data.location === "内蒙古自治区") {
    latitude = 40.81739;
    longitude = 111.765618;
    pos="neimenggu";}
    else if (data.location === "辽宁省") {
    latitude = 41.805698;
    longitude = 123.431474;
    pos="liaoning";}
    else if (data.location === "吉林省") {
    latitude = 43.871988;
    longitude = 125.323544;
    pos="jilin";}
    else if (data.location === "黑龙江省") {
    latitude = 45.803775;
    longitude = 126.534967;
    pos="heilongjiang";}
    else if (data.location === "江苏省") {
    latitude = 32.060255;
    longitude = 118.796877;
    pos="nanjing";}
    else if (data.location === "浙江省") {
    latitude = 30.26555;
    longitude = 120.1536;
    pos="hangzhou";}
    else if (data.location === "安徽省") {
    latitude = 31.861184;
    longitude = 117.283042;
    pos="hefei";}
    else if (data.location === "福建省") {
    latitude = 26.10078;
    longitude = 119.295144;
    pos="fuzhou";}
    else if (data.location === "江西省") {
    latitude = 28.674289;
    longitude = 115.910148;
    pos="nanchang";}
    else if (data.location === "山东省") {
    latitude = 36.675807;
    longitude = 117.000923;
    pos="jinan";}
    else if (data.location === "河南省") {
    latitude = 34.757975;
    longitude = 113.665412;
    pos="henan";}
    else if (data.location === "湖北省") {
    latitude = 30.595924;
    longitude = 114.299393;
    pos="wuhan";}
    else if (data.location === "湖南省") {
    latitude = 28.112444;
    longitude = 112.98381;
    pos="changsha";}
    else if (data.location === "广东省") {
    latitude = 23.135769;
    longitude = 113.198269;
    pos="guangdong";}
    else if (data.location === "广西壮族自治区") {
    latitude = 22.817002;
    longitude = 108.366543;
    pos="guangxi";}
    else if (data.location === "海南省") {
    latitude = 20.044002;
    longitude = 110.198293;
    pos="haikou";}
    else if (data.location === "四川省") {
    latitude = 30.651652;
    longitude = 104.075931;
    pos="chengdu";}
    else if (data.location === "贵州省") {
    latitude = 26.578343;
    longitude = 106.707626;
    pos="guizhou";}
    else if (data.location === "云南省") {
    latitude = 25.045806;
    longitude = 102.710002;
    pos="kunming";}
    else if (data.location === "西藏自治区") {
    latitude = 29.646923;
    longitude = 91.117525;
    pos="lasa";}
    else if (data.location === "陕西省") {
    latitude = 34.263161;
    longitude = 108.948024;
    pos="xian";}
    else if (data.location === "甘肃省") {
    latitude = 36.061089;
    longitude = 103.834304;
    pos="gansu";}
    else if (data.location === "青海省") {
    latitude = 36.620901;
    longitude = 101.780199;
    pos="xining";}
    else if (data.location === "宁夏回族自治区") {
    latitude = 38.473624;
    longitude = 106.194616;
    pos="yinchuan";}
    else if (data.location === "新疆维吾尔自治区") {
    latitude = 43.793026;
    longitude = 87.627704;
    pos="xinjiang";}

    return (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <iframe
                width="415"
                height="50"
                scrolling="no"
                frameBorder="0"
                allowTransparency={true}
                src={`https://i.tianqi.com?c=code&id=12&py=${pos}&icon=1&num=3&site=12`}
                title="weather"
            ></iframe>
            <div style={{ width: '600px', height: '480px', border: '1px solid gray', margin: '30px auto' }}>
                <iframe
                    width="600"
                    height="480"
                    frameBorder="0"
                    scrolling="no"
                    src={`https://api.map.baidu.com/staticimage/v2?ak=2ZPcpz07K68s53xck8Dpo2Y0yEr5nKtR&center=${longitude},${latitude}&width=600&height=480&zoom=9`}
                    title="map"
                ></iframe>
            </div>
        </div>
    );
};
export default MapComponent;
