/**
 * Created by wanglin on 2016/9/9.
 */
function allowDrop(ev)
{
    ev.preventDefault();
}

function drag(ev)
{
    ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev)
{
    ev.preventDefault();
    var sourceData=ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(sourceData));
}

