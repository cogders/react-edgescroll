import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { uniqueId } from 'lodash'

const SortableItem = SortableElement(({value}) => <div style={{ fontSize: '20px', cursor: 'pointer', padding: '10px', border: '1px solid #2185d0', width: '300px', background: '#eee' }}>{value}</div>);

const SortableList = SortableContainer(({items}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'auto', margin: 'auto', width: '100%' }}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

export default class SortableComponent extends Component {
  state = {
    active: '',
    items: [
       'Andrea Dovizioso',
       'Valentino Rossi',
       'Johann Zarco',
       'Danilo Petrucci',
       'Maverick Viñales',
       'Karel Abraham',
       'Fabio Quartararo',
       'Franco Morbidelli',
       'Andrea Iannone',
       'Takaaki Nakagami',
       'Cal Crutchlow',
       'Joan Mir',
       'Bradley Smith',
       'Aleix Espargaro',
       'Alex Rins',
       'Jack Miller',
       'Pol Espargaro',
       'Sylvain Guintoli',
       'Michele Pirro',
       'Tito Rabat',
       'Hafizh Syahrin',
       'Francesco Bagnaia',
       'Miguel Oliveira',
       'Marc Marquez',
       'Jorge Lorenzo'
    ],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
      active: '',
    }));
  };

  render() {
    return  (  
    <div style={{ padding: '10px', width: '100%' }}>
      <span className="sortable-riders">MotoGP Riders Sortable List</span>
    <SortableList id={uniqueId()} items={this.state.items} onSortEnd={this.onSortEnd} />
    </div>
    )
  }
}