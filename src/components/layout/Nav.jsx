import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
	return (
		<header>
			<nav>
				<ul>
					<Link to='/'>
						<li>users</li>
					</Link>
				</ul>
			</nav>
		</header>
	);
}

export default Nav;
