import React from 'react';

const Cartellone = (props) => {
	const { estrazioni } = props;

	const renderNumber = () => {
		return Array.from(Array(9).keys()).map((row) => {
			return (
				<div className={'cartellone_riga'}>
					{Array.from(Array(10).keys()).map((column) => {
						const number = row * 10 + (column + 1);
						const isEstratto = estrazioni.indexOf(number) >= 0;
						return (
							<div className={'cartellone_colonna'}>
								<div className={'cartellone_numero'}>
									{number}
									<div className={`cartellone_numero_estratto ${isEstratto ? 'cartellone_numero_estratto_visible' : ''}`}>{number}</div>
								</div>
							</div>
						);
					})}
				</div>
			);
		});
	};

	return <div className={'cartellone'}>{renderNumber()}</div>;
};

Cartellone.defaultProps = {
	estrazioni: [],
};

export default Cartellone;
