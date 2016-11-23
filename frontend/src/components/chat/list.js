import React from 'react'
import styles from './chat.css'

import IconDelete from 'material-ui/svg-icons/content/delete-sweep'

function getClass(type) {
	switch(type) {
		case 'message':
			return styles.message + ' ' + styles.item;
		case 'admin':
			return styles.admin + ' ' + styles.item;
	}
}

function getTime(str) {
	let date = new Date(str);

	return date.getHours() + ':' + date.getMinutes();
}

const Item = ({ message, _id, type, user, createdAt, isAdmin, deleteSingle }) => {
	return (
		<div className={getClass(type)}>
			<span className={styles.author}>
				{getTime(createdAt)} - {user.email}  
			</span>
			{message}
			{isAdmin && 
				<button className={styles.delete} onClick={() => deleteSingle(_id)}>
					<IconDelete />
				</button>
			}
		</div>
	)
}


const list = (props) => (
	<div className={styles.messages + ' chat-list'}>
		{props.items.map(item => (<Item key={item._id} {...props} {...item} />))}
	</div>
);

export default list;