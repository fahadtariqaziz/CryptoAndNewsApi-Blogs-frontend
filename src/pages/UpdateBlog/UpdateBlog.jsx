import {useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlogById  } from '../../api/internal';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../components/TextInput/TextInput';
import styles from './UpdateBlog.module.css';
import { updateBlog } from '../../api/internal';

function UpdateBlog(){

    const navigate = useNavigate();

    const params = useParams();
    const blogId = params.id;
    //id iss liye keh rhe kyu ke app mai jo path diya waha :id hai

    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const[photo, setPhoto] = useState("");

    const getPhoto = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
    };

    const author = useSelector(state => state.user._id);

    const updateHandler = async () => {
       //http:backendserver:port/storage/filename.png
       //base64
       let data;
       if(photo.includes('http')){
       
        data = {
            author , title , content , blogId
            //blogController mai updateBlogSchema se dekha tou blogId bhi chahye hogi ,photo ko hata dete agar photo ko update nhi karna tou

        }}
        else{
            data = {
                author , title , content , photo , blogId
                
        }
    }

        const response = await updateBlog(data);
        //or updateBlog ko import karna pare ga
        
        if(response.status === 200){
            navigate('/');
        }
    }; 

    useEffect(() => {
        async function getBlogDetails(){
            

            //comments fetch karne ke baad blogs ki details chahye
            const response = await getBlogById(blogId);
            if(response.status === 200)
            {
              setTitle(response.data.blog.title);
              setContent(response.data.blog.content);
              setPhoto(response.data.blog.photo);
            }
        }
        getBlogDetails();
    },[]);

    return(
        <div className={styles.wrapper}>
            <div className={styles.header}>Edit your blog</div>
            <TextInput
                type = "text"
                name = "title"
                placeholder = "title"
                value = {title}
                onChange = {(e) => setTitle(e.target.value)}
                style = {{width : '60%'}}
                />
            <textarea
                className={styles.content}
                placeholder="your content goes here..."
                maxLength={400}
                value = {content}
                onChange = {(e) => setContent(e.target.value)}

                
            />
            <div className={styles.photoPrompt}>
                <p>Choose a photo</p>
                <input
                    type="file"
                    name="photo"
                    id = "photo"
                    accept="image/jpg , image/jpeg , image/png"
                    onChange={getPhoto}
                />
                <img src={photo} alt="" width={150} height={150}/>
            </div>

            <button 
            className={styles.update} 
            onClick={updateHandler}
            //disabled= {}
            >Update</button>
        </div>
 
    )
}

export default UpdateBlog;