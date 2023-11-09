import React, {useState} from 'react';
import './styles/App.css';
import PostList from './components/post_list';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'It is some language'},
        {id: 2, title: 'JavaScript 2', body: 'Mmmmmm....'},
    ])

    const [title, setTitle] = useState('')
    const addNewPost = (e) => {
        e.preventDefault()
        console.log(title)
    }

    return (
        <div className='App'>
            <form>
                <MyInput value={title} onChange={e => setTitle(e.target.value)} type='text' placeholder='Name of post' />
                <MyInput type='text' placeholder='Description of post'/>
                <MyButton onClick={addNewPost}>Create post</MyButton>
            </form>

            <PostList posts={posts} title='List of posts with JS'/>
        </div>
    )
};

export default App;