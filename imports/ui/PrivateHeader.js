import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
	return (
		<div className='navigation'>
			<div className='navigation__content'>
				<h1 className='navigation__title'>{ props.title }</h1>
				<button className='button button--navigation' onClick={ () => Accounts.logout() }>LOGOUT</button>
			</div>
		</div>
	)
}

PrivateHeader.propTypes = {
	title: PropTypes.string.isRequired
}

export default PrivateHeader;