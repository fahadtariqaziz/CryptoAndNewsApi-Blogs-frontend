import {useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlogById , deleteBlog , postComment , getCommentsById } from '../../api/internal';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import styles from './BlogDetails.module.css';
import CommentList from '../../components/CommentList/CommentList';

function BlogDetails(){

    const [blog , setBlog] = useState([]);
    const [comments , setComments] = useState([]);
    const [ownsBlog , setOwnsBlog] = useState(false);
    const [newComment , setNewComment] = useState([]);
    const [reload , setReload] = useState(false);

    const navigate = useNavigate();

    const params = useParams();
    const blogId = params.id;

    const username = useSelector(state => state.user.username);
    const userId = useSelector(state => state.user._id);
    //username global state se le skte id param se parameter mai pass kar rhe

    useEffect(() => {
        //abhi tak IIFE se kiya lakin yaha normal function bana ke usko call kardete
        async function getBlogDetails(){
            const commentResponse = await getCommentsById(blogId);
            if(commentResponse.status === 200)
            {
                setComments(commentResponse.data.data);
                //pehle wala data axios ke through milta or dosre wala backend mai define kiya tha commentController ma response mai .json key ka nam data tha data:commentDto
            }

            //comments fetch karne ke baad blogs ki details chahye
            const blogResponse = await getBlogById(blogId);
            if(blogResponse.status === 200)
            {
                //set Ownership
                setOwnsBlog(username === blogResponse.data.blog.authorUsername);
                //ye backend se key likhi hai authorUsername dto se blogdetails wale
                setBlog(blogResponse.data.blog);
            }
        }
        //or ab isko call karlete
        getBlogDetails();
        //dependency list mai aik change abhi tak empty pass ki thi jo aik dafa mount karne pe render hoga ab state pass karein ge tou tou ye state setReload ke through dobara render hoga or dobara comments fetch honge or jo comment abhi post kiya wo bhi display ho jaye gi

    },[reload]);

    const postCommentHandler = async () => {
        const data = {
            //comment controller create method mai dekh lete backend mai kya kya chahye
            author : userId,
            blog : blogId,
            content : newComment
        }

        const response = await postComment(data);

        if(response.status === 201)
        {
            setNewComment("");
            //iske baad automatically refresh page ko karane ke liye aik state bana lete reload setreload bydefault false
            setReload(!reload); 
            //false hai tou true ho jaye or agar true hai tou false ho jaye or reload handle karein ge useEffect mai ye function khatam ho chuka
        }
    }


    const deleteBlogHandler = async () => {

        const response = await deleteBlog(blogId);

        if(response.status === 200)
        {
            navigate('/');
        }
    };

    if(blog.length === 0){
       return <Loader text="blog details"/>
    }

    return(
        <div className={styles.detailsWrapper}>
            <div className={styles.left}>

                <h1 className={styles.title}> {blog.title} </h1>
                <div className={styles.meta}>
                    <p> @{blog.authorUsername + " on " + new Date(blog.createdAt).toDateString()}</p>
                </div>
                <div className={styles.photo}>
                    <img src={blog.photo} width={250} height={250} alt=''/>
                </div>
                <p className={styles.content}> {blog.content} </p>
                {
                    ownsBlog && (
                        <div className={styles.controls}>
                            <button className={styles.edit} onClick={ () => {navigate(`/blog-update/${blog._id}`)} }> Edit </button>
                            <button className={styles.delete} onClick={deleteBlogHandler}> Delete </button>
                        </div>
                    )
                }

            </div>

            <div className={styles.right}>

                <div className={styles.commentsWrapper}>
                    <CommentList comments={comments}/>  
                    <div className={styles.postComment}>
                        <input 
                            className={styles.input}
                            placeholder= 'comment goes here ...'
                            value={newComment}
                            onChange={ (e) => setNewComment(e.target.value)}
                        />
                        <button className={styles.postCommentButton} onClick={postCommentHandler}> Post </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default BlogDetails;

 // <commentList/> mai comments nam ki property bhi hai hamare pas or state bhi hai