import '../styles/mainpage.css'
import { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import storage from '../firsbaseStorage'
var $ = require("jquery");
const MainPage = ({username}) =>{
    let show = false;
    const [upload, setUpload] = useState(null);
    const [description, setDescription] = useState(''); 

    const handleUpload = async () => {
        if (!upload) {
            alert('Please select an image.');
            return;
        }

        try {
            let today = new Date();

            let options = {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric'
            };
            let formattedDate = today.toLocaleDateString('en-US', options);
            formattedDate = formattedDate.replace(/\//g, '-');
            var shortDesc = description.split(0,20);
            const storageRef = ref(storage, 'images/' + formattedDate + username + shortDesc);
            await uploadBytes(storageRef, upload);
            alert('Image uploaded successfully!');
            setUpload(null);
            setDescription('');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        }
    };

    const handleImageUpload = async (e) =>{
        if(e.target.files[0]){
            setUpload(e.target.files[0])
        }
    }

    const makeUploadAppear = (event) =>{
        event.preventDefault();
        $('.form-container').css('display',show?'none':'block')
        var button = $('.show_upload');
        button.text(show ?'Upload a Post':'Cancel Upload')
        if(show){
            button.removeClass('btn-danger');
            button.addClass('btn-primary');
        }
        else{
            button.removeClass('btn-primary');
            button.addClass('btn-danger')
        }
        show = !show;
    }


    return (
        <div className="mainpage-container col-md-10 m-auto p-3">  
            <div className="form-container">
                <strong>Upload to Stream</strong> <br />
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description"
                onChange={(e)=>setDescription(e.target.value)}></textarea>
                <input type="file" name='image' id='image' className='form-control'
                onChange={handleImageUpload}/>
                <button className='btn btn-primary px-5 mt-2 form-control'
                onClick={handleUpload}>Upload</button>
            </div>
            <button className='show_upload btn btn-primary form-control mt-2'
                onClick={makeUploadAppear}
            >Upload a Post</button>
            <p>Hello {username}</p>
        </div>
    )
}

export default MainPage;    