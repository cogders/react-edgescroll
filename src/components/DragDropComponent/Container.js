import React, { Component } from 'react';
import Target from '../DragDropComponent/Target';
import Source from '../DragDropComponent/Source'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import '../../App.css';

class DragDropContainer extends Component {

    state = {
        firstBox: {},
        secondBox: {}
    }

    onFirstBoxDrop = (item) => {
        this.setState({
            firstBox: item
        })
    }

    onSecondBoxDrop = (item) => {
        this.setState({
            secondBox: item
        })
    }

    render() {
        return (
            <div className="drop-container-wrapper">
                <div className="source">
                    <span className="source-riders">MotoGP Riders Draggable List</span>
                    <Source name="Andrea Dovizioso" id="#4" country="Italy" />
                    <Source name="Valentino Rossi" id="#46" country="Italy" />
                    <Source name="Johann Zarco" id="#5" country="France" />
                    <Source name="Danilo Petrucci" id="#9" country="Italy" />
                    <Source name="Maverick Viñales" id="#12" country="Spain" />
                    <Source name="Karel Abraham" id="#17" country="Czech Republic" />
                    <Source name="Fabio Quartararo" id="#20" country="France" />
                    <Source name="Franco Morbidelli" id="#21" country="Italy" />
                    <Source name="Andrea Iannone" id="#29" country="Italy" />
                    <Source name="Takaaki Nakagami" id="#30" country="Japan" />
                    <Source name="Cal Crutchlow" id="#35" country="Great Britain" />
                    <Source name="Joan Mir" id="#36" country="Spain" />
                    <Source name="Bradley Smith" id="#38" country="Great Britain" />
                    <Source name="Aleix Espargaro" id="#41" country="Spain" />
                    <Source name="Alex Rins" id="#42" country="Spain" />
                    <Source name="Jack Miller" id="#43" country="New Zealand" />
                    <Source name="Pol Espargaro" id="#44" country="Spain" />
                    <Source name="Tito Rabat" id="#53" country="Spain" />
                    <Source name="Hafizh Syahrin" id="#55" country="Malaysia" />
                    <Source name="Francesco Bagnaia" id="#63" country="Italy" />
                    <Source name="Miguel Oliveira" id="#88" country="Portugal" />
                    <Source name="Marc Marquez" id="#93" country="Spain" />
                    <Source name="Jorge Lorenzo" id="#99" country="Spain" />
                </div>
                <div className="destination">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="target-number">Rider's Number</span>
                        <Target
                            id={1}
                            droppedItem={this.state.firstBox}
                            onDrop={this.onFirstBoxDrop} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                         <span className="target-country">Rider's Country</span>
                        <Target
                            id={2}
                            droppedItem={this.state.secondBox}
                            onDrop={this.onSecondBoxDrop} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(DragDropContainer);