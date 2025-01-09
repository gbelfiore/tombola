import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Cartellone from './Cartellone';
import Panariello from './Panariello';

function App() {
	const [estrazioni, setEstrazioni] = useState([]);
	useEffect(() => {
		let estrazioni = localStorage.getItem('estrazioni');
		if (estrazioni) {
			estrazioni = JSON.parse(estrazioni);
			setEstrazioni(estrazioni);
		} else {
			setEstrazioni([]);
		}
	}, []);

	const reset = useCallback(() => {
		localStorage.setItem('estrazioni', JSON.stringify([]));
		setEstrazioni([]);
	}, []);

	const onEstratto = useCallback(
		(estratto) => {
			setEstrazioni([...estrazioni, estratto]);
			localStorage.setItem('estrazioni', JSON.stringify([...estrazioni, estratto]));
		},
		[estrazioni]
	);

	return (
		<div className='App'>
			<div className={'header'}>
				<div className={'header_title'}>{'La tombola'}</div>
			</div>
			<div className={'content'}>
				<div className={'content_sx'}>
					<Cartellone estrazioni={estrazioni} />
				</div>
				<div className={'content_dx'}>
					<div className={'console_tombola'}>
						<div className={'reset_tombola'} onClick={reset}>
							Inizia di nuovo
						</div>
					</div>
					<Panariello estrazioni={estrazioni} onEstratto={onEstratto} />
				</div>
			</div>
		</div>
	);
}

export default App;
