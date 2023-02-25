import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

class MeuComponente extends React.Component {
	state = {
		empresa: 'Procempa',
		recebido: ''
	};

	constructor(props) {
		super(props);
		this.state.recebido = props.valorRecebido;
		this.meuMetodo = this.meuMetodo.bind(this);
	}

	meuMetodo() {
		this.setState({ nome: 'Alex', recebido: 'Canoas' });
	}

	render() {
		const { empresa, valorRecebido } = this.state;
		return (
			<Fragment>
				<h1>{empresa}</h1>
				<h2>{valorRecebido}</h2>
				<button type="button" onClick={this.meuMetodo}>
					Clique
				</button>
				<pre>{JSON.stringify(this.state, null, 2)}</pre>
			</Fragment>
		);
	}
}
MeuComponente.displayName = 'MeuComponente';
MeuComponente.propTypes = {
	valorRecebido: PropTypes.string
};

export default MeuComponente;
