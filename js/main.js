function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
function hideTitle() {
    $(".titleText").show();
    var ttext = $(".title")[0];
    
    if(isOverflown(ttext))
    {
        $(".titleText").hide();
    }
}

function strip(html){
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

const pad = (num, places) => String(num).padStart(places, '0')

jQuery.fn.addChild = function(html) 
{                               
    var target  = $(this[0])                            
    var child = $(html);                                                      
    child.appendTo(target);                                                   
    return child;                                                             
}; 

const URL = "https://docs.google.com/document/d/e/2PACX-1vSS9yLtml8THQmTP6Nn4T22ix8dwTdM-_2ef53cFo3LHQHJ9gfB6gA865H9iV0UPynjhgXeseh8aoG3/pub?embedded=true";

function textFilter() {
    var filter = $(".textFilter").val().toLowerCase();
    $(".project").each(function() {
        var project = $(this);
        if(project.text().toLowerCase().indexOf(filter) >=  0)
        {
            project.show();
        }
        else
        {
            project.hide();
        }
    });
}

$(window).resize(hideTitle)
$(document).ready(function() {
    hideTitle();
    $.get(URL,function(data,status) {
        var projects = (strip(data).split("<<BREAK>>"));
        projects.forEach(project => {
            var number = project.split(":")[0];
            var name = project.split(":")[1];
            var classification = project.split(":")[2];
            var danger = project.split(":")[3];
            var link = project.split(":").slice(4).join(":");

            var root = $(".projectsGrid");
            root.addChild(
                '<div class="project">' +
                '    <p class="projectName">Project #' + pad(number,3) + ': ' + name + '</p>' +
                '    <p class="projectClass">Clearence Level ' + classification + '</p>' +
                '    <p class="projectRisk">Risk Level ' + danger + '</p>' +
                '</div>'
            ).click(function () {
                window.open(link,'_blank');
            });
        });
    })
})