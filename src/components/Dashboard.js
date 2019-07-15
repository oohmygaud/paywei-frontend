import React from 'react';
import Grid from '@material-ui/core/Grid';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory';


const data = [
    { weekday: 'Monday', earnings: 13000 },
    { weekday: 'Tuesday', earnings: 16500 },
    { weekday: 'Wednesday', earnings: 14250 },
    { weekday: 'Thursday', earnings: 19000 },
    { weekday: 'Friday', earnings: 14250 },
    { weekday: 'Saturday', earnings: 14250 },
    { weekday: 'Sunday', earnings: 14250 }
];

export default class Dashboard extends React.Component {
    render() {




        return <React.Fragment>
            <Grid container justify='center' >
                <Grid item lg={8} xs={12}>
                    <div style={{ height: '25%', width: '50%', marginLeft: '2em'}}>
                        <VictoryChart
                            theme={VictoryTheme.material}
                            domainPadding={{ x: 20 }}
                        >
                            <VictoryAxis
                                // tickValues specifies both the number of ticks and where
                                // they are placed on the axis
                                tickValues={[1, 2, 3, 4, 5, 6, 7]}
                                tickFormat={["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]}
                            />
                            <VictoryAxis
                                dependentAxis
                                // tickFormat specifies how ticks should be displayed
                                tickFormat={(x) => (`$${x / 1000}k`)}
                            />
                            <VictoryBar
                                barWidth={20}
                                style={{
                                    data: { fill: "#c43a31" }
                                }}
                                data={data}
                                // data accessor for x values
                                x="weekday"
                                // data accessor for y values
                                y="earnings"
                            />
                        </VictoryChart>
                    </div>
                </Grid>
                <Grid item lg={4} xs={12} style={{ minHeight: 300 }}>
                    <div style={{ height: '95%', width: '100%' }}>

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