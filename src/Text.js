function textwrite(w){
    const logFileText = async file => {
        const response = await fetch(file)
        const text = await response.text()
        //console.log(text)
        //document.querySelector('.blue').innerHTML=text
    }
    const txt = logFileText(w)
    return txt;
}

function Text(){
    textwrite("text.txt")
    return(
        <div>
            <p className="blue">ddddddddddddddd</p>
        </div>
    );
}
    
export default Text;

// let p = document.querySelector(".red")
// //https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file-in-the-browser#:~:text=Yes%20JS%20can%20read%20local,the%20file%20or%20files%20content.
// const logFileText = async file => {
//     const response = await fetch(file)
//     const text = await response.text()
//     console.log(text)
//     p.innerHTML= text
// }
// logFileText('test.txt')