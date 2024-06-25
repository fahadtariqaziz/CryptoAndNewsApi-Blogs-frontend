import styles from './CommentList.module.css'
import Comment from '../Comment/Comment';

function CommentList({comments}){
    //parameter mai props ya destructure karke comment he keh dete
    
    return(
        <div className={styles.commentListWrapper}>
            <div className={styles.commentList}>
            {comments.length === 0 ?
                ( <div className={styles.noComments}> No Comments Posted </div>)
                :
                //agar hain tou map kara dein ge har comment ko uski array ke through map kara dein ge or single comment ko display karae ge <Comment /> ke component ke through or ye hum abhi banae ge or key ke sath comment{cooment} comment ki key mau comment ka object pass karein ge ye bhi banae ge 
                comments.map(comment => (
                    <Comment key={comment._id} comment={comment} />
                    //iski styling hum kar rhe comment.jsx mai
                ))
            }
            </div>
        </div>
    );

}

export default CommentList;