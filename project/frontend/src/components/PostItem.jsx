import React from "react";

const PostItem = (props) => {

    return (
        <div className='post'>
                <div className='post__content'>
                    <strong>{props.post.id}. {props.post.title}</strong>
                    <div>
                        {props.post.body}
                    </div>
                    <div className='post_btns'>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
    )
}

export default PostItem;