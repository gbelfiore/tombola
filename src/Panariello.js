import React, { useCallback, useEffect, useRef, useState } from 'react';

import panaro from './img/panaro.png';

const Panariello = (props) => {
	const { estrazioni, onEstratto } = props;
	const [disponibili, setDisponibili] = useState(Array.from(Array(90).keys()).map((k) => k + 1));
	const [estratto, setEstratto] = useState(null);

	const refCesto = useRef(null);

	useEffect(() => {
		setDisponibili(
			Array.from(Array(90).keys())
				.map((k) => k + 1)
				.filter((disp) => estrazioni.indexOf(disp) < 0)
		);
	}, [estrazioni]);

	const estrai = useCallback(() => {
		const indexEstratto = Math.floor(Math.random() * disponibili.length);
		let estratto = disponibili[indexEstratto];
		setEstratto(estratto);
		onEstratto(estratto);
	}, [disponibili, onEstratto]);

	const clickCesto = useCallback(() => {
		if (refCesto.current.classList.contains('cesto_click')) return;

		refCesto.current.classList.add('cesto_click');
		setTimeout(() => {
			estrai();
		}, 1300);
		setTimeout(() => {
			refCesto.current.classList.remove('cesto_click');
		}, 2000);
	}, [estrai]);

	const renderLastEstratti = useCallback(() => {
		const lastEstratti =
			estrazioni.length < 6 ? estrazioni.slice(0, estrazioni.length - 1) : estrazioni.slice(estrazioni.length - 6, estrazioni.length - 1);
		return (
			estrazioni.length > 1 && (
				<div className={'ultimi_estratti'}>
					<span>Ultimi estratti:</span>
					{lastEstratti.map((estr) => (
						<div className={'estratto'}>{estr}</div>
					))}
				</div>
			)
		);
	}, [estrazioni]);

	return (
		<div className={'panariello'}>
			<div className={'cesto'} ref={refCesto} onClick={clickCesto}>
				<img src={panaro} alt='panaro' />
			</div>
			{estratto && estrazioni.length > 0 && <div className={'estratto'}>{estratto}</div>}
			{renderLastEstratti()}
		</div>
	);
};

Panariello.defaultProps = {
	estrazioni: [],
	onEstratto: () => { },
};

export default Panariello;
