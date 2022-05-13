
function selectChange() {
    const selectValue = document.querySelector("select").value

    const formElement = document.querySelector("form")

    const inputElement = document.querySelector("input")

    if (selectValue === 'baidu') {
        formElement.action = "https://www.baidu.com/s"
        inputElement.name = "wd"
        
    } else {
        formElement.action = "https://www.sogou.com/web"
        inputElement.name = "query"
    }
};

const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

const hashMap = xObject || [
    { logo: 'G', url: 'https://github.com/' },
    { logo: 'E', url: 'https://es6.ruanyifeng.com/#README' }
]
const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www', '').replace('com/', 'com').replace('es6.', '').replace('.com#README', '').replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        console.log(index)
        const $li = $(`
           <li>
                
                <div class="site">
                    <div class="logo">${simplifyUrl(node.logo)}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                    <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                            </svg>  
                    </div>
                </div>
                
            </li>
        `);
        $li.insertBefore($lastLi)
        $li.on('click', () =>{
            window.open(node.url)
        })
        $li.on('click', '.close', (e) =>{
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })

}

render()

$('.addButton').on('click', () => {
    let url = window.prompt("请问你要添加的网址是啥")
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });
    render()
});
window.onbeforeunload = () => {
    console.log('close')
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e)=>{
    const {key} = e
    console.log(key)
    for(let i = 0; i<hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})



 

