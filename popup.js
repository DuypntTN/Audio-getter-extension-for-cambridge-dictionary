// document.addEventListener('DOMContentLoaded', function () {
//   const button = document.getElementById('my-button')
//   const audioList = document.getElementById('audio-list')
//   button.addEventListener('click', function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.scripting.executeScript(
//         {
//           target: { tabId: tabs[0].id },
//           function: () => {
//             const elements = document.getElementsByClassName('hdn')
//             const audioElements = []
//             for (let i = 0; i < elements.length; i++) {
//               const element = elements[i]
//               if (element.tagName === 'AUDIO') {
//                 audioElements.push(element)
//               }
//             }
//             var audio = []
//             for (let au of audioElements) {
//               audio.push(au.currentSrc)
//             }
//             return audio
//           },
//         },
//         (results) => {
//           console.log(results)
//           const audio = results[0].result
//           for (let au of audio) {
//             const li = document.createElement('li')
//             const a = document.createElement('a')
//             a.href = au
//             a.innerText = `# Link:${audio.indexOf(au)}`
//             li.appendChild(a)
//             audioList.appendChild(li)
//           }
//         },
//       )
//     })
//   })
// })

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('my-button')
    const audioList = document.getElementById('audio-list')
    button.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            function: () => {
              const elements = document.getElementsByClassName('hdn')
              if(elements.length === 0) return alert('We can not find any audio in this page.')
              const audioElements = []
              for (let i = 0; i < elements.length; i++) {
                const element = elements[i]
                if (element.tagName === 'AUDIO') {
                  audioElements.push(element)
                }
              }
              var audio = []
              for (let au of audioElements) {
                audio.push(au.currentSrc)
              }
              return audio
            },
          },
          (results) => {
            const audio = results[0].result
            for (let au of audio) {
              const li = document.createElement('li')
              const a = document.createElement('a')
              a.href = au
              a.innerText = `🔉 Audio:${audio.indexOf(au)}`
              a.addEventListener('click', function (event) {
                event.preventDefault()
                const link = event.target.href
                const tempTextArea = document.createElement('textarea')
                tempTextArea.value = link
                document.body.appendChild(tempTextArea)
                tempTextArea.select()
                document.execCommand('copy')
                document.body.removeChild(tempTextArea)
              })
              li.appendChild(a)
              audioList.appendChild(li)
            }
          },
        )
      })
    })
  })
  