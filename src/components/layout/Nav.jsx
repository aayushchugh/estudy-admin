import React from 'react';
import { Link } from 'react-router-dom';

import { BSecondary } from '../uiComponents/Btn';

import './nav.scss';

function Nav() {
	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link to='/'>
							<BSecondary>users</BSecondary>
						</Link>
					</li>

					<li>
						<Link to='/testimonials'>
							<BSecondary>testimonials</BSecondary>
						</Link>
					</li>

					<li>
						<Link to='/update-email-list'>
							<BSecondary>update email list</BSecondary>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Nav;
