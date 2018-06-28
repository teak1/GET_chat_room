function send(){
    var inputs = document.getElementsByTagName("input");
    fetch(`/send/${inputs[0].value}/${inputs[1].value}`);
}
function request(){
    fetch('/req/new').then(a=>a.text()).then(a=>document.getElementsByTagName("textarea")[0].value+=a).then(request);
    }
request();
