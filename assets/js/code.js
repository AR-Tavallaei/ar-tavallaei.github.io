function loadNavbar(){
    const style = document.createElement('style');
    style.innerHTML =`
        .navbar .nav-item{
            transition: 0.1s ease-in;
        }
        .navbar .nav-item:hover{
            background-color: rgba(77, 110, 154, 0.5) !important;
        }
        .navbar .nav-item:active{
            background-color: rgba(51, 100, 164, 0.5) !important;
        }
        .navbar .navbar-brand:hover{
           color: rgb(13, 202, 240);
        }`;
    document.head.appendChild(style);

    // set background of navbar items for scrollspy
    setInterval(function (){
        for (const navItem of document.querySelectorAll('.navbar-nav .nav-link')){
            if (navItem.className.indexOf('active') !== -1){
                navItem.parentElement.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                navItem.className = navItem.className.replace('text-light', 'text-dark');
            }
            else {
                navItem.parentElement.style.backgroundColor = 'transparent';
                navItem.className = navItem.className.replace('text-dark', 'text-light');
            }
        }
    }, 1);

    // set scrollbar after a navbar item clicked

}

function loadHeaderTexts() {
    const headerTexts = document.querySelectorAll('#bio h2');
    function slideHeaderTexts(){
        for (let i=0; i < headerTexts.length; i++){
            const text = headerTexts[i];
            setTimeout(function (){
                text.style.display = 'block';
                setTimeout(function (){text.style.display = 'none'}, 3000);
            }, i * 4000)
        }
    }
    slideHeaderTexts();
    setInterval(function (){slideHeaderTexts()}, 12000);
}

function loadAbilities(){
    const abilities = document.getElementsByClassName('ability-progress-bar');
    for (let i=0; i< abilities.length; i++) {
        let ability = abilities[i];
        ability.style.background = 'radial-gradient(closest-side, white 80%, transparent 20%), conic-gradient(var(--info-color) ability-percent%, rgba(169, 169, 169, 0.5) 0)'.replace('ability-percent', ability.ariaValueNow);
        document.querySelectorAll('.ability-progress-bar span:last-of-type').item(i).innerHTML = ability.ariaValueNow + '%';
    }
}


// set project items on hover
function setProjectItemsOnHover(){
    const projectItems = document.getElementsByClassName('list-group-item');
    for (const projectItem of projectItems) {
        const srcAttr = document.createAttribute('src');
        projectItem.addEventListener('mouseover', function (){
            srcAttr.value = 'assets/icons/github-white.svg';
            projectItem.children[0].firstElementChild.setAttributeNode(srcAttr);
        })
        projectItem.addEventListener('mouseout', function (){
            srcAttr.value = 'assets/icons/github.svg';
            projectItem.children[0].firstElementChild.setAttributeNode(srcAttr);
        })
    }
}


loadNavbar()
loadHeaderTexts()
loadAbilities()
setProjectItemsOnHover()

// set navbar on scrolling
window.onscroll = function (){
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const style = document.querySelector('head style');
    if (winScroll >= 500){
        style.innerHTML = `
        .navbar {
            background-color: var(--second-color);
        }
        .navbar .nav-item{
            transition:  0.1s ease-in;
        }
        .navbar .nav-item:hover{
            background-color: rgb(0, 117, 141) !important;
        }
        .navbar .nav-item:active{
            background-color: rgb(0, 73, 89) !important;
        }
        .navbar .navbar-brand:hover{
           color: darkblue;
        }`;
    }
    else {
        style.innerHTML =`
        .navbar .nav-item{
            transition:  0.1s ease-in;
        }
        .navbar .nav-item:hover{
            background-color: rgba(77, 110, 154, 0.5) !important;
        }
        .navbar .nav-item:active{
            background-color: rgba(51, 100, 164, 0.5) !important;
        }
        .navbar .navbar-brand:hover{
           color: rgb(13, 202, 240);
        }`;
    }
}

// set event for submit button in contact section
function sendEmail(){
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const emailText = document.getElementById('emailText').value;
    window.open("mailto:tavallaei.14@gmail.com?subject=" + subject + '&body=' + 'نام و نام خانوادگی: ' + name + '%0d%0a' + emailText.replaceAll('\n', '%0d%0a'), "_blank");

    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alert.style.bottom = '10px';
    alert.style.right = '10px';
    alert.style.maxWidth = '350px'
    const title = document.createElement('h6');
    title.innerHTML = name + ' عزیز، لطفا روی گزینه ی ارسال در صفحه ایمیل خود که باز شده است، کلیک کنید تا پیامتان برای من ارسال شود.';
    title.className = 'alert-heading';
    const btnClose = document.createElement('button');
    btnClose.className = 'btn btn-close';
    btnClose.setAttribute('data-bs-dismiss', 'alert');
    alert.appendChild(title);
    alert.appendChild(btnClose);
    document.body.appendChild(alert);
    setInterval(function (){document.body.removeChild(alert)}, 10000);
}
