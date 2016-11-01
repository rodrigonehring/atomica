import React from 'react';


const list = ({ items }) => (
	<div>
		{items.map((item, index) => (
			<div key={item._id}>
				Message: {item.message}, <br />
				type: {item.type}, <br />
			</div>
		))}
	</div>
);

export default list;