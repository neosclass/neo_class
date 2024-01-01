import React, { useState } from 'react';


const CommentLogic = ({ creator_id, curr_id, comments}) => {


    if(creator_id == curr_id){
        return <div>
        {comments.map(item => (
                  <div key={item.id}>
                    <h2>Комментатор: {item.user_id}</h2>
                    <h3>Комментарий: {item.data}</h3>

        </div>
              ))};
        </div>
    }
    else{
        comments.array.forEach(element => {
            if(element.user_id == curr_id){
                return <div>
                <h2>Комментатор: {element.user_id}</h2>
                <h3>Комментарий: {element.data}</h3>
                </div>

            };
        });
    }
}


  
export default CommentLogic;