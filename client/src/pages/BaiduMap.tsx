// BaiduMap.tsx
import React, { useEffect } from "react";

interface BaiduMapProps {
  center: {
    lat: number;
    lng: number;
  };
  markers: Array<{
    lat: number;
    lng: number;
    title: string;
    info: string;
  }>;
}

const BaiduMap: React.FC<BaiduMapProps> = ({ center, markers }) => {
  useEffect(() => {
    const loadBaiduMapScript = () => {
      const script = document.createElement("script");
      script.src = `http://api.map.baidu.com/api?v=3.0&ak=YOUR_BAIDU_MAP_API_KEY`; // 替换为您的百度地图API密钥
      script.onload = () => {
        initMap();
      };
      document.body.appendChild(script);
    };

    const initMap = () => {
      const BMap = (window as any).BMap;
      const map = new BMap.Map("baiduMapContainer");
      const point = new BMap.Point(center.lng, center.lat);
      map.centerAndZoom(point, 12);
      map.enableScrollWheelZoom(true);

      markers.forEach(marker => {
        const markerPoint = new BMap.Point(marker.lng, marker.lat);
        const mapMarker = new BMap.Marker(markerPoint);
        map.addOverlay(mapMarker);
        const infoWindow = new BMap.InfoWindow(marker.info, {
          title: marker.title,
        });
        mapMarker.addEventListener("click", () => {
          map.openInfoWindow(infoWindow, markerPoint);
        });
      });
    };

    if (!(window as any).BMap) {
      loadBaiduMapScript();
    } else {
      initMap();
    }
  }, [center, markers]);

  return <div id="baiduMapContainer" style={{ width: "100%", height: "400px" }}></div>;
};

export default BaiduMap;
