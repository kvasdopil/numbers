import React from 'react';
import { observer } from 'mobx-react';


@observer
export default class Stats extends React.Component
{
	star = undefined;
	players = undefined;

	componentWillReceiveProps(props)
	{
		if(props.score != this.props.score)
			$(this.star).transition('bounce');

		if(props.players != this.props.players)
			$(this.players).transition('bounce');
	}
	
	render()
	{
		const props = this.props;

		return <div className="ui panel" style={{padding: '1rem'}}>
			Your score:
			<i className="ui orange star icon" ref={i => this.star = i} />
			{props.score}
		
			<div style={{float:'right'}} >
			  <i className="ui blue user icon" ref={i => this.players = i} />
			  {/* FIXME: thats not localizable */}
			  {props.players == 1
			  	? `${props.players} player ` 
			  	: `${props.players} players `
			  } 
			  playing right now
			</div>
		</div>
	}
}