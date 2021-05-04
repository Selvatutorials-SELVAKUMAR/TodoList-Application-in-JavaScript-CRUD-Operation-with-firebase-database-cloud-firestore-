
 const db = firebase.firestore()

const ul = document.querySelector('ul')
const input = document.querySelector('input[type=text]')
const add = document.querySelector('button[type=submit]')
const popup = document.createElement('div')
const popup_content = document.createElement('div')
popup.classList.add('popup')
popup_content.classList.add('popup-content')


function todoop(li){
    let close = document.createElement('span')
    close.textContent = 'x'
     close.classList.add('close')
     li.appendChild(close)
    
 

     // update button Element

     
       let update = document.createElement('button')
        update.textContent = 'Update'
         update.classList.add("update-btn")
          li.appendChild(update)
          update.addEventListener('click', e => {
      e.stopPropagation()
      let dataid = e.target.parentElement.id
      let data = e.target.parentElement.data
      const updatebtn = document.createElement('button')
      const updatefield = document.createElement('input')
      updatefield.type = 'text'
       updatefield.value = data
      updatefield.placeholder = "Update..."
      updatebtn.classList.add('blue')
      updatebtn.textContent = 'UPDATE'
      popup_content.appendChild(updatefield)
      popup_content.appendChild(updatebtn)
      popup.appendChild(popup_content)
      document.body.appendChild(popup)

      updatebtn.addEventListener('click' , e => {
          popup.classList.add('progress')
          popup_content.classList.add('progress')
          updatefield.classList.add('progress')
          updatebtn.classList.add('progress')
          if(updatefield.value === '') {
              setTimeout(() => {
                  popup.classList.remove('progress')
                  popup_content.classList.remove('progress')
                  updatefield.classList.remove('progress')
                  updatebtn.classList.remove('progress')
                  popup_content.removeChild(updatefield)
                  popup_content.removeChild(updatebtn)
                  popup.removeChild(popup_content)
                  document.body.removeChild(popup)
              },10);
          } else {
              db.collection('todos').doc(dataid).update({
                  todo : updatefield.value
              }).then(() => {
                setTimeout(() => {
                    popup.classList.remove('progress')
                    popup_content.classList.remove('progress')
                    updatefield.classList.remove('progress')
                    updatebtn.classList.remove('progress')
                    popup_content.removeChild(updatefield)
                    popup_content.removeChild(updatebtn)
                    popup.removeChild(popup_content)
                    document.body.removeChild(popup)
                },1150);
              })
      }
      })
  })
     close.addEventListener('click' , e => {
          e.stopPropagation()
          let id = e.target.parentElement.id
          db.collection('todos').doc(id).delete()
      })
}
     

function addTodo(doc){
    // ListItem Element
    
      let li = document.createElement('li')
       li.id = doc.id
         li.textContent = doc.data().todo
          li.data = doc.data().todo
           doc.data().checked ? li.classList.add('checked') : li.classList.remove('checked')
           ul.appendChild(li)
    
   // span Element
    todoop(li)
   
}
   
// Add todos to database
add.addEventListener('click',() => {
    if(input.value === '') return
    db.collection('todos').add({
        id : new Date(),
        todo : input.value,
        checked : false
    })
    input.value = ''
})
// Real Time Listener
db.collection('todos').orderBy('id').onSnapshot((snapshot) => {
    let changes = snapshot.docChanges()
    changes.forEach(change => {
        if(change.type === 'added'){
            addTodo(change.doc)
        } else if(change.type === 'removed'){
            let li = document.getElementById(change.doc.id)
            ul.removeChild(li)
        } else if(change.type === 'modified'){
            setTimeout(() => {
                let li = document.getElementById(change.doc.id)
                li.textContent = change.doc.data().todo
                li.data = change.doc.data().todo
                change.doc.data().checked ? li.classList.add('checked') : li.classList.remove('checked')
                todoop(li)
            },1000);
        }
    }
    )
})
ul.addEventListener('click' , e => {
    e.target.classList.add('checked')
    db.collection('todos').doc(e.target.id).update({
        checked : true
    })
}) 