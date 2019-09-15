import * as React from 'react';
import * as _ from 'lodash';
import Bpm from "./Bpm";

interface Props {
}

interface Beat {
    count: number
    ts: Date
}

interface BeatCountBpms {
    one?: number
    two?: number
    four?: number
    eight?: number
    sixteen?: number
}

interface State {
    beatQueue: Beat[]
    beatCountBpms: BeatCountBpms
}

const countBpm = (beatQueue: Beat[], beats: number): number | undefined => {
    if (beatQueue.length > beats) {
        const endTs = beatQueue[0].ts;
        const startTs = beatQueue[beats].ts;
        return 1000 * 60 * (beats / (endTs.getTime() - startTs.getTime()));
    } else {
        return undefined;
    }
};

class Tahti extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            beatQueue: [],
            beatCountBpms: {}
        };
    }

    private handleNaputa = () => {
        this.setState((prev) => {
            const count = _.isEmpty(prev.beatQueue) ? 1 : (_.last(prev.beatQueue) as Beat).count + 1;
            let beatQueue = _.concat([{count: count, ts: new Date()}], prev.beatQueue);
            return {
                beatQueue: beatQueue,
                beatCountBpms: {
                    one: countBpm(beatQueue, 1),
                    two: countBpm(beatQueue, 2),
                    four: countBpm(beatQueue, 4),
                    eight: countBpm(beatQueue, 8),
                    sixteen: countBpm(beatQueue, 16)
                }
            };
        });
    };

    render() {
        return (
            <div>
                <h1>Tahti</h1>
                <ul>
                    <li>{this.state.beatQueue.length}</li>
                    <Bpm count={1} bpm={this.state.beatCountBpms.one}/>
                    <Bpm count={2} bpm={this.state.beatCountBpms.two}/>
                    <Bpm count={4} bpm={this.state.beatCountBpms.four}/>
                    <Bpm count={8} bpm={this.state.beatCountBpms.eight}/>
                    <Bpm count={16} bpm={this.state.beatCountBpms.sixteen}/>
                </ul>
                <div>
                    <button onClick={this.handleNaputa}>Naputa</button>
                </div>
            </div>
        );
    }
}

export default Tahti;
