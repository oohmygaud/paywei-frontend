import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ResponsiveBar } from '@nivo/bar'
import { showGraph } from '../store/actions/invoices';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.showGraph()
    }

    render() {
        return <React.Fragment>
            <Grid container justify='center' >
                <Grid item lg={8} xs={12}>
                    <div style={{ height: '80vh', width: '100%', marginLeft: '2em'}}>
                        <ResponsiveBar
                            data={this.props.graph ? this.props.graph.payments_by_day : []}
                            keys={['ETH']}
                            indexBy="date"
                            margin={{ top: 30, right: 20, bottom: 30, left: 60 }}
                            colors={{ scheme: 'nivo' }}
                            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                format: (d) => (new Date(d)).toLocaleDateString('en-US', {month: 'numeric', day: 'numeric'}),
                                tickPadding: 5,
                                tickRotation: 45
                            }}
                            axisLeft={{
                                tickValues: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'ETH',
                                legendPosition: 'middle',
                                legendOffset: -40
                            }}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                        />
                    </div>
                </Grid>
                <Grid item lg={4} xs={12} style={{ minHeight: 300 }}>

                </Grid>
            </Grid>
            <Grid container>
                <Grid item lg={12}>

                </Grid>
            </Grid>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
    graph: state.invoices.graph,
});

const mapDispatchToProps = (dispatch) => ({
    showGraph: (data) => dispatch(showGraph(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);