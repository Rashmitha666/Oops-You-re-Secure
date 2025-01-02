window.openPage = (pageName, ...args)=>
{
    const pageContentDiv = document.body;
    const newPage = document.createElement(pageName);

    if(newPage.initialize)
    {
        newPage.initialize(...args);
    }   

    newPage.style.display = "flex";
    newPage.style.flexDirection = "column";
    newPage.style.height = "100%";
    
    pageContentDiv.innerHTML = ``;
    pageContentDiv.appendChild(newPage);

}
