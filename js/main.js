/*
we will be using cookies to store our bookmarks and will retrive and delete them
*/
// Adding event on form submit
document.getElementById('QAform').addEventListener('submit',saveQA);

function saveQA (event) {
    // preventing from to reload on submit
    event.preventDefault();
    var question=document.getElementById('c_question').value;
    var answer=document.getElementById('c_answer').value;
    // number of days after cookie should expire
    var exdays=2;
    // setting up expiration time according to two days
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expiration = d.toUTCString();
    
    if(!validateInputs(question,answer)){
      return false;
    }
    // escaping cookies for any special charecter
    question=escape(question);
    answer=escape(answer);
    /*
    cookie stores data as key pair value
    so the syntax could be 'document.cookie="name=value;"'
    setting cookie expiration time will require exprires key keyword
    setting cookie path to '/' so that i could be available on all page on that domain
    */
    var cookie = question + "=" +answer+";expires=" + expiration + "; path=/;";
    // setting cookie is as easy as this line below
    document.cookie = cookie;
    fetchQAs ();
    return true;
}

function fetchQAs () {
      
      var qaDiv = document.getElementById('qa_results');
      qaDiv.innerHTML = '';
      var cookies = document.cookie.split(';');
      cookies=unescape(cookies);
      console.log(cookies);
      cookies = cookies.split(', ');
      // converting cookies string into object
      var result = {};
      for (var i = 0; i < cookies.length; i++) {
          var cur = cookies[i].split('=');
          result[cur[0]] = cur[1];
      }
      console.log(result);
      // looping through object to get keys and values
      for (var index_name in result) {
          if (result.hasOwnProperty(index_name)) {
              console.log(index_name + " -> " + result[index_name]);
               qaDiv.innerHTML+=`<div class='well'>
               <h3>${index_name}</h3>
               <h5>${result[index_name]}</h5>
               <a class='btn btn-danger' href='#' onclick="deleteQA('${index_name}')">Delete</a>
               </div>`;
          }
      }
      // return true;
}

function deleteQA(name) {
    console.log(name);
      // setting the cookie of specific name to '-1' which indicated its in past now delete it
      // parsing path is must otherwise cookie won't be deleted
      document.cookie = escape(name) + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
      fetchQAs();
      // return true;
    
}

function validateInputs (question,answer) {
  // validation if any of the field is empty
  if(!question || !answer){
    alert('Please fill in the form');
    return false;
  }
  return true;
}