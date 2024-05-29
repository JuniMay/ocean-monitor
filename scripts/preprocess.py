import json
import re
import os
from datetime import datetime
from typing import List

DATA_PATH = "../data/raw/水质数据（补充）"

THEADS = [
    "省份",
    "流域",
    "断面名称",
    "监测时间",
    "水质类别",
    "水温",
    "pH",
    "溶解氧",
    "电导率",
    "浊度",
    "高锰酸盐指数",
    "氨氮",
    "总磷",
    "总氮",
    "叶绿素",
    "藻密度",
    "站点情况",
]


def combine_date_time(year_month: str, month_day_hour: str) -> str:
    year_month_dt = datetime.strptime(year_month, "%Y-%m")
    year = year_month_dt.year
    month_day_hour_dt = datetime.strptime(month_day_hour, "%m-%d %H:%M")
    combined_dt = datetime(
        year=year,
        month=month_day_hour_dt.month,
        day=month_day_hour_dt.day,
        hour=month_day_hour_dt.hour,
        minute=month_day_hour_dt.minute,
    )

    return combined_dt.strftime("%Y-%m-%d %H:%M:%S")


def extract_content(html_string: str) -> str:
    if not html_string.startswith("<"):
        return html_string

    match = re.search(r">([^<]+)<", html_string)
    if match:
        return match.group(1)
    else:
        return None


def process_json(year_month: str, json_file: str):
    json_data = json.load(open(json_file))

    result: List[List[str]] = []

    for row in json_data["tbody"]:
        # print(row)
        province = row[0]
        basin = row[1]
        location = extract_content(row[2])
        if row[3]:
            time = combine_date_time(year_month, row[3])
        else:
            continue
        category = row[4]
        water_temperature = extract_content(row[5])
        ph = extract_content(row[6])
        dissolved_oxygen = extract_content(row[7])
        conductivity = extract_content(row[8])
        turbidity = extract_content(row[9])
        permanganate_index = extract_content(row[10])
        ammonia_nitrogen = extract_content(row[11])
        total_phosphorus = extract_content(row[12])
        total_nitrogen = extract_content(row[13])
        chlorophyll = extract_content(row[14])
        algae_density = extract_content(row[15])
        site_status = extract_content(row[16])

        new_row =  [
                province,
                basin,
                location,
                time,
                category,
                water_temperature,
                ph,
                dissolved_oxygen,
                conductivity,
                turbidity,
                permanganate_index,
                ammonia_nitrogen,
                total_phosphorus,
                total_nitrogen,
                chlorophyll,
                algae_density,
                site_status,
            ]
        
        for i, item in enumerate(new_row):
            if str(item) in ["*", "--", ""]:
                new_row[i] = 'null'
        
        result.append(new_row)

    return result

def main():
    # DATA_PATH/year-month/*.json
    csv_data = []
    
    for year_month in os.listdir(DATA_PATH):
        year_month_path = os.path.join(DATA_PATH, year_month)
        if not os.path.isdir(year_month_path):
            continue
        for json_file in os.listdir(year_month_path):
            if not json_file.endswith(".json"):
                continue
            
            json_file_path = os.path.join(year_month_path, json_file)
            csv_data.extend(process_json(year_month, json_file_path))
            
    # Write to CSV
    with open("../data/processed/hydrodata.csv", "w") as f:
        f.write(",".join(THEADS) + "\n")
        for row in csv_data:
            print(row)
            f.write(",".join(row) + "\n")

if __name__ == "__main__":
    main()