import '../styles/mainpage.css';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import storage from '../firsbaseStorage';
import firestore from '../firebase';
import { addDoc, collection, getDocs, doc, deleteDoc, query, orderBy, updateDoc, increment, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
var $ = require("jquery");

const MainPage = ({ username }) => {
    let show = false;
    const [upload, setUpload] = useState(null);
    const [description, setDescription] = useState(''); 
    const [posts, setPosts] = useState([]);

    const handleUpload = async () => {
        
        $('#error_container').html('');
        if(upload === ''){
            $('#error_container').html('Please completely fill the form');
            $('#error_container').css('color','red');
        }
        if (!upload) {
            alert('Please select an image.');
            return;
        }
        try {
            let today = new Date();
            let options = {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false 
            };
            let formattedDate = today.toLocaleDateString('en-US', options);
            formattedDate = formattedDate.replace(/\//g, '-');
            const imageName = upload.name;

            const storageRef = ref(storage, 'images/' + imageName);
            await uploadBytes(storageRef, upload);
            const downloadURL = await getDownloadURL(storageRef);

            await addDoc(collection(firestore,'posts'),{
                name: username,
                description: description,
                downloadURL: downloadURL,
                uploadDate: formattedDate
            });

            $('#error_container').html('Upload Successful');
            $('#error_container').css('color','green');
            $("#description").html("");
            hide();
            fetchPosts()
        } catch (error) {
            $('#error_container').html(error);
            $('#error_container').css('color','red');
        }
    };
    const hide = () =>{
        $(".form-container").css('display','none');
        $(".show_upload").html('Upload a Post');
    } 

    const handleImageUpload = async (e) => {
        if (e.target.files[0]) {
            setUpload(e.target.files[0]);
        }
    }

    const makeUploadAppear = (event) => {
        event.preventDefault();
        $('.form-container').css('display', show ? 'none' : 'block');
        var button = $('.show_upload');
        button.html(show ? 'Upload a Post' : 'Cancel Upload');
        show = !show;
    }

    const fetchPosts = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(firestore, 'posts'),orderBy('uploadDate','desc')));
            const postsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsData);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);

    const deletePost = async (documentID) => {
        try {
            const docRef = doc(firestore, 'posts', documentID);
            await deleteDoc(docRef);
            console.log('Document deleted successfully');
            fetchPosts()
            return;
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }
    const likePost = async (documentID) => {
            const docRef = doc(firestore, 'posts', documentID);
            try{
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()) {
                    const postData = docSnap.data();
                    const likedBy = postData.likedby || [];
                    const userIndex = likedBy.indexOf(username);

                    if(userIndex === -1) {
                        await updateDoc(docRef, {
                            likes: increment(1),
                            likedby: [...likedBy, username]
                        })
                    }
                    else {
                        likedBy.splice(userIndex,1);
                        await updateDoc(docRef, {
                            likes: increment(-1),
                            likedby: likedBy
                        })
                    }
                    fetchPosts()
                }
            }
            catch(error) {
                alert(error)
            }
    }
    const confirmDeleteShow = (postID) =>{
        $(`#confirm${postID}`).css('display','block');
        $(`#delete${postID}`).css('display','none');
    }
    const confirmDeleteHide = (postID) =>{
        $(`#confirm${postID}`).css('display','none');
        $(`#delete${postID}`).css('display','block');
    }
    const handleViewportChange = (mediaQuery) => {
        const element = $('.logged-username-container');
        if (mediaQuery.matches) {
            element.removeClass('shadow-lg');
        } else {
            element.addClass('shadow-lg');
        }
    };
    
    const mediaQuery = window.matchMedia('(max-width: 1494px)');
    handleViewportChange(mediaQuery);
    mediaQuery.addEventListener('change',()=>handleViewportChange(mediaQuery))

    return (
        <div className='allContainer'>
            <div className="logged-username-container bg-body rounded-4 shadow-lg px-5 m-3">
                <h5>logged in as: </h5>
                <h4>{username}</h4>
            </div>
            <div className="mainpage-container col-md-10 m-auto p-3">  
                <div className="form-container">
                    <strong>Upload to Stream</strong> <br />
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description"
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                    <input type="file" name='image' id='image' className='form-control'
                    onChange={handleImageUpload}/>
                    <div id='error_container'></div>
                    <button className='btn btn-primary px-5 mt-2 form-control'
                    onClick={handleUpload}>Upload</button>
                </div>
                <button className='show_upload btn btn-primary form-control mt-2'
                    onClick={makeUploadAppear}
                >Upload a Post</button>
                <div className="news-feed">
                    {posts.map(post => (
                        <div key={post.id} className={`post mb-4`}>
                            <div className="top-div mt-4">
                                <div className="name-container">
                                    <br />
                                    <div className="post-username">{post.name}</div>
                                </div>
                                <div className="close delete-container">
                                    <div id={`confirm${post.id}`} style={{display: 'none'}}>
                                        Confirm delete post?
                                        <button className='btn btn-primary m-2' onClick={()=>confirmDeleteHide(post.id)}>Cancel</button>
                                        <button className='btn btn-danger' onClick={()=>deletePost(post.id)}>Confirm</button>
                                    </div>
                                    <button className='btn btn-danger confirm-button' id={`delete${post.id}`} onClick={()=>confirmDeleteShow(post.id)}>X</button>
                                </div>
                            </div>
                            <p>{post.description}</p>
                            <div className="image-container">
                                <img src={post.downloadURL} alt={post.name} />
                            </div>
                            <small>{post.uploadDate}</small>
                            <div>{post.likes} likes</div>
                            <div className="like-btn btn btn-primary"
                            onClick={()=>likePost(post.id)}>like</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MainPage;
