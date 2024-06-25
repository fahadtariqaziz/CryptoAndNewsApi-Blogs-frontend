import  styles from './TextInput.module.css';

function TextInput(props){
    return(
        <div className = {styles.textInputWrapper}>
            <input {...props}/>    
            {props.error && (
                 <p className = {styles.errormessage}>{props.errormessage}</p>
                )}
        </div>
    );
}
//props ko spread karlein ge input field mai
export default TextInput;