import { ResponsiveChoropleth } from '@nivo/geo';
import React, { useEffect, useState } from 'react';
import { geoFeatures } from './GeoFeautres';
import dataProvider from './dataProvider';

const GeographyChart = () => {
    const [geographyData, setGeographyData] = useState([]);
    const [countryCounts, setCountryCounts] = useState({});

  const fetchGeographyChartData = async () => {
    try {
      const response = await dataProvider.getUserList('users', {});

      const counts = response.data.reduce((accumulator, user) => {
        const country = user.country;
        accumulator[country] = (accumulator[country] || 0) + 1;
        return accumulator;
      }, {});

      const data = Object.keys(counts).map((country) => ({
        id: country,
        value: counts[country],
      }));

      setGeographyData(data);
      setCountryCounts(counts);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  useEffect(() => {
    fetchGeographyChartData();
  }, []);

  console.log('Country Counts:', countryCounts);

  console.log("ddoox", geographyData);
    return (
    <ResponsiveChoropleth
            data={geographyData}
            features={geoFeatures.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors="nivo"
            domain={[0, 100]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={true}
            graticuleLineColor="#dddddd"
            borderWidth={0.5}
            borderColor="#152538"
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                },
                {
                    id: 'gradient',
                    type: 'linearGradient',
                    colors: [
                        {
                            offset: 0,
                            color: '#000'
                        },
                        {
                            offset: 100,
                            color: 'inherit'
                        }
                    ]
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'CAN'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'CHN'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'ATA'
                    },
                    id: 'gradient'
                }
            ]}
            legends={[
                {
                    anchor: 'left',
                    direction: 'column',
                    justify: true,
                    translateX: 20,
                    translateY: -100,
                    itemsSpacing: 0,
                    itemWidth: 94,
                    itemHeight: 18,
                    itemDirection: 'left-to-right',
                    itemTextColor: '#444444',
                    itemOpacity: 0.85,
                    symbolSize: 18,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000000',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
             />
    )
}

export default GeographyChart;