const deleteButton = document.querySelectorAll('.fa-trash');


Array.from(deleteButton).forEach((element) =>{
    element.addEventListener('click', deleteWord)
});

async function deleteWord(){
    const sWord = this.parentNode.childNodes[1].innerText
    const bDefinition = this.parentNode.childNodes[3].innertext

    try{
        const response = await fetch('deleteWord', {
            method: 'delete',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'wordS': sWord, 
                'definitionS': bDefinition
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
};