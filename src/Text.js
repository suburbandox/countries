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
            <p className="blue"></p>
            {/* <iframe 
            title="yes"
width="100%" 
height="480" 
frameborder="0" 
scrolling="no" 
marginheight="0" 
marginwidth="0"
src="https://maps.google.com/maps?q=12.37,-1.52&amp;z=6&amp;output=embed">

<a href="https://www.google.com/maps/12.37,-1.52,4z" target="_blank">
See full page map
</a></iframe> */}
        </div>
    );
}
    
export default Text;

// async function fetchModalData(file) {
//     const response = await fetch(file)
//     const text = await response.text()
//     return text
//   }


// let p = document.querySelector(".red")
// //https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file-in-the-browser#:~:text=Yes%20JS%20can%20read%20local,the%20file%20or%20files%20content.
// const logFileText = async file => {
//     const response = await fetch(file)
//     const text = await response.text()
//     console.log(text)
//     p.innerHTML= text
// }
// logFileText('test.txt')