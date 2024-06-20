import React from 'react';

const MapComponent: React.FC = () => {
    const latitude = 39.0856735; // 默认纬度
    const longitude = 117.1951073; // 默认经度

    return (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <iframe
                width="415"
                height="50"
                scrolling="no"
                frameBorder="0"
                allowTransparency={true}
                src="https://i.tianqi.com?c=code&id=12&icon=1&num=3&site=12"
                title="weather"
            ></iframe>
            <div style={{ width: '600px', height: '480px', border: '1px solid gray', margin: '30px auto' }}>
                <iframe
                    width="600"
                    height="480"
                    frameBorder="0"
                    scrolling="no"
                    src={`https://api.map.baidu.com/staticimage/v2?ak=2ZPcpz07K68s53xck8Dpo2Y0yEr5nKtR&center=${longitude},${latitude}&width=600&height=480&zoom=12`}
                    title="map"
                ></iframe>
            </div>
        </div>
    );
};

export default MapComponent;
