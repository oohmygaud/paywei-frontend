import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'

export default class Dashboard extends React.Component {
    render() {
        const MyResponsiveBar = ({ data /* see data tab */ }) => (
            <ResponsiveBar
                data={[
                    {
                      "country": "AD",
                      "hot dog": 89,
                      "hot dogColor": "hsl(255, 70%, 50%)",
                      "burger": 120,
                      "burgerColor": "hsl(288, 70%, 50%)",
                      "sandwich": 9,
                      "sandwichColor": "hsl(56, 70%, 50%)",
                      "kebab": 21,
                      "kebabColor": "hsl(88, 70%, 50%)",
                      "fries": 66,
                      "friesColor": "hsl(283, 70%, 50%)",
                      "donut": 173,
                      "donutColor": "hsl(85, 70%, 50%)"
                    },
                    {
                      "country": "AE",
                      "hot dog": 172,
                      "hot dogColor": "hsl(155, 70%, 50%)",
                      "burger": 10,
                      "burgerColor": "hsl(49, 70%, 50%)",
                      "sandwich": 48,
                      "sandwichColor": "hsl(24, 70%, 50%)",
                      "kebab": 170,
                      "kebabColor": "hsl(353, 70%, 50%)",
                      "fries": 92,
                      "friesColor": "hsl(171, 70%, 50%)",
                      "donut": 76,
                      "donutColor": "hsl(321, 70%, 50%)"
                    },
                    {
                      "country": "AF",
                      "hot dog": 59,
                      "hot dogColor": "hsl(235, 70%, 50%)",
                      "burger": 166,
                      "burgerColor": "hsl(48, 70%, 50%)",
                      "sandwich": 41,
                      "sandwichColor": "hsl(247, 70%, 50%)",
                      "kebab": 113,
                      "kebabColor": "hsl(263, 70%, 50%)",
                      "fries": 96,
                      "friesColor": "hsl(78, 70%, 50%)",
                      "donut": 6,
                      "donutColor": "hsl(269, 70%, 50%)"
                    },
                    {
                      "country": "AG",
                      "hot dog": 137,
                      "hot dogColor": "hsl(114, 70%, 50%)",
                      "burger": 35,
                      "burgerColor": "hsl(224, 70%, 50%)",
                      "sandwich": 33,
                      "sandwichColor": "hsl(96, 70%, 50%)",
                      "kebab": 48,
                      "kebabColor": "hsl(285, 70%, 50%)",
                      "fries": 27,
                      "friesColor": "hsl(323, 70%, 50%)",
                      "donut": 127,
                      "donutColor": "hsl(254, 70%, 50%)"
                    },
                    {
                      "country": "AI",
                      "hot dog": 134,
                      "hot dogColor": "hsl(78, 70%, 50%)",
                      "burger": 43,
                      "burgerColor": "hsl(249, 70%, 50%)",
                      "sandwich": 44,
                      "sandwichColor": "hsl(130, 70%, 50%)",
                      "kebab": 105,
                      "kebabColor": "hsl(288, 70%, 50%)",
                      "fries": 102,
                      "friesColor": "hsl(238, 70%, 50%)",
                      "donut": 130,
                      "donutColor": "hsl(91, 70%, 50%)"
                    },
                    {
                      "country": "AL",
                      "hot dog": 179,
                      "hot dogColor": "hsl(317, 70%, 50%)",
                      "burger": 76,
                      "burgerColor": "hsl(146, 70%, 50%)",
                      "sandwich": 198,
                      "sandwichColor": "hsl(63, 70%, 50%)",
                      "kebab": 97,
                      "kebabColor": "hsl(249, 70%, 50%)",
                      "fries": 132,
                      "friesColor": "hsl(35, 70%, 50%)",
                      "donut": 173,
                      "donutColor": "hsl(93, 70%, 50%)"
                    },
                    {
                      "country": "AM",
                      "hot dog": 143,
                      "hot dogColor": "hsl(298, 70%, 50%)",
                      "burger": 181,
                      "burgerColor": "hsl(248, 70%, 50%)",
                      "sandwich": 6,
                      "sandwichColor": "hsl(34, 70%, 50%)",
                      "kebab": 27,
                      "kebabColor": "hsl(288, 70%, 50%)",
                      "fries": 155,
                      "friesColor": "hsl(33, 70%, 50%)",
                      "donut": 75,
                      "donutColor": "hsl(323, 70%, 50%)"
                    }
                  ]}
                keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
                indexBy="country"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'nivo' }}
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
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'fries'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'sandwich'
                        },
                        id: 'lines'
                    }
                ]}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'food',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        )

        const MyResponsivePie = ({ data /* see data tab */ }) => (
            <ResponsivePie
                data={[
                    {
                        "id": "python",
                        "label": "python",
                        "value": 475,
                        "color": "hsl(123, 70%, 50%)"
                    },
                    {
                        "id": "sass",
                        "label": "sass",
                        "value": 359,
                        "color": "hsl(316, 70%, 50%)"
                    },
                    {
                        "id": "php",
                        "label": "php",
                        "value": 214,
                        "color": "hsl(238, 70%, 50%)"
                    },
                    {
                        "id": "elixir",
                        "label": "elixir",
                        "value": 69,
                        "color": "hsl(40, 70%, 50%)"
                    },
                    {
                        "id": "c",
                        "label": "c",
                        "value": 344,
                        "color": "hsl(69, 70%, 50%)"
                    }
                ]}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'ruby'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'c'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'go'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'python'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'scala'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'lisp'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'elixir'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'javascript'
                        },
                        id: 'lines'
                    }
                ]}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        translateY: 56,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        )


        return <React.Fragment>
            <Grid container justify='center' >
                <Grid item lg={8} xs={12} style={{ minHeight: 300 }}>
                    <div style={{ height: '95%', width: '100%' }}>
                        <MyResponsiveBar />
                    </div>
                </Grid>
                <Grid item lg={4} xs={12} style={{ minHeight: 300 }}>
                    <div style={{ height: '95%', width: '100%' }}>
                        <MyResponsivePie />
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item lg={12}>

                </Grid>
            </Grid>
        </React.Fragment>
    }
} 