import styles from './Comment.module.css';

function Comment({comment}){

    const date = new Date(comment.createdAt).toDateString();

    return(

        <div className={styles.comment}>
            <div className={styles.header}> 
                <div className={styles.author}> {comment.authorUsername} </div>
                <div className={styles.date}> {date} </div>
                <div className={styles.commentText}> {comment.content} </div>  
            </div>
        </div>
    )
}

export default Comment;

//cooment.text nhi hoga comment .content hoga backend se dekha dto se kya kya chahye  postedAt ki jaga createdAt author ki jaga authorUsername