const Button = (props) =>{
    const {text, style, onClick} = props
    return (
        <button
        onClick={()=> onClick(text)}
        style={{
            ...style,
            fontSize:'4rem'
        }}>{text}</button>
    )
}


export default Button;