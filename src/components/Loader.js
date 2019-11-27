import React from 'react'
import '../styles/_Loader.scss';

function Loader() {
	return (
		<div className="Loader">
			<div className="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export default Loader;