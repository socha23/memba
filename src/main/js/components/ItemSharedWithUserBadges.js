import React from 'react'
import sharingLogic from '../logic/sharingLogic';

const ItemSharedWithUserBadges = ({item}) => <div>
    {
        sharingLogic.getUsersItemIsSharedWith(item).map(u =>
            <img src={u.pictureUrl}
                 key={u.id}
                 style={{
                     border: "1px solid #555",
                     marginRight: 5,
                     width: 40,
                     height: 40,
                     borderRadius: 20,
                 }}/>
        )
    }
</div>;

export default ItemSharedWithUserBadges;