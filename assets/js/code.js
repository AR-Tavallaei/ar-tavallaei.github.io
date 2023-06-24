let progressesLoaded = false;
let learnSectionLoaded = false;
const sectionsLoaded = {'aboutMeSection':false,
    'abilitySection':false,
    'projectSection':false,
    'learnSection':false,
    'contactSection':false};


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

    // set sectionsLoaded when navbar items clicked
    for (const navLink of document.querySelectorAll('.navbar .nav-link')){
        navLink.onclick = function (){
            const targetId = navLink.href.slice(navLink.href.indexOf('#') + 1);
            let numberOfSectionsBefore = 0;
            for (const section in sectionsLoaded) {
                if (targetId !== section){
                    numberOfSectionsBefore += 1
                }
                else {
                    setTimeout(function (){
                        window.scrollTo(0, document.getElementById(targetId).offsetTop);
                    }, numberOfSectionsBefore * 1000);
                    return;
                }
            }
        }
    }
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

// load abilities section
function loadAbilities(){
    const abilities = document.getElementsByClassName('ability-progress-bar');
    for (let i=0; i< abilities.length; i++) {
        let ability = abilities[i];
        setInterval(function (){
            if (Number(ability.getAttribute('data-value-now')) < Number(ability.getAttribute('data-total-value'))){
                ability.style.background = 'radial-gradient(closest-side, white 80%, transparent 20%), ' +
                    'linear-gradient(to right, rgba(169, 169, 169, 0.5), rgba(169, 169, 169, 0.5)), ' +
                    'conic-gradient(var(--info-color) ability-percent%, transparent 0)'.replace('ability-percent', ability.getAttribute('data-value-now'));
                ability.setAttribute('data-value-now', String(Number(ability.getAttribute('data-value-now')) + 1));
                document.querySelectorAll('.ability-progress-bar span:last-of-type').item(i).innerHTML = ability.getAttribute('data-value-now') + '%'
            }
            else {
                clearInterval(this);
            }
        }, 20);
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

// set animations of between lines in learn section
function setBetweenLineAnimationOfLearns(){
    let betweenLines = document.querySelectorAll('.line-between div, .line-side>div>div');
    for (let i=0; i < betweenLines.length; i++){
        const deviceWidth = document.body.clientWidth || document.documentElement.clientWidth || window.innerWidth;
        if (betweenLines[i].parentElement.style.order === '2'){
            if (deviceWidth >= 768) {
                setTimeout(function () {
                    betweenLines[i + 1].style.animation = 'betweenLineAnimationToLeft 1s linear forwards';
                }, i * 1000);
            }
            else {
                setTimeout(function (){
                    betweenLines[i].style.animation = 'betweenLineAnimationToRight 1s linear forwards';
                }, i*1000);
            }
        }
        else if (betweenLines[i].parentElement.style.order === '4'){
            if (deviceWidth >= 768) {
                setTimeout(function () {
                    betweenLines[i - 1].style.animation = 'betweenLineAnimationToLeft 1s linear forwards';
                }, i * 1000);
            }
            else {
                setTimeout(function (){
                    betweenLines[i].style.animation = 'betweenLineAnimationToRight 1s linear forwards';
                }, i*1000);
            }
        }
        else if (betweenLines[i].parentElement.parentElement.className.indexOf('line-side') !== -1){
            setTimeout(function (){
                betweenLines[i].style.animation = 'betweenLineAnimationToBottom 1s linear forwards';
            }, i*1000);
        }
        else {
            setTimeout(function (){
                betweenLines[i].style.animation = 'betweenLineAnimationToRight 1s linear forwards';
            }, i*1000);
        }
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
    setInterval(function (){document.body.removeChild(alert)}, 20000);
}


loadNavbar()
loadHeaderTexts()
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
    if (winScroll >= document.getElementById('aboutMeSection').offsetTop + 400 && progressesLoaded === false){
        loadAbilities();
        progressesLoaded = true;
    }
    if (winScroll >= document.getElementById('projectSection').offsetTop + 400 && learnSectionLoaded === false){
        setBetweenLineAnimationOfLearns()
        learnSectionLoaded = true;
    }
    for (const section in sectionsLoaded) {
        const el = document.getElementById(section);
        if (winScroll >= el.offsetTop - el.clientHeight && sectionsLoaded[section] === false){
            el.className += ' loadSection';
            try {
                el.nextElementSibling.className += ' loadSection2';
            }
            catch {}
            sectionsLoaded[section] = true;
        }
    }
}
